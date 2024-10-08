import React, { useEffect, useState } from 'react'
import s from './Backgrounds.module.css'
import showToast from '../../../components/Notification/ShowToast'
import { Modal } from 'bootstrap'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { useSelector } from 'react-redux'

import gsap from 'gsap'

import axiosClient from '../../../axiosClient'
import roulleteWheel from 'src/assets/images/dashboard/roullete-wheel.png'
import { useNavigate } from 'react-router-dom'

const UpdateBackgrounds = (props) => {
  const [parent, animateParent] = useAutoAnimate()
  const theme = useSelector((state) => state.theme)

  const navigate = useNavigate()
  const [originalBackgrounds, setOriginalBackgrounds] = useState([])
  const [backgrounds, setBackgrounds] = useState([])

  const [form, setForm] = useState({ background_id: '', background: '' })
  const [search, setSearch] = useState('')
  const getBackgrounds = async () => {
    const { data } = await axiosClient.get(`/config/get/background`)
    console.log(data)

    setBackgrounds(data.backgrounds)
    setOriginalBackgrounds(data.backgrounds)
  }

  const handleSetForm = (background) => {
    setForm({ background_id: background.background_id, background: background.background })
  }

  const updateBackground = async () => {
    try {
      const { data } = await axiosClient.put(
        `/config/update/background/${form.background_id}`,
        form,
      )
      console.log(data)
      showToast('Background updated successfully!', 'success')
      const temp = backgrounds.map((background) =>
        background.background_id === form.background_id
          ? { ...background, background: form.background }
          : background,
      )
      setBackgrounds(temp)
      setOriginalBackgrounds(temp)
    } catch (error) {
      console.error(error)
      showToast('Error while updating Background', 'error')
    }
  }

  useEffect(() => {
    console.log('Backgrounds', backgrounds)
    console.log('form after setting', form)
  }, [backgrounds, form])

  useEffect(() => {
    getBackgrounds()
  }, [])

  const handleSearch = (e) => {
    if (e.target.value === '') {
      setBackgrounds(originalBackgrounds)
    } else {
      const value = e.target.value.toLowerCase()
      const filtered = backgrounds.filter((background) =>
        background.background.toLowerCase().includes(value),
      )
      setBackgrounds(filtered)
      setSearch(value)
    }
  }

  useEffect(() => {
    gsap.fromTo(
      '.fade-in',
      {
        delay: 0.5,
        opacity: 0,
        y: 50,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power1.out',
      },
    )
    gsap.from('.animate', {
      delay: 0.2,
      opacity: 0,
      y: 50,
      duration: 0.4,
      ease: 'power1.out',
      stagger: 0.5,
    })
  }, [theme])

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
              <div className="mb-3 ">
                <div className={`${s.form__group} ${s.field} `}>
                  <input
                    onChange={handleSearch}
                    type="input"
                    className={`${s.form__field} ${theme === 'dark' ? 'd-block' : 'd-none'} `}
                    placeholder="Name"
                    required=""
                  />
                  <input
                    onChange={handleSearch}
                    type="input"
                    className={`${s.form__field2} ${theme === 'dark' ? 'd-none' : 'd-block'}`}
                    placeholder="Name"
                    required=""
                  />
                  <label for="name" className={`${s.form__label}`}>
                    Search
                  </label>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                Close
              </button>
              <button
                onClick={updateBackground}
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
      <div className={`mb-3  ${theme === 'dark' ? 'text-light' : 'text-dark'} fade-in`}>
        <label htmlFor="search" className="form-label animate">
          Search
        </label>
        <input type="text" className="form-control " id="search" onChange={handleSearch} />
      </div>
      <div className="table-responsive animate">
        <table
          className={`table table-striped ${theme === 'dark' ? 'table-dark' : 'table-light'} table-hover table-bordered table-sm rounded`}
        >
          <thead>
            <tr>
              <th scope="col">Background</th>
              <th scope="col">Color</th>
              <th scope="col">Edit</th>
            </tr>
          </thead>
          <tbody ref={parent}>
            {backgrounds.map((background, i) => (
              <tr key={i}>
                <td>{background.background}</td>
                <td className="">
                  <div className="" style={{ height: '1rem', width: '1rem' }}>
                    <div
                      className="w-100 rounded h-100"
                      style={{
                        width: '10px',
                        height: '10px',
                        backgroundColor: background.background,
                      }}
                    ></div>
                  </div>
                </td>
                <td>
                  <i
                    onClick={() => handleSetForm(background)}
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    class="bi bi-pen-fill icon-size font-size icon pointer text-shadow icon-hover "
                  ></i>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}
export default UpdateBackgrounds
