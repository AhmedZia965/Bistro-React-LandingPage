
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getMenuAxiosFunction } from '../Services/MenuApi'
import './MainMenu.css'

function MainMenu({ language }) {
  const [category, setCategory] = useState('Burgers')
  const [menuItems, setMenuItems] = useState([])
  const [cartCount, setCartCount] = useState(() => {
    const savedCart = JSON.parse(sessionStorage.getItem('cartItems') || '[]')

    return savedCart.reduce((total, item) => total + item.quantity, 0)
  })

  const navigate = useNavigate()

  const categories = [
    'Burgers',
    'Pizzas',
    'Pastas',
    'Cakes & Desserts',
    'Coffees',
    'Other Drinks',
    'Sandwiches',
    'Sides',
    'Salads'
  ]

  useEffect(() => {
    getMenuAxiosFunction()
      .then((response) => {
        setMenuItems(response.data.menu)
      })
      .catch((error) => {
        console.log('Error getting menu items:', error)
      })
  }, [])

  function getCustomerCategory(itemCategory) {
    if (itemCategory === 'Desserts') {
      return 'Cakes & Desserts'
    }

    if (itemCategory === 'Coffee') {
      return 'Coffees'
    }

    if (itemCategory === 'Drinks') {
      return 'Other Drinks'
    }

    return itemCategory
  }

  function addToCart(item) {
    if (!item.available) {
      return
    }

    const savedCart = JSON.parse(sessionStorage.getItem('cartItems') || '[]')

    const existingItem = savedCart.find(
      cartItem => cartItem._id === item._id
    )

    if (existingItem) {
      existingItem.quantity += 1
    } else {
      savedCart.push({
        _id: item._id,
        name: item.name,
        price: Number(item.price),
        image: item.image,
        quantity: 1
      })
    }

    sessionStorage.setItem('cartItems', JSON.stringify(savedCart))

    setCartCount(
      savedCart.reduce((total, cartItem) => total + cartItem.quantity, 0)
    )
  }

  const selectedItems = menuItems.filter((item) => {
    return getCustomerCategory(item.category) === category
  })

  function getCategoryLabel(item) {
    if (language !== 'EN') {
      const arabicCategories = {
        'Burgers': 'برغر',
        'Pizzas': 'بيتزا',
        'Pastas': 'باستا',
        'Cakes & Desserts': 'الحلويات',
        'Coffees': 'القهوة',
        'Other Drinks': 'مشروبات',
        'Sandwiches': 'ساندويتشات',
        'Sides': 'أطباق جانبية',
        'Salads': 'سلطات'
      }

      return arabicCategories[item] || item
    }

    return item
  }

  return (
    <div className="main-menu-page">
      <div className="container">

        {/* MENU HEADING */}

        <div className="main-menu-heading">
          <span className="main-menu-eyebrow">
            {language === 'EN'
              ? 'FRESHLY PREPARED, BEAUTIFULLY SERVED'
              : 'طازج التحضير، جميل التقديم'}
          </span>

          <h1>
            {language === 'EN' ? 'Discover Our Menu' : 'اكتشف قائمتنا'}
            <span>.</span>
          </h1>

          <p>
            {language === 'EN'
              ? 'Explore our selection of delicious food and drinks, made to make every moment special.'
              : 'اكتشف تشكيلتنا من الأطعمة والمشروبات اللذيذة التي تجعل كل لحظة مميزة.'}
          </p>
        </div>

        {/* ALLERGEN INFORMATION */}

        <div className="main-menu-warning">
          <i className="bi bi-info-circle"></i>
          <span>
            {language === 'EN'
              ? 'Our food may contain allergens including dairy, eggs, nuts and gluten. Please contact our team if you have any concerns.'
              : 'قد تحتوي أطعمتنا على مسببات الحساسية مثل الألبان والبيض والمكسرات والغلوتين. يرجى التواصل مع فريقنا للاستفسار.'}
          </span>
        </div>

        {/* CATEGORY FILTERS */}

        <div className="main-menu-category-section">
          <div className="main-menu-category-heading">
            <div>
              <span className="main-menu-small-label">
                {language === 'EN' ? 'EXPLORE' : 'استكشف'}
              </span>

              <h2>
                {language === 'EN' ? 'Find Your Favourite' : 'اختر المفضل لديك'}
              </h2>
            </div>

            <span className="main-menu-item-count">
              {selectedItems.length} {language === 'EN' ? 'items' : 'أصناف'}
            </span>
          </div>

          <div className="main-menu-category-list">
            {categories.map((item) => (
              <button
                type="button"
                key={item}
                className={
                  category === item
                    ? 'main-menu-category active'
                    : 'main-menu-category'
                }
                onClick={() => setCategory(item)}
              >
                {getCategoryLabel(item)}
              </button>
            ))}
          </div>
        </div>

        {/* MENU ITEMS */}

        <div className="main-menu-results">
          {selectedItems.length === 0 ? (
            <div className="main-menu-empty">
              <i className="bi bi-egg-fried"></i>

              <h3>
                {language === 'EN' ? 'Nothing on the menu yet' : 'لا توجد أصناف حالياً'}
              </h3>

              <p>
                {language === 'EN'
                  ? 'Please explore another category. New favourites may be waiting there.'
                  : 'يرجى تجربة فئة أخرى لاكتشاف أصناف جديدة.'}
              </p>
            </div>
          ) : (
            <div className="main-menu-grid">
              {selectedItems.map((item) => (
                <article className="main-menu-card" key={item._id}>
                  <div className="main-menu-card-image">
                    {item.image ? (
                      <img src={item.image} alt={item.name} />
                    ) : (
                      <div className="main-menu-image-placeholder">
                        <i className="bi bi-egg-fried"></i>
                        <span>MONARCH BISTRO</span>
                      </div>
                    )}

                    <span
                      className={
                        item.available
                          ? 'main-menu-stock available'
                          : 'main-menu-stock unavailable'
                      }
                    >
                      {item.available
                        ? language === 'EN' ? 'AVAILABLE' : 'متوفر'
                        : language === 'EN' ? 'OUT OF STOCK' : 'نفدت الكمية'}
                    </span>
                  </div>

                  <div className="main-menu-card-body">
                    <span className="main-menu-card-category">
                      {getCategoryLabel(getCustomerCategory(item.category))}
                    </span>

                    <h3>{item.name}</h3>

                    <p className="main-menu-card-description">
                      {item.description}
                    </p>

                    <div className="main-menu-card-bottom">
                      <div className="main-menu-price">
                        <span>{language === 'EN' ? 'PRICE' : 'السعر'}</span>
                        <strong>KWD {Number(item.price).toFixed(3)}</strong>
                      </div>

                      {item.available ? (
                        <button
                          type="button"
                          className="main-menu-add-btn"
                          onClick={() => addToCart(item)}
                          aria-label={`Add ${item.name} to cart`}
                        >
                          <i className="bi bi-plus-lg"></i>
                          <span>
                            {language === 'EN' ? 'Add' : 'أضف'}
                          </span>
                        </button>
                      ) : (
                        <button
                          type="button"
                          className="main-menu-add-btn disabled"
                          disabled
                        >
                          {language === 'EN' ? 'Unavailable' : 'غير متوفر'}
                        </button>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>

        {/* CART BUTTON */}

        <div className="main-menu-cart-wrapper">
          <button
            type="button"
            className="main-menu-cart-btn"
            onClick={() => navigate('/cart')}
          >
            <span className="main-menu-cart-icon">
              <i className="bi bi-bag"></i>
              <span className="cart-counter">{cartCount}</span>
            </span>

            {language === 'EN' ? 'View Your Cart' : 'عرض سلتك'}

            <i className="bi bi-arrow-right"></i>
          </button>
        </div>

      </div>
    </div>
  )
}

export default MainMenu
