import { useState } from 'react'


const Dashboard = () => {

  const [formState, setFormState] = useState({
    name: 'null',
    hours: null
  });

  const handleInputChange = (event) => {
    const value = event.target.value;
    setFormState({
      ...formState,
      [event.target.name]: value
    });
  };       

  const handleAddCourse = (e) => {
    e.preventDefault()
    console.log(formState)
  }

  return (
    <div className="dashboard">
      Dashboard <br/><br/><br/>

      <form onSubmit={handleAddCourse}>
      <div className="input-group">
        <label htmlFor="name">Course Name</label>
        <select 
          className="input-field"
          name="name" 
          value={formState.name}
          onChange={handleInputChange} >
          <option value="null" disabled hidden>Please select</option>
          <option value="HTML & CSS">HTML & CSS</option>
          <option value="Learn To Code">Learn To Code</option>
          <option value="JavaScript For Web">JavaScript For Web</option>
          <option value="React.js">React.js</option>
          <option value="Node.js">Node.js</option>
          <option value="Vue.js">Vue.js</option>
        </select>
      </div>
      <div className="input-group">
        <label htmlFor="hours">Hours Total</label>
        <input 
          className="input-field"
          type="number" 
          name="hours" 
          placeholder="number" 
          maxLength="100"
          value={formState.number} />
      </div>
      
      <div className="input-group">
      <input type="submit" value="Add Course" id="AddSubmit" />
      </div>
    </form>
    </div>
  )
}

export default Dashboard
