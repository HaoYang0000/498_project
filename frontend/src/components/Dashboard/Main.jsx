import React, { Component } from 'react'
import { Button, Card } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

import styles from './styles.scss'
import Nav from '../Nav/Nav.jsx'

class Main extends Component {

    constructor() {
        super();
        this.state = {
            user_id: "",
            queue: []
        }
        this.like = this.like.bind(this);
        this.dislike = this.dislike.bind(this);
    }

    like() {
        // if stack is empty, we need to add 100 more users
        if(queue.length) {
            // add users to stack
            axios.get('/api/populateQueue/'+this.state.user_id, {
                user_id: this.state.user_id,
            })
            .then((res) => {
                this.setState({stack: res})
            })
        }
        cur_other_id = queue.shift();
        // we need to check if the other user also liked us
        axios.put('/api/like', {
            user_id: this.state.user_id,
            other_user_id: this.state.other_user_id
        })
        .then((res) => {

        })
    }


    dislike() {
        // if stack is empty, we need to add 100 more users
        if(stack) {
            // add users to stack

        }

        var stack.pop()
        // we need to check if the other user also liked us

    }

    componentWillMount(){
        axios.get(this.root_url + "pokemon/").then(() => {
            this.displayAll();
        });

    }


    render() {
        return(
            <div>
                <Nav/>
                <div className="Home">
                    <h1>PAIR PAIR PAIR</h1>

                    <div class="ui card">
                          <img class="ui image" src={'https://semantic-ui.com/images/avatar/large/jenny.jpg'} />
                          <div class="content">
                                <div class="header">Matthew</div>
                                <div class="meta">
                                    <span class="date">Joined in 2015</span>
                                </div>
                                <div class="description">Matthew is a musician living in Nashville.</div>
                          </div>
                            <div class="extra content">
                            <a>
                            <i aria-hidden="true" class="user icon"></i>22 Friends</a>
                          </div>
                    </div>
                    <button class="ui positive button" role="button" id="main-but" onClick={this.like}> Like </button>
                    <button class="ui negative button" role="button" id="main-but" onClick={this.dislike}> Na.. </button>
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

export default Main
