import s from './AndarBahar.module.css'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'

const AndarBahar = () => {
  const theme = useSelector((state) => state.theme)

  useEffect(() => {
    console.log(theme)
  }, [theme])

  return (
    <div className=" py-3 ">
      <h1 className="text-center py-3">Andar Bahar</h1>
      <div className="h-100 w-100 d-flex justify-content-center">
        <div
          className={`row ${s.form} border-bottom border-2 border-top ${theme === 'dark' ? 'border-primary' : 'border-dark'}   rounded-4 p-4 shadow-lg`}
        >
          <div className="col-12 col-md-6 ">
            <div className="mb-2  ">
              <label className="form-label">Table Name</label>
              <input
                className="form-control form-control-sm"
                type="text"
                placeholder="Enter Table Name"
                aria-label=".form-control-sm example"
              />
            </div>
            <div className="mb-2  ">
              <label className="form-label">Theme</label>
              <select className="form-select form-select-sm" aria-label="Default select example">
                <option selected>Select Theme</option>
                <option value="1">Dark</option>
                <option value="2">Light</option>
              </select>
            </div>
            <div className="mb-2  ">
              <label className="form-label">Background</label>
              <select className="form-select form-select-sm" aria-label="Default select example">
                <option selected>Select Background</option>
                <option value="1">Dark</option>
                <option value="2">Light</option>
              </select>
            </div>
            <div className="mb-2  ">
              <label className="form-label">Language</label>
              <select className="form-select form-select-sm" aria-label="Default select example">
                <option selected>Select Language</option>
                <option value="1">English</option>
                <option value="2">Chines</option>
                <option value="3">German</option>
              </select>
            </div>
          </div>
          <div className="col-12 col-md-6 ">
            <div className="mb-2  ">
              <label className="form-label">Minimum</label>
              <input
                className="form-control form-control-sm"
                type="text"
                placeholder="Enter Minimum"
                aria-label=".form-control-sm example"
              />
            </div>
            <div className="mb-2  ">
              <label className="form-label">Maximum</label>
              <input
                className="form-control form-control-sm"
                type="text"
                placeholder="Enter Maximum"
                aria-label=".form-control-sm example"
              />
            </div>
            <div className="mb-2  ">
              <label className="form-label">Side Bet Minium</label>
              <input
                className="form-control form-control-sm"
                type="text"
                placeholder="Enter Side Bet . . ."
                aria-label=".form-control-sm example"
              />
            </div>
            <div className="mb-2  ">
              <label className="form-label">Side Bet Maximum</label>
              <input
                className="form-control form-control-sm"
                type="text"
                placeholder="Enter Side Bet . . ."
                aria-label=".form-control-sm example"
              />
            </div>
          </div>
          <div className="d-flex justify-content-center pt-3">
            <button
              type="button"
              className={`btn ${theme === 'dark' ? 'btn-primary' : 'btn-dark'} d-none d-md-block px-5`}
            >
              Submit
            </button>
            <button type="button" className="btn btn-dark btn-sm d-block d-md-none px-5 px-5">
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AndarBahar
