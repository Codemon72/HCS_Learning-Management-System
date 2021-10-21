import { useState, useContext } from 'react';
import { CourseContext } from '../contexts/CourseContext';

const CourseUpdateForm = ({ course_event, closeUpdateForm }) => {

  console.log('CourseUpdateForm rendered', course_event);

  const { fetchCourseData } = useContext(CourseContext);

  const [updateFormState, setUpdateFormState] = useState({
    course_event_id: course_event.course_event_id,
    // name: course_event.Course_Module.name,
    course_module_id: course_event.Course_Module.course_module_id,
    course_start_date: course_event.course_start_date,
    course_end_date: course_event.course_end_date,
    teacher_id: course_event.Teacher.teacher_id
  });

  const updateCourseInDB = () => {
    const options = {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(updateFormState)
    };
    return fetch('http://localhost:4000/api/course_events/', options)
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
      .then(data => {console.log('course updated in db: ', data)})
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
            <label htmlFor="course_module_id">Course Name</label>
            <select 
              className="input-field"
              name="course_module_id" 
              value={updateFormState.course_module_id}
              onChange={handleInputChange} >
              <option value="" disabled hidden>Please select</option>
              <option value="1">HTML & CSS</option>
              <option value="2">Learn To Code</option>
              <option value="3">JavaScript For Web</option>
              <option value="4">Node.js</option>
              <option value="5">React.js</option>
              <option value="6">Vue.js</option>
              <option value="7">Network Technologies</option>
              <option value="8">Workshop: Databases</option>
            </select>
          </div>
          <div className="input-group">
            <label htmlFor="course_start_date">Start Date</label>
            <input 
              className="input-field"
              type="date"
              name="course_start_date"
              value={updateFormState.course_start_date}
              onChange={handleInputChange}
              />
          </div>
          <div className="input-group">
            <label htmlFor="course_end_date">End Date</label>
            <input 
              className="input-field"
              type="date"
              name="course_end_date"
              value={updateFormState.course_end_date}
              onChange={handleInputChange}
              />
          </div>
          {/* <div className="input-group">
            <label htmlFor="hours">Hours Total</label>
            <input 
              className="input-field"
              type="number" 
              min="1" max="99"
              name="hours" 
              placeholder="number" 
              maxLength="100"
              value={updateFormState.hours}
              onChange={handleInputChange} 
              />
          </div> */}
          <div className="input-group">
            <label htmlFor="teacher_id">Teacher</label>
            <select 
              type="text"
              name="teacher_id" 
              className="input-field"
              value={updateFormState.teacher_id}
              onChange={handleInputChange}
              required
              >
              <option value="" disabled hidden>Please select</option>
              <option value="null">not determined yet</option>
              <option value="1">Mary Vokicic</option>
              <option value="2">Teresa Holfeld</option>
              <option value="3">Helder Pereira</option>
              <option value="4">Paul Anton</option>
              <option value="5">Jonas Reitmann</option>
              <option value="6">Ansgar Mertens</option>
              <option value="7">Benjamin Rabe</option>
              <option value="8">Christoph Eicke</option>
              <option value="9">Thomas Hedeler</option>
              <option value="10">Paul Börding</option>
            </select>
          </div>
          
          <div className="button-box">
            <button onClick={ closeUpdateForm }>Cancel</button>
            <input type="submit" className="button" />
          </div>

        </form>
      </div>
  )
}

export default CourseUpdateForm
