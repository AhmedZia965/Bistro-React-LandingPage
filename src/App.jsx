import { useState, useEffect } from 'react'
import './App.css'
import './Components/Component.css'
import './AdminPages/Customer/Customer.css'
import './AdminPages/Staff/Staff.css'

import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'

import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Offers from './components/Offers'
import Menu from './components/Menu'
import MainMenu from './components/MainMenu'
import Footer from './components/Footer'
import Rewards from './components/Rewards'

import CustomerSignup from './AdminPages/Customer/CustomerSignUp'
import CustomerLogin from './AdminPages/Customer/CustomerLogin'
import CustomerFeedback from './AdminPages/Customer/CustomerFeedback'
import CustomerProfile from './AdminPages/Customer/CustomerProfile'

import StaffLogin from './AdminPages/Staff/StaffLogin'
import StaffDashboard from './AdminPages/Staff/StaffDashboard'
import StaffMenu from './AdminPages/Staff/StaffMenu'
import CustFeedBacks from './AdminPages/Staff/CustFeedBacks'


function App() {

  // Stores the selected language
  const [language, setLanguage] = useState('EN')

  // Changes the page direction when Arabic is selected
  useEffect(() => {
    document.documentElement.dir = language === 'AR' ? 'rtl' : 'ltr'
  }, [language])

  return (

    <BrowserRouter>

      <AppContent
        language={language}
        setLanguage={setLanguage}
      />

    </BrowserRouter>
  )
}


function AppContent({ language, setLanguage }) {

  const location = useLocation()

  // Checks if the current page is a staff page
  const isStaffPage =
    location.pathname === '/staff-login' ||
    location.pathname === '/staff-dashboard' ||
    location.pathname === '/staff-menu' ||
    location.pathname === '/staff-feedback'


  return (

    <>

      {/* Customer Navbar is hidden on Staff pages */}

      {!isStaffPage && (

        <Navbar
          language={language}
          setLanguage={setLanguage}
        />

      )}


      <Routes>


        {/* ================= CUSTOMER PAGES ================= */}

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


        {/* Rewards page */}

        <Route
          path="/rewards"
          element={
            <>
              <Rewards language={language} />
              <Footer language={language} />
            </>
          }
        />


        {/* Main Menu page */}

        <Route
          path="/menu"
          element={
            <>
              <MainMenu language={language} />
              <Footer language={language} />
            </>
          }
        />


        {/* Customer Signup page */}

        <Route
          path="/signup"
          element={
            <>
              <CustomerSignup language={language} />
              <Footer language={language} />
            </>
          }
        />


        {/* Customer Login page */}

        <Route
          path="/login"
          element={
            <>
              <CustomerLogin language={language} />
              <Footer language={language} />
            </>
          }
        />


        {/* Customer Feedback page */}

        <Route
          path="/feedback"
          element={
            <>
              <CustomerFeedback language={language} />
              <Footer language={language} />
            </>
          }
        />


        {/* Customer Profile page */}

        <Route
          path="/profile"
          element={
            <>
              <CustomerProfile language={language} />
            </>
          }
        />


        {/* ================= STAFF PAGES ================= */}

        {/* Staff Login */}

        <Route
          path="/staff-login"
          element={
            <>
              <StaffLogin
                language={language}
                setLanguage={setLanguage}
              />
            </>
          }
        />


        {/* Staff Dashboard */}

        <Route
          path="/staff-dashboard"
          element={
            <>
              <StaffDashboard
                language={language}
                setLanguage={setLanguage}
              />
            </>
          }
        />


        {/* Staff Menu Management */}

        <Route
          path="/staff-menu"
          element={
            <>
              <StaffMenu
                language={language}
                setLanguage={setLanguage}
              />
            </>
          }
        />


        {/* Staff Customer Feedback */}

        <Route
          path="/staff-feedback"
          element={
            <>
              <CustFeedBacks
                language={language}
                setLanguage={setLanguage}
              />
            </>
          }
        />

      </Routes>

    </>
  )
}


export default App