import { useState, useEffect } from 'react'
import './App.css'

import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Offers from './components/Offers'
import Menu from './components/Menu'
import Footer from './components/Footer'

import CustomerSignup from './AdminPages/Customer/CustomerSignUp'
import CustomerLogin from './AdminPages/Customer/CustomerLogin'

function App() {

  // Stores the selected language
  const [language, setLanguage] = useState('EN')

  // Changes the page direction when Arabic is selected
  useEffect(() => {
    document.documentElement.dir = language === 'AR' ? 'rtl' : 'ltr'
  }, [language])

  return (
    <BrowserRouter>

      {/* Navbar receives the current language */}
      <Navbar
        language={language}
        setLanguage={setLanguage}
      />

      <Routes>

        {/* Main landing page */}
        <Route
          path="/"
          element={
            <>
              <Hero language={language} />
              <Menu language={language} />
              <About language={language} />
              <Offers language={language} />
              <Footer language={language} />
            </>
          }
        />

        {/* Customer Signup page */}
        <Route
          path="/signup"
          element={<CustomerSignup language={language} />}
        />

        {/* Customer Login page */}
        <Route
          path="/login"
          element={<CustomerLogin language={language} />}
        />

      </Routes>

    </BrowserRouter>
  )
}

export default App