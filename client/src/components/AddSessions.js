import { useState } from 'react';

const AddSessions = () => {

  console.log('AddSessions rendered');

  const initialFormState = [
      {
        course_event_id: '',
        session_start: '',
        session_end: '',
      }
    ];

  const [formState, setFormState] = useState(initialFormState);

  return (
    <div>
      AddSessions
    </div>
  )
}

export default AddSessions
