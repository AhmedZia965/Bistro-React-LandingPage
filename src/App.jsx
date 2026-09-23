import { useState, useEffect } from 'react'
import './App.css'

import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Offers from './components/Offers'
import Menu from './components/Menu'
import Footer from './components/Footer'

function App() {

  // Stores the selected language
  const [language, setLanguage] = useState('EN')

  // Changes the page direction for Arabic
  useEffect(() => {
    document.documentElement.dir = language === 'AR' ? 'rtl' : 'ltr'
  }, [language])

  return (
    <>

      {/* Navbar receives both language and setLanguage */}
      <Navbar
        language={language}
        setLanguage={setLanguage}
      />

      {/* These components only need to know the current language */}
      <Hero language={language} />

      <Menu language={language} />

      <About language={language} />

      <Offers language={language} />

      <Footer language={language} />

    </>
  )
}

export default App