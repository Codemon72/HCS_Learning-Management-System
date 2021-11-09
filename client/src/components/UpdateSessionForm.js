import { useState, useContext } from 'react';
import { CourseContext } from '../contexts/CourseContext';

const UpdateSessionForm = ({setFormVisibility, wipSession}) => {

  console.log('UpdateSessionForm rendered');

  const { fetchCourseData } = useContext(CourseContext);

  const [formState, setFormState] = useState({
    course_event_id: '',
    session_id: '',
    session_start: '',
    session_end: '',
  });

  const handleSessionInputChange = (event) => {
    let temp = {...formState};
    const { name, value } = event.target;
    temp[name] = value;
    temp.course_event_id = wipSession.course_event_id;
    temp.session_id = wipSession.session_id;
    setFormState(temp);
  };

  const updateSessionInDB = () => {
    const options = {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(formState)
    };
    return fetch('http://localhost:4000/api/sessions/', options)
             .then(res => { 
              if (!res.ok) { // errors from server
                throw Error(res.statusText);
              }
              return res.json();
            });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    updateSessionInDB()
      .then(data => {console.log('session updated in db: ', data)})
      .then(() => fetchCourseData())
      .catch(error => console.log(error));
    setFormVisibility('');
  };

  // onlyDuringDev:
  const logFormstate = (e) => {
    e.preventDefault();
    console.log(formState);
  };

  return (
    <div className='update_form display__sessions'>
      <h3>Edit Session #  {wipSession.index + 1}</h3>
      <br />
      <form onSubmit={handleOnSubmit}>
        <div className='input-group'>
                <label htmlFor='session_start'>Start</label>
                <input
                  type='datetime-local'
                  name='session_start'
                  className='input-field'
                  onChange={(e) => handleSessionInputChange(e)}
                  value={formState.session_start}
                />
              </div>
              <div className='input-group'>
                <label htmlFor='session_end'>End</label>
                <input
                  type='datetime-local'
                  name='session_end'
                  className='input-field'
                  onChange={(e) => handleSessionInputChange(e)}
                  value={formState.session_end}
                />
              </div>

        <div className='button-box'>
          <button onClick={() => setFormVisibility('')}>Cancel</button>
          <input type='submit' className='button' />
        </div>
      </form>
      {/* onlyDuringDev: */}
        <br />
        <div className='addSessionFormField'>
          <button className='dashboard__session button' onClick={logFormstate}>
            (Log FormState)
          </button>
        </div>
    </div>
  );
}

export default UpdateSessionForm;
