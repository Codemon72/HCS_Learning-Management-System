import { useState } from 'react';
import AddCourseForm from './AddCourseForm';
import AddSessionsForm from './AddSessionsForm';

const Modal = () => {

  const [formVisibility, setFormVisibility] = useState('');
  const [courseEventIDInProgress, setCourseEventIDInProgress] = useState(null);

  console.log('Modal rendered');

  return (
    <div className='modal'>
      <h3>Modal</h3>
      <br />

      {formVisibility === '' && (
        <button
          className='addCourseButton'
          onClick={() => setFormVisibility('addCourseForm')}
        >
          Add Course
        </button>
      )}

      {formVisibility === 'addCourseForm' && (
        <AddCourseForm 
          setFormVisibility={setFormVisibility} 
          setCourseEventIDInProgress={setCourseEventIDInProgress} />
      )}

      {formVisibility === 'addSessionsForm' && (
        <AddSessionsForm 
          setFormVisibility={setFormVisibility} 
          courseEventIDInProgress={courseEventIDInProgress}
          setCourseEventIDInProgress={setCourseEventIDInProgress} />
      )}
    </div>
  );
};

export default Modal;
