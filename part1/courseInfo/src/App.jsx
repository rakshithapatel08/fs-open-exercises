
const App = () => {
  const course = "Full Stack Web Development"
  const part1 = "Introduction to React"
  const exercise1 = 14
  const part2 = "Passing data via props object"
  const exercise2 = 10
  const part3 = "Rendering components"
  const exercise3 = 7
  return (
    <>
      <Header course={course} />
      <Content part1={part1} exercise1={exercise1} part2={part2} exercise2={exercise2} part3={part3} exercise3={exercise3} />
      <Total total={exercise1 + exercise2 + exercise3} />
    </>
  )
}

const Header = (props) => {
  return (
    <>
      <h1>{props.course}</h1>
    </>
  )
}

const Content = (props) => {
  console.log(props)
  return (
    <>
     <Part part={props.part1} exercise={props.exercise1} />
    <Part part={props.part2} exercise={props.exercise2} />
    <Part part={props.part3} exercise={props.exercise3} />

    </>
   
  )
}

const Total = (props) => {
  return (
    <p>Total number of exercises {props.total}</p>
  )
}

const Part = (props) => {
  return (
    <p>{props.part} {props.exercise}</p>
  )
}
export default App
