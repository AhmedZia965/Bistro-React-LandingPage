
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getMenuAxiosFunction } from '../Services/MenuApi'
import './MainMenu.css'

function MainMenu({ language }) {

  // Stores the currently selected menu category
  const [category, setCategory] = useState('Burgers')

  // Stores the menu items received from the backend
  const [menuItems, setMenuItems] = useState([])

  // Initializes the cart count using the items saved in sessionStorage
  const [cartCount, setCartCount] = useState(() => {
    // Retrieves the saved cart or uses an empty array if nothing is saved
    const savedCart = JSON.parse(sessionStorage.getItem('cartItems') || '[]')

    // Calculates the total quantity of all items in the cart
    return savedCart.reduce((total, item) => total + item.quantity, 0)
  })

  // Provides a function to navigate between routes
  const navigate = useNavigate()

  // Defines the menu categories displayed to the customer
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

  // GET REQUEST: Fetches menu items when the component first loads
  useEffect(() => {
    getMenuAxiosFunction()
      .then((response) => {
        // Stores the menu array received from the backend response
        setMenuItems(response.data.menu)
      })
      .catch((error) => {
        // Displays an error if the request fails
        console.log('Error getting menu items:', error)
      })
  }, []) // Empty dependency array means this effect runs on initial mount

  // Converts backend category names into customer-facing category names
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

    // Returns the original category if no conversion is needed
    return itemCategory
  }

  // Adds an available menu item to the shopping cart
  function addToCart(item) {

    // Stops the function if the item is unavailable
    if (!item.available) {
      return
    }

    // Retrieves the current cart from sessionStorage
    const savedCart = JSON.parse(sessionStorage.getItem('cartItems') || '[]')

    // Checks whether the selected item already exists in the cart
    const existingItem = savedCart.find(
      cartItem => cartItem._id === item._id
    )

    if (existingItem) {

      // Increases the quantity if the item already exists
      existingItem.quantity += 1

    } else {

      // Adds a new item to the cart with an initial quantity of 1
      savedCart.push({
        _id: item._id,
        name: item.name,
        price: Number(item.price),
        image: item.image,
        quantity: 1
      })
    }

    // Saves the updated cart as a JSON string in sessionStorage
    sessionStorage.setItem('cartItems', JSON.stringify(savedCart))

    // Updates the cart counter with the total quantity of all items
    setCartCount(
      savedCart.reduce((total, cartItem) => total + cartItem.quantity, 0)
    )
  }

  const selectedItems = menuItems.filter((item) => {
    return getCustomerCategory(item.category) === category
  })

  function getCategoryLabel(item) {
    if (language !== 'EN') {

      // Maps English category names to their Arabic translations
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

      // Returns the Arabic label or the original name if no translation exists
      return arabicCategories[item] || item
    }

    // Returns the English category name
    return item
  }

  // JSX: Defines the content displayed on the menu page
  return (
    <div className="main-menu-page">
      <div className="container">

        {/* MENU HEADING: Displays the title and introduction */}

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

        {/* ALLERGEN INFORMATION: Warns customers about possible allergens */}

        <div className="main-menu-warning">
          <i className="bi bi-info-circle"></i>
          <span>
            {language === 'EN'
              ? 'Our food may contain allergens including dairy, eggs, nuts and gluten. Please contact our team if you have any concerns.'
              : 'قد تحتوي أطعمتنا على مسببات الحساسية مثل الألبان والبيض والمكسرات والغلوتين. يرجى التواصل مع فريقنا للاستفسار.'}
          </span>
        </div>

        {/* CATEGORY FILTERS: Allows customers to select a menu category */}

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

            {/* Displays the number of items in the selected category */}
            <span className="main-menu-item-count">
              {selectedItems.length} {language === 'EN' ? 'items' : 'أصناف'}
            </span>
          </div>

          <div className="main-menu-category-list">

            {/* map() creates a button for each category */}
            {categories.map((item) => (
              <button
                type="button"
                key={item}
                className={
                  category === item
                    ? 'main-menu-category active'
                    : 'main-menu-category'
                }

                // Updates the selected category when clicked
                onClick={() => setCategory(item)}
              >
                {getCategoryLabel(item)}
              </button>
            ))}
          </div>
        </div>

        {/* MENU ITEMS: Displays the filtered menu cards */}

        <div className="main-menu-results">

          {/* Shows an empty message if no items match the selected category */}
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

            // map() creates a card for each menu item in the selected category
            <div className="main-menu-grid">
              {selectedItems.map((item) => (
                <article className="main-menu-card" key={item._id}>
                  <div className="main-menu-card-image">

                    {/* Displays the item image or a placeholder if no image exists */}
                    {item.image ? (
                      <img src={item.image} alt={item.name} />
                    ) : (
                      <div className="main-menu-image-placeholder">
                        <i className="bi bi-egg-fried"></i>
                        <span>MONARCH BISTRO</span>
                      </div>
                    )}

                    {/* Displays whether the menu item is available */}
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

                    {/* Displays the category, name, and description */}
                    <span className="main-menu-card-category">
                      {getCategoryLabel(getCustomerCategory(item.category))}
                    </span>

                    <h3>{item.name}</h3>

                    <p className="main-menu-card-description">
                      {item.description}
                    </p>

                    <div className="main-menu-card-bottom">

                      {/* Displays the price with three decimal places */}
                      <div className="main-menu-price">
                        <span>{language === 'EN' ? 'PRICE' : 'السعر'}</span>
                        <strong>KWD {Number(item.price).toFixed(3)}</strong>
                      </div>

                      {/* Allows adding available items to the cart */}
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

                        // Disables the button when the item is unavailable
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

        {/* CART BUTTON: Displays the cart count and opens the cart page */}

        <div className="main-menu-cart-wrapper">
          <button
            type="button"
            className="main-menu-cart-btn"

            // Navigates to the cart route when clicked
            onClick={() => navigate('/cart')}
          >
            <span className="main-menu-cart-icon">
              <i className="bi bi-bag"></i>

              {/* Displays the total quantity of items in the cart */}
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

// Exports the component so it can be imported into other files
export default MainMenu
