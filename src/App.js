import React, { Component } from "react";
import "./App.css";
import {
  Col,
  Row,
  Card,
  Container,
  Navbar,
  Form,
  FormControl,
  Button,
  Alert
} from "react-bootstrap";

function App() {
  return (
    <div className="App">
      <Header />
      <Container>
        <Row>
          <Col md="12">
            <Data />
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );
}

class Header extends Component {
  render() {
    return (
      <div>
        <Row>
          <Col md="12">
            <Navbar bg="dark" variant="light" expand="lg">
              <Navbar.Brand href="#home">
                <img src="../img/logo.png" width="80%" alt="WeatherZip" />
              </Navbar.Brand>
            </Navbar>
          </Col>
        </Row>
      </div>
    );
  }
}

class Data extends Component {
  constructor(props) {
    super(props);
    this.state = {
      weatherData: [],
      zipCode: "",
      error: ""
    };
    this.getWeather = this.getWeather.bind(this);
    this.onSearchSubmit = this.onSearchSubmit.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
  }

  dateFormat(date) {
    var datestring =
      date.getFullYear() +
      "-" +
      ("0" + (date.getMonth() + 1)).slice(-2) +
      "-" +
      ("0" + date.getDate()).slice(-2);

    return datestring;
  }

  getWeather(zipCode) {
    let today = new Date();
    let sevenDays = new Date();
    sevenDays.setDate(sevenDays.getDate() + 7); //add 7 days from today's date

    let todayFormat = this.dateFormat(today);
    let sevenDayFormat = this.dateFormat(sevenDays);

    let API =
      "https://graphical.weather.gov/xml/sample_products/browser_interface/ndfdXMLclient.php?zipCodeList=" +
      zipCode +
      "&product=time-series&begin=" +
      todayFormat +
      "T12:00:00&end=" +
      sevenDayFormat +
      "T12:00:00&maxt=maxt";

    console.log("API Request URL: " + API);

    let request = new Request(API);
    if (zipCode !== "") {
      fetch(request).then(results => {
        results
          .text()
          .then(str => {
            let responseDoc = new DOMParser().parseFromString(
              str,
              "application/xml"
            );

            //get tempNodes length
            let tempLength = responseDoc.getElementsByTagName("temperature")[0]
              .childNodes.length;
            //pull temperatures from childnodes and set to state array
            for (var i = 0; i < tempLength; i++) {
              if (i % 2 !== 0 && i !== 1) {
                this.setState({
                  weatherData: [
                    ...this.state.weatherData,
                    responseDoc
                      .getElementsByTagName("temperature")[0]
                      .childNodes[i].textContent.toString()
                  ],
                  error: ""
                });
              }
            }
          })
          .catch(error => {
            this.setState({
              error: "Please enter a valid zip code."
            });
          });
      });
    }
  }

  onSearchChange(event) {
    this.setState({ zipCode: event.target.value });
  }

  onSearchSubmit(event) {
    this.setState({ weatherData: [] });
    const { zipCode } = this.state;
    this.getWeather(zipCode);
    event.preventDefault();
  }

  componentDidMount() {}

  render() {
    //map weather items to divs
    const temps = this.state.weatherData.map(item => (
      <Col md="3">
        <Card style={{ width: "12rem" }} className="tempcard">
          <Card.Body>
            <div key={item}>
              <Card.Title>Max Temp</Card.Title>
              <Card.Text>
                <span className="tempNumber">{item}</span>
              </Card.Text>
            </div>
          </Card.Body>
        </Card>
      </Col>
    ));

    const { zipCode, weatherData, error } = this.state;
    return (
      <div>
        <Row>
          <Col className="searchForm" md="4" />

          <Search
            value={zipCode}
            onChange={this.onSearchChange}
            onSubmit={this.onSearchSubmit}
          >
            Search
          </Search>
          <Col md="4" />
        </Row>

        {weatherData !== "" ? <Row>{temps}</Row> : null}
        {error !== "" ? (
          <Row>
            <Col md="4" />
            <Col md="4">
              <Alert variant="danger">Please enter a valid zip code!</Alert>
            </Col>
            <Col md="4" />
          </Row>
        ) : null}

        {}
      </div>
    );
  }
}

const Search = ({ value, onChange, onSubmit, children }) => (
  <Form inline onSubmit={onSubmit}>
    <Col md="12">
      <FormControl
        type="number"
        placeholder="Enter Zip Code"
        className="mr-sm-2"
        pattern="[0-9]{5}"
        value={value}
        onChange={onChange}
      />
      <Button type="submit" variant="dark">
        {children}
      </Button>
    </Col>
  </Form>
);

class Footer extends Component {
  render() {
    return (
      <div>
        <Navbar variant="dark" bg="dark" fixed="bottom">
          <Navbar.Brand href="#home">WeatherZip</Navbar.Brand>
        </Navbar>
      </div>
    );
  }
}

export default App;
