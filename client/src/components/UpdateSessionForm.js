

const UpdateSessionForm = ({setFormVisibility}) => {

  console.log('UpdateSessionForm rendered')

  const handleOnSubmit = (e) => {
    e.preventDefault();
    console.log('on submit clicked')
  };

  return (
    <div className='update_form'>
      Edit Session
      <form onSubmit={handleOnSubmit}>


        <div className='button-box'>
          <button onClick={() => setFormVisibility('')}>Cancel</button>
          <input type='submit' className='button' />
        </div>
      </form>
    </div>
  );
}

export default UpdateSessionForm;
