import '../App.css'

function Hero({ language }) {

  return (
    <div className="text-center hero">

      <img src="/Burger3.jpg" className="FirstImage" alt="Burger" />

      <div className="heroText">

        <p className="welcomeText">
          {language === 'EN' ? 'WELCOME TO' : 'مرحباً بكم'}
        </p>

        <h1>
          {language === 'EN' ? 'MONARCH BISTRO' : 'مونارك بيسترو'}
        </h1>

        <p>
          {language === 'EN'
            ? 'Where every bite feels like home.'
            : 'حيث كل لقمة تشعرك وكأنك في منزلك'}
        </p>

        <p className="heroDescription">
          {language === 'EN'
            ? 'Discover handcrafted food, rich coffee, and a place made for good moments.'
            : 'اكتشف أشهى المأكولات والقهوة الغنية وأجواءً صُممت للحظات الجميلة.'}
        </p>

        <button type="button" className="LearnMoreBtn btn btn-danger">
          {language === 'EN' ? 'Learn More' : 'اعرف المزيد'}
        </button>

        <button type="button" className="OrderBtn btn">
          {language === 'EN' ? 'Order Now' : 'اطلب الآن'}
        </button>

      </div>

      <div className="ChefSpecial">

        <span>
          {language === 'EN' ? '★ V60 BREW' : '★ قهوة V60'}
        </span>

        <br />

        <span>
          {language === 'EN' ? 'Hand-Poured Coffee' : 'قهوة محضرة يدوياً'}
        </span>

      </div>

    </div>
  )
}

export default Hero