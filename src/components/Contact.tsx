import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { EarthCanvas } from './canvas'
import { styles } from '../styles'
import { SectionWrapper } from '../hoc'
import { slideIn } from '../utils/motion'
import emailjs from '@emailjs/browser'

// 環境変数の型安全性を確保
const {
  VITE_EMAILJS_SERVICE_ID,
  VITE_EMAILJS_TEMPLATE_ID,
  VITE_EMAILJS_PUBLIC_KEY
} = import.meta.env

const Contact = () => {
  const formRef = useRef<HTMLFormElement>(null)
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ 
      ...form,
      [e.target.name]: e.target.value 
    })
  }

  useEffect(() => {
    if (VITE_EMAILJS_PUBLIC_KEY) {
      emailjs.init(VITE_EMAILJS_PUBLIC_KEY)
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setStatus('idle')

    try {
      const result = await emailjs.sendForm(
        VITE_EMAILJS_SERVICE_ID!,
        VITE_EMAILJS_TEMPLATE_ID!,
        formRef.current!,
        VITE_EMAILJS_PUBLIC_KEY
      )
      console.log(result.text)
      setLoading(false)
      setStatus('success')
      setForm({ name: '', email: '', message: '' })
    } catch (error) {
      console.error('Failed to send email:', error)
      setLoading(false)
      setStatus('error')
    }
  }

  useEffect(() => {
    let timer: NodeJS.Timeout
    if (status !== 'idle') {
      timer = setTimeout(() => setStatus('idle'), 5000)
    }
    return () => clearTimeout(timer)
  }, [status])

  return (
    <div className='xl:mt-12 flex flex-col md:flex-row gap-10 overflow-hidden'>
      <motion.div
        variants={slideIn('left', 'tween', 0.2, 1)}
        className='flex-1 bg-black-100 p-8 rounded-2xl mx-auto w-full max-w-[550px]'
      >
        <p className={styles.sectionSubText}>Get in touch</p>
        <h2 className={styles.sectionHeadText}>Contact.</h2>
        {status === 'success' && (
          <div className="mb-4 p-4 bg-green-100 text-green-700 rounded">
            メッセージが送信されました！
          </div>
        )}
        {status === 'error' && (
          <div className="mb-4 p-4 bg-red-100 text-red-700 rounded">
            メッセージの送信に失敗しました。もう一度お試しください。
          </div>
        )}
        <form 
          ref={formRef} 
          onSubmit={handleSubmit}
          className='mt-12 flex flex-col gap-8'
        >
          <label className='flex flex-col'>
            <span className='text-white mb-4 font-medium'>氏名</span>
            <input 
              type="text"
              name="name" 
              id="name" 
              value={form.name} 
              onChange={handleChange} 
              placeholder='ex; あやないちゃん' 
              required 
              minLength={2}
              maxLength={50}
              className='placeholder:text-secondary text-white bg-[#1F2937] rounded-lg outlined-none border-none font-medium py-4 px-6'
              aria-required="true"
            />
          </label>
          <label className='flex flex-col'>
            <span className='text-white mb-4 font-medium'>メールアドレス</span>
            <input 
              type="email"
              name="email" 
              id="email" 
              value={form.email} 
              onChange={handleChange} 
              placeholder='example@example.com' 
              required 
              className='placeholder:text-secondary text-white bg-[#1F2937] rounded-lg outlined-none border-none font-medium py-4 px-6'
              aria-required="true"
            />
          </label>
          <label className='flex flex-col'>
            <span className='text-white mb-4 font-medium'>メッセージ</span>
            <textarea 
              rows={4}
              name="message" 
              id="message" 
              value={form.message} 
              onChange={handleChange} 
              placeholder='問い合わせ内容' 
              required 
              minLength={10}
              maxLength={500}
              className='placeholder:text-secondary text-white bg-[#1F2937] rounded-lg outlined-none border-none font-medium py-4 px-6'
              aria-required="true"
            />
          </label>
          <button
            type='submit'
            disabled={loading}
            className='bg-[#0fffeb] py-3 px-8 outline-none w-fit text-black font-bold shadow-md shadow-primary rounded-xl disabled:opacity-50'
          >
            {loading ? '送信中...' : '送信する'}
          </button>
        </form>
      </motion.div>
      <motion.div
        variants={slideIn('right', 'tween', 0.2, 1)}
        className='xl:flex-1 xl:h-auto md:h-[550px] h-[350px] w-full max-w-[550px] mx-auto'
      >
        <EarthCanvas />
      </motion.div>
    </div>
  )
}

export default SectionWrapper(Contact, 'contact')