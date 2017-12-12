import React, { Component } from 'react'
import { Button, Card, Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import styles from './styles.scss'
import Nav from '../Nav/Nav.jsx'
import Upload from '../Upload/Upload.jsx'

class Setting extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: "",
            firstName: "",
            lastName: "",
            age:"",
            gender:"",
            preferedGender:"",
            preferedUserAgeMin:"",
            preferedUserAgeMax:"",
            address:"",
            city:"",
            state:"",
            country:"",
            species:"",
            preferedSpecies:"",
            petAge:"",
            petGender:"",
            preferedPetAgeMin:"",
            preferedPetAgeMax:""
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    componentWillMount() {
        axios.get('/api/get_current_user').then((res) => {
            //console.dir(res.data);
            let id = res.data.user._id;
            //console.log(id);
            let path = "api/users/" + id.toString();

            axios.get(path).then(
                (res) => {
                    let currentSetting = res.data.data;
                    //console.dir(currentSetting);
                    this.setState({
                        userId: id,
                        firstName: currentSetting.first_name || "",
                        lastName: currentSetting.last_name || "",
                        age: currentSetting.age || 0,
                        gender: currentSetting.user_gender || "",
                        preferedGender: currentSetting.prefered_user_gender || "",
                        preferedUserAgeMin:currentSetting.prefered_user_age_min || 0,
                        preferedUserAgeMax: currentSetting.prefered_user_age_max || 0,
                        address: currentSetting.address || "",
                        city: currentSetting.city || "",
                        state: currentSetting.state || "",
                        country: currentSetting.country || "",
                        species: currentSetting.pet_spiecie || "",
                        preferedSpecies: currentSetting.prefered_species || "",
                        petAge: currentSetting.pet_age || 0,
                        petGender: currentSetting.prefered_pet_gender || "",
                        preferedPetAgeMin: currentSetting.prefered_pet_age_min || 0,
                        preferedPetAgeMax: currentSetting.prefered_pet_age_max || 0
                    });
                }
            ).catch(
                (err) => {
                    console.log("hehe1");
                }
            );
        }).catch((err) => {
            console.log("hehe2");
        });
    }

    handleSubmit(event) {
        var newSetting = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            age:this.state.age,
            gender:this.state.gender,
            preferedGender: this.state.preferedGender,
            preferedUserAgeMin: this.state.preferedUserAgeMin,
            preferedUserAgeMax: this.state.preferedUserAgeMax,
            address:this.state.address,
            city:this.state.city,
            state:this.state.state,
            country:this.state.country,
            species:this.state.species,
            preferedSpecies:this.state.preferedSpecies,
            petAge:this.state.petAge,
            petGender:this.state.petGender,
            preferedPetAgeMin:this.state.preferedPetAgeMin,
            preferedPetAgeMax:this.state.preferedPetAgeMax
        }
        //console.dir(newSetting);
        let path = "/api/users/" + this.state.userId.toString();
        //console.log(path);
        //console.dir(newSetting);
        axios.put(path, newSetting).then(
            (res) => {
                console.log("hehe3");
            }
        ).catch(
            () => {
                console.log("hehe4");
            }
        );
    }

    render() {
        return(
        	<div>
                <Nav/>
                <div className="ui form" >
	              <form id="setting_form" onSubmit={this.handleSubmit}>
				  <h1 >Personal Setting</h1>
                  <div className="field">
                  <label>Profile Picture</label>
                  <Upload type={'Profile'}/>
                  </div>
				  <div className="field">
				    <label>Name *</label>
				    <div className="two fields">
				      <div className="field">
				        <input type="text" name="firstName" placeholder="First Name" value={this.state.firstName} onChange={this.handleInputChange}/>
				      </div>
				      <div className="field">
				        <input type="text" name="lastName" placeholder="Last Name" value={this.state.lastName} onChange={this.handleInputChange}/>
				      </div>
				    </div>
                  </div>
                  <div className="fields">
                      <div className="eight wide field">
                          <label>Age</label>
                          <input type="number" name="age" placeholder={20} value={this.state.age} onChange={this.handleInputChange}/>
                      </div>
                      <div className="eight wide field">
  				      <label>Gender</label>
  				      <select className="ui fluid search dropdown" name="gender" value={this.state.gender} onChange={this.handleInputChange}>
                            <option value="">Gender</option>
                            <option value="female">Female</option>
  				            <option value="male">Male</option>
  				            <option value="neutral">Neutral</option>
  				      </select>
  				    </div>
                  </div>
                  <div className="fields">
                  <div className="six wide field">
                  <label>Prefered User Gender</label>
                  <select className="ui fluid search dropdown" name="preferedGender" value={this.state.preferedGender} onChange={this.handleInputChange}>
                        <option value="">Gender</option>
                        <option value="female">Female</option>
                        <option value="male">Male</option>
                        <option value="neutral">Neutral</option>
                  </select>
                  </div>
                  <div className="five wide field">
                  <label>Prefered User Age Min</label>
                  <input type="number" name="preferedUserAgeMin" maxLength="3" placeholder={0} value={this.state.preferedUserAgeMin} onChange={this.handleInputChange}/>
                  </div>
                  <div className="five wide field">
                  <label>Prefered User Age Max</label>
                  <input type="number" name="preferedUserAgeMax" maxLength="3" placeholder={0} value={this.state.preferedUserAgeMax} onChange={this.handleInputChange}/>
                  </div>

                  </div>
				  <div className="fields">
				    <div className="twelve wide field">
                        <label>Location</label>
				        <input type="text" name="address" placeholder="Street Address" value={this.state.address} onChange={this.handleInputChange}/>
				    </div>
                    <div className="four wide field">
                        <label>City</label>
				        <input type="text" name="city" placeholder="Current City" value={this.state.city} onChange={this.handleInputChange}/>
				    </div>
                  </div>
				  <div className="two fields">
				    <div className="field">
					    <label>State</label>
					    <select className="ui fluid dropdown" name="state" value={this.state.state} onChange={this.handleInputChange}>
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
				    <div className="field">
				    	  <label>County</label>
				          <select className="ui fluid search dropdown" name="country" value={this.state.country} onChange={this.handleInputChange}>
                            <option value="">County</option>
                            <option value="0">USA</option>
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
				  <h4 className="ui dividing header">Pet Information</h4>
				  <div className="two fields">
				    <div className="field">
				          <select className="ui fluid search dropdown" name="species" value={this.state.species} onChange={this.handleInputChange}>
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
				    <div className="field">
				          <select className="ui fluid search dropdown" name="preferedSpecies" value={this.state.preferedSpecies} onChange={this.handleInputChange}>
				            <option value="">PREFER SPECIES* </option>
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
				  <div className="fields">
				    <div className="eight wide field">
				      <label>Gender</label>
				      <select className="ui fluid search dropdown" name="petGender" value={this.state.petGender} onChange={this.handleInputChange}>
                            <option value="">Gender</option>
                            <option value="female">Female</option>
				            <option value="male">Male</option>
				            <option value="neutral">Neutral</option>
				      </select>
				    </div>
				    <div className="eight wide field">
				      <label>Age</label>
				      <input type="number" name="petAge" maxLength="3" placeholder={1} value={this.state.petAge} onChange={this.handleInputChange}/>
				    </div>
                  </div>

                   <div className="fields">
                   <div className="eight wide field">
                   <label>Prefered Age Min</label>
                   <input type="number" name="preferedPetAgeMin" maxLength="3" placeholder={1} value={this.state.preferedPetAgeMin} onChange={this.handleInputChange}/>
                   </div>
                   <div className="eight wide field">
                   <label>Prefered Age Max</label>
                   <input type="number" name="preferedPetAgeMax" maxLength="3" placeholder={100} value={this.state.preferedPetAgeMax} onChange={this.handleInputChange}/>
                   </div>
                   </div>
                   <Button type= "submit" color="pink" size="huge" animated="fade" onClick={this.handleSubmit}>
                       <Button.Content visible>Submit!</Button.Content>
                       <Button.Content hidden>
                           <Icon name="thumbs outline up"/>
                       </Button.Content>
                   </Button>
				</form>
        </div>

				<div className="ui vertical labeled icon menu" id="nav-down">
                      <Link to="/dashboard">
                      <div className="item">
                        <i className="home icon"></i>
                        Home
                      </div>
                      </Link>
                      <Link to="/" onClick={this.logOut}>
                        <div className="item">
                            <i className="send outline icon"></i>
                            Log off
                        </div>
                      </Link>
                    </div>
	        </div>
        )
    }
}

export default Setting
