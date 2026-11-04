import type { ReactNode } from 'react';
import { motion, useReducedMotion } from 'motion/react';

export function Reveal({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduced ? false : { opacity: 0.5, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: reduced ? 0 : 0.45, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}
