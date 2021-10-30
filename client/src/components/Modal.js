import { useState } from 'react';
import AddCourseForm from './AddCourseForm';
import AddSessionsForm from './AddSessionsForm';

const Modal = () => {

  const [modalState, setModalState] = useState('addCourseButton');
  const [courseEventIDInProgress, setCourseEventIDInProgress] = useState(null);

  console.log('modalState: ', modalState);

  return (
    <div className='modal'>
      <h3>Modal</h3>
      <br />

      {modalState === 'addCourseButton' && (
        <button
          className='addCourseButton'
          onClick={() => setModalState('addCourseForm')}
        >
          Add Course
        </button>
      )}

      {modalState === 'addCourseForm' && (
        <AddCourseForm 
          setModalState={setModalState} 
          setCourseEventIDInProgress={setCourseEventIDInProgress} />
      )}

      {modalState === 'addSessionsForm' && (
        <AddSessionsForm 
          setModalState={setModalState} 
          courseEventIDInProgress={courseEventIDInProgress} />
      )}
    </div>
  );
};

export default Modal;
