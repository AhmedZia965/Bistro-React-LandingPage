import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import StaffNavbar from './StaffNavbar'
import StaffFooter from './StaffFooter'

function StaffMenu({ language, setLanguage }) {

  const navigate = useNavigate()


  // Stores menu items
  const [menuItems, setMenuItems] = useState([

    {
      id: 1,
      name: 'Classic Burger',
      price: '4.500',
      available: true
    },

    {
      id: 2,
      name: 'Cappuccino',
      price: '2.000',
      available: true
    },

    {
      id: 3,
      name: 'Creamy Pasta',
      price: '5.000',
      available: true
    }

  ])


  // Stores new item information
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')


  // Adds a new menu item
  function handleAddItem(event) {

    event.preventDefault()

    const newItem = {

      id: Date.now(),
      name: name,
      price: price,
      available: true

    }

    setMenuItems([...menuItems, newItem])

    setName('')
    setPrice('')

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
                ? 'Add and manage menu items.'
                : 'إضافة وإدارة عناصر القائمة.'}

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


                {/* Item Name */}

                <div className="col-md-5">

                  <input
                    type="text"
                    className="form-control"
                    placeholder={
                      language === 'EN'
                        ? 'Item Name'
                        : 'اسم العنصر'
                    }
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    required
                  />

                </div>


                {/* Price */}

                <div className="col-md-4">

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
                    required
                  />

                </div>


                {/* Add Button */}

                <div className="col-md-3">

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
                        ? 'Item'
                        : 'العنصر'}
                    </th>

                    <th>
                      {language === 'EN'
                        ? 'Price'
                        : 'السعر'}
                    </th>

                    <th>
                      {language === 'EN'
                        ? 'Status'
                        : 'الحالة'}
                    </th>

                    <th>
                      {language === 'EN'
                        ? 'Actions'
                        : 'الإجراءات'}
                    </th>

                  </tr>

                </thead>


                <tbody>

                  {menuItems.map(item => (

                    <tr key={item.id}>

                      <td>
                        {item.name}
                      </td>


                      <td>
                        KD {item.price}
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

                  ))}

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