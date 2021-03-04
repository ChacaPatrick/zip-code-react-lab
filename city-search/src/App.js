import React, { Component } from 'react';
import './App.css';
 

function City(props) {

  return (
    <div className="card bg-light mb-3 sizeCard" >
      <div className="card-header">{props.cityInfo.Zipcode}</div>
      <div className="card-body" style={{backgroundColor: 'white'}}>
        <ul>
          <li>State: {props.cityInfo.State}</li>
          <li>Location: ({props.cityInfo.Lat},{props.cityInfo.Long})</li>
          <li>Population (estimated): {props.cityInfo.EstimatedPopulation}</li>
          <li>Total Wages: {props.cityInfo.TotalWages}</li>
        </ul>
      </div>
    </div>
  );
}

function CitySearchField({ onCityChange }) {
  return (
    <div className="city">
      <label>City:</label>
      <input type="text" placeholder="Try Queens" onChange={onCityChange} />
    </div>
  );
}


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      city: '',
      zipCodes: [],
      cities: [],
    }
  }

  zipChanged(e) {
    //console.log(e.target.value) Gives us what the user currently typed
    // Make GET request for the zip resource
    // then, when you receive the result, store it in state

    fetch(`http://ctp-zip-api.herokuapp.com/city/${e.target.value.toUpperCase()}`)
      .then(res => res.json())
      .then(body => {

        this.setState({zipCodes: body}) //Holds array of objects 
        this.state.zipCodes.forEach(item => {
          console.log(item)

          fetch(`http://ctp-zip-api.herokuapp.com/zip/${item}`)
          .then(res => res.json())
          .then(body => {
          
            body.forEach(element => {
              this.state.cities.push(element) //Holds array of objects 
              console.log(this.state.cities)
              console.log(element["City"]);
            });
            
          })
          .catch(err=>{
            this.setState({cities: []})
            console.error('Error:', err)
          })
        })

        console.log(this.state.zipCodes, "ZIP CHANGE")
      })
      .catch(err=>{
        this.setState({cities: []})
        this.setState({zipCodes: []})
        console.error('Error:', err)
      })
      
      



    this.setState({
      city: e.target.value
    })
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>City Search</h2>
        </div>
        <CitySearchField onCityChange={(e) => this.zipChanged(e)} />
        <div>
          {/*
            Instead of hardcoding the following 3 cities,
            Create them dynamically from this.state.cities
          */}
          {
            this.state.cities.map(element => {
              return <City cityInfo={element}/>
            })
          }
        </div>
      </div>
    );
  }
}

export default App;