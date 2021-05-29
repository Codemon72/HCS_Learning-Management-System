import { useContext } from 'react';
import { CourseContext } from '../contexts/CourseContext';

const AddSessions = () => {

  console.log('AddSessions rendered');

  const { courseEvents } = useContext(CourseContext);

  console.log(courseEvents);
  return (
    <div>
      <h3>Add Sessions</h3>
      <form action="">
      <div className="">
        <label htmlFor="course_event_id">Choose Course Event</label>
        <select 
        type="number"
        name="course_event_id" 
        className=""
        // value={formState.teacher_id}
        // onChange={handleInputChange}
        // onBlur={checkForInput} 
        >
          {courseEvents.map((courseEvent) => {
            return(
              <option 
                value={courseEvent.course_event_id} 
                key={courseEvent.course_event_id} 
                className="input-field">
                  {courseEvent.Course_Module.name}:  {courseEvent.course_start_date} - {courseEvent.course_end_date}
              </option>
            )
          })}
        </select>
      </div>

      </form>

      
    </div>
  )
}

export default AddSessions
