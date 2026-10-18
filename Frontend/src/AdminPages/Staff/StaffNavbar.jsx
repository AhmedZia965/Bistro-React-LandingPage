import { useNavigate } from 'react-router-dom'

function StaffNavbar({ language, setLanguage }) {

  const navigate = useNavigate()

  return (

    <nav className="staff-navbar">

      <div className="staff-navbar-container">

        {/* Logo / Brand */}

        <div
          className="staff-navbar-brand"
          onClick={() => navigate('/staff-dashboard')}
        >
          MONARCH BISTRO
        </div>


        {/* Staff Portal */}

        <div className="staff-navbar-title">

          <i className="bi bi-person-badge me-2"></i>

          {language === 'EN'
            ? 'Staff Portal'
            : 'بوابة الموظفين'}

        </div>


        {/* Language Dropdown */}

        <div className="dropdown">

          <button
            className="staff-language-btn dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
          >

            <i className="bi bi-globe me-2"></i>

            {language}

          </button>


          <ul className="dropdown-menu">

            {/* English */}

            <li>

              <button
                className="dropdown-item"
                onClick={() => setLanguage('EN')}
              >
                English
              </button>

            </li>


            {/* Arabic */}

            <li>

              <button
                className="dropdown-item"
                onClick={() => setLanguage('AR')}
              >
                العربية
              </button>

            </li>

          </ul>

        </div>

      </div>

    </nav>
  )
}

export default StaffNavbar