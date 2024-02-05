import Contents from "./Contents"
import Header from "./Header"
import Total from "./Total"
const Course = ({course}) => {
  return (
    <>
    <Header title={course.name}/>
    <Contents parts={course.parts}/>
    <Total total={course.parts}/>
    </>
  )
}

export default Course