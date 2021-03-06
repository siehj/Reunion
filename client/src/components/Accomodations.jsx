import React from 'react';
import axios from 'axios';
import { Input, Button, InputGroup, Row, Col } from 'reactstrap';
import Activity from './NestedComponents/AccomComponents/Activities.jsx';
import SavedActivity from './NestedComponents/AccomComponents/SavedActs.jsx';

class Accomodations extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      activities : [],
      savedActivities: {'ATV': [], 'Sky Diving': [], 'Helicopter': [], 'Speed Vegas': []},
      hotels: []
    };
    this.updateQuery = this.updateQuery.bind(this);
    this.searchYelp = this.searchYelp.bind(this);
    this.getHotelInfoDB = this.getHotelInfoDB.bind(this);
    this.searchSaved = this.searchSaved.bind(this);
  }

  componentDidMount() {
    this.getHotelInfoDB();
    
  }

  getHotelInfoDB() {
    axios.get('/db/hotelInfo')
      .then(({ data }) => this.setState({ hotels: data }))
      .catch(err => console.log('error getting hotel data from db: ', err))
  }

  updateQuery(e) {
    this.setState({ query: e.target.value });
  }

  searchYelp() {
    axios.post('/api/searchYelp', { query: this.state.query })
      .then(({ data }) => this.setState({ activities: data }))
      .then(() => this.setState({ query: '' }))
      .catch(err => console.log('err searching', err))
  }

  searchSaved(query) {
    axios.post('/api/searchYelp', { query: query })
    .then(({ data }) => {
      let newSection = this.state.savedActivities;
      newSection[query] = data;
      this.setState({ savedActivities: newSection });
    });
  };

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
          <h1 > ACTIVITIES </h1>
          {/* {this.props.loggedIn ?  */}
          <section>
            <em style={{ color: "#6c757d" }} >**Search for new activities</em>
            <InputGroup>
              <Input value={this.state.query} onChange={this.updateQuery}/>
              <Button outline color="danger" onClick={this.searchYelp} >Search</Button>
            </InputGroup>

            <section>
              <br/>
              <section>
                {this.state.activities.map((activity, i) => {
                  return(
                    <div className="accRow" key={i} >
                      <Activity act={activity}/>
                    </div>
                  )
                })}
              </section>
            </section>
          </section> 
          {/* : null  */}
            {/* } */}
          <section>
            <em style={{ color: "#6c757d" }} >**Click an activity for more information.</em>
            {Object.keys(this.state.savedActivities).map((act, idx) => {
              return ( 
                <div key={idx} >
                  <SavedActivity saved={this.state.savedActivities} act={act}  searchSaved={this.searchSaved} />
                </div>
                )
            })}
          </section>
        </section>

        <section>
          <h1> HOTELS </h1>
          <em style={{ color: "#6c757d" }} >**click each hotel for more information.</em>
          {this.state.hotels.map((hotel, i) => {
            return (
              <section key={i} className="text-center">
                <em title={hotel.name} style={{ fontSize: '30px', color: 'red' }} >{hotel.name}</em>
                <br/>
                <em>{hotel.address}</em>
                <a href={hotel.url} target="_blank" ><img src={hotel.img} width="100%"/></a>
              </section>
            )
          })}
        </section>
        <section></section>
      </div>
    )
  }
};

export default Accomodations;
