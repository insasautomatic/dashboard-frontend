import React, { useEffect, useState } from 'react'
//import s from './UpdateTableLimits.module.css'
import showToast from '../../../components/Notification/ShowToast'
import { Modal } from 'bootstrap'

import axiosClient from '../../../axiosClient'
import roulleteWheel from 'src/assets/images/dashboard/roullete-wheel.png'
import { useNavigate } from 'react-router-dom'

const UpdateLanguages = (props) => {
  const navigate = useNavigate()
  const [languages, setLanguages] = useState([])
  const [form, setForm] = useState({ language_id: '', language: '' })
  const getLanguages = async () => {
    const { data } = await axiosClient.get(`/config/get/language`)
    console.log(data)

    setLanguages(data.languages)
  }

  const handleSetForm = (language) => {
    setForm({ language_id: language.language_id, language: language.language })
  }

  const updateLanguage = async () => {
    try {
      const { data } = await axiosClient.put(`/config/update/language/${form.language_id}`, form)
      console.log(data)
      showToast('Language updated successfully!', 'success')
      const temp = languages
      for (let i in temp) {
        if (temp[i].language_id == form.language_id) {
          temp[i].language = form.language
        }
      }
      setLanguages(temp)
    } catch (error) {
      console.error(error)
      showToast('Error while updating Language', 'error')
    }
  }

  useEffect(() => {
    console.log('Languages', languages)
    console.log('form after setting', form)
  }, [languages, form])

  useEffect(() => {
    getLanguages()
  }, [])
  return (
    <>
      <div
        className="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel"></h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label htmlFor="language" className="form-label">
                  Language Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="language"
                  value={form.language}
                  onChange={(e) => setForm({ ...form, language: e.target.value })}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                Close
              </button>
              <button
                onClick={updateLanguage}
                type="button"
                className="btn btn-primary"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ///////////////////////////////////////////////////////////////////////// */}
      <div className=" table-main  py-2 container">
        <h2 className="text-center my-2">Languages</h2>
        <div className="row gap-0 w-100 px-3 ">
          {languages.map((language, i) => (
            <div key={i} className="col-12 col-sm-3  mb-3 mb-sm-0 mt-2">
              <div className="card card-hover shadow border-0  p-0  ">
                <div className="card-body   m-0 d-flex  ">
                  <div className=" ">
                    <img src={roulleteWheel} className="" style={{ width: '100px' }} />
                  </div>
                  <div className=" w-100">
                    <div className="">
                      <h5 className="card-title  capitalize">{language.language}</h5>
                      <p className="card-text capitalize "></p>
                    </div>
                    <div className=" d-flex justify-content-end ">
                      <i
                        onClick={() => handleSetForm(language)}
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal"
                        class="bi bi-pen-fill icon-size font-size icon pointer text-shadow icon-hover"
                      ></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default UpdateLanguages
