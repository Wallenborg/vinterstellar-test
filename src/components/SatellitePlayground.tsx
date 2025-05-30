import React, { useEffect, useRef } from 'react';
import * as Cesium from 'cesium';
import 'cesium/Build/Cesium/Widgets/widgets.css';
import './SatellitePlayground.css';

interface Props { onBack: () => void }

export const SatellitePlayground: React.FC<Props> = ({ onBack }) => {
  const containerRef   = useRef<HTMLDivElement>(null);
  const popupRef       = useRef<HTMLDivElement>(null);
  const popupContent   = useRef<HTMLDivElement>(null);
  const popupClose     = useRef<HTMLButtonElement>(null);
  const lastLat        = useRef<number>(0);
  const lastLon        = useRef<number>(0);
  const altitudeRef    = useRef<number>(0);
  const velocityRef    = useRef<number>(0);
  const timestampRef   = useRef<number>(0);
  const popupTimeout   = useRef<number|undefined>(undefined);

  useEffect(() => {
   
    window.scrollTo({ top: 0, behavior: 'auto' });

   
    const mql = window.matchMedia('(max-width: 767px)');
    let isMobile = mql.matches;
    console.log('▶ isMobile =', isMobile);

  
    ;(window as any).CESIUM_BASE_URL = '/cesium';
    if (!containerRef.current) return;

   
    const viewer = new Cesium.Viewer(containerRef.current, {
      terrainProvider: new Cesium.EllipsoidTerrainProvider(),
      baseLayerPicker: false, timeline: false, animation: false,
      infoBox: false, geocoder: false, homeButton: false,
      navigationHelpButton: false, sceneModePicker: false,
      fullscreenButton: false, selectionIndicator: false,
    });
  
    viewer.scene.imageryLayers.addImageryProvider(
      new Cesium.OpenStreetMapImageryProvider({ url: 'https://a.tile.openstreetmap.org/' })
    );

   
    const repositionCamera = () => {
      const R = viewer.scene.globe.ellipsoid.maximumRadius;
      if (isMobile) {
        const sphere = new Cesium.BoundingSphere(Cesium.Cartesian3.ZERO, R);
        const offset = new Cesium.HeadingPitchRange(
          0,
          -Cesium.Math.PI_OVER_TWO,
          R * 6    
        );
        viewer.camera.viewBoundingSphere(sphere, offset);
      } else {
        const cameraHeight = R * 4; 
        const cameraPos = Cesium.Cartesian3.fromDegrees(0, 0, cameraHeight);
        const direction = Cesium.Cartesian3.normalize(
          Cesium.Cartesian3.negate(cameraPos, new Cesium.Cartesian3()),
          new Cesium.Cartesian3()
        );
        const up = Cesium.Cartesian3.normalize(cameraPos, new Cesium.Cartesian3());
        viewer.camera.setView({ destination: cameraPos, orientation: { direction, up } });
      }
    };

  
    repositionCamera();
    const onResize = () => {
      isMobile = mql.matches;
      console.log('▶ resize isMobile =', isMobile);
      repositionCamera();
    };
    mql.addEventListener('change', onResize);

  
    function createCircleImage(size: number, color: Cesium.Color) {
      const c = document.createElement('canvas');
      c.width = c.height = size;
      const ctx = c.getContext('2d')!;
      ctx.beginPath();
      ctx.arc(size/2, size/2, size/2, 0, 2*Math.PI);
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
        pixelSize: 5, color: Cesium.Color.YELLOW,
        disableDepthTestDistance: 1_000_000
      },
      billboard: {
        image: createCircleImage(12, Cesium.Color.YELLOW),
        scale: 1,
        eyeOffset: new Cesium.Cartesian3(0, 0, -150_000),
        verticalOrigin: Cesium.VerticalOrigin.CENTER
      }
    });

  
    popupClose.current?.addEventListener('click', () => {
      popupRef.current?.classList.add('hidden');
      window.clearTimeout(popupTimeout.current);
    });

   
    async function fetchISS() {
      if (viewer.isDestroyed()) return;
      try {
        const res = await fetch('https://api.wheretheiss.at/v1/satellites/25544');
        const json = await res.json();
        lastLat.current     = json.latitude;
        lastLon.current     = json.longitude;
        altitudeRef.current = json.altitude;   
        velocityRef.current = json.velocity;   
        timestampRef.current= json.timestamp;  

      
        const carto = Cesium.Cartographic.fromDegrees(
          json.longitude, json.latitude, 500_000
        );
        const cart = Cesium.Ellipsoid.WGS84.cartographicToCartesian(carto);
        issEntity.position = new Cesium.ConstantPositionProperty(cart);
      } catch (e) {
        console.error('fetchISS error', e);
      }
    }
    fetchISS();
    const intervalId = window.setInterval(fetchISS, 5000);

   
    const handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
    handler.setInputAction((evt: any) => {
      const picked = viewer.scene.pick(evt.position);
      if (Cesium.defined(picked) && picked.id === issEntity) {
        const lat = lastLat.current.toFixed(2);
        const lon = lastLon.current.toFixed(2);
        const alt = altitudeRef.current.toFixed(1);
        const vel = velocityRef.current.toFixed(1);
        const time = new Date(timestampRef.current * 1000).toLocaleTimeString();
        popupContent.current!.innerHTML = `
         <h4>ISS Status</h4>
          <div class="coords">Lat: ${lat}°, Lon: ${lon}°</div>
          <div class="alt">Altitude: ${alt} km</div>
          <div class="vel">Velocity: ${vel} km/h</div>
          <div class="time">Time: ${time}</div>
        `;
        popupRef.current!.classList.remove('hidden');
        window.clearTimeout(popupTimeout.current);
        popupTimeout.current = window.setTimeout(() => {
          popupRef.current!.classList.add('hidden');
        }, 5000);
      }
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

    handler.setInputAction((mv: any) => {
      const picked = viewer.scene.pick(mv.endPosition);
      viewer.canvas.style.cursor =
        Cesium.defined(picked) && picked.id === issEntity ? 'pointer' : '';
    }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);

    
    document.getElementById('loadingOverlay')?.classList.add('hidden');

   
    return () => {
      clearInterval(intervalId);
      handler.destroy();
      mql.removeEventListener('change', onResize);
      viewer.destroy();
    };
  }, []);

  return (
    <div className="satellite-page">
      <button className="back-btn" onClick={onBack}>← Back</button>
    
      <h2 className="satellite-title">Satellite Playground</h2>
      <p className="satellite-p">Find the yellow dot</p>

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
        <button id="popupClose" ref={popupClose}>×</button>
        <div id="popupContent" ref={popupContent}></div>
      </div>
    </div>
  );
};
