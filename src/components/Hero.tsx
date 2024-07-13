import { motion, useScroll, useTransform } from "framer-motion"
import ayanaiPortrait from "../assets/ayanai-portrait.jpeg"
import { About } from "./"
import { SectionWrapper } from "../hoc"

const Hero = () => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);

  return (
    <section className="w-full mx-auto overflow-hidden flex flex-col md:flex-row justify-between items-center">
      <div className="w-full md:w-auto top-[120px] max-w-7xl mx-auto flex flex-row items-center justify-center md:justify-end z-10">
        <motion.div
          className="w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 relative"
          style={{ y }}
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 rounded-full"
            style={{ rotate }}
          />
          <motion.img
            src={ayanaiPortrait}
            alt="Ayanai Portrait"
            className="w-full h-full object-cover rounded-full relative z-10"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            drag
            dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
            dragElastic={0.1}
            loading="lazy"
          />
        </motion.div>
      </div>
      <div className="flex flex-col justify-center items-start w-full md:max-w-[50%] mb-8 md:mb-0">
        <About />
      </div>
    </section>
  )
}

export default SectionWrapper(Hero, "hero")