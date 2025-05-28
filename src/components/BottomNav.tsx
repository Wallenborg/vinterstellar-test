// import { useState } from 'react';
// import { BsThreeDots } from 'react-icons/bs';
// import { IoClose } from 'react-icons/io5';
// import './BottomNav.css';

// export const BottomNav: React.FC<{
//   onOpenModal: (m: 'careers' | 'contact') => void;
// }> = ({ onOpenModal }) => {
//   const [open, setOpen] = useState(false);
//   const toggle = () => setOpen(o => !o);


//   const scrollToSection = (id: string) => {
//     const el = document.getElementById(id);
//     if (el) el.scrollIntoView({ behavior: 'smooth' });
//     setOpen(false);
//   };

//   return (
//     <>
//       <button className="nav-toggle" onClick={toggle} aria-label="Menu">
//         {open ? <IoClose size="2rem" /> : <BsThreeDots size="2rem" />}
//       </button>

//       <nav className={`bottom-nav ${open ? 'open' : ''}`}>
//       <button
//   type="button"
//   className="nav-close"
//   onClick={toggle}
//   aria-label="Close menu"
// >
//   <IoClose size="1.5rem" />
// </button>
//         <ul>
//           <li>
//             <button onClick={() => scrollToSection('about')} className="nav-link">
//               About
//             </button>
//           </li>
//           <li>
//             <button onClick={() => scrollToSection('services')} className="nav-link">
//               Services
//             </button>
//           </li>
//           <li>
//             <button
//               onClick={() => {
//                 onOpenModal('careers');
//                 setOpen(false);
//               }}
//               className="nav-link"
//             >
//               Careers
//             </button>
//           </li>
//           <li>
//             <button
//               onClick={() => {
//                 onOpenModal('contact');
//                 setOpen(false);
//               }}
//               className="nav-link"
//             >
//               Contact
//             </button>
//             </li>
//             <li>
//             <button
//               onClick={() => {
//                 onOpenModal('contact');
//                 setOpen(false);
//               }}
//               className="nav-link"
//             >
//               Satellite  Playground
//             </button>
//           </li>
//         </ul>
//       </nav>
//     </>
//   );
// };
// import React, { useState } from "react";
// import { BsThreeDots } from "react-icons/bs";
// import { IoClose } from "react-icons/io5";
// import "./BottomNav.css";

// export const BottomNav: React.FC<{
//   onOpenModal: (m: "careers" | "contact") => void;
//   onViewChange: (view: "main" | "satellite") => void;  // ny prop
// }> = ({ onOpenModal, onViewChange }) => {
//   const [open, setOpen] = useState(false);
//   const toggle = () => setOpen((o) => !o);

//   const scrollToSection = (id: string) => {
//     const el = document.getElementById(id);
//     if (el) el.scrollIntoView({ behavior: "smooth" });
//     setOpen(false);
//   };

//   return (
//     <>
//       <button className="nav-toggle" onClick={toggle} aria-label="Menu">
//         {open ? <IoClose size="2rem" /> : <BsThreeDots size="2rem" />}
//       </button>

//       <nav className={`bottom-nav ${open ? "open" : ""}`}>
//         <button
//           type="button"
//           className="nav-close"
//           onClick={toggle}
//           aria-label="Close menu"
//         >
//           <IoClose size="1.5rem" />
//         </button>
//         <ul>
//           <li>
//             <button onClick={() => scrollToSection("about")} className="nav-link">
//               About
//             </button>
//           </li>
//           <li>
//             <button onClick={() => scrollToSection("services")} className="nav-link">
//               Services
//             </button>
//           </li>
//           <li>
//             <button
//               onClick={() => {
//                 onOpenModal("careers");
//                 setOpen(false);
//               }}
//               className="nav-link"
//             >
//               Careers
//             </button>
//           </li>
//           <li>
//             <button
//               onClick={() => {
//                 onOpenModal("contact");
//                 setOpen(false);
//               }}
//               className="nav-link"
//             >
//               Contact
//             </button>
//           </li>
//           <li>
//             <button
//               onClick={() => {
//                 onViewChange("satellite");  // växla vy
//                 setOpen(false);
//               }}
//               className="nav-link"
//             >
//               Satellite Playground
//             </button>
//           </li>
//         </ul>
//       </nav>
//     </>
//   );
// };




// import React, { useState } from "react";
// import { BsThreeDots } from "react-icons/bs";
// import { IoClose } from "react-icons/io5";
// import "./BottomNav.css";

// interface BottomNavProps {
//   onOpenModal: (m: "careers" | "contact") => void;
//   onViewChange: (view: "main" | "satellite") => void;
// }

// export const BottomNav: React.FC<BottomNavProps> = ({
//   onOpenModal,
//   onViewChange,
// }) => {
//   const [open, setOpen] = useState(false);
//   const toggle = () => setOpen((o) => !o);

//   const scrollToSection = (id: string) => {
//     const el = document.getElementById(id);
//     if (el) el.scrollIntoView({ behavior: "smooth" });
//     setOpen(false);
//   };

//   return (
//     <>
//       <button className="nav-toggle" onClick={toggle} aria-label="Menu">
//         {open ? <IoClose size="2rem" /> : <BsThreeDots size="2rem" />}
//       </button>

//       <nav className={`bottom-nav ${open ? "open" : ""}`}>
//         <button
//           type="button"
//           className="nav-close"
//           onClick={toggle}
//           aria-label="Close menu"
//         >
//           <IoClose size="1.5rem" />
//         </button>
//         <ul>
//           <li>
//             <button
//               onClick={() => scrollToSection("about")}
//               className="nav-link"
//             >
//               About
//             </button>
//           </li>
//           <li>
//             <button
//               onClick={() => scrollToSection("services")}
//               className="nav-link"
//             >
//               Services
//             </button>
//           </li>
//           <li>
//             <button
//               onClick={() => {
//                 onOpenModal("careers");
//                 setOpen(false);
//               }}
//               className="nav-link"
//             >
//               Careers
//             </button>
//           </li>
//           <li>
//             <button
//               onClick={() => {
//                 onOpenModal("contact");
//                 setOpen(false);
//               }}
//               className="nav-link"
//             >
//               Contact
//             </button>
//           </li>
//           <li>
//             <button
//               onClick={() => {
//                 onViewChange("satellite");
//                 setOpen(false);
//               }}
//               className="nav-link"
//             >
//               Satellite Playground
//             </button>
//           </li>
//         </ul>
//       </nav>
//     </>
//   );
// };


import React, { useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { IoClose } from "react-icons/io5";
import "./BottomNav.css";

interface Props {
  onOpenModal: (m: "careers" | "contact") => void;
  onViewChange: (view: "main" | "satellite") => void;
}

export const BottomNav: React.FC<Props> = ({
  onOpenModal,
  onViewChange,
}) => {
  const [open, setOpen] = useState(false);
  const toggle = () => setOpen((o) => !o);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  };

  return (
    <>
      <button className="nav-toggle" onClick={toggle} aria-label="Menu">
        {open ? <IoClose size="2rem" /> : <BsThreeDots size="2rem" />}
      </button>

      <nav className={`bottom-nav ${open ? "open" : ""}`}>
        <button
          type="button"
          className="nav-close"
          onClick={toggle}
          aria-label="Close menu"
        >
          <IoClose size="1.5rem" />
        </button>
        <ul>
          <li>
            <button onClick={() => scrollToSection("about")} className="nav-link">
              About
            </button>
          </li>
          <li>
            <button onClick={() => scrollToSection("services")} className="nav-link">
              Services
            </button>
          </li>
          <li>
            <button
              onClick={() => {
                onOpenModal("careers");
                setOpen(false);
              }}
              className="nav-link"
            >
              Careers
            </button>
          </li>
          <li>
            <button
              onClick={() => {
                onOpenModal("contact");
                setOpen(false);
              }}
              className="nav-link"
            >
              Contact
            </button>
          </li>
          <li>
            <button
              onClick={() => {
                onViewChange("satellite");
                setOpen(false);
              }}
              className="nav-link"
            >
              Satellite Playground
            </button>
          </li>
        </ul>
      </nav>
    </>
  );
};
