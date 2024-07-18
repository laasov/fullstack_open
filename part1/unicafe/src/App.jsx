import { useState } from 'react'
import './App.css'

const Header = ({text}) => {
  return (
    <>
      <h1>{text}</h1>
    </>
  )
}

const StatisticLine = ({statistic, value}) => {
  return (
    <>
      <tr>
        <td>{statistic}</td> <td>{value}</td>
      </tr>
    </>
  )
}

const Positive = ({statistic, value}) => {
  return (
    <>
      <tr>
        <td>{statistic}</td> <td>{value} %</td>
      </tr>
    </>
  )
}

const Statistics = ({good, neutral, bad}) => {
  let avgNum = good*(1) + neutral*(0) + bad*(-1)
  let all = good + neutral + bad
  let avg = all === 0 ? 0 : avgNum / all
  let pos = all === 0 ? 0 : (good / all)*100

  if (all === 0) {
    return (
      <>
        <Header text="statistics" />
        <p>no feedback given</p>
      </>
    )
  }

  return (
    <>
      <Header text="statistics" />
      <table>
      <StatisticLine statistic="good" value={good} />
      <StatisticLine statistic="neutral" value={neutral} />
      <StatisticLine statistic="bad" value={bad} />
      <StatisticLine statistic="all" value={all} />
      <StatisticLine statistic="average" value={avg.toFixed(1)} />
      <Positive statistic="positive" value={pos.toFixed(1)} />
      </table>
    </>
  )
}

const Button = ({text, handler}) => {
  return (
    <button onClick={handler}>
      {text}
    </button>
  )
}

const App = () => {

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const incrementGood = () => setGood(good + 1)
  const incrementNeutral = () => setNeutral(neutral + 1)
  const incrementBad = () => setBad(bad + 1)

  return (
    <div>
      <Header text="give feedback" />
      <Button text="good" handler={incrementGood} />
      <Button text="neutral" handler={incrementNeutral} />
      <Button text="bad" handler={incrementBad} />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App
