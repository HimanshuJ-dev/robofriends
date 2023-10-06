import React from "react";
import { connect } from "react-redux";
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/scroll';
import './App.css';
import ErrorBoundary from '../components/ErrorBoundary';
import { setSearchField, requestRobots } from "../actions";

const mapStateToProps = (state) => {
    return {
        searchField: state.searchRobots.searchField,
        robots: state.requestRobots.robots,
        isPending: state.requestRobots.isPending
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSearchChange: (event) => dispatch(setSearchField(event.target.value)),
        onRequestRobots: () => dispatch(requestRobots())
    }
}

class App extends React.Component {
    componentDidMount() {
        this.props.onRequestRobots();
    }

    render() {
        const { searchField, onSearchChange, robots, isPending } = this.props;
        const filteredrobots = robots.filter(robot => robot.name.toLowerCase().includes(searchField.toLowerCase()))
        return isPending?(
            <div className="tc">
                <h1 className="f1">RoboFriends</h1>
                <SearchBox searchChange={onSearchChange} />
                <h1>Loading...</h1>
            </div>
        )
            : (
                <div className="tc">
                    <h1 className="f1">RoboFriends</h1>
                    <SearchBox searchChange={onSearchChange} />
                    <Scroll>
                        <ErrorBoundary>
                            <CardList robots={filteredrobots} />
                        </ErrorBoundary>
                    </Scroll>
                </div>
            );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);