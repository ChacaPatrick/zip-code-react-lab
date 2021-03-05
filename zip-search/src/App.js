import React, { Component } from 'react';
import './App.css';


function City(props) {
  console.log(props.zipInfo)
  return (
    <div className="card bg-light mb-3 sizeCard" >
      <div className="card-header">{props.zipInfo.City}, {props.zipInfo.State}</div>
      <div className="card-body" style={{backgroundColor: 'white'}}>
        <ul>
          <li>State: {props.zipInfo.State}</li>
          <li>Location: ({props.zipInfo.Lat},{props.zipInfo.Long})</li>
          <li>Population (estimated): {props.zipInfo.EstimatedPopulation}</li>
          <li>Total Wages: {props.zipInfo.TotalWages}</li>
        </ul>
      </div>
    </div>
  );
}

function ZipSearchField({ onZipChange }) {
  return (
    <div className="zipCode">
      <label>Zip Code:</label>
      <input type="text" placeholder="Try 10016" onChange={onZipChange} />
    </div>
  );
}


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      zipCode: '',
      cities: [],
    }
  }

  zipChanged(e) {
    //console.log(e.target.value) Gives us what the user currently typed
    // Make GET request for the zip resource
    // then, when you receive the result, store it in state
    fetch(`http://ctp-zip-api.herokuapp.com/zip/${e.target.value}`)
      .then(res => res.json())
      .then(myJson => {
        myJson.forEach(element => {
          console.log(element.City);
        });
        this.setState({cities: myJson}) //Holds array of objects 
      })
      .catch(err=>{
        this.setState({cities: []})
        console.error('Error:', err)
      })

    this.setState({
      zipCode: e.target.value
    })
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Zip Code Search</h2>
        </div>
        <ZipSearchField onZipChange={(e) => this.zipChanged(e)} />
        <div>
          {/*
            Instead of hardcoding the following 3 cities,
            Create them dynamically from this.state.cities
          */}
          {
            this.state.cities.map(element => {
              return <City zipInfo={element}/>
            })
          }
        </div>
      </div>
    );
  }
}

export default App;