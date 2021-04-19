import { useState } from 'react'


const Dashboard = () => {

  const [selected, setSelected] = useState("null");

  const handleSelectorChange = (event) => {
    setSelected(event.target.value);
    // setChangeValue('')
  };       

  const handleAddCourse = (e) => {
    e.preventDefault()
    console.log(e.target.value)
  }

  return (
    <div className="dashboard">
      Dashboard <br/><br/><br/>

      <form onSubmit={handleAddCourse}>
      <div className="input-group">
        <label htmlFor="name">Course Name</label>
        <select 
          className=""
          name="name" 
          id="name"
          value={selected}
          onChange={handleSelectorChange} >
          <option value="null" disabled hidden>Please select</option>
          <option value="HTML & CSS">HTML & CSS</option>
          <option value="Learn To Code">Learn To Code</option>
          <option value="JavaScript For Web">JavaScript For Web</option>
          <option value="React.js">React.js</option>
          <option value="Node.js">Node.js</option>
          <option value="Vue.js">Vue.js</option>
        </select>
      </div>
      
      <input type="submit" value="Add Course" className="" id="AddSubmit" />
    </form>
    </div>
  )
}

export default Dashboard
