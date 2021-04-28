import { useState } from 'react';

const Course = ({course, handleDelete}) => {

  console.log('Course rendered');

  const handleUpdateCourse = () => {
    console.log('handleUpdateCourse')
  }

  const [updateFormState, setUpdateFormState] = useState({
    name: course.name,
    start_date: course.start_date,
    end_date: course.end_date,
    hours: course.hours,
    teacher_id: course.teacher_id
  });

  const handleInputChange = (event) => {
    const value = event.target.value;
    setUpdateFormState({
      ...updateFormState,
      [event.target.name]: value
    });
  };


  return (
    <div className="course">
      <h3>Course: {course.name} </h3>
      <div>Course ID: {course.course_id}</div>
      <div>Start Date: {course.start_date}</div>
      <div>End Date: {course.end_date}</div>
      <div>Hours: {course.hours}</div>
      <div>Trainer: { course.Teacher != null ? course.Teacher.name : 'not determined yet'}</div>
      <button onClick={() => handleDelete(course.course_id)}>Delete</button>
      <div className="course-update-form">
        <form onSubmit={handleUpdateCourse}>
          <div className="input-group">
            <label htmlFor="name">Course Name</label>
            <select 
              className="input-field"
              name="name" 
              value={updateFormState.name}
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
            <label htmlFor="start_date">Start Date</label>
            <input 
              className="input-field"
              type="date"
              name="start_date"
              value={updateFormState.start_date}
              onChange={handleInputChange}
              />
          </div>
          <div className="input-group">
            <label htmlFor="end_date">End Date</label>
            <input 
              className="input-field"
              type="date"
              name="end_date"
              value={updateFormState.end_date}
              onChange={handleInputChange}
              />
          </div>
          <div className="input-group">
            <label htmlFor="hours">Hours Total</label>
            <input 
              className="input-field"
              type="number" 
              name="hours" 
              placeholder="number" 
              maxLength="100"
              value={updateFormState.hours}
              onChange={handleInputChange} 
              />
          </div>
          <div className="input-group">
            <label htmlFor="teacher_id">Teacher</label>
            <select 
            type="number"
            name="teacher_id" 
            className="input-field"
            value={updateFormState.teacher_id}
            onChange={handleInputChange}
            required
            >
              <option value="" disabled hidden>Please select</option>
              <option value="null">not determined yet</option>
              <option value="2">Alexander Löhn</option>
              <option value="5">Ansgar Mertens</option>
              <option value="11">Benjamin Rabe</option>
              <option value="7">Christoph Eicke</option>
              <option value="1">Helder Pereira</option>
              <option value="4">Jonas Reitmann</option>
              <option value="8">Teresa Holfeld</option>
              <option value="9">Thomas Hedeler</option>
              <option value="10">Mary Vokicic</option>
              <option value="3">Paul Anton</option>
              <option value="6">Paul Mölders</option>
            </select>
          </div>
      
          <div className="input-group">
          <input type="submit" />
          </div>
        </form>
      </div>
    </div>
  )
}

export default Course
