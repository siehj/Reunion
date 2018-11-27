import React from 'react';

const Itenerary = (props) => {
  return (
    <div className="userPortalMiniScreen" >
      {
        Object.keys(props.sched).map((day, idx) => {
          return (
            <div key={idx} className="iteneraryItem" >
              <h3>{day}</h3>
              {
                props.sched[day].length ? null : <div><em>No events have been set for this day</em></div>
              }
            </div>
          )
        })
      }
    </div>
  )
};

export default Itenerary;