import React, { Component } from 'react'
import { Button, Card } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Nav from '../Nav/Nav.jsx'

import styles from './styles.scss'

class Dashboard extends Component {

    constructor() {
        super();
        this.state = {
            isLoggedIn: false
        }

        this.logOut = this.logOut.bind(this);

    }

    componentDidMount() {
        axios.get('/api/profile').then( (res) => {
            console.log(res);
            this.setState({
                isLoggedIn: true
            })
        }).catch( (err) => {
            this.setState({
                isLoggedIn: false
            })
        })
    }

    logOut() {
        axios.get('/api/logout').then( (res) => {
            console.log("Logged out");
        })
    }

    render() {

        if (this.state.isLoggedIn) {
            return(
                <div>
                    <Nav/>
                    <div className="Dashboard">
                        <Card>
                            <br />
                            <h1>Welcome to the App!</h1>
                            <p>You are now logged in.</p>

                            <Link to="/" onClick={this.logOut}>
                                Log out
                            </Link>
                            <br />
                        </Card>
                    </div>
                    <div class="ui vertical labeled icon menu" id="nav-down">
                      <Link to="/dashboard">
                      <a class="item">
                        <i class="home icon"></i>
                        Home
                      </a>
                      </Link>
                      <Link to="/" onClick={this.logOut}>
                        <a class="item">
                            <i class="send outline icon"></i>
                            Log off
                        </a>
                      </Link>
                    </div>
                </div>
            )
        } else {
            return(
                <div className="Dashboard">
                    <Card>
                        <br />
                        <h1>You must log in before you can see this page.</h1>
                        <Link to="/">
                            Back
                        </Link>
                        <br />
                    </Card>
                </div>
            )
        }
    }
}

export default Dashboard
