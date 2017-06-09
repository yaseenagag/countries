import React, { Component } from 'react';
import Panel from 'muicss/lib/react/panel';
import mui from 'muicss';
import Container from 'muicss/lib/react/container';
import logo from './logo.svg';
import './App.css';

const doc = document

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      countries: []
    }
  }

  activateModal(country) {
    const modalEl = doc.createElement('div');

    modalEl.style.width = '1000px';
    modalEl.style.height = '1200px';
    modalEl.style.margin = '100px auto';
    modalEl.style.backgroundColor = 'black';
    modalEl.style.color = 'white';
    modalEl.innerText = JSON.stringify(country)

    // show modal
    return mui.overlay('on', modalEl);
  }

  componentDidMount() {
    const headers = new Headers({
      "Content-Type": "application/json",
    });

    const options = {
      method: 'GET',
      headers,
      mode: 'cors',
    };

    const request = new Request('http://localhost:4005', options);

    fetch(request)
      .then(response => response.json())
      .then(countries => this.setState({countries}));
  }

  render() {
    const { countries } = this.state
    const styles = {color: 'red'}
    console.log('countries::', countries)

    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <Container>
          {
            countries.length
              ? countries.map((country, index) => (
                <button onClick={() => this.activateModal(country)}>
                  <Panel style={styles} key={`${country.name}-${index}`}>
                    {country.name}
                  </Panel>
                </button>)
              )
              : <div>Loading...</div>
          }
        </Container>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
