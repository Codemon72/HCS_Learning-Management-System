import { useState } from 'react';

const UpdateSessionForm = ({setFormVisibility, wipSession}) => {

  console.log('UpdateSessionForm rendered')

  const initialFormState = {
    course_event_id: '',
    session_id: '',
    session_start: '',
    session_end: '',
  };

  const [formState, setFormState] = useState(initialFormState);

  const handleSessionInputChange = (event) => {
    console.log('event.target: ', event.target)
    let temp = {...formState};
    const { name, value } = event.target;
    temp[name] = value;
    temp.course_event_id = wipSession.course_event_id;
    temp.session_id = wipSession.session_id;
    setFormState(temp);
    console.table(temp);
  };


  const handleOnSubmit = (e) => {
    e.preventDefault();
    console.log('formState: ', formState);
    console.log('on submit clicked')
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
