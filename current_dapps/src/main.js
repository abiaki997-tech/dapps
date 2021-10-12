import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';


function main() {
    return (
        <div>
            <h1>Main </h1>
            <Router>
                <Link to="/Greeting">
                    <button> Go Greeting</button>
                </Link>
            </Router>

        </div>
    )
}

export default main
