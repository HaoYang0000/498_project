import React, { Component } from 'react'
import { Button, Card } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import styles from './styles.scss'

class Nav extends Component {
    //CHANGE-FONT-END
    constructor(props) {
        super(props);

        this.state = {
            currentUser: {
                email: ''
            },
            current_match:[],
            message:""
        }

        var _this = this;
        setInterval(function(){ 
            axios.get('/api/get_current_user').then((res) => {
                if(_this.state.current_match.length < res.data.user.matched_users.length){
                    alert("You got a new match!");
                    _this.setState({
                        current_match: res.data.user.matched_users
                    })
                }
                else{
                    console.log("Nothing happened");
                }
                
            });
        }, 5000);
    }

    componentDidMount() {
        axios.get('/api/get_current_user').then((res) => {
            this.setState({
                currentUser: {
                email:res.data.user.email
            }
            })
        }).catch( (err) => {
            this.setState({
                currentUser: {email:res.data.user.email}
            })
        });

        axios.get('/api/get_current_match').then((res) => {
            console.log("aa");
            console.log(res.data.data);
            this.setState({
                    current_match:res.data.data
            })
        }).catch( (err) => {
            this.setState({
                current_match: []
            })
        });
    }



    render() {

        return(
            <div className="Nav">
                <nav>
                    <Link to="/main"><Button id="nav-bar" inverted color='yellow' size='mini'>Main</Button></Link>
                    <Link to="/explore"><Button id="nav-bar" inverted color='yellow' size='mini'>Explore</Button></Link>
                    <Link to="/setting"><Button id="nav-bar" inverted color='yellow' size='mini'>Setting</Button></Link>
                    <Link to="/like"><Button id="nav-bar" inverted color='yellow' size='mini'>Likes</Button></Link>
                    <div id="nav-icon">
                        <i className="github alternate icon big"></i>
                    </div>
                    <div>{}</div>
                </nav>
            </div>
        )
    }
}

export default Nav
