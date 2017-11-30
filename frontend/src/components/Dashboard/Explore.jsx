import React, { Component } from 'react'
import { Button, Card } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

import styles from './styles.scss'
import Nav from '../Nav/Nav.jsx'

class Explore extends Component {
    render() {
        return(
        	<div>
                <Nav/>

	            <div className="Home">
	                <h1>EXPLORE</h1>

	                <div class="ui raised card">
						  <div class="content">
							    <div class="header">Cute Dog</div>
							    <div class="meta">
							      <span class="category">Animals</span>
							    </div>
							    <div class="description">
							      <p>HI IADJSFOIJASOFJOIASJFOIJ IOSDAJFOIJ IODSJFOIJAOSFIO JOIA SDFJOAJSO</p>
							    </div>
						  </div>
						  <div class="extra content">
							    <div class="right floated author">
							      <img class="ui avatar image" src="https://semantic-ui.com/images/avatar/small/jenny.jpg" />Matt
							    </div>
						  </div>
					</div>

					<div class="ui raised card">
						  <div class="content">
							    <div class="header">Cute Dog</div>
							    <div class="meta">
							      <span class="category">Animals</span>
							    </div>
							    <div class="description">
							      <p>HI IADJSFOIJASOFJOIASJFOIJ IOSDAJFOIJ IODSJFOIJAOSFIO JOIA SDFJOAJSO</p>
							    </div>
						  </div>
						  <div class="extra content">
							    <div class="right floated author">
							      <img class="ui avatar image" src="https://semantic-ui.com/images/avatar/small/jenny.jpg" />Matt
							    </div>
						  </div>
					</div>

	            </div>
	        </div>
        )
    }
}

export default Explore