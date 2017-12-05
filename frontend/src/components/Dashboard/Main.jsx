import React, { Component } from 'react'
import { Sidebar, Segment, Button, Menu, Image, Icon, Header, Card } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

import styles from './styles.scss'
import Nav from '../Nav/Nav.jsx'

class Main extends Component {
    constructor() {
        super();
        this.state = {
            visible: false,
        }
        this.toggleVisibility = () => this.setState({ visible: !this.state.visible })
    }

    
    render() {
        const { visible } = this.state;

        return(
            <div>
                <Nav/>
                <div id="filter-div">
                    <Sidebar.Pushable>
                        <Sidebar as={Menu} animation='push' width='thin' visible={visible} icon='labeled' vertical inverted id="main-sidebar">
                            <Menu.Item name='map'>
                              <Icon name='map' />
                              Map
                            </Menu.Item>
                            <Menu.Item name='users'>
                                <Icon name='users' />
                                Age
                            </Menu.Item>
                            <Menu.Item name='heterosexual'>
                                <Icon name='heterosexual' />
                                Gender
                            </Menu.Item>
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
                    <button class="ui positive button" role="button" id="main-but"> Like </button>
                    <button class="ui negative button" role="button" id="main-but"> Na.. </button>
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

