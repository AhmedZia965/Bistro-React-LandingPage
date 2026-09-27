import { useState } from 'react'

function MainMenu({ language }) {

  // Stores the selected menu category
  const [category, setCategory] = useState('Burgers')


  // Menu categories
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


  return (

    <div className="main-menu-page">

      <div className="container">


        {/* ================= MENU HEADING ================= */}

        <div className="main-menu-heading text-center">

          <span>

            {language === 'EN'
              ? 'MONARCH BISTRO'
              : 'مونارك بيسترو'}

          </span>

          <h1>

            {language === 'EN'
              ? 'Our Menu'
              : 'قائمتنا'}

          </h1>

          <p>

            {language === 'EN'
              ? 'Explore our selection of food and drinks.'
              : 'استكشف مجموعة الأطعمة والمشروبات لدينا.'}

          </p>

        </div>


        {/* ================= ALLERGEN WARNING ================= */}

        <div className="main-menu-warning">

          <i className="bi bi-exclamation-triangle me-2"></i>

          {language === 'EN'
            ? 'Allergen Information: Our food and beverages may contain or come into contact with allergens such as gluten, dairy, eggs, nuts, and other ingredients. We cannot guarantee that any item is completely allergen-free.'
            : 'معلومات الحساسية: قد تحتوي أطعمتنا ومشروباتنا أو تتلامس مع مسببات الحساسية مثل الغلوتين ومنتجات الألبان والبيض والمكسرات ومكونات أخرى. لا يمكننا ضمان خلو أي منتج تماماً من مسببات الحساسية.'}

        </div>


        {/* ================= CATEGORIES ================= */}

        <div className="main-menu-categories">

          <h2>

            {language === 'EN'
              ? 'Choose a Category'
              : 'اختر فئة'}

          </h2>


          <div className="row g-3">

            {categories.map((item) => (

              <div
                className="col-6 col-md-4 col-lg-3"
                key={item}
              >

                <button
                  type="button"
                  className={
                    category === item
                      ? 'main-menu-category active'
                      : 'main-menu-category'
                  }
                  onClick={() => setCategory(item)}
                >

                  {item}

                </button>

              </div>

            ))}

          </div>

        </div>


        {/* ================= SELECTED CATEGORY ================= */}

        <div className="main-menu-selected text-center">

          <h2>

            {category}

          </h2>

          <p>

            {language === 'EN'
              ? 'Menu items will appear here.'
              : 'ستظهر عناصر القائمة هنا.'}

          </p>

        </div>


      </div>

    </div>

  )

}

export default MainMenu