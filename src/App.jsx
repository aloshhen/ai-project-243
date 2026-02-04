import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { clsx, ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

// Utility for tailwind class merging
function cn(...inputs) {
  return twMerge(clsx(inputs))
}

// SafeIcon component for Lucide icons
const SafeIcon = ({ name, size = 24, className, color }) => {
  const icons = {
    'heart': <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={{ color }}><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" /></svg>,
    'shield-check': <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={{ color }}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" /><path d="m9 12 2 2 4-4" /></svg>,
    'paw-print': <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={{ color }}><circle cx="11" cy="11" r="8" /><path d="M21 21l-4.3-4.3" /><path d="M11 11c.5 0 1-.2 1.4-.6.4-.4.6-.9.6-1.4 0-.5-.2-1-.6-1.4-.4-.4-.9-.6-1.4-.6" /></svg>,
    'star': <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={{ color }}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>,
    'phone': <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={{ color }}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>,
    'mail': <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={{ color }}><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>,
    'map-pin': <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={{ color }}><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></svg>,
    'chevron-left': <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={{ color }}><path d="m15 18-6-6 6-6" /></svg>,
    'chevron-right': <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={{ color }}><path d="m9 18 6-6-6-6" /></svg>,
    'menu': <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={{ color }}><line x1="4" x2="20" y1="12" y2="12" /><line x1="4" x2="20" y1="6" y2="6" /><line x1="4" x2="20" y1="18" y2="18" /></svg>,
    'x': <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={{ color }}><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>,
    'send': <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={{ color }}><path d="m22 2-7 20-4-9-9-4 20-7z" /><path d="M22 2 11 13" /></svg>,
    'check-circle': <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={{ color }}><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><path d="m9 11 3 3L22 4" /></svg>,
    'clock': <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={{ color }}><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>,
    'calendar': <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={{ color }}><rect width="18" height="18" x="3" y="4" rx="2" ry="2" /><line x1="16" x2="16" y1="2" y2="6" /><line x1="8" x2="8" y1="2" y2="6" /><line x1="3" x2="21" y1="10" y2="10" /></svg>,
    'award': <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={{ color }}><circle cx="12" cy="8" r="7" /><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" /></svg>,
    'home': <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={{ color }}><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>,
    'info': <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={{ color }}><circle cx="12" cy="12" r="10" /><path d="M12 16v-4" /><path d="M12 8h.01" /></svg>,
    'message-circle': <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={{ color }}><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" /></svg>,
  }
  
  return icons[name] || icons['info']
}

// Web3Forms Hook
const useFormHandler = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [isError, setIsError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  
  const handleSubmit = async (e, accessKey) => {
    e.preventDefault()
    setIsSubmitting(true)
    setIsError(false)
    
    const formData = new FormData(e.target)
    formData.append('access_key', accessKey)
    
    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData
      })
      
      const data = await response.json()
      
      if (data.success) {
        setIsSuccess(true)
        e.target.reset()
      } else {
        setIsError(true)
        setErrorMessage(data.message || 'Что-то пошло не так')
      }
    } catch (error) {
      setIsError(true)
      setErrorMessage('Ошибка сети. Пожалуйста, попробуйте еще раз.')
    } finally {
      setIsSubmitting(false)
    }
  }
  
  const resetForm = () => {
    setIsSuccess(false)
    setIsError(false)
    setErrorMessage('')
  }
  
  return { isSubmitting, isSuccess, isError, errorMessage, handleSubmit, resetForm }
}

// Animated Section Component
const AnimatedSection = ({ children, className, delay = 0 }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// Gallery Slider Component
const GallerySlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const images = [
    { url: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800&q=80', alt: 'Белый щенок японского шпица' },
    { url: 'https://images.unsplash.com/photo-1601979031925-424e53b6caaa?w=800&q=80', alt: 'Японский шпиц играет' },
    { url: 'https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?w=800&q=80', alt: 'Щенок на траве' },
    { url: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=800&q=80', alt: 'Японский шпиц на улице' },
    { url: 'https://images.unsplash.com/photo-1596492784531-6e6eb5ea9993?w=800&q=80', alt: 'Два щенка вместе' },
  ]
  
  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length)
  }
  
  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
  }
  
  return (
    <div className="relative w-full max-w-5xl mx-auto">
      <div className="relative overflow-hidden rounded-3xl shadow-2xl aspect-[16/10] bg-slate-100">
        <AnimatePresence mode="wait">
          <motion.img
            key={currentIndex}
            src={images[currentIndex].url}
            alt={images[currentIndex].alt}
            className="absolute inset-0 w-full h-full object-cover"
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          />
        </AnimatePresence>
        
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        
        {/* Navigation buttons */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 hover:bg-white text-slate-800 rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110"
          aria-label="Предыдущее фото"
        >
          <SafeIcon name="chevron-left" size={24} />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 hover:bg-white text-slate-800 rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110"
          aria-label="Следующее фото"
        >
          <SafeIcon name="chevron-right" size={24} />
        </button>
        
        {/* Dots indicator */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {images.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={cn(
                "w-3 h-3 rounded-full transition-all",
                idx === currentIndex ? "bg-white w-8" : "bg-white/50 hover:bg-white/80"
              )}
              aria-label={`Перейти к фото ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

// Contact Form Component
const ContactForm = () => {
  const { isSubmitting, isSuccess, isError, errorMessage, handleSubmit, resetForm } = useFormHandler()
  const ACCESS_KEY = 'YOUR_WEB3FORMS_ACCESS_KEY' // Замените на ваш ключ с https://web3forms.com
  
  return (
    <div className="relative bg-white rounded-3xl shadow-xl p-8 md:p-12">
      <AnimatePresence mode="wait">
        {!isSuccess ? (
          <motion.form
            key="form"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            onSubmit={(e) => handleSubmit(e, ACCESS_KEY)}
            className="space-y-6"
          >
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Ваше имя</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Иван Иванов"
                  required
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Телефон</label>
                <input
                  type="tel"
                  name="phone"
                  placeholder="+7 (999) 123-45-67"
                  required
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Email</label>
              <input
                type="email"
                name="email"
                placeholder="email@example.com"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Сообщение</label>
              <textarea
                name="message"
                placeholder="Расскажите о себе и какой щенок вас интересует..."
                rows={4}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all resize-none"
              ></textarea>
            </div>
            
            {isError && (
              <div className="text-red-500 text-sm bg-red-50 p-3 rounded-lg">
                {errorMessage}
              </div>
            )}
            
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-400 disabled:cursor-not-allowed text-white px-8 py-4 rounded-xl font-bold text-lg transition-all transform hover:scale-[1.02] disabled:transform-none flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Отправка...
                </>
              ) : (
                <>
                  <SafeIcon name="send" size={20} />
                  Отправить заявку
                </>
              )}
            </button>
            
            <p className="text-xs text-slate-500 text-center">
              Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
            </p>
          </motion.form>
        ) : (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.4, type: "spring" }}
            className="text-center py-12"
          >
            <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <SafeIcon name="check-circle" size={40} className="text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-slate-800 mb-4">
              Заявка отправлена!
            </h3>
            <p className="text-slate-600 mb-8 max-w-md mx-auto">
              Спасибо за обращение! Мы свяжемся с вами в ближайшее время для обсуждения деталей.
            </p>
            <button
              onClick={resetForm}
              className="text-blue-600 hover:text-blue-700 font-semibold transition-colors"
            >
              Отправить еще одну заявку
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// Main App Component
function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  
  const scrollToSection = (id) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setIsMobileMenuOpen(false)
    }
  }
  
  const navLinks = [
    { id: 'about', label: 'О породе' },
    { id: 'gallery', label: 'Галерея' },
    { id: 'advantages', label: 'Преимущества' },
    { id: 'reviews', label: 'Отзывы' },
    { id: 'contacts', label: 'Контакты' },
  ]
  
  return (
    <div className="min-h-screen bg-slate-50 overflow-x-hidden">
      {/* Header */}
      <header className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled ? "bg-white/95 backdrop-blur-md shadow-lg py-3" : "bg-transparent py-5"
      )}>
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a href="#" className="flex items-center gap-2 group">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center transform group-hover:rotate-12 transition-transform">
                <SafeIcon name="paw-print" size={24} className="text-white" />
              </div>
              <div className="hidden sm:block">
                <span className={cn(
                  "text-xl font-bold transition-colors",
                  isScrolled ? "text-slate-800" : "text-slate-800 md:text-slate-800"
                )}>SpitzLand</span>
                <span className="block text-xs text-slate-500">Питомник шпицев</span>
              </div>
            </a>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-blue-600",
                    isScrolled ? "text-slate-600" : "text-slate-700"
                  )}
                >
                  {link.label}
                </button>
              ))}
            </nav>
            
            {/* CTA Button */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => scrollToSection('order')}
                className="hidden sm:flex bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-full font-semibold text-sm transition-all hover:scale-105 shadow-lg shadow-blue-600/30"
              >
                Заказать щенка
              </button>
              
              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden w-10 h-10 flex items-center justify-center text-slate-700"
                aria-label="Toggle menu"
              >
                <SafeIcon name={isMobileMenuOpen ? "x" : "menu"} size={24} />
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-t border-slate-100"
            >
              <nav className="flex flex-col p-4 gap-2">
                {navLinks.map((link) => (
                  <button
                    key={link.id}
                    onClick={() => scrollToSection(link.id)}
                    className="text-left px-4 py-3 text-slate-700 font-medium hover:bg-slate-50 rounded-lg transition-colors"
                  >
                    {link.label}
                  </button>
                ))}
                <button
                  onClick={() => scrollToSection('order')}
                  className="mt-2 bg-blue-600 text-white px-4 py-3 rounded-lg font-semibold text-center"
                >
                  Заказать щенка
                </button>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-slate-50" />
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-blue-100/50 to-transparent" />
        
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                <SafeIcon name="award" size={16} />
                <span>Премиум питомник</span>
              </div>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-slate-900 leading-tight mb-6">
                Японский <br />
                <span className="text-blue-600">Шпиц</span>
              </h1>
              <p className="text-lg md:text-xl text-slate-600 mb-8 leading-relaxed max-w-lg">
                Здоровые, привитые щенки с родословной от проверенного заводчика. 
                Идеальные компаньоны для семьи с детьми.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => scrollToSection('order')}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all hover:scale-105 shadow-xl shadow-blue-600/30 flex items-center justify-center gap-2"
                >
                  <SafeIcon name="paw-print" size={20} />
                  Выбрать щенка
                </button>
                <button
                  onClick={() => scrollToSection('gallery')}
                  className="bg-white hover:bg-slate-50 text-slate-800 border-2 border-slate-200 px-8 py-4 rounded-xl font-bold text-lg transition-all hover:border-blue-300 flex items-center justify-center gap-2"
                >
                  <SafeIcon name="heart" size={20} />
                  Посмотреть фото
                </button>
              </div>
              
              {/* Stats */}
              <div className="flex gap-8 mt-12 pt-8 border-t border-slate-200">
                <div>
                  <div className="text-3xl font-black text-slate-900">500+</div>
                  <div className="text-sm text-slate-500">Счастливых семей</div>
                </div>
                <div>
                  <div className="text-3xl font-black text-slate-900">8 лет</div>
                  <div className="text-sm text-slate-500">Опыта разведения</div>
                </div>
                <div>
                  <div className="text-3xl font-black text-slate-900">100%</div>
                  <div className="text-sm text-slate-500">Здоровые щенки</div>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative aspect-square max-w-lg mx-auto">
                <div className="absolute inset-0 bg-blue-600 rounded-full opacity-10 blur-3xl transform scale-110" />
                <img
                  src="https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800&q=80"
                  alt="Японский шпиц"
                  className="relative z-10 w-full h-full object-cover rounded-3xl shadow-2xl"
                />
                {/* Floating cards */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute -left-4 md:-left-8 top-1/4 bg-white p-4 rounded-2xl shadow-xl z-20"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <SafeIcon name="shield-check" size={20} className="text-green-600" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-slate-800">Вакцинированы</div>
                      <div className="text-xs text-slate-500">Полный курс</div>
                    </div>
                  </div>
                </motion.div>
                
                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                  className="absolute -right-4 md:-right-8 bottom-1/4 bg-white p-4 rounded-2xl shadow-xl z-20"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
                      <SafeIcon name="star" size={20} className="text-amber-600" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-slate-800">5.0 Рейтинг</div>
                      <div className="text-xs text-slate-500">200+ отзывов</div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Breed Section */}
      <section id="about" className="py-20 md:py-32 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <AnimatedSection>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="inline-block text-blue-600 font-semibold text-sm uppercase tracking-wider mb-4">О породе</span>
              <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-6">
                Почему именно <span className="text-blue-600">Японский шпиц?</span>
              </h2>
              <p className="text-lg text-slate-600">
                Эта порода завоевала сердца миллионов людей по всему миру благодаря своему 
                неповторимому обаянию и дружелюбному характеру.
              </p>
            </div>
          </AnimatedSection>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: 'heart',
                title: 'Верный друг',
                desc: 'Японские шпицы очень привязываются к хозяину и становятся настоящими членами семьи.',
                color: 'rose'
              },
              {
                icon: 'shield-check',
                title: 'Гипоаллергенны',
                desc: 'Подходят людям с аллергией благодаря особой структуре шерсти без подшерстка.',
                color: 'green'
              },
              {
                icon: 'paw-print',
                title: 'Умный и послушный',
                desc: 'Легко поддаются дрессировке, быстро учатся командам и правилам поведения.',
                color: 'blue'
              },
              {
                icon: 'home',
                title: 'Компактный размер',
                desc: 'Взрослая собака весит 5-10 кг — идеально для квартиры или дома.',
                color: 'amber'
              }
            ].map((feature, idx) => (
              <AnimatedSection key={idx} delay={idx * 0.1}>
                <div className="group bg-slate-50 hover:bg-white p-8 rounded-3xl border border-slate-100 hover:border-slate-200 transition-all hover:shadow-xl hover:-translate-y-2">
                  <div className={cn(
                    "w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110",
                    feature.color === 'rose' && "bg-rose-100",
                    feature.color === 'green' && "bg-green-100",
                    feature.color === 'blue' && "bg-blue-100",
                    feature.color === 'amber' && "bg-amber-100"
                  )}>
                    <SafeIcon 
                      name={feature.icon} 
                      size={28} 
                      className={cn(
                        feature.color === 'rose' && "text-rose-600",
                        feature.color === 'green' && "text-green-600",
                        feature.color === 'blue' && "text-blue-600",
                        feature.color === 'amber' && "text-amber-600"
                      )}
                    />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{feature.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-20 md:py-32 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6">
          <AnimatedSection>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="inline-block text-blue-600 font-semibold text-sm uppercase tracking-wider mb-4">Галерея</span>
              <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-6">
                Наши пушистые <span className="text-blue-600">красавцы</span>
              </h2>
              <p className="text-lg text-slate-600">
                Каждый щенок уникален и найдет своего любящего хозяина. 
                Свяжитесь с нами, чтобы узнать о доступных щенках.
              </p>
            </div>
          </AnimatedSection>
          
          <AnimatedSection delay={0.2}>
            <GallerySlider />
          </AnimatedSection>
          
          {/* Thumbnail grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 max-w-5xl mx-auto">
            {[
              'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&q=80',
              'https://images.unsplash.com/photo-1601979031925-424e53b6caaa?w=400&q=80',
              'https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?w=400&q=80',
              'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=400&q=80'
            ].map((url, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.05 }}
                className="relative aspect-square rounded-2xl overflow-hidden cursor-pointer group"
              >
                <img src={url} alt={`Щенок ${idx + 1}`} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Advantages Section */}
      <section id="advantages" className="py-20 md:py-32 bg-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-50 -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-slate-100 rounded-full blur-3xl opacity-50 translate-x-1/2 translate-y-1/2" />
        
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection>
              <div className="relative">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <img 
                      src="https://images.unsplash.com/photo-1596492784531-6e6eb5ea9993?w=400&q=80" 
                      alt="Щенки японского шпица" 
                      className="rounded-2xl shadow-lg w-full h-48 object-cover"
                    />
                    <img 
                      src="https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=400&q=80" 
                      alt="Японский шпиц на прогулке" 
                      className="rounded-2xl shadow-lg w-full h-64 object-cover"
                    />
                  </div>
                  <div className="space-y-4 pt-8">
                    <img 
                      src="https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?w=400&q=80" 
                      alt="Белый щенок" 
                      className="rounded-2xl shadow-lg w-full h-64 object-cover"
                    />
                    <img 
                      src="https://images.unsplash.com/photo-1601979031925-424e53b6caaa?w=400&q=80" 
                      alt="Шпиц в снегу" 
                      className="rounded-2xl shadow-lg w-full h-48 object-cover"
                    />
                  </div>
                </div>
              </div>
            </AnimatedSection>
            
            <AnimatedSection delay={0.2}>
              <span className="inline-block text-blue-600 font-semibold text-sm uppercase tracking-wider mb-4">Наши преимущества</span>
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-6">
                Почему выбирают <span className="text-blue-600">наш питомник?</span>
              </h2>
              <p className="text-lg text-slate-600 mb-8">
                Мы — не просто заводчики, мы создаем семьи. Каждый щенок получает максимум 
                внимания, любви и заботы с первых дней жизни.
              </p>
              
              <div className="space-y-6">
                {[
                  { icon: 'shield-check', title: 'Гарантия здоровья', desc: 'Все щенки проходят ветеринарный контроль и имеют прививки' },
                  { icon: 'award', title: 'Родословная РКФ', desc: 'Полный пакет документов для участия в выставках и разведения' },
                  { icon: 'heart', title: 'Поддержка 24/7', desc: 'Консультируем по уходу и воспитанию на протяжении всей жизни питомца' },
                  { icon: 'map-pin', title: 'Доставка по России', desc: 'Безопасная транспортировка в любой город страны' }
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <SafeIcon name={item.icon} size={24} className="text-blue-600" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-slate-900 mb-1">{item.title}</h4>
                      <p className="text-slate-600">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section id="reviews" className="py-20 md:py-32 bg-slate-900 text-white">
        <div className="container mx-auto px-4 md:px-6">
          <AnimatedSection>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="inline-block text-blue-400 font-semibold text-sm uppercase tracking-wider mb-4">Отзывы</span>
              <h2 className="text-3xl md:text-5xl font-black mb-6">
                Что говорят <span className="text-blue-400">наши клиенты</span>
              </h2>
              <p className="text-lg text-slate-400">
                Более 500 семей уже обрели верного друга благодаря нашему питомнику
              </p>
            </div>
          </AnimatedSection>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: 'Анна М.',
                location: 'Москва',
                text: 'Наш Бенни — лучшее, что случилось с нашей семьей! Щенок приехал здоровым, приученным к пеленке. Заводчик всегда на связи и помогает советами.',
                rating: 5,
                image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80'
              },
              {
                name: 'Сергей К.',
                location: 'Санкт-Петербург',
                text: 'Брал щенка для дочери. Остался в полном восторге от профессионализма питомника. Документы, прививки — всё в порядке. Собака умная и послушная!',
                rating: 5,
                image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80'
              },
              {
                name: 'Мария Д.',
                location: 'Казань',
                text: 'Очень переживала за доставку, но всё прошло отлично. Щенок приехал отдохнувшим и веселым. Уже полгода вместе и ни разу не пожалели!',
                rating: 5,
                image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80'
              }
            ].map((review, idx) => (
              <AnimatedSection key={idx} delay={idx * 0.1}>
                <div className="bg-slate-800 p-8 rounded-3xl border border-slate-700 hover:border-blue-500/50 transition-all hover:-translate-y-2">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(review.rating)].map((_, i) => (
                      <SafeIcon key={i} name="star" size={16} className="text-amber-400 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-slate-300 mb-6 leading-relaxed">"{review.text}"</p>
                  <div className="flex items-center gap-4">
                    <img src={review.image} alt={review.name} className="w-12 h-12 rounded-full object-cover" />
                    <div>
                      <div className="font-bold text-white">{review.name}</div>
                      <div className="text-sm text-slate-500">{review.location}</div>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Order Form Section */}
      <section id="order" className="py-20 md:py-32 bg-gradient-to-br from-blue-50 to-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
            <AnimatedSection>
              <span className="inline-block text-blue-600 font-semibold text-sm uppercase tracking-wider mb-4">Заказать щенка</span>
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-6">
                Готовы обрести <span className="text-blue-600">верного друга?</span>
              </h2>
              <p className="text-lg text-slate-600 mb-8">
                Заполните форму, и мы свяжемся с вами в течение часа. 
                Расскажем о доступных щенках, ответим на вопросы и поможем с выбором.
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3">
                  <SafeIcon name="phone" size={20} className="text-blue-600" />
                  <span className="text-slate-700">+7 (999) 123-45-67</span>
                </div>
                <div className="flex items-center gap-3">
                  <SafeIcon name="mail" size={20} className="text-blue-600" />
                  <span className="text-slate-700">info@spitzland.ru</span>
                </div>
                <div className="flex items-center gap-3">
                  <SafeIcon name="clock" size={20} className="text-blue-600" />
                  <span className="text-slate-700">Ежедневно с 9:00 до 21:00</span>
                </div>
              </div>
              
              <div className="bg-blue-600 text-white p-6 rounded-2xl">
                <h4 className="font-bold mb-2">Специальное предложение!</h4>
                <p className="text-blue-100 text-sm mb-4">
                  При бронировании щенка до конца месяца — доставка бесплатно!
                </p>
                <div className="flex items-center gap-2 text-sm">
                  <SafeIcon name="calendar" size={16} />
                  <span>Акция действует до 31 декабря</span>
                </div>
              </div>
            </AnimatedSection>
            
            <AnimatedSection delay={0.2}>
              <ContactForm />
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Contacts Section */}
      <section id="contacts" className="py-20 bg-white border-t border-slate-100">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl font-black text-slate-900 mb-8">Контакты</h2>
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 text-slate-600">
            <a href="tel:+79991234567" className="flex items-center gap-2 hover:text-blue-600 transition-colors">
              <SafeIcon name="phone" size={20} />
              <span>+7 (999) 123-45-67</span>
            </a>
            <a href="mailto:info@spitzland.ru" className="flex items-center gap-2 hover:text-blue-600 transition-colors">
              <SafeIcon name="mail" size={20} />
              <span>info@spitzland.ru</span>
            </a>
            <div className="flex items-center gap-2">
              <SafeIcon name="map-pin" size={20} />
              <span>г. Москва, ул. Пушистая, 15</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <SafeIcon name="paw-print" size={18} className="text-white" />
                </div>
                <span className="text-xl font-bold text-white">SpitzLand</span>
              </div>
              <p className="text-sm">
                Премиум питомник японских шпицев. 
                Здоровые щенки с документами для любящих семей.
              </p>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Разделы</h4>
              <nav className="space-y-2 text-sm">
                <button onClick={() => scrollToSection('about')} className="block hover:text-white transition-colors">О породе</button>
                <button onClick={() => scrollToSection('gallery')} className="block hover:text-white transition-colors">Галерея</button>
                <button onClick={() => scrollToSection('advantages')} className="block hover:text-white transition-colors">Преимущества</button>
              </nav>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Информация</h4>
              <nav className="space-y-2 text-sm">
                <button onClick={() => scrollToSection('reviews')} className="block hover:text-white transition-colors">Отзывы</button>
                <button onClick={() => scrollToSection('order')} className="block hover:text-white transition-colors">Заказать</button>
                <button onClick={() => scrollToSection('contacts')} className="block hover:text-white transition-colors">Контакты</button>
              </nav>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Связь</h4>
              <div className="space-y-2 text-sm">
                <p>+7 (999) 123-45-67</p>
                <p>info@spitzland.ru</p>
                <p>Ежедневно 9:00-21:00</p>
              </div>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-8 text-center text-sm">
            <p>© 2024 SpitzLand. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App