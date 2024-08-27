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

  const handleAddtheme = async () => {
    if (formData.theme == '') {
      showToast('Enter Theme', 'info')
      return
    }

    try {
      const response = await axiosClient.post('config/add/theme', formData)
      console.log(response)
      showToast('Theme added successfully!', 'success')
    } catch (error) {
      showToast('Error while adding theme', 'error')
      console.error(error)
    }
  }

  const handleAddTableType = async () => {
    if (formData.table_type == '') {
      showToast('Enter Table Type', 'info')
      return
    }

    try {
      const response = await axiosClient.post('config/add/table/type', formData)
      console.log(response)
      showToast('Table Type added successfully!', 'success')
    } catch (error) {
      showToast('Error while adding Table Type', 'error')
      console.error(error)
    }
  }

  const handleAddBackground = async () => {
    if (formData.background == '') {
      showToast('Enter Background', 'info')
      return
    }

    try {
      const response = await axiosClient.post('config/add/background', formData)
      console.log(response)
      showToast('Background added successfully!', 'success')
    } catch (error) {
      showToast('Error while adding Background', 'error')
      console.error(error)
    }
  }

  const handleAddLanguage = async () => {
    if (formData.language == '') {
      showToast('Enter Language', 'info')
      return
    }

    try {
      const response = await axiosClient.post('config/add/language', formData)
      console.log(response)
      showToast('Language added successfully!', 'success')
    } catch (error) {
      showToast('Error while adding Language', 'error')
      console.error(error)
    }
  }

  const handleSubmit = async (e) => {
    if (formData.table_type == '') {
      showToast('Enter Table Name', 'info')
      return
    }

    if (formData.theme == '') {
      showToast('Enter Theme', 'info')
      return
    }

    if (formData.background == '') {
      showToast('Enter Background', 'info')
      return
    }

    if (formData.language == '') {
      showToast('Enter Language', 'info')
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
      <div className={`${s.container}  d-flex justify-content-center `}>
        <div className={` w-100 d-flex justify-content-center align-items-center `}>
          <div
            className={`row ${s.form} border-bottom border-2 border-top py-3 py-md-5 ${
              theme === 'dark' ? 'border-primary' : 'border-dark'
            } rounded-4 p-4 shadow-lg`}
          >
            <div className="col-12 d-flex justify-content-center align-items-center col-md-6  border-0  border-md-1 border-md-end">
              <div className="h-100 d-flex flex-column justify-content-evenly">
                <div className="mb-2  ">
                  <label className="form-label">Table Type</label>
                  <div className="d-flex   align-items-center gap-2 flex-md-row">
                    <input
                      type="text"
                      className="form-control "
                      placeholder="Enter"
                      name="table_type"
                      value={formData.table_type}
                      onChange={handleChange}
                    />
                    <div className="my-1 px-1 ">
                      <button
                        onClick={handleAddTableType}
                        type="button"
                        className={`btn ${theme === 'dark' ? 'btn-primary' : 'btn-dark '} btn-sm  px-3`}
                      >
                        Add
                      </button>
                    </div>
                  </div>
                </div>

                <div className="mb-2  ">
                  <label className="form-label">Theme</label>
                  <div className="d-flex   align-items-center gap-2 flex-md-row">
                    <input
                      type="text"
                      className="form-control "
                      placeholder="Enter"
                      name="theme"
                      value={formData.theme}
                      onChange={handleChange}
                    />
                    <div className="my-1 px-1 ">
                      <button
                        onClick={handleAddtheme}
                        type="button"
                        className={`btn ${theme === 'dark' ? 'btn-primary' : 'btn-dark '} btn-sm  px-3`}
                      >
                        Add
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-12 d-flex justify-content-center align-items-center col-md-6 border-0  ">
              <div className="h-100 d-flex flex-column justify-content-evenly">
                <div className="mb-2  ">
                  <label className="form-label">Background</label>
                  <div className="d-flex   align-items-center gap-2 flex-md-row">
                    <input
                      type="text"
                      className="form-control "
                      placeholder="Enter"
                      name="background"
                      value={formData.background}
                      onChange={handleChange}
                    />
                    <div className="my-1 px-1 ">
                      <button
                        onClick={handleAddBackground}
                        type="button"
                        className={`btn ${theme === 'dark' ? 'btn-primary' : 'btn-dark '} btn-sm  px-3`}
                      >
                        Add
                      </button>
                    </div>
                  </div>
                </div>

                <div className="mb-2  ">
                  <label className="form-label">Language</label>
                  <div className="d-flex   align-items-center gap-2 flex-md-row">
                    <input
                      type="text"
                      className="form-control "
                      placeholder="Enter"
                      name="language"
                      value={formData.language}
                      onChange={handleChange}
                    />
                    <div className="my-1 px-1 ">
                      <button
                        onClick={handleAddLanguage}
                        type="button"
                        className={`btn ${theme === 'dark' ? 'btn-primary' : 'btn-dark '} btn-sm  px-3`}
                      >
                        Add
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Config
