// Write your code here
import {PieChart, Pie, Legend, Cell} from 'recharts'

import './index.css'

const VaccinationByGender = props => {
  const {vaccinationByGenders} = props
  // console.log(vaccinationByGenders)

  return (
    <div className="coverage-bg-container">
      <h1 className="coverage-heading">Vaccination by gender</h1>
      <PieChart width={1000} height={300}>
        <Pie
          cy="40%"
          cx="50%"
          data={vaccinationByGenders}
          startAngle={180}
          endAngle={0}
          innerRadius="40%"
          outerRadius="70%"
          dataKey="count"
        >
          <Cell name="Male" fill=" #f54394" />
          <Cell name="Female" fill="#5a8dee" />
          <Cell name="Others" fill="#2cc6c6" />
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

export default VaccinationByGender
