import React, { Component } from 'react'
import { Button, Card, Image, Grid } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Nav from '../Nav/Nav.jsx'

import styles from './styles.scss'

class Like extends Component {
    constructor() {
        super();
        this.state = {
            currentUser: {
                id:'',
                email: ''
            },
            isLoggedIn: false,
            users: [],
            liked_users: []
        }
    }

    componentDidMount() {
        axios.get('/api/get_current_user').then((res) => {
            console.dir(res.data);
            let id = res.data.user._id;
            console.log(id);
            let path = "api/liked_users";

            axios.get(path).then(
                (res) => {
                    let data = res.data.data;
                    this.setState({
                        liked_users: data
                    });
 
                }).catch(
                (err) => {
                    console.log("hehe1");
                }
            );
        }).catch( (err) => {
            this.setState({
                id:res.data.user.id,
                currentUser: {email:res.data.user.email}
            })
        });


    }


    render() {
        console.log("Current User is :" + this.state.currentUser.email);
        console.log("Current User id is :" + this.state.currentUser.id);
        var user_data = this.state.liked_users;
        console.log(user_data)
        if(user_data.length == 0) {
            return(
                <div>
                    <Nav/>
                    <div id="storyhome">
                        <h1>Your Have no Like!</h1> 
                        <h1>Go and Liked someone</h1> 
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
                <div>
                    <Nav/>
                    <div id="storyhome">
                        <h1>Your Love</h1> 
                        <br />
                        <br />
                        <Card.Group>
                                {user_data.map((idx, number) =>
                                    <div className="cardWrap">
                                        <Card>
                                            <Card.Content>
                                                {idx.profile_image == null ? (
                                                    <Image className="profile_img" src='https://cdn3.iconfinder.com/data/icons/internet-and-web-4/78/internt_web_technology-13-256.png'/> 
                                                ) : (
                                                    <Image className="profile_img" src={idx.profile_image}/> 
                                                )}
                                                
                                                <br />
                                                <Card.Header> 
                                                <br />
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
        }  
    }
}

export default Like
