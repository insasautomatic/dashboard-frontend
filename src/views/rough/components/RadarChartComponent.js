import React, { useState, useEffect } from 'react'
import {
  RadarChart,
  Radar,
  ResponsiveContainer,
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Tooltip,
  Legend,
} from 'recharts'

const RadarChartComponent = () => {
  const [data, setData] = useState([])
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#808000', '#C39BD3', '#FF8042']
  const tempData = [
    { name: ' 1', uv: 2000, pv: 9800, amt: 2400 },
    { name: ' 2', uv: 3000, pv: 1398, amt: 1210 },
    { name: ' 3', uv: 2000, pv: 9800, amt: 1290 },
    { name: ' 4', uv: 2780, pv: 3908, amt: 2000 },
    { name: ' 5', uv: 1890, pv: 4800, amt: 1581 },
    { name: ' 6', uv: 2390, pv: 3802, amt: 2500 },
    { name: ' 7', uv: 3490, pv: 4300, amt: 2100 },
    { name: ' 8', uv: 1490, pv: 6800, amt: 2200 },
    { name: ' 9', uv: 1890, pv: 4800, amt: 2181 },
    { name: ' 10', uv: 2390, pv: 3802, amt: 2500 },
    { name: ' 11', uv: 3490, pv: 4300, amt: 2100 },
    { name: ' 12', uv: 1490, pv: 6800, amt: 2200 },
    { name: ' 13', uv: 1890, pv: 4800, amt: 2181 },
    { name: ' 14', uv: 2390, pv: 3802, amt: 2500 },
    { name: ' 15', uv: 3490, pv: 4300, amt: 2100 },
    { name: ' 16', uv: 1490, pv: 6800, amt: 2200 },
    { name: ' 17', uv: 1890, pv: 4800, amt: 2181 },
    { name: ' 18', uv: 2390, pv: 3802, amt: 2500 },
    { name: ' 19', uv: 3490, pv: 4300, amt: 2100 },
    { name: ' 20', uv: 1490, pv: 6800, amt: 2200 },
    { name: ' 21', uv: 1890, pv: 4800, amt: 2181 },
    { name: ' 22', uv: 2390, pv: 3802, amt: 2500 },
    { name: ' 23', uv: 3490, pv: 4300, amt: 2100 },
    { name: ' 24', uv: 1490, pv: 6800, amt: 2200 },
    { name: ' 25', uv: 1890, pv: 4800, amt: 2181 },
    { name: ' 26', uv: 2390, pv: 3802, amt: 2500 },
    { name: ' 27', uv: 3490, pv: 4300, amt: 2100 },
    { name: ' 28', uv: 1490, pv: 6800, amt: 2200 },
    { name: ' 29', uv: 1890, pv: 4800, amt: 2181 },
    { name: ' 30', uv: 2390, pv: 3802, amt: 2500 },
    { name: ' 31', uv: 3490, pv: 4300, amt: 2100 },
    { name: ' 32', uv: 1490, pv: 6800, amt: 2200 },
    { name: ' 33', uv: 1890, pv: 4800, amt: 2181 },
    { name: ' 34', uv: 2390, pv: 3802, amt: 2500 },
    { name: ' 35', uv: 3490, pv: 4300, amt: 2100 },
    { name: ' 36', uv: 1490, pv: 6800, amt: 2200 },
    { name: ' 37', uv: 1890, pv: 4800, amt: 2181 },
  ]

  useEffect(() => {
    setData(tempData)
  }, [])

  return (
    <ResponsiveContainer width="100%" height={190}>
      <RadarChart outerRadius="80%" data={data}>
        <Tooltip />
        {/*   <PolarGrid /> */}
        {/* <PolarAngleAxis dataKey="name" /> */}
        {/*   <PolarRadiusAxis /> */}
        <PolarGrid gridType="" radialLines={false} />
        <Radar
          data={data}
          dataKey="pv"
          stroke="#472aea"
          fill="#8884d8"
          fillOpacity={0.3}
          dot={{ strokeWidth: 2, r: 2 }}
        />
      </RadarChart>
    </ResponsiveContainer>
  )
}

const customedTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <p className="label">
          <p className="font-weight-bold">{label}</p>
          <p>
            <span className="font-weight-bold">{payload[0].value.toLocaleString()}</span>
          </p>
          <p>
            <span className="font-weight-bold">{payload[1].value.toLocaleString()}</span>
          </p>
        </p>
      </div>
    )
  }
}

export default RadarChartComponent
