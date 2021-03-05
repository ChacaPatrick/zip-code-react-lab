import React, { Component } from 'react';
import './App.css';
 

function City(props) {

  return (
    <div className="card bg-light mb-3 sizeCard" >
      <div className="card-header">{props.cityInfo}</div>
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
    this.setState({cities: []})
    fetch(`http://ctp-zip-api.herokuapp.com/city/${e.target.value.toUpperCase()}`)
      .then(res => res.json())
      .then(body => {

        this.setState({zipCodes: body}) //Holds array of zipcode

        console.log(this.state.zipCodes, "ZIP CHANGE")
        console.log(this.state.cities, "ADDED CITIES")
      })
      .catch(err=>{
        this.setState({cities: []})
        this.setState({zipCodes: []})
        console.error('Error:', err)
      })
      
    
    this.setState({
      city: e.target.value
    })

    /*this.state.zipCodes.forEach(item => {
      console.log(item)

      fetch(`http://ctp-zip-api.herokuapp.com/zip/${item}`)
      .then(res => res.json())
      .then(body => {
      
        body.forEach(element => {
          this.state.cities.push(element) //Holds array of objects 
        });
        
      })
      .catch(err=>{
        this.setState({cities: []})
        console.error('Error:', err)
      })

    })*/
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
            this.state.zipCodes.map(element => {
              return <City cityInfo={element}/>
            })
          }
        </div>
      </div>
    );
  }
}

export default App;