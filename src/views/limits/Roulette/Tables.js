import React from 'react'
import s from './Tables.module.css'

const Tables = () => {
  return (
    <div className=" table-main border container">
      <h2>Tables</h2>
      <div className="row gap-0 w-100 ">
        <div className="col-md-3 border border col-sm-6 col-12 h-25"></div>
        <div className="col-md-3 border border-danger col-sm-6 col-12 h-25"></div>
        <div className="col-md-3 border border-primary col-sm-6 col-12 h-25"></div>
        <div className="col-md-3 border border-success col-sm-6 col-12 h-25"></div>
      </div>
    </div>
  )
}

export default Tables
