import React, { Component } from 'react'
import { Button, Card } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

import styles from './styles.scss'

class Nav extends Component {
    render() {
        return(
            <div className="Nav">
                <nav>
                    <Link to="/main"><Button id="nav-bar" inverted color='yellow' size='mini'>Main</Button></Link>
                    <Link to="/explore"><Button id="nav-bar" inverted color='yellow' size='mini'>Explore</Button></Link>
                    <Link to="/setting"><Button id="nav-bar" inverted color='yellow' size='mini'>Setting</Button></Link>
                    <div id="nav-icon">
                        <i className="github alternate icon big"></i>
                    </div>
                </nav>
            </div>
        )
    }
}

export default Nav
