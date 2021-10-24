import { useState } from 'react';
import AddCourse from './AddCourseForm';
import AddSessions from './AddSessionsForm';

const Modal = () => {

  const [modalState, setModalState] = useState('addCourseButton');

  const [courseEventID, setCourseEventID] = useState('');

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
        <AddCourse setModalState={setModalState} setCourseEventID={setCourseEventID}/>
      )}

      {modalState === 'addSessionsForm' && (
        <AddSessions setModalState={setModalState} courseEventID={courseEventID} setCourseEventID={setCourseEventID}/>
      )}
    </div>
  );
};

export default Modal;
