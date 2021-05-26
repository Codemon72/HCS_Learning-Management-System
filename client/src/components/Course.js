import { useState } from 'react';
import CourseUpdateForm from './CourseUpdateForm';

const Course = ({course_event, handleDelete}) => {

  console.log('Course rendered');

  const [formVisibility, setFormVisibility] = useState(false);

  const chooseUpdate = () => {
    setFormVisibility(true);
  };

  const closeUpdateForm = () => {
    setFormVisibility(false);
  };

  return (
    <div className="course">
      <h3>Course: {course_event.Course_Module.name} </h3>
      <div>Course ID: {course_event.course_event_id}</div>
      <div>Start Date: {course_event.course_start_date}</div>
      <div>End Date: {course_event.course_end_date}</div>
      <div>Hours: {course_event.Course_Module.hours}</div>
      <div>Trainer: { course_event.Teacher != null ? course_event.Teacher.name : 'not determined yet'}</div>
      <div className="sessions">
        <h4>Sessions</h4>
      </div>
      { course_event.Sessions.length === 0 
          ? <div className="session">There are no sessions listed yet for this course.</div>
          : <div className="session">
              <span>#</span>
              <div>Session Start</div>
              <div>Session End</div>
            </div>
          }
      { course_event.Sessions.map((session, index) => {
        return ( 
          <div className="session">
            <span>{ index + 1 }</span>
            <div>{ session.session_start }</div>
            <div>{ session.session_end }</div>
          </div>
        )
      })}

      { !formVisibility && (
        <div className="button-box">
          <button onClick={chooseUpdate}>Update</button>
          <button onClick={() => handleDelete(course_event.course_id)}>Delete</button>
        </div>)}
      

      { formVisibility && <CourseUpdateForm course_event={course_event} closeUpdateForm={closeUpdateForm} /> }

    </div>
  )
}

export default Course
