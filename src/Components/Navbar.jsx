import '../App.css'
import { useNavigate, useLocation } from 'react-router-dom'

function Navbar({ language, setLanguage }) {

  const navigate = useNavigate()

  // Gets the current URL
  const location = useLocation()

  // Checks current pages
  const isSignupPage = location.pathname === '/signup'
  const isLoginPage = location.pathname === '/login'


  return (
    <nav className="navbar navbar-expand-lg sticky-top">

      <div className="container-fluid">

        {/* Website name */}
        <a
          className="navbar-brand"
          href="#"
          onClick={() => navigate('/')}
        >
          {language === 'EN'
            ? 'Monarch Bistro'
            : 'مونارك بيسترو'}
        </a>


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

              <a
                className="nav-link"
                href="#"
                onClick={() => navigate('/')}
              >
                {language === 'EN' ? 'Home' : 'الرئيسية'}
              </a>

            </li>


            {/* Rewards */}
            <li className="nav-item">

              <a
                className="nav-link"
                href="#"
                onClick={() => navigate('/rewards')}
              >
                {language === 'EN' ? 'Rewards' : 'المكافآت'}
              </a>

            </li>


            {/* Menu */}
            <li className="nav-item">

              <a
                className="nav-link"
                href="#"
                onClick={() => navigate('/menu')}
              >
                {language === 'EN' ? 'Menu' : 'القائمة'}
              </a>

            </li>


            {/* Location */}
            <li className="nav-item">

              <a
                className="nav-link"
                href="#"
              >
                {language === 'EN' ? 'Location' : 'الموقع'}
              </a>

            </li>


            {/* Feedback */}
            <li className="nav-item">

              <a
                className="nav-link"
                href="#"
                onClick={() => navigate('/feedback')}
              >
                {language === 'EN' ? 'Feedback' : 'التقييمات'}
              </a>

            </li>


            {/* Profile */}
            <li className="nav-item">

              <a
                className="nav-link"
                href="#"
                onClick={() => navigate('/profile')}
              >
                {language === 'EN' ? 'Profile' : 'الملف الشخصي'}
              </a>

            </li>

          </ul>


          {/* ================= RIGHT SIDE ================= */}

          <ul className="navbar-nav ms-auto">


            {/* Login Button */}
            <li className="nav-item">

              <button
                type="button"
                className="Loginbtn"
                disabled={isLoginPage}
                style={{
                  pointerEvents: isLoginPage ? 'none' : 'auto'
                }}
                onClick={() => {

                  if (!isLoginPage) {
                    navigate('/login')
                  }

                }}
              >
                {language === 'EN'
                  ? 'Login'
                  : 'تسجيل الدخول'}
              </button>

            </li>


            {/* Signup Button */}
            <li className="nav-item">

              <button
                type="button"
                className="Signupbtn"
                disabled={isSignupPage}
                style={{
                  pointerEvents: isSignupPage ? 'none' : 'auto'
                }}
                onClick={() => {

                  if (!isSignupPage) {
                    navigate('/signup')
                  }

                }}
              >
                {language === 'EN'
                  ? 'Signup'
                  : 'إنشاء حساب'}
              </button>

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
                    onClick={() => setLanguage('EN')}
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
                    onClick={() => setLanguage('AR')}
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