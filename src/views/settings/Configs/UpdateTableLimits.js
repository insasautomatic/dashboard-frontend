import React, { useEffect, useState } from 'react'
//import s from './UpdateTableLimits.module.css'
import showToast from '../../../components/Notification/ShowToast'
import { Modal } from 'bootstrap'

import axiosClient from '../../../axiosClient'
import roulleteWheel from 'src/assets/images/dashboard/roullete-wheel.png'
import { useNavigate } from 'react-router-dom'

const UpdateTableLimits = (props) => {
  const navigate = useNavigate()
  const [tables, setTables] = useState([])
  const [form, setForm] = useState({ table_type_id: '', table_type_name: '' })
  const getTables = async () => {
    const { data } = await axiosClient.get(`/config/get/table/type`)
    console.log(data)

    setTables(data.table_types)
  }

  const handleSetForm = (table) => {
    setForm({ table_type_id: table.table_type_id, table_type_name: table.table_type_name })
  }

  const updateTableType = async () => {
    try {
      const { data } = await axiosClient.put(
        `/config/update/table/type/${form.table_type_id}`,
        form,
      )
      console.log(data)
      showToast('Table Type updated successfully!', 'success')
      const temp = tables
      for (let i in temp) {
        if (temp[i].table_type_id == form.table_type_id) {
          temp[i].table_type_name = form.table_type_name
        }
      }
      setTables(temp)
    } catch (error) {
      console.error(error)
      showToast('Error while updating Table Type', 'error')
    }
  }

  useEffect(() => {
    console.log('tables', tables)
    console.log('form after setting', form)
  }, [tables, form])

  useEffect(() => {
    getTables()
    console.log('table', props.table)
    console.log('id', props.id)
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
                <label htmlFor="table_type_name" className="form-label">
                  Table Type Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="table_type_name"
                  value={form.table_type_name}
                  onChange={(e) => setForm({ ...form, table_type_name: e.target.value })}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                Close
              </button>
              <button
                onClick={updateTableType}
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
        <h2 className="text-center my-2">Tables</h2>
        <div className="row gap-0 w-100 px-3 ">
          {tables.map((table, i) => (
            <div className="col-12 col-sm-3  mb-3 mb-sm-0 mt-2">
              <div className="card card-hover shadow border-0  p-0  ">
                <div className="card-body   m-0 d-flex  ">
                  <div className=" ">
                    <img src={roulleteWheel} className="" style={{ width: '100px' }} />
                  </div>
                  <div className=" w-100">
                    <div className="">
                      <h5 className="card-title  capitalize">{table.table_type_name}</h5>
                      <p className="card-text capitalize "></p>
                    </div>
                    <div className=" d-flex justify-content-end ">
                      <i
                        onClick={() => handleSetForm(table)}
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

export default UpdateTableLimits
