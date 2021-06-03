import { useState } from 'react';
import CourseUpdateForm from './CourseUpdateForm';

const Course = ({course_event, handleDelete}) => {

  console.log('Course rendered');

  const [formVisibility, setFormVisibility] = useState(false);

  const handledeleteSession = (e, session_id) => {
    e.preventDefault();
    console.log('session_id: ', session_id);
  }

  const chooseUpdate = () => {
    setFormVisibility(true);
  };

  const closeUpdateForm = () => {
    setFormVisibility(false);
  };

  const displayDateTime = (dateString, dateTime) => {
    let options = {}
    if (dateTime === 'date') {
      options = {
        day: '2-digit', month: '2-digit', year: '2-digit', timeZone: 'Europe/Berlin'
      };
    } else if (dateTime === 'time') {
      options = {
        hour: '2-digit', minute: '2-digit', timeZone: 'Europe/Berlin'
      };
    } else if (dateTime === 'weekday') {
      options = {
        weekday: 'short', timeZone: 'Europe/Berlin'
      };
    }
    let l10nDE = new Intl.DateTimeFormat("en-UK", options);
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
      <div className="display__sessions">
        <h4>Sessions</h4>
      { course_event.Sessions.length === 0 
          ? <div className="display__session">There are no sessions listed yet for this course.</div>
          : <table >
            <thead>
              <tr>
                <th>#</th>
                <th>Day</th>
                <th>Date</th>
                <th>Start</th>
                <th>End</th>
              </tr>
            </thead>
            <tbody>
              { course_event.Sessions.map((session, index) => {
                return ( 
                  <tr className="display__session" key = {session.session_id}>
                    <td>{ index + 1 }</td>
                    <td>{ displayDateTime(session.session_start, 'weekday') }</td>
                    <td>{ displayDateTime(session.session_start, 'date') }</td>
                    <td>{ displayDateTime(session.session_start, 'time') }</td>
                    <td>{ displayDateTime(session.session_end, 'time') }</td>
                    <span>
                      <button onClick={(e) => handledeleteSession(e, session.session_id)}>Delete Session</button>
                    </span>
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
