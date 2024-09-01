import React, { useEffect, useState } from 'react'
import s from './Tables.module.css'
import axiosClient from '../../../axiosClient'
import roulleteWheel from 'src/assets/images/dashboard/roullete-wheel.png'
import { useNavigate } from 'react-router-dom'

const Tables = (props) => {
  const navigate = useNavigate()
  const [tables, setTables] = useState([])
  const getTables = async () => {
    const { data } = await axiosClient.get(`/table/limits/get/tables/${props.id}`)

    setTables(data.result)
  }

  const handleNavigate = (id) => {
    navigate(`/limits/edit/table/${id}`)
  }

  useEffect(() => {
    console.log('tables', tables)
  }, [tables])

  useEffect(() => {
    getTables()
    console.log('table', props.table)
    console.log('id', props.id)
  }, [])
  return (
    <div className=" table-main h-100  py-2 container">
      <h2 className="text-center my-2">Tables</h2>
      <div className="row gap-0 w-100 px-3 ">
        {tables.map((table, i) => (
          <div className="col-12 col-sm-3  mb-3 mb-sm-0 mt-2">
            <div
              className="card card-hover shadow border-0  p-0  "
              style={{ backgroundColor: table.background }}
            >
              <div className="card-body   m-0 d-flex  ">
                <div className=" ">
                  <img src={roulleteWheel} className="" style={{ width: '100px' }} />
                </div>
                <div className=" w-100">
                  <div>
                    <h5 className="card-title  capitalize">{table.table_limit_name}</h5>
                    <p className="card-text capitalize ">{table.table_type_name}</p>
                  </div>
                  <div className=" d-flex justify-content-end ">
                    <i
                      onClick={() => handleNavigate(table.table_limit_id)}
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
  )
}

export default Tables
