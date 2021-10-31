import { useState, useContext } from 'react';
import { CourseContext } from '../contexts/CourseContext';
import { CourseModuleContext } from '../contexts/CourseModuleContext';

const CourseUpdateForm = ({ course_event, setFormVisibility }) => {

  console.log('CourseUpdateForm rendered', course_event);

  const { fetchCourseData } = useContext(CourseContext);
  
  const { courseModules } = useContext(CourseModuleContext);

  const [updateFormState, setUpdateFormState] = useState({
    course_event_id: course_event.course_event_id,
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
      .then(() => fetchCourseData())
      .catch(error => console.log(error));
    setFormVisibility('');
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
          {/* Course Module */}
          <div className="input-group">
            <label htmlFor="course_module_id">Course Name</label>
            <select 
              className="input-field"
              name="course_module_id" 
              value={updateFormState.course_module_id}
              onChange={handleInputChange} >
              <option value="" disabled hidden>Please select</option>
              {courseModules.map((course_module, i) => {
              return (
                <option value={course_module.course_module_id} key={i}>
                  {course_module.name}
                </option>
              );
            })}
            </select>
          </div>
          {/* Start Date */}
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
          {/* End Date */}
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
          {/* Teacher ID */}
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
            <button onClick={() => setFormVisibility('')}>Cancel</button>
            <input type="submit" className="button" />
          </div>

        </form>
      </div>
  )
}

export default CourseUpdateForm;
