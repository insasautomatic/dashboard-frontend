import React, { useEffect, useState, useRef } from 'react'
import s from './Rough.module.css'
import axiosClient from '../../axiosClient'
import cards from 'src/assets/images/dashboard/cards.jpg'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { CChartLine } from '@coreui/react-chartjs'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormCheck,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'

import { ScrollTrigger } from 'gsap/all'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import AreaChart from './components/AreaChartComponent'
import BarChartComponent from './components/BarChartComponent'
import PieChartComponent from './components/PieChartComponent'
import RadarChartComponent from './components/RadarChartComponent'
import CoreUiLineChart from './components/CoreUiLineChart'

import LineChartComponent from './components/LineChartComponent'
import roulleteWheel from 'src/assets/images/dashboard/roulleteWheel2.png'
import DataTableComponent from './components/DataTableComponent.js'
import TableComponent from './components/TableComponent.js'
import { Table } from 'react-bootstrap-icons'
import DataTableComponent2 from './components/DataTableComponent2.js'

const Rough = () => {
  const [data, setData] = useState([])
  const theme = useSelector((state) => state.theme)
  const [themeClass, setThemeClass] = useState('bg-light text-dark border')
  const [themeBorder, setThemeBorder] = useState('bg-light text-dark border')

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

  useEffect(() => {
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

  useEffect(() => {
    setData(temp)
  }, [])

  useGSAP(() => {
    gsap.fromTo(
      '.fade-in',
      {
        delay: 0.5,
        opacity: 0,
        y: 50,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power1.out',
      },
    )
  }, [theme])

  useEffect(() => {
    const elementsToAnimate = document.querySelectorAll('.animate')
    const observerConfig = { threshold: 0.1 }

    let observer = new IntersectionObserver(function (entries, self) {
      let targets = entries.map((entry) => {
        if (entry.isIntersecting) {
          self.unobserve(entry.target)
          return entry.target
        }
      })

      // Call our animation function
      fadeIn(targets)
    }, observerConfig)

    document.querySelectorAll('.animate').forEach((box) => {
      observer.observe(box)
    })

    return () => {
      observer.disconnect() // Cleanup the observer on component unmount
    }
  }, [])

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
    <div className={` ${theme === 'dark' ? 'text-light' : 'text-dark'}`}>
      <div className=" fade-in ">
        <div className="">
          <h1 className="text-center text-shadow">Dashboard</h1>
          <div className="row h-100 poppins-400">
            <div className="col-md-6 h-100  form animate d-flex flex-column">
              <div className={`w-100 border h-100 rounded border-0 px-1  ${themeBorder} shadow-s`}>
                <div
                  className={`d-flex align-items-center px-3 py-2 border-bottom border-opacity-25 ${theme == 'dark' ? 'border-secondary' : ''} mb-1 `}
                >
                  {/* Dot */}
                  <div
                    className={`me-2 bg-success shadow-s rounded-circle`}
                    style={{
                      height: '10px',
                      width: '10px',
                    }}
                  ></div>
                  <div className={`mx-auto w-100 `}>
                    <h6 className={`m-0 text-center`}>Title</h6>
                  </div>
                </div>

                <div className={`w-100    `}>
                  <div className={`row p-1 gx-1 `}>
                    <div className={`col-md-6   animate`}>
                      <div className={`mb-1`}>
                        <CFormInput
                          type="text"
                          id="exampleFormControlInput1"
                          placeholder="example text"
                          size="sm"
                          className={`${themeClass}`}
                        />
                      </div>
                      <div className={``}>
                        <CFormInput
                          type="text"
                          id="exampleFormControlInput2"
                          placeholder="example text"
                          size="sm"
                          className={themeClass}
                        />
                      </div>
                    </div>
                    <div className={`col-md-6 animate`}>
                      <div className={`mb-1`}>
                        <CFormInput
                          type="text"
                          id="exampleFormControlInput1"
                          placeholder="example text"
                          size="sm"
                          className={themeClass}
                        />
                      </div>
                      <div className={``}>
                        <CFormSelect
                          id="exampleFormControlSelect1"
                          size="sm"
                          className={themeClass}
                        >
                          <option>example option 1</option>
                          <option>example option 2</option>
                          <option>example option 3</option>
                        </CFormSelect>
                      </div>
                    </div>
                  </div>
                  <div className={`row p-1 gx-1 `}>
                    <div className={`col-md-4   animate`}>
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
                    <div className={`col-md-4 animate`}>
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
                    <div className={`col-md-4 animate`}>
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
                    <div className={`col-md-3   animate`}>
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
                    <div className={`col-md-3 animate`}>
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
                    <div className={`col-md-3 animate`}>
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
                    <div className={`col-md-3 animate`}>
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
                    <div className={`col-md-8   animate`}>
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
                    <div className={`col-md-4 animate`}>
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
            </div>
            {/* ////////////////////////////////////////////////////////////////////////////////////////////////// */}

            <div className={`col-md-2   position-relative  p-3 animate`}>
              <div
                className={`position-absolute top-0 start-0 ${'bg-' + theme} bg-gradient shadow-s    rounded w-100 h-100 d-flex justify-content-center align-items-center`}
              >
                <img
                  src={roulleteWheel}
                  alt=""
                  className="  drop_shadow "
                  style={{ height: 200 }}
                />
              </div>

              <div
                className={`w-100    bg-light  h-100 d-flex justify-content-center align-items-center`}
              >
                <RadarChartComponent />
              </div>
            </div>
            <div className={`col-md-4    animate`}>
              <div className="row gx-2 gy-2 h-100">
                <div className="col-6 ">
                  <div className=" rounded el-hover  shadow-s">
                    <CoreUiLineChart
                      data={tempData2}
                      backgroundColor="rgba(32, 94, 249,.55)"
                      background={theme === 'dark' ? 'bg-dark' : 'bg-light'}
                      className="w-100 "
                    />
                  </div>
                </div>
                <div className="col-6 ">
                  <div className=" rounded el-hover  shadow-s">
                    <CoreUiLineChart
                      data={tempData1}
                      backgroundColor="rgba(255, 99, 132, 0.55)"
                      background={theme === 'dark' ? 'bg-dark' : 'bg-light'}
                      className="w-100 "
                    />
                  </div>
                </div>
                <div className="col-6 ">
                  <div className=" rounded el-hover  shadow-s">
                    <CoreUiLineChart
                      data={tempData1}
                      backgroundColor="rgba(255, 99, 132, 0.55)"
                      background={theme === 'dark' ? 'bg-dark' : 'bg-light'}
                      className="w-100 "
                    />
                  </div>
                </div>
                <div className="col-6 ">
                  <div className=" rounded el-hover  shadow-s">
                    <CoreUiLineChart
                      backgroundColor="rgba(165, 0, 255,.55)"
                      background={theme === 'dark' ? 'bg-dark' : 'bg-light'}
                      className="w-100 "
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={`row my-3  h-100`}>
            <div className={`col-md-7    animate`}>
              <div className={`w-100  rounded ${'bg-' + theme} bg-gradient  shadow-s   h-100 px-1`}>
                <div className="w-100 border-bottom border-secondary  border-opacity-50 px-3 my-1 poppins-500">
                  <div>Title</div>
                </div>
                <div className="w-100  d-flex justify-content-center align-items-center  h-100  pe-4">
                  <BarChartComponent />
                </div>
              </div>
            </div>
            <div className={`col-md-5   min-vh-50 animate`}>
              <DataTableComponent />
            </div>
          </div>
          <div className=" ">
            <div className="w-100 ">
              <DataTableComponent2 />
            </div>
          </div>
          {/* <div className={`row mt-3 border h-100`}>
            <div className={`col-md-7   border `}>
              <div
                className={`w-100  rounded bg-light pt-4 pe-4 shadow-s border border-danger h-100 d-flex justify-content-center align-items-center`}
              >
                <BarChartComponent />
              </div>
            </div>
            <div className={`col-md-3  min-vh-50 `}>
              <div className={`w-100 border rounded bg-light pt-4 pe-4`}>
                <PieChartComponent />
              </div>
            </div>
            <div className={`col-md-2  min-vh-50 `}>
              <div className={`w-100 border rounded bg-light pt-4 pe-4`}>
                <RadarChartComponent />
              </div>
            </div>
          </div>
          <div className={`row mt-3`}>
            <div
              className={`col-md-4  min-vh-50 d-flex justify-content-center align-items-center  `}
            >
              <div className={`w-100 border rounded bg-light pt-4 pe-4`}>
                <AreaChart />
              </div>
            </div>
            <div className={`col-md-2  min-vh-50 `}>
              <div className={`w-100 border rounded bg-light pt-4 pe-4`}>
                <BarChartComponent data={tempData} />
              </div>
            </div>
            <div className={`col-md-4  min-vh-50 `}>
              <div className={`w-100 border rounded bg-light pt-4 pe-4`}>
                <LineChartComponent />
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  )
}

export default Rough
