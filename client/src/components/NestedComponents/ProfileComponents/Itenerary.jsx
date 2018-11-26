import React from 'react';

const Itenerary = (props) => {
  return (
    <div>
      {
        Object.keys(props.sched).map((day, idx) => {
          return (
            <div key={idx}>
              <h3>{day}</h3>
              
            </div>
          )
        })
      }
    </div>
  )
};

export default Itenerary;