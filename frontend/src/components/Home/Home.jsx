import React, { Component } from 'react'
import { Button, Card } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import ReactPlayer from 'react-player'

import Nav from '../Nav/Nav.jsx'

import styles from './styles.scss'

class Home extends Component {
    render() {
        return(
            <div className="Home" id="Home">
                <ReactPlayer id="video_back" url='https://youtu.be/aLQeqyOK4lE?t=2m5s' config={{
                    youtube: {
                      preload: true
                    }
                  }}
            playing width="110%" height="102%"/>
                    <div id="Home_text">
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
