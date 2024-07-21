const Header = (props) => {
    return (
      <>
        <h1>{props.course}</h1>
      </>
    )
  }
  
  const Part = ({ part }) => {
    return (
      <>
        <p>{part.name} {part.exercises}</p>
      </>
    )
  }
  
  const Content = ({ parts }) => parts.map(part => <Part key={part.id} part={part} />)
  
  
  const Total = ({ parts }) => {
    const sum = parts.reduce((a, b) => a + b.exercises, 0)
    return (
      <>
        <p>
          Number of exercises {sum}
        </p>
      </>
    )
  }
  
  const Course = (props) => {
    return (
      <>
        <Header course={props.course.name} />
        <Content parts={props.course.parts} />
        <Total parts={props.course.parts} />
      </>
    )
  }
  
  const CourseList = ({ courses }) => courses.map(course => <Course key={course.id} course={course} />)

  export default CourseList;