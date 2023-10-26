// Write your code here
import {BarChart, Bar, XAxis, YAxis, Legend} from 'recharts'
import './index.css'

const VaccinationCoverage = props => {
  const {last7DaysVaccinations} = props
  // console.log(last7DaysVaccinations)

  const DataFormatter = number => {
    if (number > 1000) {
      return `${(number / 1000).toString()}k`
    }
    return number.toString()
  }

  return (
    <div className="coverage-bg-container">
      <h1 className="coverage-heading">Vaccination Coverage</h1>
      <div>
        <BarChart
          width={1000}
          height={300}
          data={last7DaysVaccinations}
          margin={{
            top: 5,
          }}
        >
          <XAxis
            dataKey="vaccineDate"
            tick={{
              stroke: 'gray',
              strokeWidth: 1,
            }}
          />
          <YAxis
            tickFormatter={DataFormatter}
            tick={{
              stroke: 'gray',
              strokeWidth: 0,
            }}
          />
          <Legend
            wrapperStyle={{
              padding: 30,
            }}
          />
          <Bar dataKey="doseOne" name="Dose 1" fill="#5a8dee" barSize="20%" />
          <Bar dataKey="doseTwo" name="Dose 2" fill="#f54394" barSize="20%" />
        </BarChart>
      </div>
    </div>
  )
}

export default VaccinationCoverage
