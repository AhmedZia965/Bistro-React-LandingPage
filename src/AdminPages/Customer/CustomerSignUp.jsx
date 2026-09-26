import Footer from '../../components/Footer'

function CustomerSignup({ language }) {

  return (

    <>

      {/* Main signup section */}
      <div className="signup-page">

        {/* Bootstrap container */}
        <div className="container">

          {/* Signup row */}
          <div className="row justify-content-center align-items-stretch">

            {/* Left side - Signup form */}
            <div className="col-md-6">

              {/* Signup card */}
              <div className="card shadow p-4 signup-card">

                {/* Signup heading */}
                <h2 className="text-center mb-4">
                  {language === 'EN'
                    ? 'Create Customer Account'
                    : 'إنشاء حساب عميل'}
                </h2>

                {/* Signup form */}
                <form>

                  {/* First and Last Name */}
                  <div className="row">

                    {/* First Name */}
                    <div className="col-md-6 mb-3">
                      <label className="form-label">
                        {language === 'EN'
                          ? 'First Name'
                          : 'الاسم الأول'}
                      </label>

                      <input
                        type="text"
                        className="form-control"
                        placeholder={
                          language === 'EN'
                            ? 'Enter first name'
                            : 'أدخل الاسم الأول'
                        }
                      />
                    </div>

                    {/* Last Name */}
                    <div className="col-md-6 mb-3">
                      <label className="form-label">
                        {language === 'EN'
                          ? 'Last Name'
                          : 'اسم العائلة'}
                      </label>

                      <input
                        type="text"
                        className="form-control"
                        placeholder={
                          language === 'EN'
                            ? 'Enter last name'
                            : 'أدخل اسم العائلة'
                        }
                      />
                    </div>

                  </div>

                  {/* Email */}
                  <div className="mb-3">
                    <label className="form-label">
                      {language === 'EN'
                        ? 'Email'
                        : 'البريد الإلكتروني'}
                    </label>

                    <input
                      type="email"
                      className="form-control"
                      placeholder={
                        language === 'EN'
                          ? 'Enter email'
                          : 'أدخل البريد الإلكتروني'
                      }
                    />
                  </div>

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
                    />
                  </div>

                  {/* Confirm Password */}
                  <div className="mb-4">
                    <label className="form-label">
                      {language === 'EN'
                        ? 'Confirm Password'
                        : 'تأكيد كلمة المرور'}
                    </label>

                    <input
                      type="password"
                      className="form-control"
                      placeholder={
                        language === 'EN'
                          ? 'Confirm password'
                          : 'أكد كلمة المرور'
                      }
                    />
                  </div>

                  {/* Create Account button */}
                  <div className="d-grid">
                    <button
                      type="submit"
                      className="btn btn-dark"
                    >
                      {language === 'EN'
                        ? 'Create Account'
                        : 'إنشاء الحساب'}
                    </button>
                  </div>

                </form>

              </div>

            </div>


            {/* Right side - Signup image */}
            <div className="col-md-6">

              <img
                src="/Iced.jpg"
                className="img-fluid signup-image"
                alt="Signup"
              />

            </div>

          </div>

        </div>

      </div>


      {/* Existing Footer component receives the selected language */}
      <Footer language={language} />

    </>

  )
}

export default CustomerSignup