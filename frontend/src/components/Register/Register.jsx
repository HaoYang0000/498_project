import React, { Component } from 'react'
import { Button, Input, Card } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import ReactPlayer from 'react-player'

import styles from './styles.scss'


class Register extends Component {
    constructor() {
        super();

        this.state = {
            user: {
                password: '',
                email: ''
            },

            message: ''
        }

        this.onSubmit = this.onSubmit.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
    }

    onSubmit(e) {
        e.preventDefault();

        // create a string for an HTTP body message
        const name = encodeURIComponent(this.state.user.username);
        const email = encodeURIComponent(this.state.user.email);
        const password = encodeURIComponent(this.state.user.password);
        const formData = `name=${name}&email=${email}&password=${password}`;

        //axios new code
        axios.post('/api/register', {
            name: name,
            email: email,
            password: password,
          })
          .then(res => {
            console.log(res);
            if(res.status == 200){
                this.setState({
                        message: 'Registered!'
                    });
            } else {
                this.setState({
                     message: 'Unable to register'
                 });
            }
          })
          .catch(function (error) {
            console.log("error" + error);
          });
    }

    onChangeEmail(e) {
        const user = this.state.user;
        user.email = e.target.value;
        this.setState({
            user
        })
    }

    onChangePassword(e) {
        const user = this.state.user;
        user.password = e.target.value;
        this.setState({
            user
        })
    }

    render() {
        return(
            <form className="Register" action="/" onSubmit={this.onSubmit}>
                <ReactPlayer id="video_back" url='https://youtu.be/q2fIWB8o-bs?t=16m6s' config={{
                    youtube: {
                      preload: true
                    }
                  }} playing width="108%" height="102%"/>
                <Card className="Register__content">
                    <div className="register_bar">
                        <h1 id="title">Register</h1>
                        <Input label="Email" onChange={this.onChangeEmail} />
                        <br/><br/>
                        <Input label="Password" onChange={this.onChangePassword} />
                        <br/><br/>
                        <p>{this.state.message}</p>
                        <Input id="register_submit" type="submit" />
                        <h4>Already registered? Click <Link to="/login">here</Link> to Log-in!</h4>

                        <Link to="/main">
                            <p>Go to Dashboard</p>
                        </Link>
                    </div>
                    <br />
                </Card>
            </form>
    )
}
}

export default Register
