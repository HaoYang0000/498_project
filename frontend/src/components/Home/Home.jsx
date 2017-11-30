import React, { Component } from 'react'
import { Button, Card } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

import Nav from '../Nav/Nav.jsx'
import Upload from '../Upload/Upload.jsx'

import styles from './styles.scss'

class Home extends Component {
    render() {
        return(
            <div className="Home">
                <Nav/>
                <Card>
                    <h1>Welcome to MP2!HomeHomeHome</h1>
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
                </Card>
                <Upload/>
            </div>
        )
    }
}

export default Home
