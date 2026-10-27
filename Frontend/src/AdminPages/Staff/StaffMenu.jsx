import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import StaffNavbar from './StaffNavbar'
import StaffFooter from './StaffFooter'

import {
  getMenuAxiosFunction,
  addMenuAxiosFunction,
  updateMenuAxiosFunction,
  deleteMenuAxiosFunction
} from '../../Services/MenuApi'

// Validates new menu items
const menuItemSchema = z.object({
  name: z.string()
    .trim()
    .min(2, 'Food name must have at least 2 characters')
    .max(30, 'Food name cannot exceed 30 characters'),

  category: z.enum([
    'Burgers',
    'Pizzas',
    'Pastas',
    'Desserts',
    'Coffee',
    'Drinks',
    'Sides'
  ]),

  price: z.string()
    .trim()
    .min(1, 'Price is required')
    .refine(
      value => Number.isFinite(Number(value)) && Number(value) > 0,
      'Price must be greater than 0'
    ),

  description: z.string()
    .trim()
    .min(3, 'Description must have at least 3 characters')
    .max(200, 'Description cannot exceed 200 characters')
})

function StaffMenu({ language, setLanguage }) {

  // Stores menu items from MongoDB
  const [menuItems, setMenuItems] = useState([])

  // Stores the new price
  const [newPrice, setNewPrice] = useState('')

  // Stores the selected category
  const [selectedCategory, setSelectedCategory] = useState('All')

  // Manages and validates the Add Item form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(menuItemSchema),
    defaultValues: {
      name: '',
      category: 'Burgers',
      price: '',
      description: ''
    }
  })

  // Gets menu items from MongoDB
  useEffect(() => {
    getMenuAxiosFunction()
      .then((response) => {
        setMenuItems(response.data.menu)
      })
      .catch((error) => {
        console.log('Error getting menu items:', error)
      })
  }, [])

  // Adds a new menu item
  function handleAddItem(data) {

    const newItem = {
      name: data.name.trim(),
      category: data.category,
      price: Number(data.price),
      description: data.description.trim(),
      image: '',
      available: true
    }

    addMenuAxiosFunction(newItem)
      .then((response) => {
        setMenuItems([...menuItems, response.data.menu])
        reset()
      })
      .catch((error) => {
        console.log('Error adding menu item:', error)
      })
  }

  // Updates the price of a menu item
  function handleUpdatePrice(id) {

    if (
      newPrice === '' ||
      !Number.isFinite(Number(newPrice)) ||
      Number(newPrice) <= 0
    ) {
      return
    }

    const item = menuItems.find(item => item._id === id)

    if (!item) {
      return
    }

    updateMenuAxiosFunction(id, {
      name: item.name,
      description: item.description,
      price: Number(newPrice),
      category: item.category,
      image: item.image || '',
      available: item.available
    })
      .then((response) => {
        setMenuItems(
          menuItems.map(item =>
            item._id === id ? response.data.menu : item
          )
        )

        setNewPrice('')
      })
      .catch((error) => {
        console.log('Error updating price:', error)
      })
  }

  // Deletes a menu item
  function handleDelete(id) {

    deleteMenuAxiosFunction(id)
      .then(() => {
        setMenuItems(
          menuItems.filter(item => item._id !== id)
        )
      })
      .catch((error) => {
        console.log('Error deleting menu item:', error)
      })
  }

  // Changes item availability
  function handleAvailability(id) {

    const item = menuItems.find(item => item._id === id)

    if (!item) {
      return
    }

    updateMenuAxiosFunction(id, {
      name: item.name,
      description: item.description,
      price: item.price,
      category: item.category,
      image: item.image || '',
      available: !item.available
    })
      .then((response) => {
        setMenuItems(
          menuItems.map(item =>
            item._id === id ? response.data.menu : item
          )
        )
      })
      .catch((error) => {
        console.log('Error updating availability:', error)
      })
  }

  // Menu categories
  const categories = [
    'All',
    'Burgers',
    'Pizzas',
    'Pastas',
    'Desserts',
    'Coffee',
    'Drinks',
    'Sides'
  ]

  // Filters menu items by category
  const filteredMenuItems = menuItems.filter(item =>
    selectedCategory === 'All' ||
    item.category === selectedCategory
  )

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
              {language === 'EN' ? 'STAFF PORTAL' : 'بوابة الموظفين'}
            </span>

            <h1>
              {language === 'EN' ? 'Menu Management' : 'إدارة القائمة'}
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
              {language === 'EN' ? 'Add New Item' : 'إضافة عنصر جديد'}
            </h2>

            <form onSubmit={handleSubmit(handleAddItem)}>

              <div className="row g-3">

                {/* Food Name */}

                <div className="col-md-4">

                  <label>
                    {language === 'EN' ? 'Food Name' : 'اسم الطعام'}
                  </label>

                  <input
                    type="text"
                    className="form-control"
                    placeholder={
                      language === 'EN' ? 'Food Name' : 'اسم الطعام'
                    }
                    {...register('name')}
                  />

                  {errors.name && (
                    <p className="text-danger mt-1">
                      {errors.name.message}
                    </p>
                  )}

                </div>

                {/* Category */}

                <div className="col-md-3">

                  <label>
                    {language === 'EN' ? 'Category' : 'الفئة'}
                  </label>

                  <select
                    className="form-control"
                    {...register('category')}
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

                  {errors.category && (
                    <p className="text-danger mt-1">
                      {errors.category.message}
                    </p>
                  )}

                </div>

                {/* Price */}

                <div className="col-md-2">

                  <label>
                    {language === 'EN' ? 'Price' : 'السعر'}
                  </label>

                  <input
                    type="number"
                    min="0.001"
                    step="0.001"
                    className="form-control"
                    placeholder={
                      language === 'EN' ? 'Price' : 'السعر'
                    }
                    {...register('price')}
                  />

                  {errors.price && (
                    <p className="text-danger mt-1">
                      {errors.price.message}
                    </p>
                  )}

                </div>

                {/* Add Button */}

                <div className="col-md-3">

                  <label>&nbsp;</label>

                  <button
                    type="submit"
                    className="staff-menu-add-btn w-100"
                  >

                    <i className="bi bi-plus-lg me-2"></i>

                    {language === 'EN' ? 'Add Item' : 'إضافة عنصر'}

                  </button>

                </div>

                {/* Description */}

                <div className="col-12">

                  <label>
                    {language === 'EN' ? 'Description' : 'الوصف'}
                  </label>

                  <textarea
                    className="form-control"
                    rows="2"
                    placeholder={
                      language === 'EN'
                        ? 'Food description'
                        : 'وصف الطعام'
                    }
                    {...register('description')}
                  ></textarea>

                  {errors.description && (
                    <p className="text-danger mt-1">
                      {errors.description.message}
                    </p>
                  )}

                </div>

              </div>

            </form>

          </div>

          {/* ================= CURRENT MENU ================= */}

          <div className="staff-menu-items">

            <h2 className="text-center">
              {language === 'EN' ? 'Manage Menu' : 'إدارة القائمة'}
            </h2>

            <p className="text-center text-secondary">
              {language === 'EN'
                ? 'Select a category to manage your menu items.'
                : 'اختر فئة لإدارة عناصر القائمة.'}
            </p>

            {/* Category Filters */}

            <div className="staff-menu-filters">

              {categories.map(category => (

                <button
                  key={category}
                  type="button"
                  className={`staff-menu-filter-btn ${
                    selectedCategory === category ? 'active' : ''
                  }`}
                  onClick={() => setSelectedCategory(category)}
                >

                  {language === 'EN'
                    ? category
                    : ({
                        All: 'الكل',
                        Burgers: 'برغر',
                        Pizzas: 'بيتزا',
                        Pastas: 'معكرونة',
                        Desserts: 'حلويات',
                        Coffee: 'قهوة',
                        Drinks: 'مشروبات',
                        Sides: 'أطباق جانبية'
                      }[category])}

                </button>

              ))}

            </div>

            {/* Menu Item Cards */}

            <div className="row g-4">

              {filteredMenuItems.length === 0 ? (

                <div className="col-12">

                  <div className="staff-menu-empty">

                    <i className="bi bi-clipboard-x"></i>

                    <h5>
                      {language === 'EN'
                        ? 'No items in this category'
                        : 'لا توجد عناصر في هذه الفئة'}
                    </h5>

                    <p className="mb-0">
                      {language === 'EN'
                        ? 'Add a new item or select another category.'
                        : 'أضف عنصرًا جديدًا أو اختر فئة أخرى.'}
                    </p>

                  </div>

                </div>

              ) : (

                filteredMenuItems.map(item => (

                  <div className="col-md-6 col-xl-4" key={item._id}>

                    <div className="staff-menu-card">

                      {/* Item Details */}

                      <div className="staff-menu-card-top">

                        <div>

                          <h5>{item.name}</h5>

                          <span className="staff-menu-card-category">
                            {item.category}
                          </span>

                        </div>

                        <span
                          className={`staff-menu-card-status ${
                            item.available
                              ? 'available'
                              : 'unavailable'
                          }`}
                        >

                          {item.available
                            ? (
                                language === 'EN'
                                  ? 'Available'
                                  : 'متاح'
                              )
                            : (
                                language === 'EN'
                                  ? 'Out of Stock'
                                  : 'غير متاح'
                              )}

                        </span>

                      </div>

                      <p className="staff-menu-card-description">
                        {item.description}
                      </p>

                      <div className="staff-menu-card-price">
                        KWD {Number(item.price).toFixed(3)}
                      </div>

                      {/* Update Price */}

                      <div className="staff-menu-card-actions">

                        <label>
                          {language === 'EN'
                            ? 'Update Price'
                            : 'تحديث السعر'}
                        </label>

                        <div className="d-flex gap-2 mb-3">

                          <input
                            type="number"
                            min="0.001"
                            step="0.001"
                            className="form-control"
                            placeholder={
                              language === 'EN'
                                ? 'New Price'
                                : 'السعر الجديد'
                            }
                            value={newPrice}
                            onChange={(event) =>
                              setNewPrice(event.target.value)
                            }
                          />

                          <button
                            type="button"
                            className="staff-availability-btn"
                            onClick={() => handleUpdatePrice(item._id)}
                          >

                            {language === 'EN' ? 'Update' : 'تحديث'}

                          </button>

                        </div>

                        {/* Availability */}

                        <button
                          type="button"
                          className="staff-availability-btn w-100 mb-2"
                          onClick={() => handleAvailability(item._id)}
                        >

                          <i className="bi bi-toggle-on me-2"></i>

                          {item.available
                            ? (
                                language === 'EN'
                                  ? 'Mark Out of Stock'
                                  : 'تحديد كغير متاح'
                              )
                            : (
                                language === 'EN'
                                  ? 'Mark Available'
                                  : 'تحديد كمتاح'
                              )}

                        </button>

                        {/* Delete */}

                        <button
                          type="button"
                          className="staff-delete-btn w-100"
                          onClick={() => handleDelete(item._id)}
                        >

                          <i className="bi bi-trash me-2"></i>

                          {language === 'EN'
                            ? 'Delete Item'
                            : 'حذف العنصر'}

                        </button>

                      </div>

                    </div>

                  </div>

                ))

              )}

            </div>

          </div>

          {/* ================= BACK BUTTON ================= */}

          <div className="text-center staff-menu-back">

            <Link
              to="/staff-dashboard"
              className="staff-back-btn"
              style={{ textDecoration: 'none' }}
            >

              <i className="bi bi-arrow-left me-2"></i>

              {language === 'EN'
                ? 'Back to Dashboard'
                : 'العودة إلى لوحة التحكم'}

            </Link>

          </div>

        </div>

      </div>

      {/* Staff Footer */}

      <StaffFooter language={language} />

    </>

  )
}

export default StaffMenu