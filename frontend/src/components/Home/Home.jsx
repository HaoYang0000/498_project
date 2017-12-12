import React, { Component } from 'react'
import { Button, Card } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import ReactPlayer from 'react-player'

import Nav from '../Nav/Nav.jsx'

import styles from './styles.scss'

class Home extends Component {
    render() {
        return(

            <div>
                <div className="Home" id="Home">
                        <p id="title">PET TINDER</p>
                        <span>
                            <Link to="/login">
                                <Button>
                                    Login
                                </Button>
                            </Link>

                            <Link to="/register">
                                <Button>
                                    Register
                                </Button>
                            </Link>
                        </span>
                        <br />
                </div>
            </div>
        )
    }
}

export default Home
