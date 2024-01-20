const Header = ({ course }) => (
    <div>
      <h1>{course}</h1>
    </div>
  )

const Part = ({ part }) => {
  return (
    <div>
      <h3>{part.name}</h3>
      Number of exercises: {part.exercises}
    </div>
  )
}

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map(part =>
        <Part key={part.id} part={part}/>
  )}
    </div>
  )
}

const Total = ({ total }) => {
  return (
    <div>
      <strong>Total number of exercises: {total}</strong>
    </div>
  )
}


const Course = ({ course }) => {

  const total = course.parts.reduce((sum, part) => {
    return sum + part.exercises }, 0)

  return (
  <div>
   <Header course={course.name} />
   <Content parts={course.parts} />
   <br /> 
   <Total total={total} />
  </div>
)
}

export default Course
