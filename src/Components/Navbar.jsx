import '../App.css'
import { Link, useLocation } from 'react-router-dom'

function Navbar({ language, setLanguage }) {

  // Gets the current URL
  const location = useLocation()

  // Checks current pages
  const isSignupPage = location.pathname === '/signup'
  const isLoginPage = location.pathname === '/login'

  return (
    <nav className="navbar navbar-expand-lg sticky-top">

      <div className="container-fluid">

        {/* Website name */}
        <Link
          className="navbar-brand"
          to="/"
        >
          {language === 'EN'
            ? 'Monarch Bistro'
            : 'مونارك بيسترو'}
        </Link>


        {/* Mobile Navbar Button */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>


        <div className="collapse navbar-collapse" id="navbarNav">

          {/* ================= LEFT SIDE ================= */}

          <ul className="navbar-nav">

            {/* Home */}
            <li className="nav-item">

              <Link
                className="nav-link"
                to="/"
              >
                {language === 'EN' ? 'Home' : 'الرئيسية'}
              </Link>

            </li>


            {/* Rewards */}
            <li className="nav-item">

              <Link
                className="nav-link"
                to="/rewards"
              >
                {language === 'EN' ? 'Rewards' : 'المكافآت'}
              </Link>

            </li>


            {/* Menu */}
            <li className="nav-item">

              <Link
                className="nav-link"
                to="/menu"
              >
                {language === 'EN' ? 'Menu' : 'القائمة'}
              </Link>

            </li>


            {/* Location */}
            <li className="nav-item">

              <a
                className="nav-link"
                href="#"
                onClick={(e) => e.preventDefault()}
              >
                {language === 'EN' ? 'Location' : 'الموقع'}
              </a>

            </li>


            {/* Feedback */}
            <li className="nav-item">

              <Link
                className="nav-link"
                to="/feedback"
              >
                {language === 'EN' ? 'Feedback' : 'التقييمات'}
              </Link>

            </li>


            {/* Profile */}
            <li className="nav-item">

              <Link
                className="nav-link"
                to="/profile"
              >
                {language === 'EN' ? 'Profile' : 'الملف الشخصي'}
              </Link>

            </li>

          </ul>


          {/* ================= RIGHT SIDE ================= */}

          <ul className="navbar-nav ms-auto">


            {/* Login Button */}
            <li className="nav-item d-flex align-items-center">

              <Link
                to="/login"
                className="Loginbtn"
                style={{
                  pointerEvents: isLoginPage ? 'none' : 'auto'
                }}
              >
                {language === 'EN'
                  ? 'Login'
                  : 'تسجيل الدخول'}
              </Link>

            </li>


            {/* Signup Button */}
            <li className="nav-item d-flex align-items-center">

              <Link
                to="/signup"
                className="Signupbtn"
                style={{
                  pointerEvents: isSignupPage ? 'none' : 'auto'
                }}
              >
                {language === 'EN'
                  ? 'Signup'
                  : 'إنشاء حساب'}
              </Link>

            </li>


            {/* Language Dropdown */}
            <li className="nav-item dropdown">

              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="languageDropdown"
                role="button"
                data-bs-toggle="dropdown"
              >

                <i className="bi bi-globe"></i>

                <span>
                  {language}
                </span>

              </a>


              <ul className="dropdown-menu">

                {/* English */}
                <li>

                  <a
                    className="dropdown-item"
                    href="#"
                    onClick={(e) => {
                      e.preventDefault()
                      setLanguage('EN')
                    }}
                  >
                    {language === 'EN'
                      ? 'English'
                      : 'الإنجليزية'}
                  </a>

                </li>


                {/* Arabic */}
                <li>

                  <a
                    className="dropdown-item"
                    href="#"
                    onClick={(e) => {
                      e.preventDefault()
                      setLanguage('AR')
                    }}
                  >
                    {language === 'EN'
                      ? 'Arabic'
                      : 'العربية'}
                  </a>

                </li>

              </ul>

            </li>

          </ul>

        </div>

      </div>

    </nav>
  )
}

export default Navbar