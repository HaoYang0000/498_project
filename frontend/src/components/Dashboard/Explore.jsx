import React, { Component } from 'react'
import { Label,Input, Button, Card, Icon, Popup} from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import axios from 'axios'
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
            stories: []
        }

        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeText = this.onChangeText.bind(this);
    }

    componentDidMount() {
        axios.get('/api/get_stories').then((res) => {
            console.log(res);
            this.setState({
                stories: res.data.data
            })
        }).catch( (err) => {
            this.setState({
                stories: res.data.data
            })
        })
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


    onSubmit(e) {
        e.preventDefault();
        //CHANGE-FONT-END
        const title = encodeURIComponent(this.state.story.title);
        //CHANGE-FONT-END
        const text = encodeURIComponent(this.state.story.text);


        //CHANGE-FONT-END
        const formData = `title=${title}&text=${text}`;

        axios.post('/api/create_new_story', {
            title: title,
            text: text,
          })
          .then(res => {
            this.state.story
            if(res.status == 200){
                var newArray = this.state.stories;  
                newArray.push({"title":title,"text":text});   
                this.setState({
                        story: newArray,
                        message: 'Successfully create!'
                    });
            } else {
                this.setState({
                     message: 'Unable to create!'
                 });
            }
          })
          .catch(function (error) {
            console.log("error" + error);
        });

        // // create an AJAX request (This should probably done with Axios instead) 
        // const xhr = new XMLHttpRequest();
        // //CHANGE-BACK-END
        // xhr.open('post', '/api/create_new_story');
        // xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        // xhr.responseType = 'json';
        // xhr.addEventListener('load', () => {
        //     if (xhr.status === 200) {
        //         this.setState({
        //             message: 'Successfully create!'
        //         })
        //     } else {
        //         this.setState({
        //             message: 'Unable to create!'
        //         })
        //     }
        // });
        // xhr.send(formData);
    }

    render() {
        return(
            <div>
                <Nav/>
                <div id="storyhome">
                    <h1>Story Line</h1>                     
                            {this.state.stories.map((idx, number) =>
                                <div className="ui raised card" id="storycard">
                                    <div id="content">
                                            <br />
                                            <h1>{idx.title}</h1>
                                            <br />
                                            <p>ID: {number}</p>
                                            <p>{idx.text}</p>
                                            <br />
                                    </div>
                                    <div id="extra content">
                                        <div class="right floated author explore_img">
                                                  <img class="ui avatar image" src="https://semantic-ui.com/images/avatar/small/jenny.jpg" />Matt
                                        </div>
                                    </div>
                                </div>
                            )}
                </div>

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

                <Popup
                    trigger={   
                                <Button id="post"  color="pink" size="massive" animated="fade" onClick={this.createNewStory}>
                                    <Button.Content visible>New Story!</Button.Content>
                                    <Button.Content hidden>
                                        <Icon name="paw"/>
                                    </Button.Content>
                                </Button>
                            }
                    content={
                                <form className="new_story" action="/" onSubmit={this.onSubmit}>
                                    <div>
                                        <br/>
                                        <Label>Title</Label>
                                        <br/>
                                        <br/>
                                        <Input id="title" onChange={this.onChangeTitle}/>
                                            <br/><br/>
                                        <Label>Text</Label>
                                        <br/><br/>
                                        <Input id="text" onChange={this.onChangeText}/>
                                            <br/><br/>
                                        <Input type="submit" />
                                        <br />
                                    </div>
                                </form>
                            }
                    on='click'
                    position='top right'
                 />
            </div>

        )
    }
}

export default Explore
