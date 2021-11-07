import { useState } from 'react';

const UpdateSessionForm = ({setFormVisibility, wipSession}) => {

  console.log('UpdateSessionForm rendered')
  console.log('wipSession: ', wipSession)

  const initialFormState = [
    {
      course_event_id: 'wipSession.course_event_id',
      session_start: '',
      session_end: '',
    },
  ];

  const [formState, setFormState] = useState(initialFormState);


  const handleSessionInputChange = (event) => {
    let temp = [...formState];
    const { name, value } = event.target;
    temp.name = value;
    temp.course_event_id = wipSession.course_event_id;
    setFormState(temp);
    console.table(temp);
  };


  const handleOnSubmit = (e) => {
    e.preventDefault();
    console.log('on submit clicked')
  };

  return (
    <div className='update_form display__sessions'>
      <h3>Edit Session #  {wipSession.index + 1}</h3>
      <br />
      <form onSubmit={handleOnSubmit}>
        {/* <table>
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
            <tr className='display__session'>
              <td>{wipSession.index + 1}</td>
              <td>{displayDateTime(wipSession.session_start, 'weekday')}</td>
              <td>{displayDateTime(wipSession.session_start, 'date')}</td>
              <td>{displayDateTime(wipSession.session_start, 'time')}</td>
              <td>{displayDateTime(wipSession.session_end, 'time')}</td>
            </tr>
          </tbody>
        </table> */}
        <div className='input-group'>
                <label htmlFor='session_start'>Start</label>
                <input
                  type='datetime-local'
                  name='session_start'
                  className='input-field'
                  onChange={(e) => handleSessionInputChange(e)}
                  value={wipSession.session_start.slice(0, -1)}
                />
              </div>
              <div className='input-group'>
                <label htmlFor='session_end'>End</label>
                <input
                  type='datetime-local'
                  name='session_end'
                  className='input-field'
                  onChange={(e) => handleSessionInputChange(e)}
                  value={wipSession.session_end.slice(0, -1)}
                />
              </div>

        <div className='button-box'>
          <button onClick={() => setFormVisibility('')}>Cancel</button>
          <input type='submit' className='button' />
        </div>
      </form>
    </div>
  );
}

export default UpdateSessionForm;
