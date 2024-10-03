import React, { useEffect, useState, useRef } from 'react'
import s from './BaccaratDashboard.module.css'

import axiosClient from '../../../axiosClient.js'
import { useNavigate, useParams } from 'react-router-dom'

import { useSelector } from 'react-redux'
import { CFormInput, CFormCheck, CButton } from '@coreui/react'

import { ScrollTrigger } from 'gsap/all'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

import { Cards } from './BaccaratDashboardComponents/BaccaratData.js'

import StackedBarComponent from './BaccaratDashboardComponents/StackedBarComponent.js'
import PlayerBankerData2 from './BaccaratDashboardComponents/PlayerBankerData2.js'
import DoughnutChartComponent from './BaccaratDashboardComponents/DoughnutChartComponent.js'
import PieChartComponent from './BaccaratDashboardComponents/PieChartComponent.js'
import BarChartComponent from './BaccaratDashboardComponents/BarChartComponent.js'
import PlayerBankerDashboardComponent from './BaccaratDashboardComponents/PlayerBankerDashboardComponent.js'

const BaccaratDashboard = () => {
  const [renderKey, setRenderKey] = useState(0)
  const { game, table_limit_name, game_type_id, table_limit_id } = useParams()

  const [data, setData] = useState([])
  const [bankerVsPlayer, setBankerVsPlayer] = useState([
    { name: 'Banker', value: 0 },
    { name: 'Player', value: 0 },
    { name: 'Tie', value: 0 },
  ])

  const [form, setForm] = useState({})
  const theme = useSelector((state) => state.theme)
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

  const [limit, setLimit] = useState(1000)
  const [shoes, setShoes] = useState([])
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

  const getGameDataByLimit = () => {
    setLimit(customLimit)
    getGameData(customLimit)
  }

  useEffect(() => {
    const intervalId = setInterval(() => {
      // getGameData(limit) // Ensure the current limit is passed
    }, 10000)

    return () => clearInterval(intervalId) // Cleanup on unmount
  }, [limit])

  useEffect(() => {
    getGameData(1000) // Ensure the current limit is passed
  }, [])

  const getGameDataByDate = async () => {
    console.log('fromDate ', fromDate, ' toDate ', toDate)
    const res = await axiosClient.post(`/game/get/${game}/${game_type_id}/${table_limit_id}`, {
      from_date: fromDate,
      to_date: toDate,
    })
    console.log('res.data.result: ', res.data.result)
    processData(res.data.result)
    setRenderKey(renderKey + 1)
  }

  const getGameData = async (limitParam) => {
    const limitToUse = limitParam || limit
    const res = await axiosClient.get(
      `/game/get/${game}/${game_type_id}/${table_limit_id}/${limit}`,
    )
    processData(res.data.result)
    setRenderKey(renderKey + 1)
  }

  const processData = (resData) => {
    console.log('res.data.result: ', resData)

    let live = false
    const currentTime = new Date()
    //console.log('time: ', currentTime)

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

    let shoes = []
    let tempShoe = resData[0].shoe_no
    let tempData = []
    let data = []
    let bankerVsPlayer = [
      { name: 'Banker', value: 0 },
      { name: 'Player', value: 0 },
      { name: 'Tie', value: 0 },
    ]

    for (let i = 0; i < resData.length; i++) {
      if (resData[i].winner == 'B') bankerVsPlayer[0].value += 1
      if (resData[i].winner == 'P') bankerVsPlayer[1].value += 1
      if (resData[i].winner == 'T') bankerVsPlayer[2].value += 1

      if (tempShoe != resData[i].shoe_no) {
        console.log('tempShoe : ', tempShoe)
        shoes.push(tempShoe)

        data.push({ shoe: tempShoe, data: tempData })
        tempShoe = resData[i].shoe_no
        tempData = []
      }
      const tempPlayerSplit = resData[i].player_cards.split(',')
      const tempBankerSplit = resData[i].banker_cards.split(',')

      let PlayerSplit = []
      let BankerSplit = []

      resData[i].playerCard1 = tempPlayerSplit[0]
      resData[i].playerCard2 = tempPlayerSplit[1]
      if (tempPlayerSplit[2]) resData[i].playerCard3 = tempPlayerSplit[2]

      resData[i].bankerCard1 = tempBankerSplit[0]
      resData[i].bankerCard2 = tempBankerSplit[1]
      if (tempBankerSplit[2]) resData[i].bankerCard3 = tempBankerSplit[2]
      tempData.push(resData[i])
    }
    shoes.push(tempShoe)

    data.push({ shoe: tempShoe, data: tempData })

    //console.log('res.data.result: ', data)
    console.log('bankerVsPlayer : ', bankerVsPlayer)
    setBankerVsPlayer(bankerVsPlayer)
    setShoes(shoes)
    setData(data)
  }

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
    //if (data) console.log('data: ', data)
    //if (rouletteData) console.log('rouletteData: ', rouletteData)
  }, [data])

  const tempData = [
    { name: 'Page A', uv: 4000, pv: 2400, amt: 2400 },
    { name: 'Page B', uv: 3000, pv: 1398, amt: 2210 },
    { name: 'Page C', uv: 2000, pv: 9800, amt: 2290 },
    { name: 'Page D', uv: 2780, pv: 3908, amt: 2000 },
    { name: 'Page E', uv: 1890, pv: 4800, amt: 2181 },
    { name: 'Page F', uv: 2390, pv: 3800, amt: 2500 },
    { name: 'Page G', uv: 3490, pv: 4300, amt: 2100 },
  ]

  const config = { threshold: 0.1 }

  let observer = new IntersectionObserver(function (entries, self) {
    let targets = entries.map((entry) => {
      if (entry.isIntersecting) {
        self.unobserve(entry.target)
        return entry.target
      }
    })

    // Call our animation function
    fadeIn(targets)
  }, config)

  document.querySelectorAll('.box').forEach((box) => {
    observer.observe(box)
  })

  function fadeIn(targets) {
    gsap.to(targets, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      stagger: 0.2,
      ease: 'power1.out',
    })
  }

  return (
    <div
      className={` ${theme === 'dark' ? 'text-light' : 'text-dark'} pb-4 d-flex justify-content-center`}
    >
      <div className={`box `}></div>
      <div className={`w-100`}>
        <div>
          <h1>Baccarat</h1>
        </div>
        <div className={`w-100`}>
          <PlayerBankerDashboardComponent shoes={shoes} shoeData={data} />
        </div>
        <div className={`w-100 py-3 `} style={{ padding: '7px' }}>
          <div className={`row gx-3 border`}>
            <div className={`col-12 col-md-6 `}>
              <div className={``}>
                <PieChartComponent bankerVsPlayer={bankerVsPlayer} />
              </div>
            </div>
            <div className={`col-12 col-md-6 `}>
              <div className={``}>
                <DoughnutChartComponent />
              </div>
            </div>
          </div>
        </div>

        <div className={`py-3 border`}>
          <div className={``}>
            <BarChartComponent />
          </div>
        </div>
      </div>
    </div>
  )
}

export default BaccaratDashboard
