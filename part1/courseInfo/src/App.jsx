
const App = () => {
  const course = "Full Stack Web Development"
  const part1 = {
    name: "Introduction to React",
    exercise: 14
  }
  const part2 = {
    name: "Passing data via props object",
    exercise: 10
  }
  const part3 = {
    name: "Rendering components",
    exercise: 7
  }

  return (
    <>
      <Header course={course} />
      <Content part1={part1} part2={part2} part3={part3} />
      <Total part1={part1} part2={part2} part3={part3} />
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
    <>
      <Part part={props.part1} />
      <Part part={props.part2} />
      <Part part={props.part3} />

    </>

  )
}

const Total = (props) => {
  return (
    <p>Total number of exercises {props.part1.exercise + props.part2.exercise + props.part3.exercise}</p>
  )
}

const Part = (props) => {
  console.log(props);
  return (
    <p>{props.part.name} {props.part.exercise}</p>
  )
}
export default App
