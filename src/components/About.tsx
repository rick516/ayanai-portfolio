import { motion } from 'framer-motion';
import { styles } from '../styles';
import { fadeIn, textVariant } from '../utils/motion';
import { SectionWrapper } from '../hoc';
import TransientText from './text/TransientText';

const About = () => {
  const roles = ["Ningen", "Artist", "Product Manager", "Fullstack Developer"];

  return (
    <>
      <div className="flex justify-start items-center">
        <div className="w-5 h-5 rounded-full bg-[#0fffeb]" />
        <div className="h-1 sm:w-80 w-40 bg-gradient-to-r from-[#0fffeb] to-[#1b1b1b]" />
      </div>
      <motion.div
        variants={textVariant(1)}
      >
        <p className={styles.sectionSubText}>INTRODUCTION</p>
        <h2 className={styles.sectionHeadText}>ayanai.</h2>
        <TransientText roles={roles} />
      </motion.div>
      <motion.div
        variants={fadeIn("left", "", 0.1, 1)}
        className="mt-4 text-white text-[17px] max-w-3xl leading-[30px]"
      >
        <p>
          私は人として生きる上でも、ビジネスをする上でも「自分の人生を愛せる人を増やすこと」を大切にしています。
        </p>
        <br />
        <p>
          「体験した後に感じた価値に応じて支払う」ポストプライシング決済新規事業で月間流通金額10万円から数億円までの事業成長をEMやジュニアPdMとして経験しました。
        </p>
        <br />
        <p>
          得意領域としてはエンジニアリングとプロダクトマネジメントの両面でなんでもやりながら不確実性の高いプロダクトシステム開発を推進することです。
        </p>
      </motion.div>
    </>
  )
}

export default SectionWrapper(About, "about");