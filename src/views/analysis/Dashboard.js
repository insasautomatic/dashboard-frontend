import React, { useEffect, useState, useRef } from 'react'
import s from './Dashboard.module.css'
import axiosClient from '../../axiosClient'
import { useNavigate, useParams } from 'react-router-dom'

import { useSelector } from 'react-redux'
import { CFormInput } from '@coreui/react'

import { ScrollTrigger } from 'gsap/all'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import BarChartComponent from './components/BarChartComponent'
import RadarChartComponent from './components/RadarChartComponent'

import roulleteWheel from 'src/assets/images/dashboard/roulleteWheel2.png'
import DataTableComponent from './components/DataTableComponent.js'

import DataTableComponent2 from './components/DataTableComponent2.js'
import WheelPocketStatistics from './components/WheelPocketStatistics.js'
import DropZoneStatistics from './components/DropZoneStatistics.js'
import WinStatistics from './components/WinStatistics.js'

const Dashboard = () => {
  const { game, game_type_id, table_limit_id } = useParams()
  const [tabletype, setTabletype] = useState('')
  const [data, setData] = useState([])
  const [rouletteData, setRouletteData] = useState([])
  const [form, setForm] = useState({})
  const theme = useSelector((state) => state.theme)
  const [themeClass, setThemeClass] = useState('bg-light text-dark border')
  const [themeBorder, setThemeBorder] = useState('bg-light text-dark border')
  const [statistics, setStatistics] = useState('WinStatistics')

  const tempData1 = {
    labels: Array.from({ length: 7 }, (_, i) => i + 1),
    datasets: [
      {
        label: 'My First dataset',
        backgroundColor: 'rgba(255,255,255,.2)',
        borderColor: 'rgba(255,255,255,.55)',

        fill: true,
        data: [78, 81, 80, 45, 34, 12, 40],
      },
    ],
  }
  const tempData2 = {
    labels: Array.from({ length: 7 }, (_, i) => i + 1),
    datasets: [
      {
        label: 'My First dataset',
        backgroundColor: 'rgba(255,255,255,.2)',
        borderColor: 'rgba(255,255,255,.55)',

        fill: true,
        data: [81, 61, 84, 40, 33, 18, 40],
      },
    ],
  }

  let myMap = new Map()

  const tempRoulleteData = [
    { name: '0', number: 0 },
    { name: '32', number: 0 },
    { name: '15', number: 0 },
    { name: '19', number: 0 },
    { name: '4', number: 0 },
    { name: '21', number: 0 },
    { name: '2', number: 0 },
    { name: '25', number: 0 },
    { name: '17', number: 0 },
    { name: '34', number: 0 },
    { name: '6', number: 0 },
    { name: '27', number: 0 },
    { name: '13', number: 0 },
    { name: '36', number: 0 },
    { name: '11', number: 0 },
    { name: '30', number: 0 },
    { name: '8', number: 0 },
    { name: '23', number: 0 },
    { name: '10', number: 0 },
    { name: '5', number: 0 },
    { name: '24', number: 0 },
    { name: '16', number: 0 },
    { name: '33', number: 0 },
    { name: '1', number: 0 },
    { name: '20', number: 0 },
    { name: '14', number: 0 },
    { name: '31', number: 0 },
    { name: '9', number: 0 },
    { name: '22', number: 0 },
    { name: '18', number: 0 },
    { name: '29', number: 0 },
    { name: '7', number: 0 },
    { name: '28', number: 0 },
    { name: '12', number: 0 },
    { name: '35', number: 0 },
    { name: '3', number: 0 },
    { name: '26', number: 0 },
  ]

  const getGameData = async () => {
    const res = await axiosClient.get(`/game/get/${game}/${game_type_id}/${table_limit_id}`)

    console.log('tempRoulleteData: ', tempRoulleteData)
    for (let i = 0; i < res.data.result.length; i++) {
      for (let j = 0; j < tempRoulleteData.length; j++) {
        if (res.data.result[i].winning_number == tempRoulleteData[j].name) {
          tempRoulleteData[j].number++
        }
      }
    }
    console.log('tempRoulleteData: ', tempRoulleteData)

    setData(res.data.result)
    setRouletteData(tempRoulleteData)
  }

  useEffect(() => {
    getGameData()
    setThemeClass(
      theme === 'dark'
        ? `bg-dark text-light border-secondary border-opacity-25 shadow-xs ${s.placeholder_grey}`
        : `text-dark  border border `,
    )

    setThemeBorder(
      theme === 'dark'
        ? `bg-dark bg-gradient bg-opacity-25  text-light border-secondary  border-opacity-50  ${s.placeholder_grey}`
        : `text-dark bg-light bg-gradient border border`,
    )
  }, [theme])

  useEffect(() => {
    if (data) console.log('data: ', data)
    if (rouletteData) console.log('rouletteData: ', rouletteData)
  }, [data, rouletteData])

  const tempData = [
    { name: 'Page A', uv: 4000, pv: 2400, amt: 2400 },
    { name: 'Page B', uv: 3000, pv: 1398, amt: 2210 },
    { name: 'Page C', uv: 2000, pv: 9800, amt: 2290 },
    { name: 'Page D', uv: 2780, pv: 3908, amt: 2000 },
    { name: 'Page E', uv: 1890, pv: 4800, amt: 2181 },
    { name: 'Page F', uv: 2390, pv: 3800, amt: 2500 },
    { name: 'Page G', uv: 3490, pv: 4300, amt: 2100 },
  ]

  const temp = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'My First dataset',
        backgroundColor: 'rgba(255,255,255,.1)',
        borderColor: 'rgba(255,0,255,.55)',
        pointBackgroundColor: '#5856d6',
        data: [61, 59, 84, 80, 51, 40, 45],
      },
      {
        label: 'My 2nd dataset',
        backgroundColor: 'red',
        borderColor: 'rgba(0,255,255,.55)',
        pointBackgroundColor: '#5856d6',
        data: [65, 50, 80, 84, 51, 55, 40],
      },
    ],
  }

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
    <div className={` ${theme === 'dark' ? 'text-light' : 'text-dark'} pb-4`}>
      <div className=" fade-in ">
        <div className="container">
          <h1 className="text-center text-shadow">Dashboard</h1>
          <div className="row  h-100 poppins-400">
            <div className={`col-md-7 h-100  form d-flex flex-column`}>
              <div
                className={`w-100 border h-100 rounded border-0 px-1 box  ${s.opacity}  ${themeBorder} shadow-s`}
              >
                <div
                  className={`d-flex align-items-center px-3 py-2 border-bottom border-opacity-25 ${theme == 'dark' ? 'border-secondary' : ''} mb-1 `}
                >
                  {/* Dot */}
                  <div className="d-flex flex-column gap-1 ">
                    <div className="d-flex   align-items-center">
                      <div
                        className={`me-2 bg-success shadow-s rounded-circle `}
                        style={{
                          height: '10px',
                          width: '10px',
                        }}
                      ></div>
                      <div className="font10 text-shadow opacity-75">Licence </div>
                    </div>
                    <div className="d-flex   align-items-center">
                      <div
                        className={`me-2 bg-success shadow-s rounded-circle `}
                        style={{
                          height: '10px',
                          width: '10px',
                        }}
                      ></div>
                      <div className="font10 text-shadow opacity-75">Connection </div>
                    </div>
                  </div>
                  <div className={`mx-auto w-100 `}>
                    <h6 className={`m-0 text-center`}>Title</h6>
                  </div>
                </div>

                <div className={`w-100    `}>
                  <div
                    className={`row p-1 gx-1 font14  ${theme === 'light' ? 'poppins-500' : 'poppins-400'}  `}
                  >
                    <div className={`col-6 col-md-3   `}>Live Data</div>
                    <div className={`col-6 col-md-3  font12  `}>
                      <div
                        className={`w-100  rounded-1 border border-secondary border-opacity-25 shadow-xs  h-100 d-flex align-items-center justify-content-center bg-${theme} bg-gradient bg-opacity-50 `}
                      >
                        Warning Flag: 0
                      </div>
                    </div>
                    <div className={`col-6 col-md-3  font12  `}>
                      <div
                        className={`w-100  rounded-1 border border-secondary border-opacity-25 shadow-xs  h-100 d-flex align-items-center justify-content-center bg-${theme} bg-gradient bg-opacity-50 `}
                      >
                        Warning Flag: 0
                      </div>
                    </div>{' '}
                    <div className={`col-6 col-md-3  font12  `}>
                      <div
                        className={`w-100  rounded-1 border border-secondary border-opacity-25 shadow-xs  h-100 d-flex align-items-center justify-content-center bg-${theme} bg-gradient bg-opacity-50 `}
                      >
                        Warning Flag: 0
                      </div>
                    </div>
                    <div className={`col-6 col-md-4 mt-1 font12  `}>
                      <div
                        className={`w-100  rounded-1 border border-secondary border-opacity-25 shadow-xs  h-100 d-flex align-items-center justify-content-center bg-${theme} bg-gradient bg-opacity-50 `}
                      >
                        Date: 12/06/2024 02:55:19
                      </div>
                    </div>
                    <div className={`col-6 col-md-4 mt-1 font12  `}>
                      <div
                        className={`w-100  rounded-1 border border-secondary border-opacity-25 shadow-xs  h-100 d-flex align-items-center justify-content-center bg-${theme} bg-gradient bg-opacity-50 `}
                      >
                        Winnning No: 14
                      </div>
                    </div>
                    <div className={`col-6 col-md-4 mt-1 font12  `}>
                      <div
                        className={`w-100  rounded-1 border border-secondary border-opacity-25 shadow-xs  h-100 d-flex align-items-center justify-content-center bg-${theme} bg-gradient bg-opacity-50 `}
                      >
                        Direction : 1 Clock Wise
                      </div>
                    </div>
                  </div>
                  <div className={`row p-1 gx-1 `}>
                    <div className={`col-md-4   `}>
                      <div className={``}>
                        <CFormInput
                          type="text"
                          id="exampleFormControlInput1"
                          placeholder="example text"
                          size="sm"
                          className={themeClass}
                        />
                      </div>
                    </div>
                    <div className={`col-md-4 `}>
                      <div className={``}>
                        <CFormInput
                          type="text"
                          id="exampleFormControlInput1"
                          placeholder="example text"
                          size="sm"
                          className={themeClass}
                        />
                      </div>
                    </div>
                    <div className={`col-md-4 `}>
                      <div className={``}>
                        <CFormInput
                          type="text"
                          id="exampleFormControlInput1"
                          placeholder="example text"
                          size="sm"
                          className={themeClass}
                        />
                      </div>
                    </div>
                  </div>
                  <div className={`row p-1 gx-1`}>
                    <div className={`col-md-3   `}>
                      <div className={``}>
                        <CFormInput
                          type="text"
                          id="exampleFormControlInput1"
                          placeholder="example text"
                          size="sm"
                          className={themeClass}
                        />
                      </div>
                    </div>
                    <div className={`col-md-3 `}>
                      <div className={`mb-1`}>
                        <CFormInput
                          type="text"
                          id="exampleFormControlInput1"
                          placeholder="example text"
                          size="sm"
                          className={themeClass}
                        />
                      </div>
                    </div>
                    <div className={`col-md-3 `}>
                      <div className={`mb-1`}>
                        <CFormInput
                          type="text"
                          id="exampleFormControlInput1"
                          placeholder="example text"
                          size="sm"
                          className={themeClass}
                        />
                      </div>
                    </div>
                    <div className={`col-md-3 `}>
                      <div className={`mb-1`}>
                        <CFormInput
                          type="text"
                          id="exampleFormControlInput1"
                          placeholder="example text"
                          size="sm"
                          className={themeClass}
                        />
                      </div>
                    </div>
                  </div>
                  <div className={`row p-1 gx-1 mb-3 `}>
                    <div className={`col-md-8   `}>
                      <div className={``}>
                        <CFormInput
                          type="text"
                          id="exampleFormControlInput1"
                          placeholder="example text"
                          size="sm"
                          className={themeClass}
                        />
                      </div>
                    </div>
                    <div className={`col-md-4 `}>
                      <div className={``}>
                        <CFormInput
                          type="text"
                          id="exampleFormControlInput1"
                          placeholder="example text"
                          size="sm"
                          className={themeClass}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className={`w-100  mt-3 px-2  rounded poppins-500 shadow-s box  ${s.opacity}   ${themeBorder}`}
              >
                <div className={`w-100 border-bottom border-secondary border-opacity-25 px-2 `}>
                  <div className="d-flex justify-content-evenly fontSubHeading my-1">
                    <div
                      className={`pointer`}
                      onClick={() => setStatistics('WheelPocketStatistics')}
                    >
                      Wheel & Pocket Statistics
                    </div>
                    <div className={`pointer`} onClick={() => setStatistics('DropZoneStatistics')}>
                      Drop Zone Statistics
                    </div>
                    <div className={`pointer`} onClick={() => setStatistics('WinStatistics')}>
                      {' '}
                      Win Statistics
                    </div>
                  </div>
                </div>

                <div
                  className={`w-100 h-full d-flex justify-content-center gap-2 align-items-center  ${statistics == 'WheelPocketStatistics' ? 'd-block' : 'd-none'}   py-2 `}
                  style={{ minHeight: '127px' }}
                >
                  <WheelPocketStatistics />
                </div>

                <div
                  className={`w-100 h-full d-flex justify-content-center gap-2 align-items-center font10 ${statistics == 'DropZoneStatistics' ? 'd-block' : 'd-none'}  poppins-300 py-2 `}
                  style={{ minHeight: '127px' }}
                >
                  <DropZoneStatistics />
                </div>
                <div
                  className={`w-100 h-full d-flex justify-content-center gap-2 align-items-center font10 ${statistics == 'WinStatistics' ? 'd-block' : 'd-none'}  poppins-300 py-2 `}
                  style={{ minHeight: '127px' }}
                >
                  <WinStatistics />
                </div>
              </div>
            </div>
            {/* ////////////////////////////////////////////////////////////////////////////////////////////////// */}

            <div
              className={`col-md-5    position-relative  p-3 box ${s.opacity + ' ' + s.roullet_wheel}   `}
            >
              <div
                className={`position-absolute  top-0 start-0 ${'bg-' + theme} bg-gradient shadow-s  py-2    rounded w-100 h-100 d-flex justify-content-center align-items-center`}
              >
                <img
                  src={roulleteWheel}
                  alt=""
                  className="   drop_shadow "
                  style={{ height: '100%' }}
                />
              </div>

              <div
                className={`w-100  py-2   bg-light  h-100 d-flex justify-content-center align-items-center `}
              >
                <RadarChartComponent data={rouletteData} />
              </div>
            </div>
          </div>
          <div className={`row my-3  h-100`}>
            <div className={`col-md-7    box ${s.opacity}`}>
              <div className={`w-100  rounded ${'bg-' + theme} bg-gradient  shadow-s   h-100 px-1`}>
                <div className="w-100 border-bottom border-secondary  border-opacity-50 px-3 my-1 poppins-500">
                  <div>Title</div>
                </div>
                <div className="w-100  d-flex justify-content-center align-items-center  h-100  pe-4 pb-2">
                  <BarChartComponent data={rouletteData} />
                </div>
              </div>
            </div>
            <div className={`col-md-5  p-0  min-vh-50 box ${s.opacity}`}>
              <DataTableComponent />
            </div>
          </div>
          <div className={`box  w-100 ${s.opacity}`}>
            <div className="w-100 ">
              <DataTableComponent2 />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
