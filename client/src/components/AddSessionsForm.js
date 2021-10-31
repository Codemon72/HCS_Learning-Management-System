import { useState, useContext } from 'react';
import { CourseContext } from '../contexts/CourseContext';

const AddSessions = ({ courseEventIDInProgress, setCourseEventIDInProgress, setFormVisibility }) => {
  
  const { fetchCourseData } = useContext(CourseContext);
  
  console.log('AddSessions rendered');

  const initialFormState = [
    {
      course_event_id: courseEventIDInProgress,
      session_start: '',
      session_end: '',
    },
  ];

  const [formState, setFormState] = useState(initialFormState);

  // onlyDuringDev:
  const logFormstate = (e) => {
    e.preventDefault();
    console.table(formState);
  };

  const handleSessionInputChange = (event, i) => {
    let temp = [...formState];
    const { name, value } = event.target;
    temp[i][name] = value;
    temp[i].course_event_id = courseEventIDInProgress;
    setFormState(temp);
    console.table(temp);
  };

  const addSessionFormField = (e) => {
    e.preventDefault();
    let temp = [...formState];
    temp.push({
      course_event_id: courseEventIDInProgress,
      session_start: '',
      session_end: '',
    });
    console.table(temp);
    setFormState(temp);
  };

  const deleteSessionFormField = (e, i) => {
    e.preventDefault();
    const temp = [...formState];
    temp.splice(i, 1);
    setFormState(temp);
  };

  const addSessionsToDB = () => {
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formState),
    };
    return fetch('http://localhost:4000/api/sessions', options).then((res) => {
      if (!res.ok) {
        // errors from server
        throw Error(res.statusText);
      }
      return res.json();
    });
  };

  const handleAddSessions = (e) => {
    e.preventDefault();
    console.log(formState);
    addSessionsToDB()
      .then((data) => {
        console.log('sessions added to db: ', data);
      })
      .then(() => fetchCourseData())
      .catch((error) => console.log(error));
    setCourseEventIDInProgress(null);
    setFormState(initialFormState);
    setFormVisibility('');
  };

  return (
    <div className='dashboard__session'>
      <h3>Add Sessions</h3>
      <br />
      <span>CourseEventID: {courseEventIDInProgress}</span>
      <form onSubmit={handleAddSessions}>
        {formState.map((session, i) => {
          return (
            <div key={i} className='session'>
              <h4>{i + 1}. Session</h4>
              <div className='deleteOption'>
                <div className='deleteIcon'>+</div>
                <br />
                <button onClick={(e) => deleteSessionFormField(e, i)}>
                  Delete Session
                </button>
              </div>
              <div className='input-group'>
                <label htmlFor='session_start'>Start</label>
                <input
                  type='datetime-local'
                  name='session_start'
                  className='input-field'
                  onChange={(e) => handleSessionInputChange(e, i)}
                  value={session.session_start}
                />
              </div>
              <div className='input-group'>
                <label htmlFor='session_end'>End</label>
                <input
                  type='datetime-local'
                  name='session_end'
                  className='input-field'
                  onChange={(e) => handleSessionInputChange(e, i)}
                  value={session.session_end}
                />
              </div>
            </div>
          );
        })}
        <div className='addSessionFormField'>
          <span>Add Input Field </span>
          <button
            className='dashboard__session button'
            onClick={addSessionFormField}
          >
            +
          </button>
        </div>

        {/* onlyDuringDev: */}
        <div className='addSessionFormField'>
          <span>Log FormState </span>
          <button className='dashboard__session button' onClick={logFormstate}>
            Log FormState
          </button>
        </div>
        <br />

        <div className='input-group'>
          <input
            type='submit'
            className='button'
          />
        </div>
      </form>
    </div>
  );
};

export default AddSessions;
