import React, { Component } from "react";
import { connect } from "react-redux";
import CardList from "../components/CardList";
import SearchBox from "../components/SearchBox";
import Scroll from "../components/Scroll";
import ErrorBoundry from "../components/ErrorBoundry";
import "./App.css";
import { setSearchField } from "../actions";

//CONNECT WITH REDUCERS
const mapStateToProps = state => {
  return {
    searchField: state.searchField
  };
};

//CONNECT WITH ACTIONS
const mapDispatchToProps = dispatch => {
  return {
    onSearchChange: e => dispatch(setSearchField(e.target.value))
  };
};

class App extends Component {
  constructor() {
    super();
    //MAKE STATE robots VALUE IS ARRAY OF ROBOT , searchInput is value of searchBox
    this.state = {
      robots: []
    };
  }

  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then(res => res.json())
      .then(users => this.setState({ robots: users }));
  }

  render() {
    const { robots } = this.state;
    const { searchField, onSearchChange } = this.props;
    //USE FILTERING ARRAY TO COMPARE STATE robot with STATE searchInput
    const robotFilter = robots.filter(robot => {
      return robot.name
        .toLocaleLowerCase()
        .includes(searchField.toLocaleLowerCase());
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

export default connect(mapStateToProps, mapDispatchToProps)(App);
