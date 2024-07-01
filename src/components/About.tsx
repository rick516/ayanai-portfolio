import Tilt from 'react-parallax-tilt';
import { motion } from 'framer-motion';
import { styles } from '../styles';
// import { github, link } from '../assets';
import { services } from '../constants';
import { fadeIn, textVariant } from '../utils/motion';

const ServiceCard = ({ index, title, icon }: { index: number, title: string, icon: string }) => {
  return (
    <Tilt
      className='xs:w-[250px] w-full'
      tiltMaxAngleX={45}
      tiltMaxAngleY={45}
      scale={1}
      transitionSpeed={450}
    >
      <motion.div
        variants={fadeIn("right", "spring", index * 0.5, 0.75)}
        className='w-full green-pink-gradient p-[1px] rounded-[20px] shadow-card'
      >
        <div className='bg-tertiary rounded-[20px] py-5 px-12 min-h-[280px] flex justify-evenly flex-col items-center' >
          <img src={icon} alt={title} className='w-16 h-16 object-contain' />
          <h3 className='text-white text-[20px] font-bold text-center'>{title}</h3>
        </div>
      </motion.div>
    </Tilt>
  )
}

const About = () => {
  return (
    <div className='w-full h-screen mx-auto flex flex-col justify-center items-center space-y-2'>
      <div className={`${styles.paddingX} flex justify-start items-center`}>
        <div className="w-5 h-5 rounded-full bg-[#915eff]" />
        <div className="h-1 sm:w-80 w-40 bg-gradient-to-r from-[#915eff] to-[#1b1b1b]" />
      </div>
      <motion.div
        variants={textVariant(1)}
        className={styles.paddingX}
      >
        <p className={styles.sectionSubText}>Introduction</p>
        <h2 className={styles.sectionHeadText}>Overview.</h2>
      </motion.div>
      <motion.div
        variants={fadeIn("left", "", 0.1, 1)}
        className={`${styles.paddingX} ${styles.paddingY} w-[100vh]`}
      >
        インターンシップとして台湾で展開する後払い決済サービスのRubyバックエンドプログラマーとして与信アルゴリズムの開発に従事。その後、日本初の『感じた価値に応じて支払い価格を決める』ポストプライシング決済サービスに正社員唯一のエンジニア兼EM兼ジュニアPdMとして参画。月間流通十数万円程度から数億円程度までの事業成長を経験。
        「どうすればこれまで応援が届かなかった人々まで贈与を循環させる社会をつくれるのか？」みたいなHow Might Weを考えて日常消費と応援の距離を0にする決済UXを試行錯誤する日々。
        技術負債まみれのMVPプロダクトに対してトランザクション爆増に伴うシステムアーキテクチャのフルリプレイスや2度のUXリニューアルなど、プロダクトビジョンや市場獲得戦略からロードマップを策定しながら技術負債と向き合いつつプロダクトシステム全体のアーキテクトを主導。
      </motion.div>
      <div className='m-10 gap-10 flex flex-wrap justify-center'>
        {services.map((service: { title: string, icon: string }, index: number) => (
          <ServiceCard key={service.title} index={index} {...service} />
        ))} 
      </div>
    </div>
  )
}

export default About