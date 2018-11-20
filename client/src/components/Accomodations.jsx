import React from 'react';
import axios from 'axios';
import { Input, Button, InputGroup, Row, Col } from 'reactstrap';

class Accomodations extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      activities : [],
      savedActivities: {'ATV': [], 'Sky Diving': [], 'Helicopter': [], 'Speed Vegas': []},
      hotels: ["Tahiti Village"]
    };
    this.updateQuery = this.updateQuery.bind(this);
    this.searchYelp = this.searchYelp.bind(this);
  }

  componentDidMount() {
    // this.setState({ savedActivities : ["ATV", 'Sky Diving', 'Helicopter', 'Speed Vegas'] });
  }

  updateQuery(e) {
    this.setState({ query: e.target.value });
  }

  searchYelp() {
    axios.post('/api/searchYelp', { query: this.state.query })
      .then(({ data }) => this.setState({ activities: data }))
      .catch(err => console.log('err searching', err))
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
          {/* {this.props.loggedIn ?  */}
          <section>
            <em style={{ color: "#6c757d" }} >**Search for new activities</em>
            <InputGroup>
              <Input onChange={this.updateQuery} />
              <Button outline color="danger" onClick={this.searchYelp} >Search</Button>
            </InputGroup>

            <section>
              <br/>
            <section>
              {this.state.activities.map((response, i) => {
                return(
                  <div className="accRow" key={i} >
                    <Row >
                      <Col sm="1" md="1" lg="1" >
                        <img src={response.image_url} alt="response image" style={{ height: '60px', width: '60px' }} />
                      </Col>
                      <Col sm="8" md="8" lg="8" >
                        <em style={{ fontSize: '20px' }} >{response.name} <img style={{ height: '25px', width: '25px' }} href={response.url}  src="data:image/png;base64,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"/>
                        </em> 
                        <br/>
                        <em>{response.location.address1}, {response.location.zip_code}</em>
                      </Col>
                      <Col sm="3" md="3" lg="3" className="text-right" >
                        <em>Rating: {response.rating} stars</em>
                        <br/>
                        <a href={response.url} target="_blank" style={{ color: 'red', fontSize: '15px' }} >Link</a>
                      </Col>
                    </Row>
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
            {Object.keys(this.state.savedActivities).map((act, i) => {
              return ( 
                <div key={i} className="savedAct" >
                  <em className="accTitle" value={act} >{act}</em>
                    {this.state.savedActivities[act] ? 
                    this.state.savedActivities[act].map((business, j) => {
                      return (
                        <div key={j} >{business.name}</div>
                      )
                    })
                    : null
                    }
                </div>
                )
            })}
          </section>
        </section>

        <section>
          <h2> HOTELS </h2>
          <em style={{ color: "#6c757d" }} >**click each hotel for more information.</em>
          {this.state.hotels.map((hotel, i) => {
            return (
              <div key={i} >
                <em className="accTitle" title={hotel} >{hotel}</em>
              </div>
            )
          })}
        </section>
        <section></section>
      </div>
    )
  }
};

export default Accomodations;
