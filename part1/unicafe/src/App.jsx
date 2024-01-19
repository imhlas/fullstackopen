import { useState } from 'react'

const Header = ({ name }) => <h1>{name}</h1>

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const StatisticLine = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
)

const Statistics = ({ good, neutral, bad, all }) => {
  if ( all === 0) {
    return (
      <div>
        No feedback given
      </div>
    )
  }

  const average = (good-bad)/all
  const positive = ((good / all) * 100).toFixed(1) + ' %'

  return (
    <table>
      <tbody>
        <StatisticLine text="good" value={good} />
        <StatisticLine text="neutral" value={neutral} />
        <StatisticLine text="bad" value={bad} />
        <StatisticLine text="all" value={all} />
        <StatisticLine text="average" value={average.toFixed(1)} />
        <StatisticLine text="positive" value={positive} />
      </tbody>
    </table>
  )

}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)

  const handleGoodClick = () => {
    setGood(good+1)
    setAll(all+1)
  }

  const handleNeutralClick = () => {
    setNeutral(neutral+1)
    setAll(all+1)
  }

  const handleBadClick = () => {
    setBad(bad+1)
    setAll(all+1)
  }

  return (
    <div>
      <Header name='give feedback' />
      <Button handleClick={handleGoodClick} text="good" />
      <Button handleClick={handleNeutralClick} text="neutral" />
      <Button handleClick={handleBadClick} text="bad" />
      <Header name='statistics' />
      <Statistics good={good} neutral={neutral} bad={bad} all={all} />
    </div>
  )
}

export default App
