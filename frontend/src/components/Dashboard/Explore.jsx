import React, { Component } from 'react'
import { Label,Input, Button, Card, Icon, Popup, Divider, Transition, Header, Image} from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import styles from './styles.scss'
import Nav from '../Nav/Nav.jsx'
import Upload from '../Upload/Upload.jsx'

class Explore extends Component {
    //CHANGE-FONT-END
    constructor(props) {
        super(props);

        this.state = {
            story: {
                title: '',
                text: '',
                author: '',
                _authorid: ''
            },
            visible: true,
            message: '',
            stories: [],
            currentUser: {
                id:'',
                email: ''
            },
            image:'',
            backgroundPicture:''
        }
        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeText = this.onChangeText.bind(this);
        this.logOut = this.logOut.bind(this);
        this.delete = this.delete.bind(this);
    }

    componentDidMount() {
        this.setState({
             image: 'https://laurenconrad.com/wp-content/uploads/2015/08/JenBPeters_Flamingos1.jpg',
             backgroundPicture:'http://www.4usky.com/data/out/35/164293250-flamingo-wallpapers.jpg'
         })
        axios.get('/api/get_stories').then((res) => {
            console.log(res);
            this.setState({
                stories: res.data.data
            })
        }).catch( (err) => {
            this.setState({
                stories: res.data.data
            })
        });

        axios.get('/api/get_current_user').then((res) => {
            this.setState({
                currentUser: {
                id:res.data.user._id,
                email:res.data.user.email
            }
            })
        }).catch( (err) => {
            this.setState({
                id:res.data.user.id,
                currentUser: {email:res.data.user.email}
            })
        });
    }

    logOut() {
        axios.get('/api/logout').then( (res) => {
            console.log("Logged out");
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

    delete(e){
        console.log(e.target.id)
        axios.post('/api/delete_story', {
            id: e.target.id
        })
        .then(res => {
           if(res.status == 200){
               window.location.reload();
            } else {
               window.location.reload();
            }
          })
          .catch(function (error) {
            console.log("error" + error);
        });
    }


    onSubmit(e) {
        e.preventDefault();
        //CHANGE-FONT-END
        const title = this.state.story.title;
        //CHANGE-FONT-END
        const text = this.state.story.text;
        const author = this.state.currentUser.email;
        const authorid = this.state.currentUser.id;

        axios.post('/api/create_new_story', {
            title: title,
            text: text,
            author: author,
            authorid: authorid
          })
          .then(res => {
            console.log("nowjaoiejofijaowif");
            this.state.story
            if(res.status == 200){
                var newArray = this.state.stories;
                newArray.push({"title":title, "text":text, "author":author, "_authorid":authorid});
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
    }

    render() {
        const { visible } = this.state;

        var currentUser_id = this.state.currentUser.id;

        
        return(
            <div className="explore_wholeBody">
                <Nav/>
                <div id="storyhome">
                    <div>
                        <h1> Story Line </h1>
                        {this.state.stories.map((idx, number) =>
                            <div className="ui raised card" id="storycard">
                                <div id="content">
                                        <br />
                                        <h1>{idx.title}</h1>
                                        <br />
                                        <p>{idx.text}</p>
                                        <br />
                                </div>
                                {idx.image_path == null && idx._authorid == this.state.currentUser.id ? (
                                    <div id="story_image_upload">
                                        <Header as='h4'>Adda Picture</Header>
                                        <Upload type={'Story'} story_id={idx._id}/>
                                    </div>
                                ) : (
                                    <div>
                                        <Image className="profile_img" src={idx.image_path}/> 
                                    </div>
                                )}

                                {idx._authorid == this.state.currentUser.id ? (
                                    <Button onClick={this.delete} id={idx._id}>Delete</Button>
                                ) : (
                                   <div></div>
                                )}
                              
                                <div id="extra content">
                                    <div class="right floated author explore_img">
                                              <h3>Author</h3>
                                              <p> {idx.author}</p>
                                    </div>
                                </div>
                            </div>
                        )}
                </div>
                <div>
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
                                <Button id="post"  color="pink" size="massive" onClick={this.createNewStory}>
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
                    position='top'
                 />
            </div>
            </div>
            </div>
        )
    }
}

export default Explore
