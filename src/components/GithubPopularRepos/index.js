import {Component} from 'react'
import Loader from 'react-loader-spinner'
import LanguageFilterItem from '../LanguageFilterItem'

import RepositoryItem from '../RepositoryItem'
import './index.css'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]
const apiStatusConsants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class GithubPopularRepos extends Component {
  state = {
    activeLanguageId: languageFiltersData[0].id,
    apiStatus: apiStatusConsants.initial,
    popularRepoList: [],
  }

  componentDidMount() {
    this.callGitHubRepo()
  }

  callGitHubRepo = async () => {
    this.setState({apiStatus: apiStatusConsants.inProgress})

    const {activeLanguageId} = this.state

    const apiUrl = `https://apis.ccbp.in/popular-repos?language=${activeLanguageId}`
    const options = {
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)

    if (response.ok === true) {
      const data = await response.json()
      const fetchedData = data.popular_repos.map(eachData => ({
        id: eachData.id,
        name: eachData.name,
        issuesCount: eachData.issues_count,
        forksCount: eachData.forks_count,
        starsCount: eachData.stars_count,
        avatarUrl: eachData.avatar_url,
      }))
      this.setState({
        apiStatus: apiStatusConsants.success,
        popularRepoList: fetchedData,
      })
    } else {
      this.setState({apiStatus: apiStatusConsants.failure})
    }
  }

  onClickLanguageBtn = activeTabId => {
    this.setState({activeLanguageId: activeTabId}, this.callGitHubRepo)
  }

  renderLangaugeList = () => {
    const {activeLanguageId} = this.state
    return (
      <ul className="languages-container">
        {languageFiltersData.map(eachLanguage => (
          <LanguageFilterItem
            key={eachLanguage.id}
            languageItem={eachLanguage}
            isActive={activeLanguageId === eachLanguage.id}
            onClickLanguageBtn={this.onClickLanguageBtn}
          />
        ))}
      </ul>
    )
  }

  renderRepositories = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConsants.success:
        return this.successView()
      case apiStatusConsants.failure:
        return this.onFailureView()
      case apiStatusConsants.inProgress:
        return this.renderLoader()
      default:
        return null
    }
  }

  successView = () => {
    const {popularRepoList} = this.state

    return (
      <ul className="repos-container">
        {popularRepoList.map(eachItem => (
          <RepositoryItem key={eachItem.id} eachItem={eachItem} />
        ))}
      </ul>
    )
  }

  onFailureView = () => (
    <div className="failure-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
        className="failure-img"
      />
      <h1 className="failure-view-title">Something Went Wrong</h1>
    </div>
  )

  renderLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" height={80} width={80} color="#0284c7" />
    </div>
  )

  render() {
    return (
      <div className="github-repos-container">
        <h1 className="repos-main-heading">Popular</h1>
        {this.renderLangaugeList()}
        {this.renderRepositories()}
      </div>
    )
  }
}

export default GithubPopularRepos
