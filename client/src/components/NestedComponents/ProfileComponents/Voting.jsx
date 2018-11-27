import React from 'react';
import { Input, Button } from 'reactstrap'

const VotingComponent = (props) => {
  console.log(props.item)
  return (
    <div>
      {/* <Input></Input> <Button>Add Location</Button> */}
      {
        props.item.map((topic, idx) => {
          return (
            <div key={idx} className="votingTopic">
              <h3>{topic.Title}</h3>
              <em>{topic.Summary}</em>
              {/* {
                Array.isArray(topic.options) ? 

              } */}
            </div>
          )
      })
      }
    </div>
  )
};

export default VotingComponent;