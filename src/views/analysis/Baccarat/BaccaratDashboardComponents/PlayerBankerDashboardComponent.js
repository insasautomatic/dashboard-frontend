import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import s from './PlayerBankerData.module.css'
import card from 'src/assets/images/baccarat/card.png'

const PlayerBankerDashboardComponent = (props) => {
  const theme = useSelector((state) => state.theme)
  const [renderKey, setRenderKey] = useState(0)
  const [index, setIndex] = useState(0)
  const [currentShoe, setCurrentShoe] = useState(null)
  const [currentShoeData, setCurrentShoeData] = useState([])
  const [shoeData, setShoeData] = useState([])

  useEffect(() => {
    setCurrentShoe(props.shoes[0])

    console.log('props.shoeData[0].data[0].playerSplit[0].j', props.shoeData)

    setShoeData(props.shoeData)
    for (let i = 0; i < props.shoeData.length; i++) {
      if (props.shoeData[i].shoe == props.shoes[0]) {
        setCurrentShoeData(props.shoeData[i].data)
      }
    }
    setRenderKey(renderKey + 1)
  }, [props])

  useEffect(() => {
    console.log('shoeData', shoeData)
    console.log('currentShoeData', currentShoeData)
  }, [currentShoeData])

  const handleShoeChange = (event) => {
    setCurrentShoe(event.target.value) // Update currentShoe with the selected value

    for (let i = 0; i < shoeData.length; i++) {
      if (shoeData[i].shoe == event.target.value) {
        setCurrentShoeData(shoeData[i].data)
      }
    }

    setIndex(0)
  }

  const handleIndexChange = (event) => {
    if (event == '+') {
      setIndex(index + 1)
    } else {
      setIndex(index - 1)
    }
    // Update currentShoe with the selected value
  }

  return (
    <div
      className={` ${theme === 'light' ? 'text-dark' : 'text-light'} ${shoeData ? '' : 'd-none'}`}
    >
      <div className={``}>
        {currentShoeData[0] ? (
          <div className={`row gx-1`}>
            <div className={`col-12 h-100 col-md-5 `}>
              <div className={`w-100 h-75 border player  `}>
                <div
                  className={`row gx-1 w-100 h-100 d-flex justify-content-center  p-2 align-items-center font12 `}
                >
                  <div className={`col-4`}>
                    <div
                      className={`w-100  border ${s.cards}  d-flex justify-content-center align-items-center`}
                    >
                      <div className={`h-100 w-100 p-1`}>
                        <div className={`text-center`}>{currentShoeData[index].playerCard1}</div>

                        <img src={card} className="w-100" />
                      </div>
                    </div>
                  </div>
                  <div className={`col-4`}>
                    <div
                      className={`w-100 border ${s.cards}  d-flex justify-content-center align-items-center`}
                    >
                      <div className={`h-100 w-100 p-1`}>
                        <div className={`text-center`}>{currentShoeData[index].playerCard2}</div>

                        <img src={card} className="w-100" />
                      </div>
                    </div>
                  </div>
                  <div className={`col-4 ${currentShoeData[index].playerCard3 ? '' : 'd-none'}`}>
                    <div
                      className={`w-100 border ${s.cards}  d-flex justify-content-center align-items-center `}
                    >
                      <div className={`h-100 w-100 p-1`}>
                        <div className={`text-center`}>{currentShoeData[index].playerCard3}</div>

                        <img src={card} className="w-100" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={`col-12 col-md-2`}>
              <div className={` h-100  border info p-3`}>
                <table className={`table-${theme} fontText  table-sm w-100 `}>
                  <tbody>
                    <tr>
                      <td>Shoe :</td>
                      <td className={`text-end`}>
                        <select
                          className="rounded-1 px-2"
                          aria-label="Default select example"
                          value={currentShoe}
                          onChange={handleShoeChange} // Event handler for selection
                        >
                          {props.shoes.map((item, i) => (
                            <option key={i} value={item}>
                              {item}
                            </option>
                          ))}
                        </select>
                      </td>
                    </tr>
                    <tr>
                      <td>Winner</td>
                      <td className={`text-end`}>
                        <span
                          className={`rounded-1 bg-success text-light border-0 bg-gradient px-1 shadow-xs border border-secondary border-opacity-25`}
                        >
                          {currentShoeData[index].winner == 'B'
                            ? 'Banker'
                            : currentShoeData[index].winner == 'P'
                              ? 'Player'
                              : 'Tie'}
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td>Side</td>
                      <td className={`text-end`}>
                        <span
                          className={`rounded-1 px-4 bg-success text-light border-0 bg-gradient px-1 shadow-xs border border-secondary border-opacity-25`}
                        >
                          {currentShoeData[index].side_win ? currentShoeData[index].side_win : '-'}
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className={`col-12 h-100 col-md-5 `}>
              <div className={`w-100 h-75 border player  `}>
                <div
                  className={`row gx-1 w-100 h-100 d-flex justify-content-center  p-2 align-items-center font12 `}
                >
                  <div className={`col-4`}>
                    <div
                      className={`w-100  border ${s.cards}  d-flex justify-content-center align-items-center`}
                    >
                      <div className={`h-100 w-100 p-1`}>
                        <div className={`text-center`}>{currentShoeData[index].bankerCard1}</div>

                        <img src={card} className="w-100" />
                      </div>
                    </div>
                  </div>
                  <div className={`col-4`}>
                    <div
                      className={`w-100 border ${s.cards}  d-flex justify-content-center align-items-center`}
                    >
                      <div className={`h-100 w-100 p-1`}>
                        <div className={`text-center`}>{currentShoeData[index].bankerCard2}</div>

                        <img src={card} className="w-100" />
                      </div>
                    </div>
                  </div>
                  <div className={`col-4 ${currentShoeData[index].bankerCard3 ? '' : 'd-none'}`}>
                    <div
                      className={`w-100 border ${s.cards}  d-flex justify-content-center align-items-center `}
                    >
                      <div className={`h-100 w-100 p-1`}>
                        <div className={`text-center`}>{currentShoeData[index].bankerCard3}</div>

                        <img src={card} className="w-100" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          ''
        )}

        <div
          className={`text-light d-flex justify-content-center gap-2 align-items-center font12 mt-2 `}
        >
          <div className={``}>
            <button
              onClick={() => handleIndexChange('-')}
              type="button"
              className={`btn btn-primary btn-sm ${index == 0 ? 'd-none' : ''}`}
            >
              <i className="bi bi-chevron-left"></i>
            </button>
            <button
              disabled
              type="button"
              className={`btn btn-primary btn-sm ${index == 0 ? '' : 'd-none'}`}
            >
              <i className="bi bi-chevron-left"></i>
            </button>
          </div>

          <div className={`fs-4`}>{index}</div>
          <div className={``}>
            <button
              onClick={() => handleIndexChange('+')}
              type="button"
              className={`btn btn-primary btn-sm ${index < currentShoeData.length - 1 ? '' : 'd-none'}`}
            >
              <i className="bi bi-chevron-right"></i>
            </button>
            <button
              disabled
              type="button"
              className={`btn btn-primary btn-sm  ${index >= currentShoeData.length - 1 ? '' : 'd-none'}`}
            >
              <i className="bi bi-chevron-right"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PlayerBankerDashboardComponent
