import React from "react";
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/scroll';
import './App.css';
import ErrorBoundary from '../components/ErrorBoundary';

class App extends React.Component {
    constructor() {
        super()
        this.state = {
            robots: [],
            searchfield: ''
        }
    }

    componentDidMount() {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => response.json())
            .then(users => this.setState({ robots: users }))
    }

    onSearchChange = (event) => {
        this.setState({ searchfield: event.target.value })

    }

    render() {
        const { robots, searchfield } = this.state;
        const filteredrobots = robots.filter(robot => {
            return robot.name.toLowerCase().includes(searchfield.toLowerCase());
        })
        return !robots.length ? (
            <div className="tc">
                <h1 className="f1">RoboFriends</h1>
                <SearchBox searchChange={this.onSearchChange} />
                <h1>Loading...</h1>
            </div>
        )
            : (
                <div className="tc">
                    <h1 className="f1">RoboFriends</h1>
                    <SearchBox searchChange={this.onSearchChange} />
                    <Scroll>
                        <ErrorBoundary>
                            <CardList robots={filteredrobots} />
                        </ErrorBoundary>
                    </Scroll>
                </div>
            );
    }
}

export default App;