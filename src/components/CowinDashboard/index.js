import {Component} from 'react'
import Loader from 'react-loader-spinner'
import VaccinationCoverage from '../VaccinationCoverage'
import VaccinationByGender from '../VaccinationByGender'
import VaccinationByAge from '../VaccinationByAge'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class CowinDashboard extends Component {
  state = {covidData: [], apiStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.getCovidVaccinationDetails()
  }

  getCovidVaccinationDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const vaccinationDataApiUrl = 'https://apis.ccbp.in/covid-vaccination-data'

    const response = await fetch(vaccinationDataApiUrl)
    if (response.ok === true) {
      const data = await response.json()
      const dataOne = data.last_7_days_vaccination
      const last7DaysVaccination = dataOne.map(item => ({
        vaccineDate: item.vaccine_date,
        doseOne: item.dose_1,
        doseTwo: item.dose_2,
      }))
      const dataTwo = data.vaccination_by_age
      const vaccinationByAge = dataTwo.map(item => ({
        age: item.age,
        count: item.count,
      }))
      const dataThree = data.vaccination_by_gender
      const vaccinationByGender = dataThree.map(item => ({
        gender: item.gender,
        count: item.count,
      }))

      const updatedData = {
        last7DaysVaccination,
        vaccinationByAge,
        vaccinationByGender,
      }
      this.setState({
        covidData: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else if (response.ok === false) {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  successView = () => {
    const {covidData} = this.state

    return (
      <>
        <VaccinationCoverage
          last7DaysVaccinations={covidData.last7DaysVaccination}
        />

        <VaccinationByGender
          vaccinationByGenders={covidData.vaccinationByGender}
        />

        <VaccinationByAge vaccinationByAges={covidData.vaccinationByAge} />
      </>
    )
  }

  loaderView = () => (
    <div data-testid="loader" className="loader-container">
      <Loader type="ThreeDots" color="#ffffff" height={80} width={80} />
    </div>
  )

  failureView = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
        className="failure-image"
      />
      <h1 className="failure-heading">Something went wrong</h1>
    </div>
  )

  getTheFinalView = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.successView()
      case apiStatusConstants.inProgress:
        return this.loaderView()
      case apiStatusConstants.failure:
        return this.failureView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="covin-dash-board-container">
        <div className="web-site-logo-container">
          <img
            className="website-logo"
            src="https://assets.ccbp.in/frontend/react-js/cowin-logo.png"
            alt="website logo"
          />
          <h1 className="logo-heading">co-Win</h1>
        </div>
        <h1 className="cowin-heading">coWIN Vaccination in India</h1>
        {this.getTheFinalView()}
      </div>
    )
  }
}

export default CowinDashboard
