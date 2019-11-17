import React, { Component } from "react";
import CardList from "../components/CardList";
import SearchBox from "../components/SearchBox";
import Scroll from "../components/Scroll";
import ErrorBoundry from "../components/ErrorBoundry";
import "./App.css";

class App extends Component {
  constructor() {
    super();
    //MAKE STATE robots VALUE IS ARRAY OF ROBOT , searchInput is value of searchBox
    this.state = {
      robots: [],
      searchInput: ""
    };
  }

  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then(res => res.json())
      .then(users => this.setState({ robots: users }));
  }

  //function for get value from searchBox and change state searchInput
  onSearchChange = e => {
    this.setState({ searchInput: e.target.value });
  };

  render() {
    const { robots, searchInput } = this.state;
    const { onSearchChange } = this;

    //USE FILTERING ARRAY TO COMPARE STATE robot with STATE searchInput
    const robotFilter = robots.filter(robot => {
      return robot.name
        .toLocaleLowerCase()
        .includes(searchInput.toLocaleLowerCase());
    });

    return !robots.length ? (
      // if state robot dont have data
      <div className="tc">
        <h1 className="f1">ROBOFRIENDS</h1>
        {/* searchChange is fuction as a props for passing to searchBox Component */}
        <SearchBox searchChange={onSearchChange} />
        <h1>Loading ...</h1>
      </div>
    ) : (
      // if state robot have data
      <div className="tc">
        <h1 className="f1">ROBOFRIENDS</h1>
        {/* searchChange is fuction as a props for passing to searchBox Component */}
        <SearchBox searchChange={onSearchChange} />
        <Scroll>
          <ErrorBoundry>
            <CardList robots={robotFilter} />
          </ErrorBoundry>
        </Scroll>
      </div>
    );
  }
}

export default App;
