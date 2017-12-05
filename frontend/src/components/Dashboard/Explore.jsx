import React, { Component } from 'react'
import { Label,Input, Button, Card, Icon} from 'semantic-ui-react'
import { Link } from 'react-router-dom'

import styles from './styles.scss'
import Nav from '../Nav/Nav.jsx'

class Explore extends Component {

	//CHANGE-FONT-END
	constructor(props) {
	    super(props);

	    this.state = {
            story: {
                title: '',
                text: ''
            },
            message: '',
            users: []
        }

        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeText = this.onChangeText.bind(this);
  	}

  	//CHANGE-FONT-END
  	onChangeTitle(e) {
        const story = this.state.story;
        story.title = e.target.value;
        this.setState({
            story
        })
        console.log(story);
    }

    //CHANGE-FONT-END
    onChangeText(e) {
        const story = this.state.story;
        story.text = e.target.value;
        this.setState({
            story
        })
        console.log(story);
    }


	createNewStory(){



  		console.log(1111);
  		console.log(1111);
  		console.log(1111);

  	}

  	onSubmit(e) {
        e.preventDefault();
        //CHANGE-FONT-END
        const title = encodeURIComponent(this.state.story.title);
        //CHANGE-FONT-END
        const text = encodeURIComponent(this.state.story.text);
        //CHANGE-FONT-END
        const formData = `title=${title}&text=${text}`;
        console.log(title);
        console.log(text);

        // create an AJAX request (This should probably done with Axios instead) 
        const xhr = new XMLHttpRequest();
        //CHANGE-BACK-END
        xhr.open('post', '/api/create_new_story');
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.responseType = 'json';
        xhr.addEventListener('load', () => {
            if (xhr.status === 200) {
                this.setState({
                    message: 'Successfully create!'
                })
            } else {
                this.setState({
                    message: 'Unable to create!'
                })
            }
        });
        xhr.send(formData);
    }

    render() {
        return(
        	<div>
                <Nav/>

	            <div className="Home">
	                <h1>Story Line</h1>

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

                <Button id="post"  color="pink" size="massive" animated="fade" onClick={this.createNewStory}>
                    <Button.Content visible>New Story!</Button.Content>
                    <Button.Content hidden>
                        <Icon name="paw"/>
                    </Button.Content>
                    <p>{this.state.message}</p>
              	</Button>

              	<form className="new_story" action="/" onSubmit={this.onSubmit}>
		           	<div>
		               	<h1 >Title</h1>
		               	<Label>Title</Label>
		               	<Input id="title" onChange={this.onChangeTitle}/>
		                    <br/><br/>
		                <Label>Text</Label>
		               	<Input id="text" onChange={this.onChangeText}/>
		                	<br/><br/>
						<Input type="submit" />
						<br />
		           	</div>
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

export default Explore
