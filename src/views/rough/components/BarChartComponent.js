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
} from 'recharts'

const BarChartComponent = (props) => {
  const theme = useSelector((state) => state.theme)
  const [data, setData] = useState([])
  const [textColor, setTextColor] = useState('rgb(11, 94, 215)')
  const [stroke, setStroke] = useState('rgb(11, 94, 215)')
  const tempData = Array.from({ length: 37 }).map((_, i) => ({
    name: ` ${i + 1}`,
    uv: Math.floor(Math.random() * 10000),
  }))

  useEffect(() => {
    if (theme === 'dark') {
      setTextColor('rgb(255, 255, 255)')
      setStroke('#535459')
    } else {
      setTextColor('rgb(71, 72, 76)')
      setStroke('#e2e2e2')
    }

    if (props.data) {
      setData(props.data)
    } else {
      setData(tempData)
    }
  }, [props, theme])

  return (
    <ResponsiveContainer width="100%" height={200}>
      <BarChart data={data}>
        <YAxis
          tick={{ fontSize: 13, fill: textColor }}
          stroke={textColor}
          className="text-shadow fw-bold"
        />
        <XAxis
          dataKey="name"
          tick={{ fontSize: 10, fill: textColor }}
          stroke={textColor}
          className="text-shadow fw-bold poppins-300"
        />
        <CartesianGrid strokeDasharray="0 0 " stroke={stroke} vertical={false} />
        <Tooltip />

        {/*  <Legend /> */}

        <Bar
          type="monotone "
          dataKey="uv"
          stroke="rgb(76, 82, 255)"
          fill="rgb(76, 82, 255)"
          radius={[4, 4, 0, 0]}
          barSize={7}
        />
      </BarChart>
    </ResponsiveContainer>
  )
}

export default BarChartComponent
