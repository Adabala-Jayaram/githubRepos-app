import './index.css'

const RepositoryItem = props => {
  const {eachItem} = props
  const {name, avatarUrl, starsCount, forksCount, issuesCount} = eachItem
  return (
    <li className="repository-card">
      <img src={avatarUrl} alt="avatar" className="repository-card-img" />
      <h1 className="repository-card-name">{name}</h1>
      <div className="repository-text-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
          alt="stars"
          className="repository-card-icons"
        />
        <p className="card-item-description">{starsCount} stars</p>
      </div>
      <div className="repository-text-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
          alt="forks"
          className="repository-card-icons"
        />
        <p className="card-item-description">{forksCount} forks</p>
      </div>
      <div className="repository-text-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
          alt="open issues"
          className="repository-card-icons"
        />
        <p className="card-item-description">{issuesCount} issues</p>
      </div>
    </li>
  )
}

export default RepositoryItem
