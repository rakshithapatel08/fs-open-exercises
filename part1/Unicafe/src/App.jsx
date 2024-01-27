import { useState } from "react"

function App() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleGood = () => {
    setGood(good + 1);
  }

  const handleNeutral = () => {
    setNeutral(neutral + 1);
  }

  const handleBad = () => {
    setBad(bad + 1);
  }

  return (
    <>
      <h1>Give your feedback</h1>
      <Button onClick={handleGood} text="good" />
      <Button onClick={handleNeutral} text="neutral" />
      <Button onClick={handleBad} text="bad" />
      <Statistics good={good} bad={bad} neutral={neutral} />
    </>
  )
}

// refactoring to a button component
const Button = (props) => {
  return (
    <>
      <button onClick={props.onClick}>{props.text}</button>
    </>
  )
}

const Statistics = ({ good, bad, neutral }) => {
  // destructured the props object 

  //conditional rendering
  let total = good + bad + neutral;
  if (total === 0) {
    return (
      <>
        <h1>Statistics</h1>
        <p>No feedbacks given</p>
      </>
    )
  }
  return (
    <>
      <h1>Statistics</h1>
      <StatisticLine text="good" value={good} />
      <StatisticLine text="good" value={good} />
      <StatisticLine text="neutral" value={neutral} />
      <StatisticLine text="bad" value={bad} />
      <StatisticLine text="total" value={good + neutral + bad} />
      <StatisticLine text="average" value={(good - bad) / (good + neutral + bad)} />
      <StatisticLine text="positive percentage" value={good / (good + neutral + bad) * 100 + " %"} />
    </>
  )
}

// refactoring a StatisticLine component
const StatisticLine = ({ text, value }) => {
  return (
    <>
      <p>{text} = {value}</p>
    </>
  )
}

export default App
