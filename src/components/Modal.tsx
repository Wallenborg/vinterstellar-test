// import React, { useEffect } from 'react';
// import type { ReactNode } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import './Modal.css';

// interface Props {
//   isOpen: boolean;
//   onClose: () => void;
//   title: string;
//   children: ReactNode;
// }

// export const Modal: React.FC<Props> = ({ isOpen, onClose, title, children }) => {
//   useEffect(() => {
//     if (isOpen) {
 
//       const origBodyOverflow = document.body.style.overflow;
//       const origHtmlOverflow = document.documentElement.style.overflow;

 
//       document.body.style.overflow = 'hidden';
//       document.documentElement.style.overflow = 'hidden';

//       return () => {
      
//         document.body.style.overflow = origBodyOverflow;
//         document.documentElement.style.overflow = origHtmlOverflow;
//       };
//     }
//   }, [isOpen]);

//   return (
//     <AnimatePresence>
//       {isOpen && (
//         <motion.div
//           className="modal-backdrop"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           exit={{ opacity: 0 }}
//           onClick={onClose}
//         >
//           <motion.div
//             className="modal-content"
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: 20 }}
//             transition={{ duration: 0.3, ease: 'easeOut' }}
//             onClick={e => e.stopPropagation()}
//           >
//             <h2>{title}</h2>
//             {children}
//             <button className="close-btn" onClick={onClose}>×</button>
//           </motion.div>
//         </motion.div>
//       )}
//     </AnimatePresence>
//   );
// };
// src/components/Modal.tsx

import React, { useEffect } from 'react';
import type { ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Modal.css';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

export const Modal: React.FC<Props> = ({ isOpen, onClose, title, children }) => {
  // Lås bakgrundsscroll när modalen är öppen
  useEffect(() => {
    if (isOpen) {
      const origBody = document.body.style.overflow;
      const origHtml = document.documentElement.style.overflow;
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = origBody;
        document.documentElement.style.overflow = origHtml;
      };
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="modal-content"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={e => e.stopPropagation()}
          >
            <div className="modal-header">
              <h2>{title}</h2>
              <button className="close-btn" onClick={onClose}>×</button>
            </div>
            <div className="modal-body">
              {children}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};


