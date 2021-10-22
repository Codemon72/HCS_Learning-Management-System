import React from 'react'

const AddCourse = () => {
  console.log('AddCourse rendered');

  const openAddCourseModal = () => {
    document.querySelector('.addCourseButton').classList.add('hidden')
    document.querySelector('.addCourseModal').classList.remove('hidden')
  }
  
  return (
    <div className="addCourse">
      <button className="addCourseButton" onClick={openAddCourseModal}>Add A Course</button>
      <div className="addCourseModal hidden">
        Modal
      </div>
    </div>
  )
}

export default AddCourse
