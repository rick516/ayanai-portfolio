import { motion } from 'framer-motion';
import { styles } from '../styles';

import { staggerContainer } from '../utils/motion';

const SectionWrapper = (Component: React.ComponentType, idName: string) =>
  function HOC() {
    return (
      <motion.section
        variants={staggerContainer()}
        initial='hidden'
        animate='show'
        whileInView="show"
        viewport={{ once: true }}
        exit={{ opacity: 0, transition: { duration: 0.2 } }}
        className={`${styles.padding} relative z-0 mx-auto max-w-7xl`}>
        <Component />
      </motion.section>
    );
  };

export default SectionWrapper;