import type { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface Props { id: string; children: ReactNode; }

export const AnimatedSection: React.FC<Props> = ({ id, children }) => (
  <motion.section
    id={id}
    className="block"
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.2 }}
    transition={{ duration: 0.6 }}
  >
    {children}
  </motion.section>
);

