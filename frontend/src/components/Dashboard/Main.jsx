import React, { Component } from 'react'
import { Button, Card } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

import styles from './styles.scss'
import Nav from '../Nav/Nav.jsx'

class Main extends Component {
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
                    <button class="ui positive button" role="button" id="main-but"> Like </button>
                    <button class="ui negative button" role="button" id="main-but"> Na.. </button>
                </div>
            </div>
        )
    }
}

export default Main

