import React, { useEffect, useState } from 'react'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts'

const data = [
  { name: 'Banker Win', value: 0 },
  { name: 'Player Pair', value: 0 },
  { name: 'Tie', value: 0 },
]
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']

const PieChartComponent = (props) => {
  const [bankerVsPlayer, setBankerVsPlayer] = useState([])

  useEffect(() => {
    setBankerVsPlayer(props.bankerVsPlayer)
  })

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Legend />
        <Tooltip />
        <Pie
          data={bankerVsPlayer}
          cx="50%"
          cy="50%"
          innerRadius={0}
          outerRadius={80}
          fill="#8884d8"
          paddingAngle={5}
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={index} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  )
}

export default PieChartComponent
