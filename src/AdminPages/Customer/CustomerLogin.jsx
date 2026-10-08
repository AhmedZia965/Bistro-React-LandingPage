import { Link } from 'react-router-dom'

function CustomerLogin({ language }) {

  // Handles demo login
  function handleLogin(event) {

    // Prevents page refresh
    event.preventDefault()

    // Accepts any phone number and password
    sessionStorage.setItem('isLoggedIn', 'true')

  }


  return (

    <>

      {/* Main login section */}
      <div className="login-page">

        {/* Bootstrap container */}
        <div className="container">

          {/* Login row */}
          <div className="row justify-content-center">

            {/* Login form */}
            <div className="col-md-6">

              {/* Login card */}
              <div className="card shadow p-4 login-card">

                {/* Login heading */}
                <h2 className="text-center mb-4">
                  {language === 'EN'
                    ? 'Customer Login'
                    : 'تسجيل دخول العميل'}
                </h2>

                {/* Login form */}
                <form onSubmit={handleLogin}>

                  {/* Phone Number */}
                  <div className="mb-3">

                    <label className="form-label">
                      {language === 'EN'
                        ? 'Phone Number'
                        : 'رقم الهاتف'}
                    </label>

                    <input
                      type="tel"
                      className="form-control"
                      placeholder={
                        language === 'EN'
                          ? 'Enter phone number'
                          : 'أدخل رقم الهاتف'
                      }
                      required
                    />

                  </div>


                  {/* Password */}
                  <div className="mb-3">

                    <label className="form-label">
                      {language === 'EN'
                        ? 'Password'
                        : 'كلمة المرور'}
                    </label>

                    <input
                      type="password"
                      className="form-control"
                      placeholder={
                        language === 'EN'
                          ? 'Enter password'
                          : 'أدخل كلمة المرور'
                      }
                      required
                    />

                  </div>


                  {/* Forgot Password */}
                  <div className="text-end mb-4">

                    <a
                      href="#"
                      className="login-link"
                      onClick={(event) => event.preventDefault()}
                    >
                      {language === 'EN'
                        ? 'Forgot Password?'
                        : 'هل نسيت كلمة المرور؟'}
                    </a>

                  </div>


                  {/* Login button */}
                  <div className="d-grid">

                    <button
                      type="submit"
                      className="btn btn-dark"
                    >
                      {language === 'EN'
                        ? 'Login'
                        : 'تسجيل الدخول'}
                    </button>

                  </div>

                </form>


                {/* Signup message */}
                <p className="text-center mt-4">

                  {language === 'EN'
                    ? "Don't have an account? "
                    : 'ليس لديك حساب؟ '}

                  <Link
                    to="/signup"
                    className="login-link"
                  >
                    {language === 'EN'
                      ? 'Sign Up'
                      : 'إنشاء حساب'}
                  </Link>

                </p>

              </div>

            </div>

          </div>

        </div>

      </div>

    </>

  )
}

export default CustomerLogin