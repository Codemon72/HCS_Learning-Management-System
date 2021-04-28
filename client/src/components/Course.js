import { useState } from 'react';
import CourseUpdateForm from './CourseUpdateForm';

const Course = ({course, handleDelete}) => {

  console.log('Course rendered');

  const [formVisibility, setFormVisibility] = useState(false);

  const chooseUpdate = () => {
    setFormVisibility(true);
  };

  const cancelUpdate = () => {
    setFormVisibility(false);
  };

  return (
    <div className="course">
      <h3>Course: {course.name} </h3>
      <div>Course ID: {course.course_id}</div>
      <div>Start Date: {course.start_date}</div>
      <div>End Date: {course.end_date}</div>
      <div>Hours: {course.hours}</div>
      <div>Trainer: { course.Teacher != null ? course.Teacher.name : 'not determined yet'}</div>

      { !formVisibility && (
        <div className="button-box">
          <button onClick={chooseUpdate}>Update</button>
          <button onClick={() => handleDelete(course.course_id)}>Delete</button>
        </div>)}
      

      { formVisibility && <CourseUpdateForm course={course} cancelUpdate={cancelUpdate} /> }

    </div>
  )
}

export default Course
