import '../App.css'

function Footer({ language }) {

  return (
    <footer className="bg-dark pt-5 pb-4">

      <div className="container text-center text-md-start">

        <div className="row">

          <div className="col-md-4">

            <h5>
              {language === 'EN'
                ? 'Monarch Bistro'
                : 'مونارك بيسترو'}
            </h5>

            <p>
              {language === 'EN'
                ? 'Good food, good coffee, and a good atmosphere.'
                : 'طعام لذيذ، قهوة رائعة، وأجواء مميزة.'}
            </p>

          </div>

          <div className="col-md-4 MenuLinks">

            <h5>
              {language === 'EN'
                ? 'Quick Links'
                : 'روابط سريعة'}
            </h5>

            <p>
              <a href="#" className="text-light text-decoration-none">
                {language === 'EN' ? 'Home' : 'الرئيسية'}
              </a>
            </p>

            <p>
              <a href="#" className="text-light text-decoration-none">
                {language === 'EN' ? 'Rewards' : 'المكافآت'}
              </a>
            </p>

            <p>
              <a href="#" className="text-light text-decoration-none">
                {language === 'EN' ? 'Login' : 'تسجيل الدخول'}
              </a>
            </p>

            <p>
              <a href="#" className="text-light text-decoration-none">
                {language === 'EN' ? 'Signup' : 'إنشاء حساب'}
              </a>
            </p>

          </div>

          <div className="col-md-4 CafeLinks">

            <h5>
              {language === 'EN'
                ? 'Contact'
                : 'تواصل معنا'}
            </h5>

            <p>
              {language === 'EN'
                ? '📍 Abbottabad'
                : '📍 أبوت آباد'}
            </p>

            <p>
              📞 +92 XXX XXXXXXX
            </p>

            <p>
              ✉️ info@monarchbistro.com
            </p>

          </div>

        </div>

        <hr />

        <div className="text-center">

          <p className="mb-0">
            {language === 'EN'
              ? '© 2026 Monarch Bistro. All Rights Reserved.'
              : '© 2026 مونارك بيسترو. جميع الحقوق محفوظة.'}
          </p>

        </div>

      </div>

    </footer>
  )
}

export default Footer