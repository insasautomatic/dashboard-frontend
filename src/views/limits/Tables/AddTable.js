import React, { useEffect, useState } from 'react'
import s from './AddTable.module.css'
import { useSelector } from 'react-redux'
import { Modal } from 'bootstrap'

import showToast from '../../../components/Notification/ShowToast.js'
import axiosClient from '../../../axiosClient.js'
import { v4 as uuidv4 } from 'uuid'

const AddRoulleteTable = (props) => {
  const theme = useSelector((state) => state.theme)
  const [languages, setLanguages] = useState([])
  const [themes, setThemes] = useState([])
  const [backgrounds, setBackgrounds] = useState([])
  const [tables, setTables] = useState([])

  const mockTables = [
    { table_type_id: 6, table_type: 'roullete' },
    { table_type_id: 7, table_type: 'baccarat' },
    { table_type_id: 8, table_type: 'andar bahar' },
    { table_type_id: 9, table_type: 'baccarat2' },
  ]

  const mockThemes = [
    { theme_id: 1, theme: 'dark' },
    { theme_id: 3, theme: 'light' },
  ]

  const mockBackgrounds = [
    { bg_id: 2, background: 'dark' },
    { bg_id: 3, background: 'white' },
  ]

  const mockLanguages = [
    { lang_id: 3, language: 'Chinese' },
    { lang_id: 2, language: 'English' },
  ]

  const getConfigs = async () => {
    try {
      const response = await axiosClient.get('config/get/configs')
      console.log('response', response)
      const { languages, themes, backgrounds, table_types } = response.data
      setLanguages(languages)
      setBackgrounds(backgrounds)
      setThemes(themes)
      setTables(table_types)
    } catch (error) {
      console.error(error)
    }
  }

  const [formData, setFormData] = useState({
    table_limit_name: '',
    table: '',
    table_type_name: '',
    table_type_id: '',
    min_bet: '',
    max_bet: '',
    side_bet_min: '',
    side_bet_max: '',
    s_message: '',
    theme: '',
    language: '',
    background: '',
  })

  useEffect(() => {
    getConfigs()

    console.log('props', props)

    setFormData({
      ...formData,
      table_type_name: props.table,
      table_type_id: props.id,
    })
  }, [props.id, props.table, props])
  useEffect(() => {
    console.log('roulette theme', theme)
  }, [theme])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const validateform = () => {
    if (!formData.table_limit_name) {
      showToast('Enter Table Name', 'info')
      return
    }
    if (!formData.min_bet) {
      showToast('Enter Minimum Bet', 'info')
      return
    }

    if (!formData.theme) {
      showToast('Select Theme', 'info')
      return
    }

    if (!formData.max_bet) {
      showToast('Enter Maximum Bet', 'info')
      return
    }
    if (!formData.background) {
      showToast('Select Background', 'info')
      return
    }
    if (!formData.side_bet_min) {
      showToast('Enter Side Bet Minimum', 'info')
      return
    }
    if (!formData.language) {
      showToast('Select Language', 'info')
      return
    }
    if (!formData.side_bet_max) {
      showToast('Enter Side Bet Maximum', 'info')
      return
    }

    const modalElement = document.getElementById('addModal') // Get the correct element
    if (modalElement) {
      const modal = new Modal(modalElement) // Initialize the modal
      modal.show() // Show the modal
    } else {
      console.error('Modal element not found')
    }
  }

  const handleSubmit = async () => {
    const {
      table_limit_name,
      min_bet,
      table_type,
      max_bet,
      theme,
      background,
      side_bet_min,
      language,
      side_bet_max,
    } = formData

    const dataToSend = {
      ...formData,
    }
    console.log('Data to send:', dataToSend)

    try {
      const response = await axiosClient.post('table/limits/add', formData)
      console.log(response)
      showToast('Table limit added successfully!', 'success')
      setTimeout(() => {
        window.location.reload()
      }, 2000)
    } catch (error) {
      showToast('Error adding table limit', 'error')
      console.error(error)
    }
  }

  return (
    <>
      <div>
        <div
          className="modal fade"
          id="addModal"
          tabindex="-1"
          aria-labelledby="addModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header border-0">
                <h1 className="modal-title fs-5" id="addModalLabel">
                  Confirm Add Table
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>

              <div className="modal-footer border-0">
                <button type="button" className="btn btn-sm btn-secondary" data-bs-dismiss="modal">
                  Have A Look
                </button>
                <button onClick={handleSubmit} type="button" className="btn btn-sm btn-primary">
                  Add Table
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="py-3">
          <h1 className="text-center py-3">Roulette</h1>
          <div className="h-100 w-100 d-flex justify-content-center">
            <div
              className={`row ${s.form} border-bottom border-2 border-top ${
                theme === 'dark' ? 'border-primary' : 'border-dark'
              } rounded-4 p-4 shadow-lg`}
            >
              <div className="col-12 col-md-6">
                <div className="mb-2">
                  <label className="form-label">Table Name</label>
                  <input
                    className="form-control form-control-sm"
                    type="text"
                    placeholder="Enter Table Name"
                    name="table_limit_name"
                    value={formData.table_limit_name}
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-2">
                  <label className="form-label">Theme</label>
                  <select
                    className="form-select form-select-sm"
                    name="theme"
                    value={formData.theme}
                    onChange={handleChange}
                  >
                    <option value="">Select Theme</option>
                    {mockThemes.map((theme) => (
                      <option key={theme.theme_id} value={theme.theme}>
                        {theme.theme}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-2">
                  <label className="form-label">Background</label>
                  <select
                    className="form-select form-select-sm"
                    name="background"
                    value={formData.background}
                    onChange={handleChange}
                  >
                    <option value="">Select Background</option>
                    {backgrounds.map((bg) => (
                      <option key={bg.bg_id} value={bg.background}>
                        {bg.background}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-2">
                  <label className="form-label">Language</label>
                  <select
                    className="form-select form-select-sm"
                    name="language"
                    value={formData.language}
                    onChange={handleChange}
                  >
                    <option value="">Select Language</option>
                    {languages.map((lang) => (
                      <option key={lang.lang_id} value={lang.language}>
                        {lang.language}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="col-12 col-md-6">
                <div className="mb-2">
                  <label className="form-label">Minimum Bet</label>
                  <input
                    className="form-control form-control-sm"
                    type="number"
                    placeholder="Enter Minimum Bet"
                    name="min_bet"
                    value={formData.min_bet}
                    onChange={handleChange}
                    min="0"
                  />
                </div>
                <div className="mb-2">
                  <label className="form-label">Maximum Bet</label>
                  <input
                    className="form-control form-control-sm"
                    type="number"
                    placeholder="Enter Maximum Bet"
                    name="max_bet"
                    value={formData.max_bet}
                    onChange={handleChange}
                    min="0"
                  />
                </div>
                <div className="mb-2">
                  <label className="form-label">Side Bet Minimum</label>
                  <input
                    className="form-control form-control-sm"
                    type="number"
                    placeholder="Enter Side Bet Minimum"
                    name="side_bet_min"
                    value={formData.side_bet_min}
                    onChange={handleChange}
                    min="0"
                  />
                </div>
                <div className="mb-2">
                  <label className="form-label">Side Bet Maximum</label>
                  <input
                    className="form-control form-control-sm"
                    type="number"
                    placeholder="Enter Side Bet Maximum"
                    name="side_bet_max"
                    value={formData.side_bet_max}
                    onChange={handleChange}
                    min="0"
                  />
                </div>
              </div>
              <div className="d-flex justify-content-center pt-3">
                <button
                  type="button"
                  /*  data-bs-toggle="modal"
                  data-bs-target="#addModal" */
                  onClick={validateform}
                  className={`btn ${theme === 'dark' ? 'btn-primary' : 'btn-dark'} px-5`}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AddRoulleteTable
