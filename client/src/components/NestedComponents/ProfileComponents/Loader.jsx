import React from 'react';
import { Progress } from 'reactstrap';

const ProgressBar = () => {
  return (
    <div>
      <h3>Loading...</h3>
      <Progress animated color="danger" value="80" />
    </div>
  )
 };

export default ProgressBar;

