import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Header = ({ name }) => {
  return (
    <div>
      <h1>{name}</h1>
    </div>
  )
}

const Button = (props) => {
  const { onClick, text } = props
  return (
    <div>
      <button onClick={onClick}>
        {text}
      </button>
    </div>
  )
}

const Statistics = (props) => {
  const { text, value } = props
  if (text === 'average') {
    return (
      <div>
        <p>{text} {value} %</p>
      </div>
    )
  }

  return (
    <div>
      <p>{text} {value}</p>
    </div>
  )
}

const App = () => {
  // save clicks of each button to their own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const all = good + neutral + bad
  const average = (good - bad) / all
  const positive = (good) / all * 100

  const handleGood = () => {
    console.log('clicked good')
    setGood(good + 1)
  }

  const handleNeutral = () => {
    console.log('clicked neutral')
    setNeutral(neutral + 1)
  }

  const handleBad = () => {
    console.log('clicked bad')
    setBad(bad + 1)
  }

  if (all === 0) {
    return (
      <div>
        <Header name={'give feedback'} />
        <Button onClick={handleGood} text='good' />
        <Button onClick={handleNeutral} text='neutral' />
        <Button onClick={handleBad} text='bad' /> 
        <Header name={'statistics'} />
        <p>No feedback given</p>
      </div>
    )
  }
  return (
    <div>
      <Header name={'give feedback'} />
      <Button onClick={handleGood} text='good' />
      <Button onClick={handleNeutral} text='neutral' />
      <Button onClick={handleBad} text='bad' /> 
      <Header name={'statistics'} />
      <table>
        <tbody>
          <tr><td><Statistics text='good' value={good} /></td></tr>
          <tr><td><Statistics text='neutral' value={neutral} /></td></tr>
          <tr><td><Statistics text='bad' value={bad} /></td></tr>
          <tr><td><Statistics text='all' value={all} /></td></tr>
          <tr><td><Statistics text='average' value={average} /></td></tr>
          <tr><td><Statistics text='positive' value={positive} /></td></tr>
        </tbody>
      </table>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))