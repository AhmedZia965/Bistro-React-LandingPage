import { createBrowserRouter, useOutletContext } from 'react-router-dom'

import App from './App.jsx'

import Hero from './components/Hero'
import Menu from './components/Menu'
import MainMenu from './components/MainMenu'
import About from './components/About'
import Offers from './components/Offers'
import Footer from './components/Footer'
import Rewards from './components/Rewards'
import LearnMore from './components/LearnMore'

import CustomerSignup from './AdminPages/Customer/CustomerSignUp'
import CustomerLogin from './AdminPages/Customer/CustomerLogin'
import CustomerFeedback from './AdminPages/Customer/CustomerFeedback'
import CustomerProfile from './AdminPages/Customer/CustomerProfile'
import ProfileManagement from './AdminPages/Customer/ProfileManagement'

import StaffLogin from './AdminPages/Staff/StaffLogin'
import StaffDashboard from './AdminPages/Staff/StaffDashboard'
import StaffMenu from './AdminPages/Staff/StaffMenu'
import StaffOrders from './AdminPages/Staff/StaffOrders'
import InventoryManagement from './AdminPages/Staff/InventoryManagement.jsx'

import AdminLogin from './AdminPages/Admin/AdminLogin'
import AdminDashboard from './AdminPages/Admin/AdminDashboard'


// Gets language and setLanguage from App
function RouteWrapper({ children }) {

  const { language, setLanguage } = useOutletContext()

  return children({ language, setLanguage })

}


// Creates the browser router
const router = createBrowserRouter([
  {
    // App controls the common layout
    path: '/',
    element: <App />,

    children: [

      // ================= CUSTOMER PAGES =================

      // Main landing page
      {
        index: true,
        element: (
          <RouteWrapper>
            {({ language, setLanguage }) => (
              <>
                <Hero language={language} />
                <Menu language={language} />
                <About language={language} />
                <Offers language={language} />
                <Footer language={language} />
              </>
            )}
          </RouteWrapper>
        )
      },


      // Rewards page
      {
        path: 'rewards',
        element: (
          <RouteWrapper>
            {({ language }) => (
              <>
                <Rewards language={language} />
                <Footer language={language} />
              </>
            )}
          </RouteWrapper>
        )
      },


      // Main Menu page
      {
        path: 'menu',
        element: (
          <RouteWrapper>
            {({ language }) => (
              <>
                <MainMenu language={language} />
                <Footer language={language} />
              </>
            )}
          </RouteWrapper>
        )
      },


      // Learn More page
      {
        path: 'learn-more',
        element: (
          <RouteWrapper>
            {({ language }) => (
              <>
                <LearnMore language={language} />
                <Footer language={language} />
              </>
            )}
          </RouteWrapper>
        )
      },


      // Customer Signup page
      {
        path: 'signup',
        element: (
          <RouteWrapper>
            {({ language }) => (
              <>
                <CustomerSignup language={language} />
                <Footer language={language} />
              </>
            )}
          </RouteWrapper>
        )
      },


      // Customer Login page
      {
        path: 'login',
        element: (
          <RouteWrapper>
            {({ language }) => (
              <>
                <CustomerLogin language={language} />
                <Footer language={language} />
              </>
            )}
          </RouteWrapper>
        )
      },


      // Customer Feedback page
      {
        path: 'feedback',
        element: (
          <RouteWrapper>
            {({ language }) => (
              <>
                <CustomerFeedback language={language} />
                <Footer language={language} />
              </>
            )}
          </RouteWrapper>
        )
      },


      // Customer Profile page
      {
        path: 'profile',
        element: (
          <RouteWrapper>
            {({ language }) => (
              <>
                <CustomerProfile language={language} />
                <Footer language={language} />
              </>
            )}
          </RouteWrapper>
        )
      },


      // Profile Management page
      {
        path: 'profile-management',
        element: (
          <RouteWrapper>
            {({ language }) => (
              <>
                <ProfileManagement language={language} />
                <Footer language={language} />
              </>
            )}
          </RouteWrapper>
        )
      },


      // ================= STAFF PAGES =================

      // Staff Login
      {
        path: 'staff-login',
        element: (
          <RouteWrapper>
            {({ language, setLanguage }) => (
              <StaffLogin
                language={language}
                setLanguage={setLanguage}
              />
            )}
          </RouteWrapper>
        )
      },


      // Staff Dashboard
      {
        path: 'staff-dashboard',
        element: (
          <RouteWrapper>
            {({ language, setLanguage }) => (
              <StaffDashboard
                language={language}
                setLanguage={setLanguage}
              />
            )}
          </RouteWrapper>
        )
      },


      // Staff Menu Management
      {
        path: 'staff-menu',
        element: (
          <RouteWrapper>
            {({ language, setLanguage }) => (
              <StaffMenu
                language={language}
                setLanguage={setLanguage}
              />
            )}
          </RouteWrapper>
        )
      },


      // Staff Orders
      {
        path: 'staff-orders',
        element: (
          <RouteWrapper>
            {({ language, setLanguage }) => (
              <StaffOrders
                language={language}
                setLanguage={setLanguage}
              />
            )}
          </RouteWrapper>
        )
      },


      // Staff Inventory Management
      {
        path: 'staff-inventory',
        element: (
          <RouteWrapper>
            {({ language, setLanguage }) => (
              <InventoryManagement
                language={language}
                setLanguage={setLanguage}
              />
            )}
          </RouteWrapper>
        )
      },


      // ================= ADMIN PAGES =================

      // Admin Login
      {
        path: 'admin-login',
        element: (
          <RouteWrapper>
            {({ language, setLanguage }) => (
              <AdminLogin
                language={language}
                setLanguage={setLanguage}
              />
            )}
          </RouteWrapper>
        )
      },


      // Admin Dashboard
      {
        path: 'admin-dashboard',
        element: (
          <RouteWrapper>
            {({ language, setLanguage }) => (
              <AdminDashboard
                language={language}
                setLanguage={setLanguage}
              />
            )}
          </RouteWrapper>
        )
      }

    ]
  }
])


export default router