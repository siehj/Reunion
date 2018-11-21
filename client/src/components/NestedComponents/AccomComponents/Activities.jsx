import React from 'react';
import { Row, Col } from 'reactstrap';

const Activity = (props) => {
  return (
    <Row >
      <Col sm="1" md="1" lg="1" >
        <img src={props.act.image_url} alt="props.act image" style={{ height: '60px', width: '60px' }} />
      </Col>
      <Col sm="8" md="8" lg="8" >
        <em style={{ fontSize: '20px', fontWeight: 'bold' }} >{props.act.name} <img style={{ height: '25px', width: '25px' }} href={props.act.url}  src="data:image/png;base64,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"/></em> 
        <br/>
        <em>{props.act.location.address1}, {props.act.location.zip_code}</em>
      </Col>
      <Col sm="3" md="3" lg="3" className="text-right" >
        <em>Rating: {props.act.rating} stars</em>
        <br/>
        <Row>
          <Col className="text-right"><em>Price: {props.act.price}</em></Col>
          <Col><a href={props.act.url} target="_blank" style={{ color: 'red', fontSize: '15px' }} >Link</a></Col>
        </Row>
      </Col>
    </Row>
  )
}

export default Activity;
