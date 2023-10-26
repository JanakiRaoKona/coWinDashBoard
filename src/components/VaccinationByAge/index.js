// Write your code here
// Write your code here
import {PieChart, Pie, Legend, Cell} from 'recharts'

import './index.css'

const VaccinationByAge = props => {
  const {vaccinationByAges} = props
  console.log(vaccinationByAges)

  return (
    <div className="coverage-bg-container">
      <h1 className="coverage-heading">Vaccination by Age</h1>

      <PieChart width={1000} height={300}>
        <Pie
          cy="40%"
          cx="50%"
          data={vaccinationByAges}
          startAngle={0}
          endAngle={360}
          innerRadius="0%"
          outerRadius="70%"
          dataKey="count"
        >
          <Cell name="18-44" fill="#2d87bb" />
          <Cell name="44-60" fill="#a3df9f" />
          <Cell name="Above 60" fill="#2cc6c6" />
        </Pie>
        <Legend
          iconType="circle"
          layout="horizontal"
          verticalAlign="bottom"
          align="center"
        />
      </PieChart>
    </div>
  )
}

export default VaccinationByAge
