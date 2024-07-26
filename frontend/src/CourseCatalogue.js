import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './CourseCatalogue.css';

const courses = [
  {
    id: 1,
    name: 'Introduction to Programming',
    description: 'Learn the basics of programming with this beginner-friendly course.',
    image: 'https://s3.amazonaws.com/coursera_assets/meta_images/generated/XDP/XDP~COURSE!~ball-state-university-introduction-to-programming-open-content/XDP~COURSE!~ball-state-university-introduction-to-programming-open-content.jpeg',
    type: 'Programming',
    difficulty: 'Beginner',
    duration: '4 Weeks',
    instructor: 'Jane Doe',
    syllabus: ['Week 1: Basics', 'Week 2: Control Structures', 'Week 3: Functions', 'Week 4: Projects'],
    reviews: [
      { reviewer: 'John Smith', comment: 'Very informative and well structured.', rating: 4 },
      { reviewer: 'Emily White', comment: 'Great course for beginners!', rating: 5 }
    ],
    averageRating: 4.5
  },
  {
    id: 2,
    name: 'Data Science Fundamentals',
    description: 'Dive into data science and learn essential concepts and techniques.',
    image: 'https://s3.amazonaws.com/coursera_assets/meta_images/generated/XDP/XDP~SPECIALIZATION!~data-science-fundamentals/XDP~SPECIALIZATION!~data-science-fundamentals.jpeg',
    type: 'Data Science',
    difficulty: 'Intermediate',
    duration: '8 Weeks',
    instructor: 'John Doe',
    syllabus: ['Week 1: Introduction', 'Week 2: Data Wrangling', 'Week 3: Machine Learning', 'Week 4: Project'],
    reviews: [
      { reviewer: 'Alice Brown', comment: 'Challenging but rewarding!', rating: 3 },
      { reviewer: 'Bob White', comment: 'Helped me get started with Data Science.', rating: 4 }
    ],
    averageRating: 3.5
  },

  {
    id: 3,
    name: 'Full Stack Web Development with React',
    description: 'Dive deep into full stack web development using React, Node.js, and modern back-end technologies. Develop comprehensive skills by building real-world applications from the ground up.',
    image: 'https://miro.medium.com/v2/resize:fit:1400/1*77ZqB9LosKxX0ngZy946Rw.jpeg',
    type: 'Web Development',
    difficulty: 'Advanced',
    duration: '16 Weeks',
    instructor: 'Alex Johnson',
    syllabus: [
      'Week 1: Introduction to Full Stack Development',
      'Week 2: HTML, CSS, and JavaScript Essentials',
      'Week 3: React Basics - Components and State',
      'Week 4: Advanced React - Hooks and Context API',
      'Week 5: State Management with Redux',
      'Week 6: Routing in React with React Router',
      'Week 7: Node.js and Express Basics',
      'Week 8: Building APIs with Node.js',
      'Week 9: Integrating MongoDB with Node.js',
      'Week 10: User Authentication and Authorization',
      'Week 11: React and Server-Side Rendering with Next.js',
      'Week 12: Testing Your Applications with Jest and React Testing Library',
      'Week 13: Advanced Backend Techniques - Caching, Security, and WebSockets',
      'Week 14: Deploying Your Full Stack Application',
      'Week 15: Project Work - Developing a Complete Application',
      'Week 16: Capstone Project Presentation and Review'
    ],
    reviews: [
      { reviewer: 'Emily Rose', comment: 'This course was a game-changer for my career as a developer. Highly detailed and well-structured.' },
      { reviewer: 'Jordan Smith', comment: 'Comprehensive and engaging. Alex does a fantastic job explaining complex topics in an understandable way.' }
    ],
    averageRating: 4.5
  },
  

  {
    id: 4,
    name: 'Cybersecurity Fundamentals',
    description: 'Explore the critical concepts of cybersecurity, including threat landscapes, risk management, and mitigation strategies.',
    image: 'https://s3.amazonaws.com/coursera_assets/meta_images/generated/XDP/XDP~COURSE!~cyber-security-fundamentals/XDP~COURSE!~cyber-security-fundamentals.jpeg',
    type: 'Cybersecurity',
    difficulty: 'Beginner',
    duration: '6 Weeks',
    instructor: 'Alex Johnson',
    syllabus: [
      'Week 1: Introduction to Cybersecurity',
      'Week 2: Types of Cyber Threats',
      'Week 3: Cybersecurity Best Practices',
      'Week 4: Implementing Network Security',
      'Week 5: Cyber Incident Response',
      'Week 6: Legal and Ethical Aspects in Cybersecurity'
    ],
    reviews: [
      { reviewer: 'Linda Grey', comment: 'A thorough and engaging introduction to cybersecurity.' },
      { reviewer: 'Mark Black', comment: 'This course breaks down complex topics into understandable segments. Highly recommend for beginners!' }
    ],
    averageRating: 4
  }

];

function CourseCatalogue() {
  const [filter, setFilter] = useState('');
  const [minRating, setMinRating] = useState(3);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const handleRatingChange = (event) => {
    setMinRating(event.target.value);
  };

  const allCourses = location.state?.allCourses || [];
  console.log('All Courses at catalogue page:', allCourses);

  const enrolledCourses = location.state?.enrolledCourses || [];
  console.log('Enrolled Courses at catalogue page:', enrolledCourses);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="container">
      <h1>Course Catalogue</h1>
      <div className="filter-search-container">
        <input 
          type="text" 
          placeholder="Search courses" 
          value={searchTerm} 
          onChange={handleSearchChange} 
          className="search-bar"
        />
      <div>
        <label htmlFor="filter">Filter by difficulty:</label>
        <select id="filter" value={filter} onChange={handleFilterChange} className="select-filter">
          <option value="">All</option>
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Advanced">Advanced</option>
        </select>
      </div>
      <div>
        <label htmlFor="rating">Minimum Rating: {minRating} Stars</label>
        <input type="range" id="rating" min="1" max="5" value={minRating} onChange={handleRatingChange} step="1" className="rating-slider"/>
      </div>
      </div>
      <div className="allCourses">
        {allCourses.filter(course => course.difficulty.includes(filter) && course.averageRating >= minRating).map(course => (
          <div key={course.id} className="course">
            <img src={course.image} alt={`Course on ${course.name}`} />
            <h3>{course.name}</h3>
            <p>{course.description}</p>
            <button className="view-button" onClick={() => navigate('/course-detail', { state: { course, enrolledCourses } })}>View</button>
          </div>
        ))}
      </div>
    </div>
  );
  
}

export default CourseCatalogue;