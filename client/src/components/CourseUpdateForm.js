import { useState, useContext } from 'react';
import { CourseContext } from '../contexts/CourseContext';

const CourseUpdateForm = ({ course, closeUpdateForm }) => {

  console.log('CourseUpdateForm rendered');

  const { fetchCourseData } = useContext(CourseContext);

  const [updateFormState, setUpdateFormState] = useState({
    name: course.name,
    start_date: course.start_date,
    end_date: course.end_date,
    hours: course.hours,
    teacher_id: course.teacher_id,
    course_id: course.course_id
  });

  const updateCourseInDB = () => {
    const options = {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(updateFormState)
    };
    return fetch('http://localhost:4000/api/courses/', options)
             .then(res => { 
              if (!res.ok) { // errors from server
                throw Error(res.statusText);
              }
              return res.json();
            });
  };

  const handleUpdateCourse = (e) => {
    e.preventDefault();
    updateCourseInDB()
      .then(data => {console.log('course updated in db: ',data)})
      // .then(() => {console.table(updateFormState)})
      .then(() => fetchCourseData())
      .catch(error => console.log(error));
    closeUpdateForm();
  };

  const handleInputChange = (event) => {
    const value = event.target.value;
    setUpdateFormState({
      ...updateFormState,
      [event.target.name]: value
    });
  };

  return (
    <div className="course_update_form">
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
          
          <div className="button-box">
            <button onClick={ closeUpdateForm }>Cancel</button>
            <input type="submit" />
          </div>

        </form>
      </div>
  )
}

export default CourseUpdateForm
