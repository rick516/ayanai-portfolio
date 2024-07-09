import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { EarthCanvas } from './canvas'
import { styles } from '../styles'
import { SectionWrapper } from '../hoc'
import { slideIn, textVariant } from '../utils/motion'
import { github, linkedin, twitter } from '../assets'

const Contact = () => {
  const formRef = useRef()
  const [form, setForm] = useState({ name: '', email: '', message: '' })

  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
  }

  return (
   <div className='xl:mt-12 xl:flex-flow flex-col-reverse flex gap-10 overflow-hidden'>
    <motion.div 
      variants={slideIn('left', 'tween', 0.2, 1)}
      className='flex-[0.75] bg-black-100 p-8 rounded-2xl'
    >
      <p className={styles.sectionSubText}>Get in touch</p>
      <h2 className={styles.sectionHeadText}>Contact.</h2>
    </motion.div>
   </div> 
  )
}

export default SectionWrapper(Contact, 'contact')