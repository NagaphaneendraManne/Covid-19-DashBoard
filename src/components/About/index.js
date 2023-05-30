import {Link} from 'react-router-dom'
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import Footer from '../Footer'
import FaqItem from '../FaqsList'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  inProgress: 'IN_PROGRESS',
  failure: 'FAILURE',
}

class About extends Component {
  state = {
    faqsList: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getCovid19Faqs()
  }

  getCovid19Faqs = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const faqUrl = 'https://apis.ccbp.in/covid19-faqs'
    const options = {
      method: 'GET',
    }
    const response = await fetch(faqUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      this.setState({
        faqsList: fetchedData.faq,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderCovidAbout = () => {
    const {faqsList} = this.state
    return (
      <div className="about-route-container">
        <h1 className="about-heading">About</h1>
        <p className="last-update">Last update on Monday, Nov 15th 2021.</p>
        <p className="about-description">
          COVID-19 vaccines be ready for distribution
        </p>
        <ul className="faq-list">
          {faqsList.map(eachFaq => (
            <FaqItem faqData={eachFaq} key={eachFaq.qno} />
          ))}
        </ul>
        <Footer />
      </div>
    )
  }

  renderLoadingView = () => (
    <div className="covid-loader-container">
      <Loader type="Oval" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderFailureView = () => (
    <div className="covid-error-view-container">
      <div className="notfound-card">
        <img
          src="https://res.cloudinary.com/dnv6kesmt/image/upload/v1636521130/mini-project/notfound_wxbwda.png"
          alt="not-found-pic"
          className="not-found-image"
        />
        <h1 className="notfound-heading">PAGE NOT FOUND</h1>
        <p className="notfound-description">
          we are sorry, the page you requested could not be found
        </p>
        <Link to="/">
          <button type="button" className="go-to-home-button">
            Home
          </button>
        </Link>
      </div>
    </div>
  )

  renderCovidAboutData = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderCovidAbout()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        {this.renderCovidAboutData()}
      </>
    )
  }
}
export default About
