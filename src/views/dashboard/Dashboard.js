import './Dashboard.css'
import Radar from './TempComponent/Radar/Radar'
import BarGraph from './TempComponent/BarGraph/BarGraph'

const Dashboard = () => {
  return (
    <div className="main-content-holder">
      <div className="content-grid-one">
        <Radar />
      </div>
      <div className="content">
        <BarGraph />

        <div className="grid-two-item">
          <div className="subgrid-two"></div>
        </div>

        <div className="grid-two-item">
          <div className="subgrid-two"></div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
