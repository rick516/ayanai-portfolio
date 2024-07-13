import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"
import { styles } from "../../styles"

type TransientTextProps = {
  roles: string[]
}

const TransientText = ({ roles }: TransientTextProps) => {
  const [currentRole, setCurrentRole] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRole((prevRole) => (prevRole + 1) % roles.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [roles.length]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <AnimatePresence mode="wait">
        <motion.p
          key={currentRole}
          className={`${styles.heroSubText} mt-2 text-white-100`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
        >
          {roles[currentRole]}
        </motion.p>
      </AnimatePresence>
    </motion.div>
  )
}

export default TransientText