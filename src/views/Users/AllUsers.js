import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import DataTable, { createTheme } from 'react-data-table-component'
import { GetCurrent } from '../../getCurrent'
import axiosClient from '../../axiosClient'
import s from './AllUsers.module.css'
import { Link } from 'react-router-dom'

// Define a custom dark theme for DataTable
createTheme('customDark', {
  text: {
    primary: '#FFFFFF',
    secondary: '#FFFFFF',
  },
  background: {
    default: '#1d222b',
    hover: '#4a4a4a',
    header: '#333131',
    footer: '#333131',
    contextual: '#333131',
  },
  context: {
    background: '#2a2a2a',
    text: '#FFFFFF',
  },
  divider: {
    default: '#3a3a3a',
  },
  button: {
    default: '#FFFFFF',
    hover: '#1a7cb8',
    focus: '#1a7cb8',
    disabled: '#2a2a2a',
  },
  sortFocus: {
    default: '#2a9fd1',
  },
  actionButton: {
    default: '#FFFFFF',
    hover: '#1a7cb8',
  },
  highlightOnHover: {
    default: '#4a4a4a',
  },
  dropdown: {
    background: '#4a4a4a',
    text: '#FFFFFF',
    option: {
      background: '#2b2b2b',
      text: '#FFFFFF',
      hoverBackground: '#3a3a3a',
    },
  },
})

const AllUsers = () => {
  const theme = useSelector((state) => state.theme)
  const [users, setUsers] = useState([])
  let user = ''

  useEffect(() => {
    getCurrent().then(() => {
      getUsers()
    })
  }, [])

  const getCurrent = async () => {
    const res = await GetCurrent()
    user = res
    return
  }

  const getUsers = async () => {
    const res = await axiosClient.get('/user/get/users')
    let users = res.data.users
    users = users.filter((u) => u.user_id !== user.user_id)
    setUsers(users)
  }

  const columns = [
    {
      name: 'Name',
      selector: (row) => row.name,
      sortable: true,
      minWidth: '100px',
    },
    {
      name: 'Email',
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: 'Role',
      selector: (row) => row.roleType,
      sortable: true,
    },
    {
      name: ' Action',
      cell: (row) => (
        <div className={``}>
          <div className="">
            <span
              className={`rounded-1 text-light border-0  px-1  d-flex justify-content-center align-items-center gap-4 ${theme == 'dark' ? 'text-light' : 'text-dark'} `}
            >
              <Link to={`/user/${row.user_id}`}>
                <i
                  className={`bi bi-eye-fill drop_shadow pointer icon-hover ${theme == 'dark' ? 'text-light' : 'text-dark'} `}
                ></i>
              </Link>
              <Link to={`/update/user/${row.user_id}`} className="icon-hover">
                <i
                  className={`bi bi-pen-fill drop_shadow pointer icon-hover ${theme == 'dark' ? 'text-light' : 'text-dark'}`}
                ></i>
              </Link>
              <i class={`bi bi-hand-thumbs-up-fill text-success drop_shadow ${row.active == true ? '':'d-none'}`}></i>
              <i class={`bi bi-hand-thumbs-down-fill text-danger drop_shadow ${row.active == false ? '':'d-none'}`}></i>
            </span>
          </div>
        </div>
      ),
    },
  ]

  return (
    <div className={`${theme === 'dark' ? 'text-light' : 'text-dark'} pb-4`}>
      <div className={`w-100 px-3 d-flex justify-content-end`}>

        <Link to='/add/user'>
        <button
          type="button"
          className={`btn ${theme === 'dark' ? 'btn-primary' : 'btn-dark'} btn-sm px-3 bg-gradient capitalize`}
          >
          Add User
        </button>
          </Link>
      </div>

      <div className="w-100">
        <DataTable
          className=""
          columns={columns}
          data={users}
          theme={theme === 'dark' ? 'customDark' : 'light'}
          selectableRows
          pagination
          highlightOnHover
        />
      </div>
    </div>
  )
}

export default AllUsers
