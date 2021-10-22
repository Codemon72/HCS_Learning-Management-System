import React from 'react'

const AddCourse = () => {
  console.log('AddCourse rendered');

  const openAddCourseModal = () => {
    const addCourseButton = document.querySelector('.addCourseButton')
    const addCourseModal = document.querySelector('.addCourseModal')
    addCourseButton.classList.add('hidden')
    addCourseModal.classList.remove('hidden')
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
