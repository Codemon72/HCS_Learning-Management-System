import { useState, useEffect, useContext } from 'react';
import { CourseContext } from '../contexts/CourseContext';

const Dashboard = () => {

  console.log('Dashboard rendered');

  const { fetchCourseData } = useContext(CourseContext);

  const initialFormState = {
    name: '',
    start_date: '',
    end_date: '',
    hours: '',
    teacher_id: ''
  };

  const [formState, setFormState] = useState(initialFormState);
  const [errors, setErrors] = useState({});

  // validate 'start date before end date' every time they change
  useEffect(() => {
    validateDates();
  }, [formState.start_date, formState.end_date]);
  
  const checkForInput = (event) => {
    const { name } = event.target;
    const errorMessages = {
      name: "Please select a course.",
      start_date: "Please choose a start date.",
      end_date: "Please choose an end date.",
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
      setErrors({
        ...errors,
        [name]: null,
      });
    }
  };

  const validateDates = () => {
    if (formState.start_date && formState.end_date) {
      if (formState.start_date > formState.end_date) {
        setErrors({
          ...errors,
          end_date: "Start date must be before end date.",
          start_date: "Start date must be before end date.",
        });
      } else if (formState.start_date < formState.end_date) {
        setErrors({
          ...errors,
          end_date: null,
          start_date: null,
        });
      }
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
      <div className="input-group">
        <label htmlFor="name">Course Name</label>
        <select 
          className="input-field"
          name="name" 
          value={formState.name}
          onChange={handleInputChange} 
          onBlur={checkForInput} 
          >
          <option value="" disabled hidden>Please select</option>
          <option value="HTML & CSS">HTML & CSS</option>
          <option value="Learn To Code">Learn To Code</option>
          <option value="JavaScript For Web">JavaScript For Web</option>
          <option value="React.js">React.js</option>
          <option value="Node.js">Node.js</option>
          <option value="Vue.js">Vue.js</option>
        </select>
      </div>
      {errors.name && <div className="errors">{errors.name}</div>}
      <div className="input-group">
        <label htmlFor="start_date">Start Date</label>
        <input 
          className="input-field"
          type="date"
          name="start_date"
          value={formState.start_date}
          onChange={handleInputChange}
          onBlur={checkForInput}
          />
      </div>
      {errors.start_date && <div className="errors">{errors.start_date}</div>}
      <div className="input-group">
        <label htmlFor="end_date">End Date</label>
        <input 
          className="input-field"
          type="date"
          name="end_date"
          value={formState.end_date}
          onChange={handleInputChange}
          onBlur={checkForInput} 
          />
      </div>
      {errors.end_date && <div className="errors">{errors.end_date}</div>}
      <div className="input-group">
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
      {errors.hours && <div className="errors">{errors.hours}</div>}
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
          <option value="2">Alexander Löhn</option>
          <option value="5">Ansgar Mertens</option>
          <option value="11">Benjamin Rabe</option>
          <option value="7">Christoph Eicke</option>
          <option value="1">Helder Pereira</option>
          <option value="4">Jonas Reitmann</option>
          <option value="8">Teresa Holfeld</option>
          <option value="9">Thomas Hedeler</option>
          <option value="10">Mary Vokicic</option>
          <option value="3">Paul Anton</option>
          <option value="6">Paul Mölders</option>
        </select>
      </div>
      {errors.teacher_id && <div className="errors">{errors.teacher_id}</div>}
      
      <div className="input-group">
      <input type="submit" className="button"/>
      </div>

    </form>
    <button className="logBreak" onClick={() => console.log('--- Break ---')}>Log Break</button>
    </div>
  )
}

export default Dashboard
