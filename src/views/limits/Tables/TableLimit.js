import React, { useEffect, useState } from 'react'
import s from './TableLimit.module.css'
import { useSelector } from 'react-redux'
import { useAutoAnimate } from '@formkit/auto-animate/react'

import AddTable from './AddTable.js'

import showToast from '../../../components/Notification/ShowToast.js'
import { useColorModes } from '@coreui/react'
import axiosClient from '../../../axiosClient.js'
import Tables from './Tables.js'
import { useParams } from 'react-router-dom'

const TableLimits = () => {
  const { game, id } = useParams()
  const theme = useSelector((state) => state.theme)
  const [addNew, setAddNew] = useState(false)
  const { colorMode, setColorMode } = useColorModes('coreui-free-react-admin-template-theme')

  useEffect(() => {
    //console.log('roullete', theme)
    setAddNew(false)
    console.log('game', game)
    console.log('id', id)
  }, [theme, id])

  const [parent, animateParent] = useAutoAnimate()
  const [child1, animateChild1] = useAutoAnimate()
  const [child2, animateChild2] = useAutoAnimate()

  return (
    <div className="  h-100">
      <div className="w-100 d-flex h-100 justify-content-end ">
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
      <div ref={parent} className="w-100 h-100">
        <div ref={child1} className={`w-100 ${addNew == true ? 'd-block' : 'd-none'}`}>
          {/*  <AddTable table={game} id={id} /> */}
        </div>

        <div ref={child2} className={`w-100 ${addNew == false ? 'd-block' : 'd-none'}`}>
          <Tables key={id} table={game} id={id} className="w-100 " />
        </div>
      </div>
    </div>
  )
}

export default TableLimits
