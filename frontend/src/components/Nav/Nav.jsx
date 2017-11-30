import React, { Component } from 'react'
import { Button, Card } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

import styles from './styles.scss'

class Nav extends Component {
    render() {
        return(
            <div className="Nav">
                <nav>
                    <Button id="nav-bar" inverted color='yellow' size='mini'>Home</Button>
                    <Button id="nav-bar" inverted color='yellow' size='mini'>Explore</Button>
                    <Button id="nav-bar" inverted color='yellow' size='mini'>Setting</Button>
                </nav>
            </div>
        )
    }
}

export default Nav
