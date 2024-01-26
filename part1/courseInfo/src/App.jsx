
const App = () => {
  const course = "Full Stack Web Development"
  // array of objects
  const parts = [
    {
      name: "Introduction to React",
      exercise: 14
    },
    {
      name: "Passing data via props object",
      exercise: 10
    },
    {
      name: "Rendering components",
      exercise: 7
    }
  ]

  return (
    <>
      <Header course={course} />
      <Content parts={parts} />
      <Total parts={parts} />
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
  console.log(props);
  return (
    <>
      <Part part={props.parts[0]} />
      <Part part={props.parts[1]} />
      <Part part={props.parts[2]} />
    </>
  )
}

const Total = (props) => {
  return (
    <p>Total number of exercises {props.parts[0].exercise + props.parts[1].exercise + props.parts[2].exercise}</p>
  )
}

const Part = (props) => {
  console.log(props);
  return (
    <p>{props.part.name} {props.part.exercise}</p>
  )
}
export default App
