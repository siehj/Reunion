import React from 'react';
import axios from 'axios';

class Accomodations extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div id="ACC">
        <section>
          <h1>THE STRIP</h1>
          <div id="gMap">
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d51568.19660015892!2d-115.20146253208625!3d36.1175583904963!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c8c4383428d4eb%3A0x43e2195d0c26834c!2sLas+Vegas+Strip%2C+NV!5e0!3m2!1sen!2sus!4v1532561776614" width="850" height="550" frameBorder="0" allowFullScreen></iframe>
          </div>
        </section>

        <section>
          <h2 > ACTIVITIES </h2>
          <em>click an activity for more information.</em>
        </section>

        <section>
          <h2> HOTELS </h2>
          <em>click each hotel for more information.</em>
        </section>
      </div>
    )
  }
};

export default Accomodations;
