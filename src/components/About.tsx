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
        <p className={styles.sectionSubText}>introduction</p>
        <h2 className={styles.sectionHeadText}>ayanai.</h2>
        <TransientText roles={roles} />
      </motion.div>
      <motion.p
        variants={fadeIn("left", "", 0.1, 1)}
        className="mt-4 text-white text-[17px] max-w-3xl leading-[30px]"
      >
        インターンシップとして台湾で展開する後払い決済サービスのRubyバックエンドプログラマーとして与信アルゴリズムの開発に従事。その後、日本初の『感じた価値に応じて支払い価格を決める』ポストプライシング決済サービスに正社員唯一のエンジニア兼EM兼ジュニアPdMとして参画。月間流通十数万円程度から数億円程度までの事業成長を経験。
        「どうすればこれまで応援が届かなかった人々まで贈与を循環させる社会をつくれるのか？」みたいなHow Might Weを考えて日常消費と応援の距離を0にする決済UXを試行錯誤する日々。
        技術負債まみれのMVPプロダクトに対してトランザクション爆増に伴うシステムアーキテクチャのフルリプレイスや2度のUXリニューアルなど、プロダクトビジョンや市場獲得戦略からロードマップを策定しながら技術負債と向き合いつつプロダクトシステム全体のアーキテクトを主導。
      </motion.p>
    </>
  )
}

export default SectionWrapper(About, "about");