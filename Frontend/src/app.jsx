import { useState, useEffect } from 'react'

import './App.css'
import './Components/Component.css'
import './AdminPages/Customer/Customer.css'
import './AdminPages/Staff/Staff.css'
import './AdminPages/Admin/Admin.css'

import { Outlet, useLocation } from 'react-router-dom'

import Navbar from './components/Navbar'
import LoadingDelay from './components/LoadingDelay'


function App() {

  // Stores the selected language
  const [language, setLanguage] = useState('EN')

  // Controls whether the loading screen is shown
  const [loading, setLoading] = useState(true)

  // Changes the page direction when Arabic is selected
  useEffect(() => {
    document.documentElement.dir = language === 'AR' ? 'rtl' : 'ltr'
  }, [language])

  // Shows the loading screen for 2 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  // Shows Loading Screen first
  if (loading) {
    return <LoadingDelay />
  }

  return (
    <AppLayout
      language={language}
      setLanguage={setLanguage}
    />
  )
}


// Controls the common layout of the application
function AppLayout({ language, setLanguage }) {

  // Gets the current URL
  const location = useLocation()

  // Checks if current page is Staff or Admin
  const isStaffOrAdminPage =
    location.pathname.startsWith('/staff') ||
    location.pathname.startsWith('/admin') ||
    location.pathname === '/customer-management' ||
    location.pathname === '/offers-management'

  return (
    <>
      {/* Customer Navbar is hidden on Staff and Admin pages */}

      {!isStaffOrAdminPage && (
        <Navbar
          language={language}
          setLanguage={setLanguage}
        />
      )}

      {/* Sends language and setLanguage to the current route */}
      <Outlet context={{ language, setLanguage }} />
    </>
  )
}


export default App