import React, { useEffect, useState } from 'react'
import s from './Roulette.module.css'
import { useSelector } from 'react-redux'

import AddRoulleteTable from './AddRoulleteTable.js'

import showToast from '../../../components/Notification/ShowToast.js'
import { useColorModes } from '@coreui/react'
import axiosClient from '../../../axiosClient.js'
import Tables from './Tables.js'

const Roulette = () => {
  const theme = useSelector((state) => state.theme)
  const [addNew, setAddNew] = useState(true)
  const { colorMode, setColorMode } = useColorModes('coreui-free-react-admin-template-theme')
  const [formData, setFormData] = useState({
    table_name: '',
    min_bet: '',
    max_bet: '',
    side_bet_min: '',
    side_bet_max: '',
    s_message: '',
    table_type: 'Roulette',
    theme: '',
    language: '',
    background: '',
  })

  useEffect(() => {
    console.log('roullete', theme)
  }, [theme])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = async (e) => {
    if (formData.table_name == '') {
      showToast('Enter Table Name', 'info')
      return
    }
    if (formData.min_bet == '') {
      showToast('Enter Minimum Bet', 'info')
      return
    }

    if (formData.theme == '') {
      showToast(' Select Theme', 'info')
      return
    }
    if (formData.max_bet == '') {
      showToast('Enter Maximum Bet', 'info')
      return
    }
    if (formData.background == '') {
      showToast('Select Background', 'info')
      return
    }
    if (formData.side_bet_min == '') {
      showToast('Enter Side Bet Minimum', 'info')
      return
    }
    if (formData.language == '') {
      showToast('Select language', 'info')
      return
    }

    if (formData.side_bet_max == '') {
      showToast('Enter Side Bet Maximum', 'info')
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
    <div>
      <div className="w-100 d-flex justify-content-end ">
        <button
          type="button"
          onClick={() => setAddNew(!addNew)}
          className={`btn ${theme === 'dark' ? 'btn-primary' : 'btn-dark '} ${addNew == false ? 'd-block' : 'd-none '} btn-sm  px-3`}
        >
          Add
        </button>
        <button
          type="button"
          onClick={() => setAddNew(!addNew)}
          className={`btn ${theme === 'dark' ? 'btn-primary' : 'btn-dark '} ${addNew == true ? 'd-block' : 'd-none '} btn-sm  px-3`}
        >
          Close
        </button>
      </div>
      <div className={`w-100 ${addNew == true ? 'd-block' : 'd-none '}`}>
        <AddRoulleteTable />
      </div>

      <div className={`w-100 ${addNew == false ? 'd-block' : 'd-none '}`}>
        <Tables className="w-100 " />
      </div>
    </div>
  )
}

export default Roulette
