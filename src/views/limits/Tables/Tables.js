import React, { useEffect, useState, useRef } from 'react'
import s from './Tables.module.css'
import axiosClient from '../../../axiosClient'
import cards from 'src/assets/images/dashboard/cards.jpg'
import roulletImage from 'src/assets/images/tables/2.png'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { ScrollTrigger } from 'gsap/all'
import gsap from 'gsap'

gsap.registerPlugin(ScrollTrigger)

const Tables = (props) => {
  const scrollRef = useRef(null)
  const theme = useSelector((state) => state.theme)
  const navigate = useNavigate()
  const [tables, setTables] = useState([])
  const [originaltables, setOriginalTables] = useState([])
  const [search, setSearch] = useState('')

  const getTables = async () => {
    try {
      const { data } = await axiosClient.get(`/table/limits/get/tables/${props.id}`)
      setTables(data.result)
      setOriginalTables(data.result)
    } catch (error) {
      console.error(error)
    }
  }
  const handleSearch = (e) => {
    if (e.target.value === '') {
      setTables(originaltables)
    } else {
      const value = e.target.value.toLowerCase()
      const filtered = tables.filter((table) =>
        table.table_limit_name.toLowerCase().includes(value),
      )
      setTables(filtered)
      setSearch(value)
    }
  }

  const handleNavigate = (id) => {
    console.log('handleNavigate', id)
    navigate(`/limits/edit/table/${id}`)
  }

  useEffect(() => {
    getTables()
  }, [props.table, props.id])

  useEffect(() => {
    const cards = scrollRef.current.children
    const config = { threshold: 0.1 }

    // Intersection Observer callback function
    const observer = new IntersectionObserver((entries, self) => {
      const targets = entries
        .filter((entry) => entry.isIntersecting)
        .map((entry) => {
          self.unobserve(entry.target) // Stop observing once it's intersected
          return entry.target
        })

      // Call the fadeIn animation function
      fadeIn(targets)
    }, config)

    // Observe each card
    Array.from(cards).forEach((card) => observer.observe(card))

    return () => {
      observer.disconnect() // Cleanup the observer on component unmount
    }
  }, [tables, props.id, search])

  // Fade-in animation function using GSAP
  function fadeIn(targets) {
    gsap.to(targets, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: 'power4.inOut',
      stagger: 0.1,
    })
  }

  return (
    <div
      className={` ${theme === 'dark' ? 'text-light' : 'text-dark'} table-main h-100 py-2 container capitalize`}
    >
      <h2 className="text-center my-2">{props.table}</h2>
      <div className="w-100 d-flex h-100 justify-content-between align-items-end ">
        <div className={`${s.form__group} ${s.field}  poppins-400`}>
          <input
            onChange={handleSearch}
            type="input"
            className={`${s.form__field} ${theme === 'dark' ? 'd-block' : 'd-none'}`}
            placeholder="Name"
            required=""
          />
          <input
            onChange={handleSearch}
            type="input"
            className={`${s.form__field2} ${theme === 'dark' ? 'd-none' : 'd-block'} text-secondary`}
            placeholder="Name"
            required=""
          />
          <label for="name" className={`${s.form__label}`}>
            Search
          </label>
        </div>

        <div>
          <button
            type="button"
            onClick={() => props.toggleAddNew(true)}
            className={`btn ${theme === 'dark' ? 'btn-primary' : 'btn-dark'} btn-sm px-3 bg-gradient capitalize`}
          >
            Add {props.table}
          </button>
        </div>
      </div>
      <div className="row gap-0 w-100 px-3" ref={scrollRef}>
        {tables.map((table, i) => (
          <div
            key={i}
            className="col-12 col-sm-6 col-md-4 col-xxl-3 mb-3 mb-sm-0 mt-3"
            style={{ opacity: 0, transform: 'translateY(50px)' }}
          >
            <div
              onClick={() =>
                navigate(
                  `/dashboard/${table.game_type_name}/${table.game_type_id}/${table.table_limit_id}`,
                )
              }
              className={`card-hover poppins-400 ${s.box} ${theme === 'light' ? s.black : s.blue} pointer shadow`}
            >
              <div className="card border-0 overflow-hidden" style={{ width: '100%' }}>
                <div className="overflow-hidden">
                  <img
                    src={roulletImage}
                    className="card-img-top card-hover2 bg-dark bg-gradient drop_shadow"
                    alt="..."
                  />
                </div>
                <div className="card-body">
                  <h5 className="card-title fontSubHeading poppins-500">
                    {table.table_limit_name}
                  </h5>
                  <p className="card-text">
                    Game: {table.game_type_name} <br /> Language: {table.language}
                  </p>
                  <div className="d-flex justify-content-end">
                    <i
                      onClick={() => handleNavigate(table.table_limit_id)}
                      className={`bi bi-pen-fill icon-size font-size icon icon-hover pointer text-shadow icon-hover ${
                        theme === 'light' ? 'text-dark' : 'text-dark'
                      }`}
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
