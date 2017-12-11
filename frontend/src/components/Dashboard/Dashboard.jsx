import React, { Component } from 'react'
import { Button, Card, Image, Grid } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Nav from '../Nav/Nav.jsx'

import styles from './styles.scss'

class Dashboard extends Component {

    constructor() {
        super();
        this.state = {
            currentUser: {
                id:'',
                email: ''
            },
            isLoggedIn: false,
            users: [],
        }

        this.logOut = this.logOut.bind(this);

    }

    componentDidMount() {
        axios.get('/api/get_current_user').then((res) => {
            this.setState({
                currentUser: {
                id:res.data.user._id,
                email:res.data.user.email
            }
            })
        }).catch( (err) => {
            this.setState({
                id:res.data.user.id,
                currentUser: {email:res.data.user.email}
            })
        });

        axios.get('/api/profile').then((res) => {
            console.log(res);
            this.setState({
                isLoggedIn: true
            })
        }).catch( (err) => {
            this.setState({
                isLoggedIn: false
            })
        })

        axios.get('/api/users').then((res) => {
            console.log("api/users get");
            console.dir(res.data);
            this.setState({
                users: res.data.data
            })
        }).catch( (err) => {
            console.log("api/users error")
        })
    }

    logOut() {
        axios.get('/api/logout').then( (res) => {
            console.log("Logged out");
        })
    }

    render() {
        console.log("Current User is :" + this.state.currentUser.email)
        console.log("Current User id is :" + this.state.currentUser.id)
        var user_data = this.state.users;
        if (this.state.isLoggedIn) {
            return(
                <div>
                    <Nav/>
                    <div className="Dashboard">
                            <div className="title"> <h1>Go and explore users here </h1> </div>
                            <div className='cardd'>
                            <Card.Group>
                                {user_data.map((idx, number) =>
                                    <div className="cardWrap">
                                        <Card>
                                            <Card.Content>
                                                <Image className="profile_img" src='https://cdn3.iconfinder.com/data/icons/internet-and-web-4/78/internt_web_technology-13-256.png'/> 
                                                <Card.Header> 
                                                    <p>email: {idx.email}</p>
                                                </Card.Header>
                                                <Card.Meta> 
                                                    <p>_id: {idx._id}</p>
                                                </Card.Meta>
                                            </Card.Content>
                                            
                                        </Card>
                                    </div>
                                )}
                            </Card.Group>
                            </div>
                            <Link to="/" onClick={this.logOut}>
                                Log out
                            </Link>
                            <br />
                        
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
