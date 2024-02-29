import { useState } from 'react'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const getAverage = () => {
    const total = good + neutral + bad
    return total > 0 ? (good - bad) / total : 0
  }
  const getPositiveRating = () => {
    const total = good + neutral + bad
    return total > 0 ? (good / total) * 100 + ' %' : 0 + ' %'
  }

  return (
    <div>
      <h1>Give Feedback</h1>
      <Button handleClick={() => setGood(good + 1)} text='good' />
      <Button handleClick={() => setNeutral(neutral + 1)} text='neutral' />
      <Button handleClick={() => setBad(bad + 1)} text='bad' />
      <h2>Statistics</h2>
      <Statistics good={good}
                  neutral={neutral}
                  bad={bad}
                  getAverage={getAverage}
                  getPositiveRating={getPositiveRating}
      />
    </div>
  )
}

const Button = ({handleClick, text}) => {
  return (
    <button onClick={handleClick}>{text}</button>
  )
}

const StatisticLine = ({text, value}) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Statistics = (props) => {
  if (props.good + props.neutral + props.bad === 0) {
    return (
      <div>
        <p>No feedback given</p>
      </div>
    )
  }
  return (
    <table>
      <tbody>
        <StatisticLine text='good' value={props.good} />
        <StatisticLine text='neutral' value={props.neutral} />
        <StatisticLine text='bad' value={props.bad}  />
        <StatisticLine text='all' value={props.good + props.neutral + props.bad} />
        <StatisticLine text='average' value={props.getAverage()} />
        <StatisticLine text='positive' value={props.getPositiveRating()} />
      </tbody>
    </table>
  )
}

export default App
