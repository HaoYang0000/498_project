import React, { Component } from 'react'
import { Button, Card } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

import styles from './styles.scss'

class Nav extends Component {
    render() {
        return(
            <div className="Nav">
                <nav>
                    <button>Home</button>
                    <button>Explore</button>
                    <button>Setting</button>
                </nav>
            </div>
        )
    }
}

export default Nav
