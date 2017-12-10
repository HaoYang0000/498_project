import React, { Component } from 'react'
import { Button, Card } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import styles from './styles.scss'
import Nav from '../Nav/Nav.jsx'

class Setting extends Component {
    render() {
        return(
        	<div>
                <Nav/>
	              <div className="Home">
	                  <h1></h1>
	              </div>

	              <form class="ui form" id="setting_form">
				  <h1 class="ui dividing header">Personal Setting</h1>
				  <div class="field">
				    <label>Name *</label>
				    <div class="two fields">
				      <div class="field">
				        <input type="text" name="shipping[first-name]" placeholder="First Name" />
				      </div>
				      <div class="field">
				        <input type="text" name="shipping[last-name]" placeholder="Last Name" />
				      </div>
				    </div>
				    <label>Age</label>
				    <div class="field">
				        <input type="text" name="age" placeholder="20" />
				    </div>
				  </div>
				  <div class="field">
				    <label>Location</label>
				    <div class="fields">
				      <div class="twelve wide field">
				        <input type="text" name="shipping[address]" placeholder="Street Address" />
				      </div>
				    </div>
				  </div>
				  <div class="two fields">
				    <div class="field">
					    <label>State</label>
					    <select class="ui fluid dropdown">
					    <option value="">State</option>
					    <option value="AL">Alabama</option>
					    <option value="AK">Alaska</option>
					    <option value="AZ">Arizona</option>
					    <option value="AR">Arkansas</option>
					    <option value="CA">California</option>
					    <option value="CO">Colorado</option>
					    <option value="CT">Connecticut</option>
					    <option value="DE">Delaware</option>
					    <option value="DC">District Of Columbia</option>
					    <option value="FL">Florida</option>
					    <option value="GA">Georgia</option>
					    <option value="HI">Hawaii</option>
					    <option value="ID">Idaho</option>
					    <option value="IL">Illinois</option>
					    <option value="IN">Indiana</option>
					    <option value="IA">Iowa</option>
					    <option value="KS">Kansas</option>
					    <option value="KY">Kentucky</option>
					    <option value="LA">Louisiana</option>
					    <option value="ME">Maine</option>
					    <option value="MD">Maryland</option>
					    <option value="MA">Massachusetts</option>
					    <option value="MI">Michigan</option>
					    <option value="MN">Minnesota</option>
					    <option value="MS">Mississippi</option>
					    <option value="MO">Missouri</option>
					    <option value="MT">Montana</option>
					    <option value="NE">Nebraska</option>
					    <option value="NV">Nevada</option>
					    <option value="NH">New Hampshire</option>
					    <option value="NJ">New Jersey</option>
					    <option value="NM">New Mexico</option>
					    <option value="NY">New York</option>
					    <option value="NC">North Carolina</option>
					    <option value="ND">North Dakota</option>
					    <option value="OH">Ohio</option>
					    <option value="OK">Oklahoma</option>
					    <option value="OR">Oregon</option>
					    <option value="PA">Pennsylvania</option>
					    <option value="RI">Rhode Island</option>
					    <option value="SC">South Carolina</option>
					    <option value="SD">South Dakota</option>
					    <option value="TN">Tennessee</option>
					    <option value="TX">Texas</option>
					    <option value="UT">Utah</option>
					    <option value="VT">Vermont</option>
					    <option value="VA">Virginia</option>
					    <option value="WA">Washington</option>
					    <option value="WV">West Virginia</option>
					    <option value="WI">Wisconsin</option>
					    <option value="WY">Wyoming</option>
					      </select>
				    </div>
				    <div class="field">
				    	  <label>County</label>
				          <select class="ui fluid search dropdown" name="country">
				            <option value="">USA</option>
				            <option value="1">CHINA</option>
				            <option value="2">INDIA</option>
				            <option value="3">JAPAN</option>
				            <option value="4">CANADA</option>
				            <option value="5">RUSSIA</option>
				            <option value="6">GERMAN</option>
				            <option value="7">UK</option>
				            <option value="8">BRAZIL</option>
				            <option value="9">AUSTRILIA</option>
				            <option value="10">MEXICO</option>
				            <option value="11">KOREA</option>
				            <option value="12">OTHER</option>
				          </select>
				    </div>
				  </div>
				  <h4 class="ui dividing header">Pet Information</h4>
				  <div class="two fields">
				    <div class="field">
				          <select class="ui fluid search dropdown" name="type">
				            <option value="">SPECIES *</option>
				            <option value="1">dog</option>
				            <option value="2">cat</option>
				            <option value="3">fish</option>
				            <option value="4">human</option>
				            <option value="5">Pikachu</option>
				            <option value="6">Pig</option>
				            <option value="7">Squirrel</option>
				            <option value="8">Rabbit</option>
				            <option value="9">Turtle</option>
				            <option value="10">Lizard</option>
				            <option value="11">Bird</option>
				          </select>
				    </div>
				    <div class="field">
				          <select class="ui fluid search dropdown" name="prefer">
				            <option value="">PREFER SPECIES *</option>
				            <option value="1">dog</option>
				            <option value="2">cat</option>
				            <option value="3">fish</option>
				            <option value="4">human</option>
				            <option value="5">Pikachu</option>
				            <option value="6">Pig</option>
				            <option value="7">Squirrel</option>
				            <option value="8">Rabbit</option>
				            <option value="9">Turtle</option>
				            <option value="10">Lizard</option>
				            <option value="11">Bird</option>
				          </select>
				    </div>
				  </div>
				  <div class="fields">
				    <div class="seven wide field">
				      <label>Gender</label>
				      <select class="ui fluid search dropdown" name="gender">
				            <option value="">female</option>
				            <option value="1">male</option>
				            <option value="2">middle</option>
				          </select>
				    </div>
				    <div class="three wide field">
				      <label>Age</label>
				      <input type="text" name="petage" maxlength="3" placeholder="1" />
				    </div>				    
				  </div>
				  <div class="ui button" tabindex="0">Submit Order</div>
				</form>
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

export default Setting

