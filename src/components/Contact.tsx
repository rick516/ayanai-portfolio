import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { EarthCanvas } from './canvas'
import { styles } from '../styles'
import { SectionWrapper } from '../hoc'
import { slideIn, textVariant } from '../utils/motion'
import { github, linkedin, twitter } from '../assets'
import emailjs from '@emailjs/browser'

const Contact = () => {
  const formRef = useRef<HTMLFormElement>(null)
  const [form, setForm] = useState({ name: '', email: '', message: '' })

  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ 
      ...form,
      [e.target.name]: e.target.value 
    })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    //  TODO: emailjsのセットアップ
  }

  return (
    <div className='xl:mt-12 flex gap-10 overflow-hidden'>
      <motion.div
        variants={slideIn('left', 'tween', 0.2, 1)}
        className='flex-[0.75] bg-black-100 p-8 rounded-2xl'
      >
        <p className={styles.sectionSubText}>Get in touch</p>
        <h2 className={styles.sectionHeadText}>Contact.</h2>
        <form 
          ref={formRef} 
          onSubmit={handleSubmit}
          className='mt-12 flex flex-col gap-8'
        >
          <label className='flex flex-col'>
            <span 
              className='text-white mb-4 font-medium'
            >
              氏名
            </span>
            <input 
              type="text"
              name="name" 
              id="name" 
              value={form.name} 
              onChange={handleChange} 
              placeholder='ex; あやないちゃん' 
              required 
              className='placeholder:text-secondary text-white bg-[#1F2937] rounded-lg outlined-none border-none font-medium py-4 px-6'
            />
          </label>
          <label className='flex flex-col'>
            <span 
              className='text-white mb-4 font-medium'
            >
              メールアドレス
            </span>
            <input 
              type="email"
              name="email" 
              id="name" 
              value={form.email} 
              onChange={handleChange} 
              placeholder='example@example.com' 
              required 
              className='placeholder:text-secondary text-white bg-[#1F2937] rounded-lg outlined-none border-none font-medium py-4 px-6'
            />
          </label>
          <label className='flex flex-col'>
            <span 
              className='text-white mb-4 font-medium'
            >
              メールアドレス
            </span>
            <textarea 
              rows={4}
              name="message" 
              id="message" 
              value={form.message} 
              onChange={handleChange} 
              placeholder='問い合わせ内容' 
              required 
              className='placeholder:text-secondary text-white bg-[#1F2937] rounded-lg outlined-none border-none font-medium py-4 px-6'
            />
          </label>
          <button
            type='submit'
            className='bg-[#0fffeb] py-3 px-8 outline-none w-fit text-black font-bold shadow-md shadow-primary rounded-xl'
          >
            {loading ? '送信中...' : '送信済み'}
          </button>
        </form>
      </motion.div>
      <motion.div
        variants={slideIn('right', 'tween', 0.2, 1)}
        className='xl:flex-1 xl:h-auto md:h-[550px] h-[350px]'
      >
        <EarthCanvas />
      </motion.div>
    </div>
  )
}

export default SectionWrapper(Contact, 'contact')