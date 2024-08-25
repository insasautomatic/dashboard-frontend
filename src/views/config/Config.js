import React, { useEffect, useState } from 'react'
import s from './Config.module.css'
import { useSelector } from 'react-redux'

import showToast from '../../components/Notification/ShowToast.js'
import { useColorModes } from '@coreui/react'
import axiosClient from '../../axiosClient.js'

const Config = () => {
  const theme = useSelector((state) => state.theme)

  const { colorMode, setColorMode } = useColorModes('coreui-free-react-admin-template-theme')
  const [formData, setFormData] = useState({
    table_type: '',

    s_message: '',
    table_type: 'Roulette',
    theme: '',
    language: '',
    background: '',
  })

  useEffect(() => {
    console.log(theme)
  }, [theme])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = async (e) => {
    if (formData.table_type == '') {
      showToast('Enter Table Name', 'info')
      return
    }

    if (formData.theme == '') {
      showToast(' Select Theme', 'info')
      return
    }

    if (formData.background == '') {
      showToast('Select Background', 'info')
      return
    }

    if (formData.language == '') {
      showToast('Select language', 'info')
      return
    }

    try {
      const response = await axiosClient.post('table/limits/add', formData)
      console.log(response)
      showToast('Table limit added successfully!', 'success')
    } catch (error) {
      showToast('Error adding table limit', 'error')
      console.error(error)
    }
  }

  return (
    <div className="py-3 ">
      <h1 className="text-center py-3">Configuration</h1>
      <div className={`${s.container} border d-flex justify-content-center `}>
        <div className={` border w-100 d-flex justify-content-center align-items-center `}>
          <div
            className={`row ${s.form}  border-bottom border-2 border-top   ${
              theme === 'dark' ? 'border-primary' : 'border-dark'
            } rounded-4 p-4 shadow-lg`}
          >
            <div className="col-12 col-md-6 border">
              <div className="mb-2">
                <label className="form-label">Table Type</label>
                <select
                  className="form-select form-select-sm"
                  name="table_type"
                  value={formData.theme}
                  onChange={handleChange}
                  aria-label="Default select example"
                >
                  <option value="">Select Table</option>
                  <option value="roulette">Roulette</option>
                  <option value="baccarta">Baccarta</option>
                  <option value="andar_bahar">Andar Bahar</option>
                  <option value="three_card_pocker">Three Card Pocker</option>
                </select>
              </div>
              <div className="mb-2">
                <label className="form-label">Theme</label>
                <select
                  className="form-select form-select-sm"
                  name="theme"
                  value={formData.theme}
                  onChange={handleChange}
                  aria-label="Default select example"
                >
                  <option value="">Select Theme</option>
                  <option value="dark">Dark</option>
                  <option value="light">Light</option>
                </select>
              </div>
            </div>
            <div className="col-12 col-md-6">
              <div className="mb-2">
                <label className="form-label">Background</label>
                <select
                  className="form-select form-select-sm"
                  name="background"
                  value={formData.background}
                  onChange={handleChange}
                  aria-label="Default select example"
                >
                  <option value="">Select Background</option>
                  <option value="dark">Dark</option>
                  <option value="light">Light</option>
                </select>
              </div>
              <div className="mb-2">
                <label className="form-label">Language</label>
                <select
                  className="form-select form-select-sm"
                  name="language"
                  value={formData.language}
                  onChange={handleChange}
                  aria-label="Default select example"
                >
                  <option value="">Select Language</option>
                  <option value="english">English</option>
                  <option value="chinese">Chinese</option>
                  <option value="german">German</option>
                </select>
              </div>
            </div>
            <div className="d-flex justify-content-center align-items-center  pt-3">
              <button
                type="button"
                onClick={() => handleSubmit()}
                className={`btn ${theme === 'dark' ? 'btn-primary' : 'btn-dark'} d-none d-md-block px-5`}
              >
                Submit
              </button>
              <button
                type="button"
                onClick={() => handleSubmit()}
                className={`btn ${theme === 'dark' ? 'btn-primary' : 'btn-dark'} d-block d-md-none px-5`}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Config
