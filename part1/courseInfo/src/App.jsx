
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
      <Content part={part1} exercise={exercise1} />
      <Content part={part2} exercise={exercise2} />
      <Content part={part3} exercise={exercise3} />
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
  return (
    <p>{props.part} {props.exercise}</p>
  )
}

const Total = (props) => {
  return (
    <p>Total number of exercises {props.total}</p>
  )
}
export default App
