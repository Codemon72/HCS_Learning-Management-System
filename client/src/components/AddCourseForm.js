import { useState, useEffect, useContext } from 'react';
import { CourseContext } from '../contexts/CourseContext';
import { CourseModuleContext } from '../contexts/CourseModuleContext';

const AddCourse = ({setModalState}) => {
  console.log('AddCourse rendered');

  const { fetchCourseData } = useContext(CourseContext);

  const initialFormState = {
    course_module_id: '',
    course_start_date: '',
    course_end_date: '',
    teacher_id: '',
  };

  const [formState, setFormState] = useState(initialFormState);
  const [errors, setErrors] = useState({});
  const [dateError, setDateError] = useState(null);

  const { courseModules } = useContext(CourseModuleContext);

  let formIsValid = !Object.values(formState).includes('') && !dateError;

  // validate 'start_date' before 'end_date' every time they change
  useEffect(() => {
    if (formState.course_start_date && formState.course_end_date) {
      if (formState.course_start_date > formState.course_end_date) {
        setDateError('Start date must come before end date.');
      } else if (formState.course_start_date <= formState.course_end_date) {
        setDateError(null);
      }
    }
  }, [formState.course_start_date, formState.course_end_date]);

  const checkForInput = (event) => {
    const { name } = event.target;
    const errorMessages = {
      course_module_id: 'Please select a course.',
      course_start_date: 'Please choose a start date.',
      course_end_date: 'Please choose an end date.',
      hours: 'Please enter the total hours.',
      teacher_id: 'Please select a teacher.',
    };
    if (formState[name] === '') {
      setErrors({
        ...errors,
        [name]: errorMessages[name],
      });
    }
    if (formState[name] !== '') {
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

  // onlyDuringDev:
  // const logFormstate = (e) => {
  //   e.preventDefault();
  //   console.log(formState);
  // };

  const addCourseToDB = () => {
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formState),
    };
    return fetch('http://localhost:4000/api/courses', options).then((res) => {
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
      .then((data) => {
        console.log('course added to db: ', data);
      })
      .then(() => fetchCourseData())
      .catch((error) => console.log(error));
    setFormState(initialFormState);
    setModalState('addSessionsForm');
  };

  return (
    <>
      <div className='addCourseModal'>
        <h3>Add Course</h3>
        <br />

        <form onSubmit={handleAddCourse}>
          {/* Course Module */}
          <div className='input-group'>
            <label htmlFor='course_module_id'>Course Module</label>
            <select
              className='input-field'
              name='course_module_id'
              value={formState.course_module_id}
              onChange={handleInputChange}
              onBlur={checkForInput}
            >
              <option value='' disabled hidden>
                Please select
              </option>
              {courseModules.map((course_module, i) => {
                return (
                  <option value={course_module.course_module_id} key={i}>
                    {course_module.name}
                  </option>
                );
              })}
            </select>
          </div>
          {errors.course_module_id && (
            <div className='errors'>{errors.course_module_id}</div>
          )}
          {/* Course Start Date */}
          <div className='input-group'>
            <label htmlFor='course_start_date'>Start Date</label>
            <input
              className='input-field'
              type='date'
              name='course_start_date'
              value={formState.course_start_date}
              onChange={handleInputChange}
              onBlur={checkForInput}
            />
          </div>
          {errors.course_start_date && (
            <div className='errors'>{errors.course_start_date}</div>
          )}
          {dateError && <div className='errors'>{dateError}</div>}
          {/* Course End Date */}
          <div className='input-group'>
            <label htmlFor='course_end_date'>End Date</label>
            <input
              className='input-field'
              type='date'
              name='course_end_date'
              value={formState.course_end_date}
              onChange={handleInputChange}
              onBlur={checkForInput}
            />
          </div>
          {errors.course_end_date && (
            <div className='errors'>{errors.course_end_date}</div>
          )}
          {dateError && <div className='errors'>{dateError}</div>}
          {/* Teacher ID */}
          <div className='input-group'>
            <label htmlFor='teacher_id'>Teacher</label>
            <select
              type='number'
              name='teacher_id'
              className='input-field'
              value={formState.teacher_id}
              onChange={handleInputChange}
              onBlur={checkForInput}
            >
              <option value='' disabled hidden>
                Please select
              </option>
              <option value='null'>not determined yet</option>
              <option value='1'>Mary Vokicic</option>
              <option value='2'>Teresa Holfeld</option>
              <option value='3'>Helder Pereira</option>
              <option value='4'>Paul Anton</option>
              <option value='5'>Jonas Reitmann</option>
              <option value='6'>Ansgar Mertens</option>
              <option value='7'>Benjamin Rabe</option>
              <option value='8'>Christoph Eicke</option>
              <option value='9'>Thomas Hedeler</option>
              <option value='10'>Paul Börding</option>
            </select>
          </div>
          <br />
          <br />
          {errors.teacher_id && (
            <div className='errors'>{errors.teacher_id}</div>
          )}
          <div className='input-group'>
            <button type='submit' className='button' disabled={!formIsValid}>
              Submit Course & add Sessions
            </button>
          </div>
        </form>

        {/* onlyDuringDev: */}
        {/* <br />
        <div className='addSessionFormField'>
          <button className='dashboard__session button' onClick={logFormstate}>
            (Log FormState)
          </button>
        </div> */}

      </div>
    </>
  );
};

export default AddCourse;
