import React from 'react';
import { Input, Button, Row, Col } from 'reactstrap'
import ProgressBar from './Loader.jsx';


const VotingComponent = (props) => {
  if (props.item.length === 0) return <ProgressBar />
  else {
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
                topic.options.sort((a, b) => a.id - b.id).map((op, i) => {
                    return (
                      <Row className="votingOptions" key={i}>
                        <Col sm="8" md="8" lg="8">
                          <h5>{op.name}</h5>
                          <em style={{ color: 'red' }} >{op.location}</em> 
                        </Col>
                        <Col sm="2" md="2" lg="2"className="text-center" ><h5 className="votes" >{op.votes}</h5></Col>
                        <Col sm="2" md="2" lg="2"><Button outline color="danger" onClick={() => props.vote(op.id)} >Vote</Button></Col>
                      </Row>
                  
                    )
                  })
                  : 
                  <Row className="votingOptions" className="text-center" >
                  {
                    Object.keys(topic.options).sort((a, b) => a.id - b.id).map((op, j) => {
                      return (
                        <Col sm="6" md="6" lg="6" key={j}  >
                          <h5>{op}</h5>
                          <h5>{topic.options[op].votes}</h5>
                        
                          <Button onClick={() => props.vote(topic.options[op].id)} >Vote</Button>
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
  }
};

export default VotingComponent;