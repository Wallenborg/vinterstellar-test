// src/components/SatellitePlayground.tsx
import React, { useEffect, useRef } from 'react';
import * as Cesium from 'cesium';
import 'cesium/Build/Cesium/Widgets/widgets.css';
import './SatellitePlayground.css';

interface Props {
  onBack: () => void;
}

export const SatellitePlayground: React.FC<Props> = ({ onBack }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const popupRef = useRef<HTMLDivElement>(null);
  const popupContentRef = useRef<HTMLDivElement>(null);
  const popupCloseRef = useRef<HTMLButtonElement>(null);


  const lastLat = useRef<number>(0);
  const lastLon = useRef<number>(0);
  const popupTimeout = useRef<number | undefined>(undefined);
  const firstView = useRef<boolean>(true);
  const isMobile = window.innerWidth < 768;

  useEffect(() => {
 
    window.scrollTo({ top: 0, behavior: 'auto' });
 
    ;(window as any).CESIUM_BASE_URL = '/cesium';

    if (!containerRef.current) return;
    const viewer = new Cesium.Viewer(containerRef.current, {
      terrainProvider: new Cesium.EllipsoidTerrainProvider(),
      baseLayerPicker: false,
      timeline: false,
      animation: false,
      infoBox: false,
      geocoder: false,
      homeButton: false,
      navigationHelpButton: false,
      sceneModePicker: false,
      fullscreenButton: false,
      selectionIndicator: false,
    });

   
    viewer.scene.imageryLayers.addImageryProvider(
      new Cesium.OpenStreetMapImageryProvider({
        url: 'https://a.tile.openstreetmap.org/'
      })
    );

 
    function createCircleImage(size: number, color: Cesium.Color) {
      const c = document.createElement('canvas');
      c.width = c.height = size;
      const ctx = c.getContext('2d')!;
      ctx.beginPath();
      ctx.arc(size / 2, size / 2, size / 2, 0, 2 * Math.PI);
      ctx.fillStyle = color.toCssColorString();
      ctx.fill();
      return c.toDataURL();
    }

  
    const issEntity = viewer.entities.add({
      name: 'ISS',
      position: new Cesium.ConstantPositionProperty(
        Cesium.Cartesian3.fromDegrees(0, 0, 500_000)
      ),
      point: {
        pixelSize: 5,
        color: Cesium.Color.YELLOW,
        disableDepthTestDistance: 1_000_000
      },
      billboard: {
        image: createCircleImage(12, Cesium.Color.YELLOW),
        scale: 1,
        eyeOffset: new Cesium.Cartesian3(0, 0, -150_000),
        verticalOrigin: Cesium.VerticalOrigin.CENTER
      }
    });

    
    popupCloseRef.current?.addEventListener('click', () => {
      popupRef.current?.classList.add('hidden');
      window.clearTimeout(popupTimeout.current);
    });

  
    async function fetchISS() {
      try {
        const res = await fetch('https://api.wheretheiss.at/v1/satellites/25544');
        const { latitude: lat, longitude: lon } = await res.json();
        lastLat.current = lat;
        lastLon.current = lon;

      
        const carto = Cesium.Cartographic.fromDegrees(lon, lat, 500_000);
        const cartesian = Cesium.Ellipsoid.WGS84.cartographicToCartesian(carto);
        issEntity.position = new Cesium.ConstantPositionProperty(cartesian);

     
        if (firstView.current) {
          firstView.current = false;

       
          if (isMobile) {
         
            const worldRect = Cesium.Rectangle.fromDegrees(-180, -90, 180, 90);
            viewer.camera.setView({ destination: worldRect });
          
          } else {
           
            const antipodeLat = -lat;
            let antipodeLon = lon + 180;
            if (antipodeLon > 180) antipodeLon -= 360;

            const surfaceCarto = Cesium.Cartographic.fromDegrees(antipodeLon, antipodeLat, 0);
            const surfacePos = Cesium.Ellipsoid.WGS84.cartographicToCartesian(surfaceCarto);

            const R = viewer.scene.globe.ellipsoid.maximumRadius;
            const dir = Cesium.Cartesian3.normalize(surfacePos, new Cesium.Cartesian3());
            const cameraPos = Cesium.Cartesian3.multiplyByScalar(dir, R * 4, new Cesium.Cartesian3());

            const direction = Cesium.Cartesian3.normalize(
              Cesium.Cartesian3.negate(cameraPos, new Cesium.Cartesian3()),
              new Cesium.Cartesian3()
            );
            const up = Cesium.Cartesian3.normalize(cameraPos, new Cesium.Cartesian3());

            viewer.camera.setView({
              destination: cameraPos,
              orientation: { direction, up }
            });
          }
        }
      } catch (e) {
        console.error('Kunde inte hämta ISS-data:', e);
      }
    }


    document.getElementById('loadingOverlay')?.classList.add('hidden');

  
    const handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
    handler.setInputAction((evt: any) => {
      const picked = viewer.scene.pick(evt.position);
      if (Cesium.defined(picked) && picked.id === issEntity) {
        popupContentRef.current!.innerHTML =
          `<div class="coords">Lat: ${lastLat.current.toFixed(2)}°, Lon: ${lastLon.current.toFixed(2)}°</div>`;
        popupRef.current!.classList.remove('hidden');
        window.clearTimeout(popupTimeout.current);
        popupTimeout.current = window.setTimeout(() => {
          popupRef.current!.classList.add('hidden');
        }, 3000);
      }
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

    handler.setInputAction((mv: any) => {
      const picked = viewer.scene.pick(mv.endPosition);
      viewer.canvas.style.cursor = Cesium.defined(picked) && picked.id === issEntity
        ? 'pointer'
        : '';
    }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);

    
    fetchISS();
    const iv = window.setInterval(fetchISS, 5000);

  
    return () => {
      window.clearInterval(iv);
      handler.destroy();
      viewer.destroy();
    };
  }, []);

  return (
    <div className="satellite-page">
      <button className="back-btn" onClick={onBack}>← Back</button>
      <h2 className="satellite-title">Satellite Playground</h2>

      <div id="loadingOverlay">
        <div id="loadingText">Loading...</div>
      </div>

      <div
        ref={containerRef}
        id="cesiumContainer"
        className="cesium-container"
      />

      <div
        id="issPopup"
        ref={popupRef}
        className="hidden"
      >
        <button id="popupClose" ref={popupCloseRef}>×</button>
        <div id="popupContent" ref={popupContentRef}></div>
      </div>
    </div>
  );
};






