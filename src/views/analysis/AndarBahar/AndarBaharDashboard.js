import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import axiosClient from '../../../axiosClient'

import carrdImage from 'src/assets/images/baccarat/card.png'

import s from './AndarBaharDashboard.module.css'

import { ScrollTrigger } from 'gsap/all'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { CustomEase } from 'gsap/all'

gsap.registerPlugin(CustomEase)

const AndarBaharDashboard = () => {
  const theme = useSelector((state) => state.theme)
  const [renderKey, setRenderKey] = useState(0)

  const { game, table_limit_name, game_type_id, table_limit_id } = useParams()

  const [data, setData] = useState([])
  const [andarCards, setAndarCards] = useState([])
  const [baharCards, setBaharCards] = useState([])
  const [rouletteData, setRouletteData] = useState([])
  const [form, setForm] = useState({})

  const [themeClass, setThemeClass] = useState('bg-light text-dark border')
  const [themeBorder, setThemeBorder] = useState('bg-light text-dark border')
  const [statistics, setStatistics] = useState('WheelPocketStatistics')
  const [live, setLive] = useState(false)

  const [liveData, setLiveData] = useState({
    date_time: '-',
    game_type_id: null,
    roulette_id: null,
    spine_numeric: null,
    state: null,
    table_Name: '-',
    table_limit_id: null,
    warning_flags: null,
    wheel_direction: null,
    wheel_speed: null,
    winning_number: null,
  })

  const [sDaviation, setSDaviation] = useState([])
  const [standardDeviation, setStandardDeviation] = useState(0)

  const [limit, setLimit] = useState(100)
  const [radioLimit, setRadioLimit] = useState(null)
  const [callOnTimeInterval, setCallOnTimeInterval] = useState(true)
  const [customLimit, setCustomLimit] = useState(100)
  const [fromDate, setFromDate] = useState('')
  const [toDate, setToDate] = useState('')

  useEffect(() => {
    if (limit) {
      getGameData(limit) // Call getGameData with the updated limit
    }
  }, [limit])

  const getGameData = async (limitParam) => {
    const limitToUse = limitParam || limit
    const res = await axiosClient.get(
      `/game/get/andar_bahar/${game_type_id}/${table_limit_id}/${limit}`,
    )
    processData(res.data.result)
    setRenderKey(renderKey + 1)
    localStorage.setItem('callOnTimeInterval', true)
  }

  const processData = (resData) => {
    //console.log('tempRoulleteData: ', tempRoulleteData)

    let live = false
    const currentTime = new Date()
    console.log('time: ', currentTime)

    //checking if connection is live
    // Check if resData[0].date_time exists and is exactly 1 minute before current time
    if (resData.length > 0 && resData[0].date_time) {
      const resDataTime = new Date(resData[0].date_time)
      const diffInMs = currentTime - resDataTime
      const diffInMinutes = diffInMs / (1000 * 60)

      if (diffInMinutes <= 1) {
        live = true // Set live to true if difference is 1 minute or less
      }
    }

    console.log('live status: ', live)
    setLive(live)
    if (live == true) {
      setLiveData(resData[0])
    }

    let andarTotal = 0
    let baharTotal = 0

    for (let i in resData) {
      const splittedAndar = resData[i].andar_cards.split(',')
      const splittedBahar = resData[i].bahar_cards.split(',')

      resData[i].splittedAndar = splittedAndar
      resData[i].splittedBahar = splittedBahar

      if (resData[i].winner == 'A') andarTotal++
      if (resData[i].winner == 'B') baharTotal++
    }

    let streak = []
    let tempStreak = []
    let andarStreak = 0
    let baharStreak = 0
    let curWinner = resData[0].winner
    for (let i = 1; i < resData.length; i++) {
      if (curWinner == resData[i].winner) {
        tempStreak.push(curWinner)
      } else {
        if (tempStreak.length > 0) {
          streak.push(tempStreak)
          tempStreak = []
        }
        curWinner = resData[i].winner
      }
    }

    if (tempStreak.length > 0) streak.push(tempStreak)

    for (let i in streak) {
      if (streak[i][0] == 'A') andarStreak++
      else baharStreak++
    }

    let tempAndarCards = resData[0].splittedAndar
    let tempAndarCards2 = []
    let tempBaharCards = resData[0].splittedBahar
    let tempBaharCards2 = []

    for (let i in tempAndarCards) {
      if (i == 0) {
        tempAndarCards2.push({ name: tempAndarCards[i], position: 0 })
      } else {
        tempAndarCards2.push({
          name: tempAndarCards[i],
          position: tempAndarCards2[tempAndarCards2.length - 1].position + 3,
        })
      }
    }

    for (let i in tempBaharCards) {
      if (i == 0) {
        tempBaharCards2.push({ name: tempBaharCards[i], position: 0 })
      } else {
        tempBaharCards2.push({
          name: tempBaharCards[i],
          position: tempBaharCards2[tempBaharCards2.length - 1].position + 3,
        })
      }
    }

    console.log('tempAndarCards: ', tempAndarCards2)
    console.log('tempBaharCards2: ', tempBaharCards2)

    console.log('res.data.result: ', resData)
    setAndarCards(tempAndarCards2)
    setBaharCards(tempBaharCards2)
    console.log('andarTotal: ', andarTotal)
    console.log('baharTotal: ', baharTotal)
    console.log('streak: ', streak)
    console.log('andarStreak: ', andarStreak)
    console.log('baharStreak: ', baharStreak)
  }

  useEffect(() => {
    console.log('andarCards: ', andarCards)
    console.log('baharCards: ', baharCards)
  }, [andarCards, baharCards])

  useEffect(() => {
    setThemeClass(
      theme === 'dark'
        ? `bg-dark text-light border-secondary border-opacity-25 shadow-xs ${s.placeholder_grey}`
        : `text-dark  border border `,
    )

    setThemeBorder(
      theme === 'dark'
        ? `bg-dark bg-gradient bg-opacity-25  text-light border-secondary  border-opacity-50  ${s.placeholder_grey}`
        : `text-dark bg-light bg-gradient border `,
    )
  }, [theme])

  useEffect(() => {
    gsap.from('.animateAndar', {
      delay: 0.2,
      opacity: 0,
      x: -50,
      duration: 0.7,
      ease: 'power4.out',
      stagger: 0.1,
    })
  }, [andarCards])
  useEffect(() => {
    gsap.from('.animateBahar', {
      delay: 0.2,
      opacity: 0,
      x: -50,
      duration: 0.7,
      ease: 'power4.out',
      stagger: 0.1,
    })
  }, [baharCards])

  return (
    <div className={` ${theme === 'dark' ? 'text-light' : 'text-dark'} pb-4 `}>
      <div className={``}>
        <h1 className="">AndarBaharDashboard</h1>
        <div
          className={`${andarCards.length > 0 ? '' : 'd-none'} shadow-s p-2 rounded overflow-x-auto  ${themeClass} `}
          style={{ height: '300px' }}
        >
          <div
            className={` h-100  d-flex position-relative justify-content-start align-items-center`}
            style={{ position: 'relative', width: '100%' }}
          >
            {andarCards.length > 0 && andarCards[0].position !== undefined ? (
              andarCards.map((card, index) => (
                <div
                  key={index}
                  className={`animateAndar h-100`}
                  style={{
                    position: 'absolute',
                    left: `${card.position}rem`,
                  }}
                >
                  <div className={`d-flex justify-content-center align-items-center`}>
                    <div className={``}>{card.name}</div>
                  </div>
                  <img
                    src={carrdImage}
                    alt=""
                    className={`card_drop_shadow`}
                    style={{ height: '100%', transform: 'rotateY(15deg)' }}
                  />
                </div>
              ))
            ) : (
              <p>No cards available</p>
            )}
          </div>
        </div>
        <div
          className={`${andarCards.length > 0 ? '' : 'd-none'} shadow-s p-2 rounded overflow-x-auto mt-3  ${themeClass} `}
          style={{ height: '300px' }}
        >
          <div
            className={` h-100  d-flex position-relative justify-content-start align-items-center`}
            style={{ position: 'relative', width: '100%' }}
          >
            {baharCards.length > 0 && baharCards[0].position !== undefined ? (
              baharCards.map((card, index) => (
                <div
                  key={index}
                  className={`animateBahar h-100`}
                  style={{
                    position: 'absolute',
                    left: `${card.position}rem`,
                  }}
                >
                  <div className={`d-flex justify-content-center align-items-center`}>
                    <div className={``}>{card.name}</div>
                  </div>
                  <img
                    src={carrdImage}
                    alt=""
                    className={`card_drop_shadow`}
                    style={{ height: '100%', transform: 'rotateY(15deg)' }}
                  />
                </div>
              ))
            ) : (
              <p>No cards available</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AndarBaharDashboard
