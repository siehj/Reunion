import React from 'react';

const About = (props) => (
  <div id="About" >
    <h1>About</h1>
    <div className="aboutContent" >
      <section>
        <h3>Mission:</h3>
        <p>This application is a passion project to connect multiple generations of Beckley family cousins for a "Cousin Trip".</p>
        <p>
          Historically this family has annually gathered, in the hundreds, in cities across America and as time passes there
          should be a way for us--cousins--to continue to gather. 
        </p>
      </section>
      <section>
        <h3>Features:</h3>
        <h4>Accomodation Information</h4>
        <p>
          This includes information about Las Vegas strip, information on various local activities, and Yelp search functionality for 
          any Restaurant, Bar, etc. that you would like details about.
          Lastly, there is a link to the hotel where reservations are made for this trip.
        </p>
        <h4>User Portal</h4>
        <p>
          An in depth profile system that stores your contact information for future trips and your city, state you will be flying from.
          The geolocational information helps in the decision process for the next cousin trip excursion.
        </p>
        <h4>Itenerary</h4>
        <p>
          To keep everyone up to date with the latest trip itenerary, a daily list of optional activities loads upon Login. This way
          you do not miss any change in information.
        </p>
        <h4>Voting</h4>
        <p>
          A voting system has been set in place to vote for activities, restaurants and various other options that may be available
          to do within Vegas. This way we can come to a quick consensus.
        </p>
      </section>
      <section>
        <h3>Future Features:</h3>
        <h4>Integrated Chat</h4>
        <h4>Flight Information Integration</h4>
        <h4>Photo Gallery</h4>
      </section>

    </div>
  </div>
)

export default About;
