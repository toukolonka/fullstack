import React from "react";

const Header = ({ course }) => {
    return <h2>{course.name}</h2>;
  };
  
  const Part = (props) => {
    return (
        <p>
          {props.part.name} {props.part.exercises}
        </p>
    );
  };
  
  const Content = ({ course }) => {
    return (
      <div>
        {course.parts.map(part => <Part key={part.id} part={part} />)}
      </div>
    );
  };
  
  const Total = ({ parts }) => {
    const total = parts.reduce((a,v) =>  a = a + v.exercises , 0 )
    return (
      <p>
        Number of exercises{" "}
        {total}
      </p>
    );
  };
  
  const Course = ({ courses }) => {
    return ( 
      <div>
        {courses.map(course => 
        <div key={course.id}>
          <Header course={course} />
          <Content course={course} />
          <Total parts={course.parts} />
        </div>
        )}
      </div>
     );
  }

  export default Course