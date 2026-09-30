import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import StaffNavbar from './StaffNavbar'
import StaffFooter from './StaffFooter'

function StaffMenu({ language, setLanguage }) {

  const navigate = useNavigate()


  // Stores menu items
  const [menuItems, setMenuItems] = useState([])


  // Stores new item information
  const [name, setName] = useState('')
  const [category, setCategory] = useState('Burgers')
  const [price, setPrice] = useState('')
  const [description, setDescription] = useState('')


  // Stores the new price
  const [newPrice, setNewPrice] = useState('')


  // Add Item button does nothing for now
  function handleAddItem(event) {

    event.preventDefault()

  }


  // Updates the price of a menu item
  function handleUpdatePrice(id) {

    if (newPrice === '') {
      return
    }

    setMenuItems(

      menuItems.map(item =>

        item.id === id
          ? {
              ...item,
              price: newPrice
            }
          : item

      )

    )

    setNewPrice('')

  }


  // Deletes a menu item
  function handleDelete(id) {

    setMenuItems(
      menuItems.filter(item => item.id !== id)
    )

  }


  // Changes item availability
  function handleAvailability(id) {

    setMenuItems(

      menuItems.map(item =>

        item.id === id
          ? {
              ...item,
              available: !item.available
            }
          : item

      )

    )

  }


  return (

    <>

      {/* Staff Navbar */}

      <StaffNavbar
        language={language}
        setLanguage={setLanguage}
      />


      <div className="staff-menu-page">

        <div className="container">


          {/* ================= PAGE HEADING ================= */}

          <div className="staff-menu-heading text-center">

            <span className="staff-subtitle">

              {language === 'EN'
                ? 'STAFF PORTAL'
                : 'بوابة الموظفين'}

            </span>


            <h1>

              {language === 'EN'
                ? 'Menu Management'
                : 'إدارة القائمة'}

            </h1>


            <p>

              {language === 'EN'
                ? 'Manage food and beverage items.'
                : 'إدارة الأطعمة والمشروبات.'}

            </p>

          </div>


          {/* ================= ADD ITEM ================= */}

          <div className="staff-menu-form">

            <h2>

              {language === 'EN'
                ? 'Add New Item'
                : 'إضافة عنصر جديد'}

            </h2>


            <form onSubmit={handleAddItem}>

              <div className="row g-3">


                {/* Food Name */}

                <div className="col-md-4">

                  <label>

                    {language === 'EN'
                      ? 'Food Name'
                      : 'اسم الطعام'}

                  </label>

                  <input
                    type="text"
                    className="form-control"
                    placeholder={
                      language === 'EN'
                        ? 'Food Name'
                        : 'اسم الطعام'
                    }
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                  />

                </div>


                {/* Category */}

                <div className="col-md-3">

                  <label>

                    {language === 'EN'
                      ? 'Category'
                      : 'الفئة'}

                  </label>

                  <select
                    className="form-control"
                    value={category}
                    onChange={(event) => setCategory(event.target.value)}
                  >

                    <option value="Burgers">
                      {language === 'EN' ? 'Burgers' : 'برغر'}
                    </option>

                    <option value="Pizzas">
                      {language === 'EN' ? 'Pizzas' : 'بيتزا'}
                    </option>

                    <option value="Pastas">
                      {language === 'EN' ? 'Pastas' : 'معكرونة'}
                    </option>

                    <option value="Desserts">
                      {language === 'EN' ? 'Desserts' : 'حلويات'}
                    </option>

                    <option value="Coffee">
                      {language === 'EN' ? 'Coffee' : 'قهوة'}
                    </option>

                    <option value="Drinks">
                      {language === 'EN' ? 'Drinks' : 'مشروبات'}
                    </option>

                    <option value="Sides">
                      {language === 'EN' ? 'Sides' : 'أطباق جانبية'}
                    </option>

                  </select>

                </div>


                {/* Price */}

                <div className="col-md-2">

                  <label>

                    {language === 'EN'
                      ? 'Price'
                      : 'السعر'}

                  </label>

                  <input
                    type="number"
                    step="0.001"
                    className="form-control"
                    placeholder={
                      language === 'EN'
                        ? 'Price'
                        : 'السعر'
                    }
                    value={price}
                    onChange={(event) => setPrice(event.target.value)}
                  />

                </div>


                {/* Add Button */}

                <div className="col-md-3">

                  <label>
                    &nbsp;
                  </label>

                  <button
                    type="submit"
                    className="staff-menu-add-btn w-100"
                  >

                    <i className="bi bi-plus-lg me-2"></i>

                    {language === 'EN'
                      ? 'Add Item'
                      : 'إضافة عنصر'}

                  </button>

                </div>


                {/* Description */}

                <div className="col-12">

                  <label>

                    {language === 'EN'
                      ? 'Description'
                      : 'الوصف'}

                  </label>

                  <textarea
                    className="form-control"
                    rows="2"
                    placeholder={
                      language === 'EN'
                        ? 'Food description'
                        : 'وصف الطعام'
                    }
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                  ></textarea>

                </div>


              </div>

            </form>

          </div>


          {/* ================= MENU TABLE ================= */}

          <div className="staff-menu-items">

            <h2 className="text-center">

              {language === 'EN'
                ? 'Current Menu'
                : 'القائمة الحالية'}

            </h2>


            <div className="table-responsive">

              <table className="staff-menu-table">

                <thead>

                  <tr>

                    <th>
                      {language === 'EN'
                        ? 'Food Name'
                        : 'اسم الطعام'}
                    </th>

                    <th>
                      {language === 'EN'
                        ? 'Category'
                        : 'الفئة'}
                    </th>

                    <th>
                      {language === 'EN'
                        ? 'Description'
                        : 'الوصف'}
                    </th>

                    <th>
                      {language === 'EN'
                        ? 'Price'
                        : 'السعر'}
                    </th>

                    <th>
                      {language === 'EN'
                        ? 'Availability'
                        : 'التوفر'}
                    </th>

                    <th>
                      {language === 'EN'
                        ? 'Actions'
                        : 'الإجراءات'}
                    </th>

                  </tr>

                </thead>


                <tbody>

                  {menuItems.length === 0 ? (

                    <tr>

                      <td
                        colSpan="6"
                        className="text-center"
                      >

                        {language === 'EN'
                          ? 'No menu items available.'
                          : 'لا توجد عناصر في القائمة.'}

                      </td>

                    </tr>

                  ) : (

                    menuItems.map(item => (

                      <tr key={item.id}>

                        <td>
                          {item.name}
                        </td>

                        <td>
                          {item.category}
                        </td>

                        <td>
                          {item.description}
                        </td>

                        <td>
                          KWD {item.price}
                        </td>

                        <td>

                          <span
                            className={
                              item.available
                                ? 'staff-available'
                                : 'staff-unavailable'
                            }
                          >

                            {item.available

                              ? (
                                language === 'EN'
                                  ? 'Available'
                                  : 'متاح'
                              )

                              : (
                                language === 'EN'
                                  ? 'Unavailable'
                                  : 'غير متاح'
                              )

                            }

                          </span>

                        </td>


                        <td>

                          {/* Update Price */}

                          <div className="d-flex gap-2 mb-2">

                            <input
                              type="number"
                              step="0.001"
                              className="form-control"
                              placeholder={
                                language === 'EN'
                                  ? 'New Price'
                                  : 'السعر الجديد'
                              }
                              value={newPrice}
                              onChange={(event) => setNewPrice(event.target.value)}
                            />

                            <button
                              type="button"
                              className="staff-availability-btn"
                              onClick={() => handleUpdatePrice(item.id)}
                            >

                              <i className="bi bi-pencil me-1"></i>

                              {language === 'EN'
                                ? 'Update'
                                : 'تحديث'}

                            </button>

                          </div>


                          {/* Availability */}

                          <button
                            type="button"
                            className="staff-availability-btn me-2"
                            onClick={() => handleAvailability(item.id)}
                          >

                            <i className="bi bi-toggle-on me-1"></i>

                            {language === 'EN'
                              ? 'Availability'
                              : 'التوفر'}

                          </button>


                          {/* Delete */}

                          <button
                            type="button"
                            className="staff-delete-btn"
                            onClick={() => handleDelete(item.id)}
                          >

                            <i className="bi bi-trash me-1"></i>

                            {language === 'EN'
                              ? 'Delete'
                              : 'حذف'}

                          </button>

                        </td>

                      </tr>

                    ))

                  )}

                </tbody>

              </table>

            </div>

          </div>


          {/* ================= BACK BUTTON ================= */}

          <div className="text-center staff-menu-back">

            <button
              type="button"
              className="staff-back-btn"
              onClick={() => navigate('/staff-dashboard')}
            >

              <i className="bi bi-arrow-left me-2"></i>

              {language === 'EN'
                ? 'Back to Dashboard'
                : 'العودة إلى لوحة التحكم'}

            </button>

          </div>


        </div>

      </div>


      {/* Staff Footer */}

      <StaffFooter language={language} />

    </>

  )

}

export default StaffMenu