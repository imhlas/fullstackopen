const Header = (props) => {
  return (
    <div>
      <h1>{props.course}</h1>
    </div>
  )
}

const Content = (props) => {
  return (
    <div>
      <h3>{props.name}</h3>
      Number of exercises: {props.exercises}
    </div>
  )
}

const Total = (props) => {
  return (
    <div>
      Total number of exercises: {props.sum}
    </div>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const parts = [
    { name: 'Fundamentals of React', exercises: 10},
    { name: 'Using props to pass data', exercises: 7},
    { name: 'State of a component', exercises: 14},
  ]
  const sum = parts[0].exercises + parts[1].exercises + parts[2].exercises


  return (
    <div>
      <Header course={course} />
      <Content name={parts[0].name} exercises={parts[0].exercises} />
      <Content name={parts[1].name} exercises={parts[1].exercises} />
      <Content name={parts[2].name} exercises={parts[2].exercises} />
      <p>
      <Total sum = {sum}  />
      </p>
    </div>
  )
}

export default App