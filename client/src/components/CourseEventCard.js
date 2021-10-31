import { useState } from 'react';
import AddSessionsForm from './AddSessionsForm';
import CourseUpdateForm from './CourseUpdateForm';
import icon_pencil from '../images/edit-2.svg';

const CourseEventCard = ({course_event, handleDelete, fetchCourseData}) => {

  console.log('Course rendered');

  const [formVisibility, setFormVisibility] = useState('');

  const deleteSessionFromDB = (session_id) => {
    const options = {
      method: 'DELETE'
    };
    return fetch('http://localhost:4000/api/sessions/' + session_id, options)
            .then(res => { 
              if (!res.ok) { // errors from server
                throw Error(res.statusText);
              }
              return res.json();
            });
  };

  const handleDeleteSession = (e, session_id) => {
    e.preventDefault();
    console.log('session_id: ', session_id);
    deleteSessionFromDB(session_id)
      .then(data => {console.log('session deleted: ', data)})
      .then(() => fetchCourseData())
      .catch(error => console.log(error));
  }

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
      <div>Teacher: { course_event.Teacher != null ? course_event.Teacher.name : 'not determined yet'}</div>
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
                      <td>{ displayDateTime(session.session_end, 'time') }

                        <img src={icon_pencil} className="icon" alt="" onClick={() => console.log('click')} />
                        <div 
                          onClick={(e) => handleDeleteSession(e, session.session_id)}
                          className="delete_session"
                          >x</div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          }
        <br />
        { formVisibility === '' && (
        <div>
          <button
            onClick={() => setFormVisibility('AddSessions')}
            >Add Sessions</button>
        </div> 
        )}  
        { formVisibility === 'AddSessions' && (
          <AddSessionsForm 
            setFormVisibility={setFormVisibility}
            courseEventIDInProgress={course_event.course_event_id} />
        )}
      </div>

      { formVisibility === '' && (
        <div className="button-box">
          <button onClick={() => setFormVisibility('CourseUpdateForm')}>Update Course</button>
          <button onClick={() => handleDelete(course_event.course_event_id)}>Delete</button>
        </div>)}
      

      { formVisibility === 'CourseUpdateForm' && <CourseUpdateForm course_event={course_event} setFormVisibility={setFormVisibility} /> }

    </div>
  )
}

export default CourseEventCard;
