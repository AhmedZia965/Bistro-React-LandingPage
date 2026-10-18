import '../App.css'

function Menu({ language }) {

  const menuItems = [
    {
      image: '/Burger2.jpg',
      alt: 'Burger',
      nameEN: 'The Signature',
      nameAR: 'التوقيع',
      descriptionEN: 'A juicy signature burger prepared with fresh ingredients.',
      descriptionAR: 'برجر مميز محضر من مكونات طازجة ولذيذة.',
      price: 'PKR 1400'
    },
    {
      image: '/IcedCoffee2.jpg',
      alt: 'Coffee',
      nameEN: 'Vanilla Americano',
      nameAR: 'أمريكانو بالفانيليا',
      descriptionEN: 'A smooth Americano with a touch of sweet vanilla flavor.',
      descriptionAR: 'أمريكانو ناعم مع لمسة من نكهة الفانيليا الحلوة.',
      price: 'PKR 650'
    },
    {
      image: '/Cake1.jpg',
      alt: 'Cake',
      nameEN: 'Matilda Cake',
      nameAR: 'كيكة ماتيلدا',
      descriptionEN: 'A rich and delicious chocolate cake made for sweet moments.',
      descriptionAR: 'كيكة شوكولاتة غنية ولذيذة للحظات الحلوة.',
      price: 'PKR 850'
    }
  ]

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

        {menuItems.map((item, index) => (

          <div className="col-md-4" key={index}>

            <div className="menuCard">

              <img
                src={item.image}
                className="MenuImage"
                alt={item.alt}
              />

              <div className="p-4">

                <h3>
                  {language === 'EN'
                    ? item.nameEN
                    : item.nameAR}
                </h3>

                <p>
                  {language === 'EN'
                    ? item.descriptionEN
                    : item.descriptionAR}
                </p>

                <span className="MenuPrice">
                  {item.price}
                </span>

              </div>

            </div>

          </div>

        ))}

      </div>

    </section>
  )
}

export default Menu