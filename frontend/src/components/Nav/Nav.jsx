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
            message:"",
            intervalId:""
        }

        // var _this = this;
        // setInterval(function(){ 
        //     
        // }, 5000);
        this.timer = this.timer.bind(this);
    }

    componentDidMount() {
        var intervalId = setInterval(this.timer, 1000);
   // store intervalId in the state so it can be accessed later:
   this.setState({intervalId: intervalId});

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

    componentWillUnmount() {
   // use intervalId from the state to clear the interval
   clearInterval(this.state.intervalId);
} 

    timer() {

       // setState method is used to update the state
       axios.get('/api/get_current_match').then((res) => {
            if(res.status == 200){
                if(this.state.current_match.length < res.data.data.length){
                        console.log(res.data.data[this.state.current_match.length].email);
                        console.log(res.data.data);
            
                        alert("You got a new match! "+"User with email: "+res.data.data[this.state.current_match.length].email+" likes you too :)");
                        this.setState({
                            current_match: res.data.data
                        })
                }
                else{
                    console.log("Nothing happened");
                }
                    
            }
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
