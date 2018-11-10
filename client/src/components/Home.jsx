import React from 'react';

const Home = () => (
  <div id="Home" >
    {/* loop autoPlay */}
    <video loop autoPlay className="theVid" >
      <source src="LasVegasTimelapse.mp4" type="video/mp4" />
    </video>
  </div>
)

export default Home;
