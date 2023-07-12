import './index.css'

const LanguageFilterItem = props => {
  const {languageItem, isActive, onClickLanguageBtn} = props
  const {language, id} = languageItem
  const activeLangaugeClass = isActive ? 'active-btn' : ''

  const onClickBtn = () => {
    onClickLanguageBtn(id)
  }

  return (
    <li className="language-item">
      <button
        type="button"
        className={`language-btn ${activeLangaugeClass}`}
        onClick={onClickBtn}
      >
        {language}
      </button>
    </li>
  )
}
export default LanguageFilterItem
