
const UpdateSessionForm = ({setFormVisibility, wipSession, displayDateTime}) => {

  console.log('UpdateSessionForm rendered')

  const handleOnSubmit = (e) => {
    e.preventDefault();
    console.log('on submit clicked')
  };

  return (
    <div className='update_form display__sessions'>
      Edit Session
      <form onSubmit={handleOnSubmit}>
        <table>
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
        </table>

        <div className='button-box'>
          <button onClick={() => setFormVisibility('')}>Cancel</button>
          <input type='submit' className='button' />
        </div>
      </form>
    </div>
  );
}

export default UpdateSessionForm;
