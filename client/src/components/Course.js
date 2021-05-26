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

  const displayDate = (dateString) => {
    const options = {
      day: '2-digit', month: '2-digit', year: '2-digit', timeZone: 'Europe/Berlin'
    };
    var l10nDE = new Intl.DateTimeFormat("de-DE", options);
    return (l10nDE.format(new Date(dateString)))
  };
  const displayTime = (dateString) => {
    const options = {
      hour: '2-digit', minute: '2-digit', timeZone: 'Europe/Berlin'
    };
    var l10nDE = new Intl.DateTimeFormat("de-DE", options);
    return (l10nDE.format(new Date(dateString)))
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
      { course_event.Sessions.length === 0 
          ? <div className="session">There are no sessions listed yet for this course.</div>
          : <table >
            <thead>
              <tr>
                <th>#</th>
                <th>Date</th>
                <th>Start</th>
                <th>End</th>
              </tr>
            </thead>
            <tbody>
              { course_event.Sessions.map((session, index) => {
                return ( 
                  <tr className="session">
                    <td>{ index + 1 }</td>
                    <td>{ displayDate(session.session_start) }</td>
                    <td>{ displayTime(session.session_start) }</td>
                    <td>{ displayTime(session.session_end) }</td>
                  </tr>
                )
              })}
            </tbody>
            </table>
          }
      </div>

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
