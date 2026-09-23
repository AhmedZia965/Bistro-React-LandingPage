import '../App.css'

function Navbar({ language, setLanguage }) {

  return (
    <nav className="navbar navbar-expand-lg sticky-top">

      <div className="container-fluid">

        <a className="navbar-brand" href="#">
          {language === 'EN' ? 'Monarch Bistro' : 'مونارك بيسترو'}
        </a>

        <div className="collapse navbar-collapse" id="navbarNav">

          {/* Left side */}
          <ul className="navbar-nav">

            <li className="nav-item">
              <a className="nav-link" href="#">
                {language === 'EN' ? 'Home' : 'الرئيسية'}
              </a>
            </li>

            <li className="nav-item">
              <a className="nav-link" href="#">
                {language === 'EN' ? 'Rewards' : 'المكافآت'}
              </a>
            </li>

            <li className="nav-item">
              <a className="nav-link" href="#">
                {language === 'EN' ? 'Menu' : 'القائمة'}
              </a>
            </li>

            <li className="nav-item">
              <a className="nav-link" href="#">
                {language === 'EN' ? 'Location' : 'الموقع'}
              </a>
            </li>

            <li className="nav-item">
              <a className="nav-link" href="#">
                {language === 'EN' ? 'Experience' : 'التجربة'}
              </a>
            </li>

          </ul>

          {/* Right side */}
          <ul className="navbar-nav ms-auto">

            <li className="nav-item">
              <button type="button" className="Loginbtn">
                {language === 'EN' ? 'Login' : 'تسجيل الدخول'}
              </button>
            </li>

            <li className="nav-item">
              <button type="button" className="Signupbtn">
                {language === 'EN' ? 'Signup' : 'إنشاء حساب'}
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

                {/* Shows the selected language */}
                <span>{language}</span>

              </a>

              <ul className="dropdown-menu">

                <li>
                  <a
                    className="dropdown-item"
                    href="#"
                    onClick={() => setLanguage('EN')}
                  >
                    English
                  </a>
                </li>

                <li>
                  <a
                    className="dropdown-item"
                    href="#"
                    onClick={() => setLanguage('AR')}
                  >
                    Arabic
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