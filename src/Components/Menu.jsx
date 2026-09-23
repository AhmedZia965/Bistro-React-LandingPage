import '../App.css'

function Menu({ language }) {

  return (
    <section className="container py-5">

      <div className="text-center mb-5">

        <p className="sectionSubtitle">
          {language === 'EN'
            ? 'OUR MENU'
            : 'قائمتنا'}
        </p>

        <h2 className="sectionTitle">
          {language === 'EN'
            ? 'Something for Every Taste'
            : 'شيء يناسب كل ذوق'}
        </h2>

      </div>

      <div className="row g-4">

        {/* Burger */}
        <div className="col-md-4">

          <div className="menuCard">

            <img src="/Burger2.jpg" className="MenuImage" alt="Burger" />

            <div className="p-4">

              <h3>
                {language === 'EN'
                  ? 'The Signature'
                  : 'التوقيع'}
              </h3>

              <p>
                {language === 'EN'
                  ? 'A juicy signature burger prepared with fresh ingredients.'
                  : 'برجر مميز محضر من مكونات طازجة ولذيذة.'}
              </p>

              <span className="MenuPrice">
                KWD 3.750
              </span>

            </div>

          </div>

        </div>

        {/* Coffee */}
        <div className="col-md-4">

          <div className="menuCard">

            <img src="/IcedCoffee2.jpg" className="MenuImage" alt="Coffee" />

            <div className="p-4">

              <h3>
                {language === 'EN'
                  ? 'Vanilla Americano'
                  : 'أمريكانو بالفانيليا'}
              </h3>

              <p>
                {language === 'EN'
                  ? 'A smooth Americano with a touch of sweet vanilla flavor.'
                  : 'أمريكانو ناعم مع لمسة من نكهة الفانيليا الحلوة.'}
              </p>

              <span className="MenuPrice">
                KWD 1.750
              </span>

            </div>

          </div>

        </div>

        {/* Cake */}
        <div className="col-md-4">

          <div className="menuCard">

            <img src="/Cake1.jpg" className="MenuImage" alt="Cake" />

            <div className="p-4">

              <h3>
                {language === 'EN'
                  ? 'Matilda Cake'
                  : 'كيكة ماتيلدا'}
              </h3>

              <p>
                {language === 'EN'
                  ? 'A rich and delicious chocolate cake made for sweet moments.'
                  : 'كيكة شوكولاتة غنية ولذيذة للحظات الحلوة.'}
              </p>

              <span className="MenuPrice">
                KWD 2.250
              </span>

            </div>

          </div>

        </div>

      </div>

    </section>
  )
}

export default Menu