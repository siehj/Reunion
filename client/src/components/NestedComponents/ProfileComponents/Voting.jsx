import React from 'react';
import { Input, Button, Row, Col } from 'reactstrap'

const VotingComponent = (props) => {
  return (
    <div className="userPortalMiniScreen" >
      {
        props.item.map((topic, idx) => {
         return (
           <div key={idx} className="votingTopic">
             <h3 className="text-center" >{topic.title}</h3>
             <h6 className="text-center" >{topic.summary}</h6>
             {
               Array.isArray(topic.options) ? 
               topic.options.map((op, i) => {
                  return (
                    <Row className="votingOptions" key={i}>
                      <Col sm="8" md="8" lg="8">
                        <h5>Name: {op.name}</h5>
                        <em>Location: <em style={{ color: 'red' }} >{op.location}</em></em>
                      </Col>
                      <Col sm="2" md="2" lg="2"className="text-center" ><h5>{op.votes}</h5></Col>
                      <Col sm="2" md="2" lg="2"><Button outline color="danger" onClick={() => props.vote(topic.id, op.id)} >Vote</Button></Col>
                    </Row>
                
                  )
                })
                : 
                <Row className="votingOptions" className="text-center" >
                {
                  Object.keys(topic.options).map((op, j) => {
                    return (
                      <Col sm="6" md="6" lg="6" key={j}  >
                        <h5>{op}</h5>
                        <h5 className="votes" >{topic.options[op].votes}</h5>
                      
                        <Button onClick={() => props.vote(topic.id, topic.options[op].id)} >Vote</Button>
                      </Col>
                  )
                  })
                }
                </Row>
              }
            </div>
          )
      })
      }
    </div>
  )
};

export default VotingComponent;