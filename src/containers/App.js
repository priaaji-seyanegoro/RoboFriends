import React, { Component } from "react";
import { connect } from "react-redux";
import CardList from "../components/CardList";
import SearchBox from "../components/SearchBox";
import Scroll from "../components/Scroll";
import ErrorBoundry from "../components/ErrorBoundry";
import "./App.css";
import { setSearchField, requestRobots } from "../actions";

//Everytime state change this func trigged
const mapStateToProps = state => {
  return {
    searchField: state.searchRobots.searchField,
    robots: state.requestRobots.robots,
    isPending: state.requestRobots.isPending,
    error: state.requestRobots.error
  };
};

//Everytime action trigged this func run
const mapDispatchToProps = dispatch => {
  return {
    onSearchChange: e => dispatch(setSearchField(e.target.value)),
    onRequestRobots: () => dispatch(requestRobots())
  };
};

class App extends Component {
  componentDidMount() {
    this.props.onRequestRobots();
  }

  render() {
    const { searchField, onSearchChange, robots, isPending } = this.props;
    //USE FILTERING ARRAY TO COMPARE STATE robot with STATE searchInput
    const robotFilter = robots.filter(robot => {
      return robot.name
        .toLocaleLowerCase()
        .includes(searchField.toLocaleLowerCase());
    });

    return isPending ? (
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
