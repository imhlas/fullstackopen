const Person = ({ person, toggleRemoval }) => {
  return (
    <div>
      {person.name} {person.number}
      <button onClick={toggleRemoval}>delete</button>
    </div>
  )
}

export default Person
