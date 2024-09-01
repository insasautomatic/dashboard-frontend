import React, { useEffect, useState } from 'react'
import s from './Tables.module.css'
import axiosClient from '../../../axiosClient'
import cards from 'src/assets/images/dashboard/cards.jpg'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Tables = (props) => {
  const theme = useSelector((state) => state.theme)
  const navigate = useNavigate()
  const [tables, setTables] = useState([])
  const getTables = async () => {
    try {
      const { data } = await axiosClient.get(`/table/limits/get/tables/${props.id}`)

      setTables(data.result)
    } catch (error) {
      console.error(error)
    }
  }

  const handleNavigate = (id) => {
    navigate(`/limits/edit/table/${id}`)
  }

  useEffect(() => {
    console.log('tables', tables)
    console.log('theme', theme)
  }, [tables, theme])

  useEffect(() => {
    getTables()
    console.log('table', props.table)
    console.log('id', props.id)
  }, [])
  return (
    <div className=" table-main h-100  py-2 container capitalize">
      <h2 className="text-center my-2 ">{props.table}</h2>
      <div className="row gap-0 w-100 px-3 ">
        {tables.map((table, i) => (
          <div key={i} className="col-12 col-sm-3  mb-3 mb-sm-0 mt-2">
            <div
              className={`card card-hover shadow border-0  p-0  `}
              style={{ backgroundColor: table.background }}
            >
              <div className="card border-0" style={{ width: '100%' }}>
                <img src={cards} className="card-img-top" alt="..." />
                <div className="card-body ">
                  <h5 className="card-title">{table.table_limit_name}</h5>
                  <p className="card-text">
                    Game : {table.game_type_name} <br /> Language: {table.language}
                  </p>
                  <p className="card-text"></p>
                  <div className=" d-flex justify-content-end ">
                    <i
                      onClick={() => handleNavigate(table.table_limit_id)}
                      className={` ${theme === 'light' ? 'text-dark' : 'text-dark '}bi bi-pen-fill icon-size font-size icon pointer text-shadow icon-hover`}
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
