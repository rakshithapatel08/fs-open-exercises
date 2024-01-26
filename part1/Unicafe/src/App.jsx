import { useState } from "react"

function App() { 
  const [good,setGood] = useState(0);
  const [neutral,setNeutral] = useState(0);
  const [bad,setBad] = useState(0);

  const handleGood = ()=>{
    setGood(good+1);
  }

  const handleNeutral = ()=>{
    setNeutral(neutral+1);
  }

  const handleBad = ()=>{
    setBad(bad+1);
  }

  return (
    <>
     <h1>Give your feedback</h1>
     <Button onClick={handleGood} text="good"/>
     <Button onClick={handleNeutral} text="neutral"/>
     <Button onClick={handleBad} text="bad"/>

     <h1>Statistics</h1>
     <p>good = {good}</p>
     <p>neutral = {neutral}</p>
     <p>bad = {bad}</p>
     <p>total = {good + neutral + bad}</p>
     <p>average = {(good-bad)/(good + neutral + bad)}</p>
     <p>positive percentage = {good/(good + neutral + bad) *100} %</p>
    </>
  )
}

// refactoring to a button component
const Button = (props)=>{
  return(
    <>
    <button onClick={props.onClick}>{props.text}</button>
    </>
  )
}

export default App