import { motion, useScroll, useTransform } from "framer-motion"
import { styles } from "../styles"
import ayanaiPortrait from "../assets/ayanai-portrait.jpeg"
import { About } from "./"
import { SectionWrapper } from "../hoc"

const Hero = () => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);


  return (
    <section className="w-full mx-auto overflow-hidden flex flex-row justify-between">
      <div className="flex flex-col justify-center items-start max-w-[50%]">
        <About />
      </div>
      <div className="inset-0 top-[120px] max-w-7xl mx-auto flex flex-row items-center justify-between z-10">
        <motion.div
          className="h-[80%]"
          style={{ y }}
        >
          <motion.img
            src={ayanaiPortrait}
            alt="Ayanai Portrait"
            className="w-full h-full object-cover"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            whileHover={{ scale: 1.05 }}
            loading="lazy"
          />
        </motion.div>
      </div>
    </section>
  )
}

export default SectionWrapper(Hero, "hero")