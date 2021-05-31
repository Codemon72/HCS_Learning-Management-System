import { useState } from "react";

const AddSessions = () => {
  console.log("AddSessions rendered");

  const initialFormState = [
    {
      course_event_id: "",
      session_start: "",
      session_end: ""
    }
  ];

  const [formState, setFormState] = useState(initialFormState);

  const handleSessionInputChange = (event, i) => {
    let temp = { ...formState };
    const { name, value } = event.target;
    temp[i][name] = value;
    setFormState(temp);
    console.log(temp);
  };

  const addSessionForm = (e) => {
    e.preventDefault();
    let temp = {...formState};
    temp.sessions.push({session_start: '', session_end: ''}) 
    setFormState(temp);
    console.log(temp);
  };

  return (
  <div className="dashboard__session">
    <h4>Add Sessions</h4>
    <form action="">
    {formState.map((session, i) => {
        return (
          <div key={i}>
            <h4>Session {i + 1}</h4>
            <div className="input-group">
              <label htmlFor="session_start">Start</label>
              <input 
                type="datetime-local" 
                name="session_start" 
                className="input-field"
                onChange={e => handleSessionInputChange(e, i)} 
                value={session.session_start}/>
            </div>
            <div className="input-group">
              <label htmlFor="session_end">End</label>
              <input 
                type="datetime-local" 
                name="session_end" 
                className="input-field"
                onChange={e => handleSessionInputChange(e, i)}
                value={session.session_end}/>
            </div>
          </div>
          )
      })}
      <button className="dashboard__session" onClick={addSessionForm}>+</button>
      <div className="input-group">
      <input 
        type="submit" 
        className="button" 
        disabled
        />
      </div>
    </form>
  </div>
)};

export default AddSessions
