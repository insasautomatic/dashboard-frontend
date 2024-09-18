import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import {
  BarChart,
  Bar,
  ResponsiveContainer,
  YAxis,
  XAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Cell,
} from 'recharts'

const BarChartComponent = (props) => {
  const theme = useSelector((state) => state.theme)
  const [data, setData] = useState([])
  const [textColor, setTextColor] = useState('rgb(11, 94, 215)')
  const [stroke, setStroke] = useState('rgb(11, 94, 215)')
  const tempData = [
    { name: '0', number: 222, color: 'rgb(20, 206, 67)' },
    { name: '32', number: 111, color: 'rgb(76,82,255)' },
    { name: '15', number: 222, color: 'rgb(76,82,255)' },
    { name: '19', number: 233, color: 'rgb(76,82,255)' },
    { name: '4', number: 344, color: 'rgb(76,82,255)' },
    { name: '21', number: 155, color: 'rgb(76,82,255)' },
    { name: '2', number: 266, color: 'rgb(76,82,255)' },
    { name: '25', number: 777, color: 'rgb(76,82,255)' },
    { name: '17', number: 588, color: 'rgb(76,82,255)' },
    { name: '34', number: 336, color: 'rgb(76,82,255)' },
    { name: '24', number: 699, color: 'rgb(76,82,255)' },
    { name: '6', number: 810, color: 'rgb(76,82,255)' },
    { name: '27', number: 411, color: 'rgb(76,82,255)' },
    { name: '13', number: 912, color: 'rgb(76,82,255)' },
    { name: '36', number: 313, color: 'rgb(76,82,255)' },
    { name: '11', number: 414, color: 'rgb(76,82,255)' },
    { name: '30', number: 515, color: 'rgb(76,82,255)' },
    { name: '8', number: 216, color: 'rgb(76,82,255)' },
    { name: '23', number: 117, color: 'rgb(76,82,255)' },
    { name: '10', number: 318, color: 'rgb(76,82,255)' },
    { name: '5', number: 919, color: 'rgb(76,82,255)' },
    { name: '24', number: 70, color: 'rgb(76,82,255)' },
    { name: '16', number: 221, color: 'rgb(76,82,255)' },
    { name: '33', number: 322, color: 'rgb(76,82,255)' },
    { name: '1', number: 223, color: 'rgb(76,82,255)' },
    { name: '20', number: 524, color: 'rgb(76,82,255)' },
    { name: '14', number: 725, color: 'rgb(76,82,255)' },
    { name: '31', number: 126, color: 'rgb(76,82,255)' },
    { name: '9', number: 427, color: 'rgb(76,82,255)' },
    { name: '22', number: 428, color: 'rgb(76,82,255)' },
    { name: '18', number: 529, color: 'rgb(76,82,255)' },
    { name: '29', number: 930, color: 'rgb(76,82,255)' },
    { name: '7', number: 315, color: 'rgb(76,82,255)' },
    { name: '28', number: 432, color: 'rgb(76,82,255)' },
    { name: '12', number: 333, color: 'rgb(76,82,255)' },
    { name: '3', number: 134, color: 'rgb(76,82,255)' },
    { name: '26', number: 335, color: 'rgb(76,82,255)' },
  ]

  useEffect(() => {
    if (theme === 'dark') {
      setTextColor('rgb(255, 255, 255)')
      setStroke('#535459')
    } else {
      setTextColor('rgb(71, 72, 76)')
      setStroke('#e2e2e2')
    }

    if (props.data) {
      for (let i = 0; i < props.data.length; i++) {
        tempData[i].name = props.data[i].name
        tempData[i].number = props.data[i].number
      }
      setData(tempData)
    } else {
      setData(tempData)
    }
  }, [props, theme])

  return (
    <ResponsiveContainer width="100%" height={200} className={``}>
      <BarChart data={data}>
        <YAxis
          tick={{ fontSize: 13, fill: textColor }}
          stroke={textColor}
          className="text-shadow fw-bold"
        />
        <XAxis
          dataKey="name"
          interval={0}
          tick={({ x, y, payload, index }) => {
            return (
              <text
                x={x}
                y={y + 10} // Adjust label position
                fill={index === 0 ? 'rgb(20, 206, 67)' : textColor} // First label green, others default color
                fontSize={10}
                textAnchor="middle"
              >
                {payload.value}
              </text>
            )
          }}
          stroke={textColor}
          className="text-shadow fw-bold poppins-300"
        />
        <CartesianGrid strokeDasharray="0 0 " stroke={stroke} vertical={false} />
        <Tooltip />

        {/*  <Legend /> */}

        <Bar
          type="monotone "
          dataKey="number"
          stroke="rgb(76, 82, 255)"
          fill="rgb(76, 82, 255)"
          radius={[4, 4, 0, 0]}
          barSize={7}
        >
          {data.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={index === 0 ? 'rgb(20, 206, 67)' : 'rgb(76, 82, 255)'}
              stroke={index === 0 ? 'rgb(20, 206, 67)' : 'rgb(76, 82, 255)'}
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}

export default BarChartComponent

/* 
//fisrt text color to be green
 <XAxis
          dataKey="name"
          tick={({ x, y, payload, index }) => {
            return (
              <text
                x={x}
                y={y + 10} // Adjust label position
                fill={index === 0 ? 'green' : textColor} // First label green, others default color
                fontSize={10}
                textAnchor="middle"
              >
                {payload.value}
              </text>
            )
          }}
          stroke={textColor}
          className="text-shadow fw-bold poppins-300"
        />
*/
