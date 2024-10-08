import CourseList from "./components/CourseList"

const App = () => {

  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        },
        {
          name: 'Garibaldi',
          exercises: 1,
          id: 5
        },
        {
          name: 'Campari spritz',
          exercises: 5,
          id: 6
        },
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        },
        {
          name: 'Spaten',
          exercises: 5,
          id: 3
        }
      ]
    }
  ]

  return (
    <div>
      <CourseList courses={courses} />
    </div>
  )
}

export default App