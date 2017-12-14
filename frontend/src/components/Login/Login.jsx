import React, { Component } from 'react'
import { Button, Input, Card } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'
import ReactPlayer from 'react-player'

import styles from './styles.scss'

class Login extends Component {

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
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
    }

    onSubmit(e) {
        e.preventDefault();

        const email = encodeURIComponent(this.state.user.email);
        const password = encodeURIComponent(this.state.user.password);
        const formData = `email=${email}&password=${password}`;

        // create an AJAX request (This should probably done with Axios instead) 
        const xhr = new XMLHttpRequest();
        xhr.open('post', '/api/login');
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.responseType = 'json';
        xhr.addEventListener('load', () => {
            if (xhr.status === 200) {
                this.setState({
                    message: 'Successfully logged in!'
                })
            } else {
                this.setState({
                    message: 'Unable to log in'
                })
            }
        });
        xhr.send(formData);
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
            <form className="Login" action="/" onSubmit={this.onSubmit}>
                <ReactPlayer id="video_back" url='https://youtu.be/q2fIWB8o-bs?t=16m6s' playing config={{
                    youtube: {
                      preload: true
                    }
                  }} width="108%" height="102%"/>
                <Card className="Login__content">
                    <div>
                        <h1 id="title">Login</h1>
                        <Input label="Email" onChange={this.onChangeEmail} />
                        <br/><br/>
                        <Input label="Password" onChange={this.onChangePassword} />
                        <br/><br/>

                        <p>{this.state.message}</p>
                        <Input id="register_submit" type="submit" />
                        <h4>No account yet? Click <Link to="/register">here</Link> to Register!</h4>

                        {this.state.message == 'Successfully logged in!' ? (
                            <Link to="/main">
                            <p>Go to Dashboard</p>
                            </Link>
                        ) : (
                            <div>
                            </div>
                        )}

                        
                        <br />
                    </div>
                </Card>
            </form>
    )
}
}

export default Login
