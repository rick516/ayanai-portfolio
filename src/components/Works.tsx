import { Tilt } from 'react-tilt'
import { motion } from 'framer-motion'
import { projects } from '../constants'
import { SectionWrapper } from '../hoc'
import { fadeIn, textVariant } from '../utils/motion'
import { styles } from '../styles'

type ProjectCardProps = {
  index: number;
  name: string;
  description: string;
  tags: { name: string; color: string }[];
  image: string;
  source_code_link: string;
};

const ProjectCard = ({
  index,
  name,
  description,
  tags,
  image,
  source_code_link
}: ProjectCardProps) => {
  return (
    <motion.div variants={fadeIn("left", "spring", index * 0.5, 0.75)}>
      <a href={source_code_link} target="_blank" rel="noopener noreferrer" >
        <Tilt
          options={{
            max: 45,
            scale: 1,
            speed: 450
          }}
          className='bg-tertiary p-5 rounded-2xl sm:w-[360px] min-h-[400px] w-full'
        >
          <div className='relative w-full h-[230px]'>
            <img
              src={image}
              alt={name}
              className='w-full h-full object-cover content-center rounded-2xl'
            />
            <div className='absolute inset-0 flex justify-end m-3 card-img_hover'>
              <div
                className='w-10 h-10 rounded-full flex justify-center items-center cursor-pointer'
                onClick={() => window.open(source_code_link, "_blank")}
                onKeyUp={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    window.open(source_code_link, "_blank");
                  }
                }}
              >
              </div>
            </div>
          </div>
          <div className='mt-5'>
            <h3 className='font-bold text-[20px] text-white'>{name}</h3>
            <p className='mt-2 text-secondary text-[14px]'>{description}</p>
          </div>
          <div className='mt-4 flex flex-wrap gap-2'>
            {tags.map((tag) => (
              <p key={tag.name} className={`text-[14px] ${tag.color}`}>
                #{tag.name}
              </p>
            ))}
          </div>
        </Tilt>
      </a>
    </motion.div>
  )
}

const Works = () => {
  return (
    <>
      <div className="flex justify-start items-center">
        <div className="w-5 h-5 rounded-full bg-[#0fffeb]" />
        <div className="h-1 sm:w-80 w-40 bg-gradient-to-r from-[#0fffeb] to-[#1b1b1b]" />
      </div>
      <motion.div
        variants={textVariant(1)}
      >
        <p className={styles.sectionSubText}>My Work</p>
        <h2 className={styles.sectionHeadText}>Projects.</h2>
      </motion.div>
      <div>
        <motion.p
          variants={fadeIn("left", "spring", 0.5, 1)}
          className="mt-3 text-[17px] max-w-3xl leading-[30px]"
        >
          自分でも何屋さんかはわかりませんが、強いていうなら第一原理主義的にプロダクトビジョンを描き、アーキテクチャをモデリングして高速で0to1のプロダクト開発を行うのが好きです。
        </motion.p>
      </div>
      <div className='mt-10 flex flex-wrap gap-7'>
        {projects.map((project, index) => (
          <ProjectCard key={project.name} index={index} {...project} />
        ))}
      </div>
    </>
  )
}

export default SectionWrapper(Works, "works");