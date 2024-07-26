import React, { useState} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './CourseDetail.css';

function CourseDetail() {
  const location = useLocation();
  const navigate = useNavigate();
  const course = location.state?.course;
  const [enrolledCourses, setEnrolledCourses] = useState(location.state?.enrolledCourses || []);
  const [isEnrolled, setIsEnrolled] = useState(enrolledCourses.some(c => c.id === course.id));
  console.log('Enrolled Courses at details page:', enrolledCourses);
  console.log('Course selected at details page:', course);



  if (!course) {
    return <div>No course data available.</div>;
  }

  const goToCatalogue = () => {
    navigate('/course-catalogue');
  };

  const addToDashboard = (course) => {
    console.log('Adding to dashboard:', course);
    fetch('http://localhost:8000/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        course_id: course.id,
        name: course.name,
        progress: "0%", // Assuming progress starts at 0%
      }),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Course added:', data);
      setEnrolledCourses(prevCourses => [...prevCourses, data]);    
      setIsEnrolled(true);
    })
    .catch(error => console.error('Error adding course:', error));
  };

  return (
    <div className="course-detail-container">
      <h1>Course Detail</h1>
      <div className="top-container">
        <h2>Instructor: {course.instructor || 'TBA'}</h2>
        <button onClick={goToCatalogue} className="back-button">Back to Course Catalogue</button>
      </div>
      <img src={course.image} alt={`Course on ${course.name}`}/>
      <p>{course.description}</p>
      <h3>Duration: {course.duration}</h3>
      <h3>Syllabus</h3>
      <ul>
        {course.syllabus?.map((item, index) => (
          <li key={index}>{item}</li>
        )) || <li>No syllabus available.</li>}
      </ul>
      <h3>Choose Your Session Timing:</h3>
      <div>
        <input type="radio" id="morning" name="session-time" value="Morning" />
        <label htmlFor="morning">Morning</label>
        <input type="radio" id="afternoon" name="session-time" value="Afternoon" />
        <label htmlFor="afternoon">Afternoon</label>
        <input type="radio" id="evening" name="session-time" value="Evening" />
        <label htmlFor="evening">Evening</label>
      </div>
      <h3>Reviews</h3>
      <input type="text" placeholder="Search reviews" className="search-reviews" />
      <div className="review-container">
        {course.reviews?.length > 0 ? course.reviews.map((review, index) => (
          <div key={index} className="review">
            <p><strong>{review.reviewer}</strong> says: {review.comment}</p>
          </div>
        )) : <div>No reviews available.</div>}
      </div>
      {isEnrolled ? (
        <div className="enrollment-message">
          <p>You have successfully enrolled in this course.</p>
          <button className="view-button" onClick={() => navigate('/')}>Go to Dashboard</button>
        </div>
      ) : (
        <button className="enroll-button" onClick={() => addToDashboard(course)}>Enroll Now</button>
      )}

    </div>
  );
}

export default CourseDetail;
