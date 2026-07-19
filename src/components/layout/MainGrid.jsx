import { motion, useReducedMotion } from 'framer-motion'

export const MainGrid = ({ children }) => {
  const shouldReduceMotion = useReducedMotion()

  const reveal = shouldReduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 16 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
      }

  return (
    <motion.main className="card" {...reveal}>
      {children}
    </motion.main>
  )
}
