import { useState, useEffect, useContext } from 'react';
import { CourseContext } from '../contexts/CourseContext';
import AddSessions from './AddSessions';

const Dashboard = () => {

  console.log('Dashboard rendered');
  
  const { fetchCourseData } = useContext(CourseContext);

  const initialFormState = {
    course_module_id: '',
    course_start_date: '',
    course_end_date: '',
    // hours: '',
    teacher_id: '',
    sessions: [
      {
        session_start: '',
        session_end: ''
      }
    ]
  };

  const [formState, setFormState] = useState(initialFormState);
  const [errors, setErrors] = useState({});
  const [dateError, setDateError] = useState(null);

  let formIsValid = !Object.values(formState).includes('') && !dateError;

  // validate 'start_date' before 'end_date' every time they change
  useEffect(() => {
    if (formState.course_start_date && formState.course_end_date) {
      if (formState.course_start_date > formState.course_end_date) {
        setDateError("Start date must come before end date.");
      } else if (formState.course_start_date <= formState.course_end_date) {
        setDateError(null);
      }
    }
  }, [formState.course_start_date, formState.course_end_date]);
  
  const checkForInput = (event) => {
    const { name } = event.target;
    const errorMessages = {
      course_module_id: "Please select a course.",
      course_start_date: "Please choose a start date.",
      course_end_date: "Please choose an end date.",
      hours: "Please enter the total hours.",
      teacher_id: "Please select a teacher.",
    };
    if (formState[name] === "") {
      setErrors({
        ...errors,
        [name]: errorMessages[name],
      });
    }
    if (formState[name] !== "") {
      // remove key:value from errors:
      const state = errors;
      delete state[name];
      setErrors(state);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: null,
    });
  };      
  
  const handleSessionInputChange = (event, i) => {
    let temp = {...formState};
    const { name, value } = event.target;
    temp.sessions[i].[name] = value;
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

  const addCourseToDB = () => {
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formState),
    };
    return fetch("http://localhost:4000/api/courses", options)
      .then((res) => {
        if (!res.ok) {
          // errors from server
          throw Error(res.statusText);
        }
        return res.json();
      });
  };

  const handleAddCourse = (e) => {
    e.preventDefault();
    addCourseToDB()
      .then(data => {console.log('course added to db: ', data)})
      .then(() => fetchCourseData())
      .catch(error => console.log(error));
    setFormState(initialFormState);
  }

  return (
    <div className="dashboard">

      <h3>Dashboard</h3><br/><br/>

      <form onSubmit={handleAddCourse}>
        {/* Course Module */}
      <div className="input-group">
        <label htmlFor="course_module_id">Course Name</label>
        <select 
          className="input-field"
          name="course_module_id" 
          value={formState.course_module_id}
          onChange={handleInputChange} 
          onBlur={checkForInput} 
          >
          <option value="" disabled hidden>Please select</option>
          <option value="1">HTML & CSS</option>
          <option value="2">Learn To Code</option>
          <option value="3">JavaScript For Web</option>
          <option value="4">Node.js</option>
          <option value="5">React.js</option>
          <option value="6">Vue.js</option>
          <option value="7">Network Technologies</option>
          <option value="8">Workshop: Databases</option>
        </select>
      </div>
      {errors.course_module_id && <div className="errors">{errors.course_module_id}</div>}
      {/* Course Start Date */}
      <div className="input-group">
        <label htmlFor="course_start_date">Start Date</label>
        <input 
          className="input-field"
          type="date"
          name="course_start_date"
          value={formState.course_start_date}
          onChange={handleInputChange}
          onBlur={checkForInput}
          />
      </div>
      {errors.course_start_date && <div className="errors">{errors.course_start_date}</div>}
      {dateError && <div className="errors">{dateError}</div>}
      {/* Course End Date */}
      <div className="input-group">
        <label htmlFor="course_end_date">End Date</label>
        <input 
          className="input-field"
          type="date"
          name="course_end_date"
          value={formState.course_end_date}
          onChange={handleInputChange}
          onBlur={checkForInput} 
          />
      </div>
      {errors.course_end_date && <div className="errors">{errors.course_end_date}</div>}
      {dateError && <div className="errors">{dateError}</div>}
      {/* Hours */}
      {/* <div className="input-group">
        <label htmlFor="hours">Hours Total</label>
        <input 
          className="input-field"
          type="number" 
          min="1" max="99"
          name="hours" 
          placeholder="number" 
          maxLength="100"
          value={formState.hours}
          onChange={handleInputChange} 
          onBlur={checkForInput} 
          />
      </div>
      {errors.hours && <div className="errors">{errors.hours}</div>} */}
      {/* Teacher ID */}
      <div className="input-group">
        <label htmlFor="teacher_id">Teacher</label>
        <select 
        type="number"
        name="teacher_id" 
        className="input-field"
        value={formState.teacher_id}
        onChange={handleInputChange}
        onBlur={checkForInput} 
        >
          <option value="" disabled hidden>Please select</option>
          <option value="null">not determined yet</option>
          <option value="1">Mary Vokicic</option>
          <option value="2">Teresa Holfeld</option>
          <option value="3">Helder Pereira</option>
          <option value="4">Paul Anton</option>
          <option value="5">Jonas Reitmann</option>
          <option value="6">Ansgar Mertens</option>
          <option value="7">Benjamin Rabe</option>
          <option value="8">Christoph Eicke</option>
          <option value="9">Thomas Hedeler</option>
          <option value="10">Paul Börding</option>
        </select>
      </div>
      <br />
      <h4>Sessions</h4>
      <br />
      {errors.teacher_id && <div className="errors">{errors.teacher_id}</div>}
      {/* Sessions */}
      {formState.sessions.map((session, i) => {
        return (
          <div key={i} className="dashboard__session">
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
      <input type="submit" className="button" disabled={!formIsValid} />
      </div>

    </form>
    <AddSessions />
    <button className="logBreak" onClick={() => console.log('--- Break ---')}>Log Break</button>
    </div>
  )
}

export default Dashboard
