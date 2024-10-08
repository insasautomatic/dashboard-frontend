import React, { useEffect, useState, useRef } from 'react'
import DataTable from 'react-data-table-component'
import { CPagination, CPaginationItem } from '@coreui/react'

import s from './DataTableComponent.module.css'

import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const DataTableComponent = (props) => {
  const [data, setData] = useState([])
  const theme = useSelector((state) => state.theme)

  useEffect(() => {
    if (props.data) {
      //console.log('props.data', props.data)
      //setData(tempData)
      setData(props.data)
    } else {
      setData(tempData)
    }
  }, [theme, props.data])

  const columns = [
    /*  {
      name: 'Table',
      selector: (row) => row.table_Name,
      sortable: true,
      minWidth: '100px',
    }, */
    {
      name: 'Date',
      selector: (row) => row.date_time,
      sortable: true,
    },
    {
      name: 'Winning No',
      cell: (row) => (
        <div className={``}>
          <div className="">
            <span
              className={`rounded-1 bg-gradient bg-success px-3 text-light border-0 bg-gradient px-1 shadow-xs `}
            >
              {row.winning_number}
            </span>
          </div>
        </div>
      ),
    },
    {
      name: ' Direction',
      selector: (row) => row.wheel_direction,
    },
    {
      name: ' Speed',
      cell: (row) => (
        <div className={s.percentage}>
          <div className="">
            <span
              className={`rounded-1 bg-gradient bg-primary text-light border-0 bg-gradient px-1 shadow-xs `}
            >
              {row.wheel_speed}
            </span>
          </div>
        </div>
      ),
    },
  ]

  const tempData = [
    {
      table_Name: 'Page A',
      date_time: 4000,
      winning_number: 2400,
      wheel_direction: 2400,
      wheel_speed: 100,
      per: 20,
      val: 5000,
    },
    {
      table_Name: 'Page B',
      date_time: 3000,
      winning_number: 1398,
      wheel_direction: 2210,
      wheel_speed: 50,
      per: 15,
      val: 3000,
    },
    {
      table_Name: 'Page C',
      date_time: 2000,
      winning_number: 9800,
      wheel_direction: 2290,
      wheel_speed: 150,
      per: 18,
      val: 4500,
    },
    {
      table_Name: 'Page D',
      date_time: 2780,
      winning_number: 3908,
      wheel_direction: 2000,
      wheel_speed: 80,
      per: 22,
      val: 6000,
    },
    {
      table_Name: 'Page E',
      date_time: 1890,
      winning_number: 4800,
      wheel_direction: 2181,
      wheel_speed: 120,
      per: 25,
      val: 7000,
    },
    {
      table_Name: 'Page F',
      date_time: 2390,
      winning_number: 3800,
      wheel_direction: 2500,
      wheel_speed: 100,
      per: 12,
      val: 4000,
    },
    {
      table_Name: 'Page G',
      date_time: 3490,
      winning_number: 4300,
      wheel_direction: 2100,
      wheel_speed: 90,
      per: 10,
      val: 3000,
    },
    {
      table_Name: 'Page H',
      date_time: 3490,
      winning_number: 4300,
      wheel_direction: 2100,
      wheel_speed: 90,
      per: 10,
      val: 3000,
    },
    {
      table_Name: 'Page I',
      date_time: 3490,
      winning_number: 4300,
      wheel_direction: 2100,
      wheel_speed: 90,
      per: 10,
      val: 3000,
    },
    {
      table_Name: 'Page J',
      date_time: 3490,
      winning_number: 4300,
      wheel_direction: 2100,
      wheel_speed: 90,
      per: 10,
      val: 3000,
    },
    {
      table_Name: 'Page K',
      date_time: 3490,
      winning_number: 4300,
      wheel_direction: 2100,
      wheel_speed: 90,
      per: 10,
      val: 3000,
    },
    {
      table_Name: 'Page L',
      date_time: 3490,
      winning_number: 4300,
      wheel_direction: 2100,
      wheel_speed: 90,
      per: 10,
      val: 3000,
    },
    {
      table_Name: 'Page M',
      date_time: 3490,
      winning_number: 4300,
      wheel_direction: 2100,
      wheel_speed: 90,
      per: 10,
      val: 3000,
    },
    {
      table_Name: 'Page N',
      date_time: 3490,
      winning_number: 4300,
      wheel_direction: 2100,
      wheel_speed: 90,
      per: 10,
      val: 3000,
    },
    {
      table_Name: 'Page O',
      date_time: 3490,
      winning_number: 4300,
      wheel_direction: 2100,
      wheel_speed: 90,
      per: 10,
      val: 3000,
    },
  ]

  // Custom styles for DataTable
  const customStyles = {
    rows: {
      style: {
        minHeight: '14px', // override the row height
      },
    },
    headCells: {
      style: {
        fontSize: '14px', // Set the font size for header cells
        fontWeight: 'semibold', // Set the font weight for header cells
      },
    },
    cells: {
      style: {
        fontSize: '12px', // Set the font size for table cells
      },
    },
    title: {
      style: {
        minHeight: '14px', // Set the font size for title
      },
    },
  }

  const handleRowClick = (row) => {
    console.log('Row clicked:', row)
  }

  return (
    <>
      <div
        className={` ${theme === 'dark' ? 'text-light' : 'text-dark'} ${'bg-' + theme} bg-gradient poppins-500 w-100   rounded overflow-hidden shadow-s`}
      >
        <div className="w-100 px-1">
          <div className="border-bottom border-secondary border-opacity-50 border-primary px-3 d-flex align-items-center h-100">
            <div className=" ">History</div>
          </div>
        </div>
        <DataTable
          className={`font8 text-dark overflow-x-scroll pointer ${s.rdt_Pagination}`}
          columns={columns}
          data={data}
          fixedHeader
          fixedHeaderScrollHeight="300px"
          pagination
          theme={theme === 'light' ? 'light' : 'dark'}
          customStyles={customStyles}
          highlightOnHover
          onRowClicked={handleRowClick}
          paginationPerPage="7"
          paginationRowsPerPageOptions={[5, 7, 10, 15]}
        />
      </div>
    </>
  )
}

export default DataTableComponent
