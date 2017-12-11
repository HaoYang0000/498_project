import React, { Component } from 'react'
import { Sidebar, Segment, Button, Menu, Image, Icon, Header, Card, Input } from 'semantic-ui-react'
import { Link } from 'react-router-dom'


import axios from 'axios'
import styles from './styles.scss'
import Nav from '../Nav/Nav.jsx'

class Main extends Component {
    constructor() {
        super();
        this.state = {
            currentUser: {
                id:'',
                email: ''
            },
            visible: false,
            filter: {
                map: '',
                age: '',
                sex: ''
            },
            filteredUser: [],
            queue: []  //霖霖 added
        }

        //霖霖 added
        this.like = this.like.bind(this);
        this.dislike = this.dislike.bind(this);
        //霖霖 added
        this.toggleVisibility = () => this.setState({ visible: !this.state.visible });
        this.onSubmit = this.onSubmit.bind(this);
        this.onChangemap = this.onChangemap.bind(this);
        this.onChangeage = this.onChangeage.bind(this);
        this.onChangesex = this.onChangesex.bind(this);
    }

    componentDidMount() {
        axios.get('/api/get_current_user', {}).then((res) => {
            this.setState({
                currentUser: {
                id:res.data.user._id,
                email:res.data.user.email
                }
            })
        }).catch((err) => {
            this.setState({
                id:res.data.user.id,
                currentUser: {email:res.data.user.email}
            })
        });

        //霖霖 周五 12/10
        // if queue is empty, we need to add 100 more users
        if(this.state.queue) {
            // add users to stack
            axios.get('/api/populateQueue')
            .then((res) => {
                console.log("populating the queue");
                this.setState({queue: this.state.queue.concat(res.data.data)});   // res.data is a list of object looking like {"_id": "5a2a0762782654cb6984c4b7"}
                console.log("queue after populating", this.state.queue);
            });
        }
    }


    //霖霖 added
    like() {
        var cur_other_id = this.state.queue.shift();
        // we need to check if the other user also liked us
        axios.put('/api/like', {
           user_id: this.state.currentUser.id,
           other_user_id: cur_other_id._id
       })
       .then((res) => {
           console.log(res.data);
       });
   }

   dislike() {

   }


    onChangemap(e) {
        const filter = this.state.filter;
        filter.map = e.target.value;
        this.setState({
            filter
        });
    }

    onChangeage(e) {
        const filter = this.state.filter;
        filter.age = e.target.value;
        this.setState({
            filter
        });
    }

    onChangesex(e) {
        const filter = this.state.filter;
        filter.sex = e.target.value;
        this.setState({
            filter
        });
    }

    onSubmit(e) {
        e.preventDefault();
        axios.post('api/main/filter',
            this.state.filter
        ).then(res => {
            this.setState({
                filteredUser: res.data.data
                });
                console.dir("wocao")
                console.dir(this.state.filteredUser);
            })
            .catch(function (error) {
                console.log(error);
            });
    }


    render() {
        const { visible } = this.state;

        return(
            <div>
                <div>
                {this.state.filteredUser.map((idx, number) =>
                            	<div>
                            	<div class="content">
									    <p>ID: {number}</p>
									    <p>email: {idx.id}</p>
                                        <p>password: {idx.password}</p>
                                        <p> email: {idx.email} </p>
                                        <p> age:{idx.age} </p>
								</div>
								</div>
                )}
                </div>
                <Nav/>
                <div id="filter-div">
                    <Sidebar.Pushable>
                        <Sidebar as={Menu} animation='push' width='thin' visible={visible} icon='labeled' vertical inverted id="main-sidebar">
                            <form className="filter-main" action="" onSubmit={this.onSubmit}>
                              <Menu.Item name='map'>
                                <Icon name='map' />
                                Map
                                  <input label="map" onChange={this.onChangemap} />
                              </Menu.Item>
                              <Menu.Item name='users'>
                                  <Icon name='users' />
                                  Age
                                  <input label="age" onChange={this.onChangeage} />
                              </Menu.Item>
                              <Menu.Item name='heterosexual'>
                                  <Icon name='heterosexual' />
                                  Gender
                                  <input label="sex" onChange={this.onChangesex} />
                              </Menu.Item>
                              <input id="filter-submit" type="submit" />
                            </form>
                        </Sidebar>
                        <Sidebar.Pusher>
                            <div id="sidebar-but" onClick={this.toggleVisibility}><p>FILTER</p></div>
                        </Sidebar.Pusher>
                    </Sidebar.Pushable>
                </div>

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
