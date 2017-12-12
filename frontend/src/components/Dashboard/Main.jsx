import React, { Component } from 'react'
import { Sidebar, Segment, Button, Menu, Image, Icon, Header, Card, Input } from 'semantic-ui-react'
import { Link } from 'react-router-dom'


import axios from 'axios'
import styles from './styles.scss'
import Nav from '../Nav/Nav.jsx'

class Main extends Component {
    constructor() {
        super();
        this.state = {
            currentUser: {
                id:'',
                email: ''
            },
            visible: false,
            filter: {
                user_gender: '',
                user_age_min: '',
                user_age_max:'',
                user_prefered_species:''
            },
            cur_desired_user: {},
            filteredUser: [],
            imagePreviewUrl: '',
            queue: []  //霖霖 added
        }

        //霖霖 added
        this.like = this.like.bind(this);
        this.dislike = this.dislike.bind(this);
        //霖霖 added
        this.toggleVisibility = () => this.setState({ visible: !this.state.visible });
        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeGender = this.onChangeGender.bind(this);
        this.onChangeMinAge = this.onChangeMinAge.bind(this);
        this.onChangeMaxAge = this.onChangeMaxAge.bind(this);
        this.onChangePetSpecies = this.onChangePetSpecies.bind(this);
    }

    componentDidMount() {
        axios.get('/api/get_current_user', {}).then((res) => {
            this.setState({
                currentUser: {
                id:res.data.user._id,
                email:res.data.user.email
                }
            })
        }).catch((err) => {
            this.setState({
                id:res.data.user.id,
                currentUser: {email:res.data.user.email}
            })
        });

        //霖霖 周五 12/10
        // if queue is empty, we need to add 100 more users
        if(this.state.queue) {
            // add users to stack
            axios.get('/api/populateQueue')
            .then((res) => {
                console.log("populating the queue");
                this.setState({queue: this.state.queue.concat(res.data.data)});   // res.data is a list of object looking like {"_id": "5a2a0762782654cb6984c4b7"}
                console.log("queue after populating", this.state.queue);
            }).then((res) => {
                this.setState({cur_desired_user: this.state.queue.shift()});
            });
        }
        
        axios.get('/api/get_profile_image').then((res) => {
                 console.log(res.data.image)
                 this.setState({
                     imagePreviewUrl: res.data.image.path
                 
                 })
             }).catch( (err) => {
         });
    }


    //霖霖 added
    like() {
        var cur_other_id = this.state.cur_desired_user._id;
        //console.log("cur_desired_user", cur_other_id);
        // we need to check if the other user also liked us
        axios.put('/api/like', {
           user_id: this.state.currentUser.id,
           other_user_id: cur_other_id
       })
       .then((res) => {
           let new_queue = this.state.queue;
           let next = new_queue.shift();
           this.setState({cur_desired_user: next});
           this.setState({queue: new_queue});
       });

       // if queue is empty, we need to add 100 more users
       if(this.state.queue) {
           // add users to stack
           axios.get('/api/populateQueue')
           .then((res) => {
               console.log("populating the queue");
               this.setState({queue: this.state.queue.concat(res.data.data)});   // res.data is a list of object looking like {"_id": "5a2a0762782654cb6984c4b7"}
               console.log("queue after populating", this.state.queue);
           }).then((res) => {
               this.setState({cur_desired_user: this.state.queue.shift()});
           });
       }
   }


   dislike() {
       let new_queue = this.state.queue;
       let next = new_queue.shift();
       this.setState({cur_desired_user: next});
       this.setState({queue: new_queue});

       // if queue is empty, we need to add 100 more users
       if(this.state.queue) {
           // add users to stack
           axios.get('/api/populateQueue')
           .then((res) => {
               console.log("populating the queue");
               this.setState({queue: this.state.queue.concat(res.data.data)});   // res.data is a list of object looking like {"_id": "5a2a0762782654cb6984c4b7"}
               console.log("queue after populating", this.state.queue);
           }).then((res) => {
               this.setState({cur_desired_user: this.state.queue.shift()});
           });
       }
   }


    onChangeGender(e) {
        const filter = this.state.filter;
        filter.user_gender = e.target.value;
        this.setState({
            filter
        });
    }
    onChangeMinAge(e) {
        const filter = this.state.filter;
        filter.user_age_min = e.target.value;
        this.setState({
            filter
        });
    }

    onChangeMaxAge(e) {
        const filter = this.state.filter;
        filter.user_age_max = e.target.value;
        this.setState({
            filter
        });
    }

    onChangePetSpecies(e) {
        const filter = this.state.filter;
        filter.user_prefered_species = e.target.value;
        this.setState({
            filter
        });
    }

    onSubmit(e) {
        e.preventDefault();
        axios.get('/api/get_current_user').then(res => {
            
            var userId = res.data;
            axios.put('api/main/filter/updateUserPreference', this.state.filter
            ).then((res) => {
                axios.get('api/populateQueue').then(res => {
                    this.setState({
                        queue: res.data.data
                    });

               }).then ((res) => {
                    if (this.state.filteredUser != null) {
                        this.state.cur_desired_user = this.state.queue.shift();
                    }
                })
            }) .catch(function (error) {
                console.log(error);
            });
        })
    }


    render() {
        const { visible } = this.state;

        return(
            <div className="Mainpage">
                <Nav/>
                <div id="filter-div">
                    <Sidebar.Pushable>
                        <Sidebar as={Menu} animation='push' width='thin' visible={visible} icon='labeled' vertical inverted id="main-sidebar">
                            <form className="filter-main" action="" onSubmit={this.onSubmit}>
                              <Menu.Item name='map'>
                                <Icon name='map'/>
                                Prefered Gender
                                  <input name="user_gender" onChange={this.onChangeGender} />
                              </Menu.Item>
                              <Menu.Item name='users'>
                                  <Icon name='users' />
                                  Prefered minimum age
                                  <input name="user_age_min" onChange={this.onChangeMinAge} />
                              </Menu.Item>
                              <Menu.Item name='users'>
                                  <Icon name='users' />
                                  Prefered maximum age
                                  <input label="user_age_max" onChange={this.onChangeMaxAge} />
                              </Menu.Item>
                              <Menu.Item name='heterosexual'>
                                  <Icon name='heterosexual' />
                                  Prefered pet species
                                  <input name="user_prefered_species" onChange={this.onChangePetSpecies} />
                              </Menu.Item>
                              <input id="filter-submit" type="submit" />
                            </form>
                        </Sidebar>
                        <Sidebar.Pusher>
                            <div id="sidebar-but" onClick={this.toggleVisibility}><p>FILTER</p></div>
                        </Sidebar.Pusher>
                    </Sidebar.Pushable>
                </div>

                <div className="Home">

                    <div className='prepffered_user'>
                            <Card.Group>
                                <div className="cardWrapping">
                                    <Card>
                                        <Card.Content>
                                            <Image className="profile_img" src={this.state.imagePreviewUrl}/>
                                            <Card.Header>
                                                <br />
                                                <p>email: {this.state.cur_desired_user.email}</p>
                                                <p> age:{this.state.cur_desired_user.age} </p>
                                            </Card.Header>
                                            <Card.Meta>
                                                <p>_id: {this.state.cur_desired_user._id}</p>
                                                <br />
                                            </Card.Meta>
                                        </Card.Content>

                                    </Card>
                                </div>
                            </Card.Group>
                        </div>
                    <br />
                    <button id="like_Button" class="ui positive button" role="button" id="main-but" onClick={this.like}> Like </button>
                    <button class="ui negative button" role="button" id="main-but" onClick={this.dislike}> Na.. </button>
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
            </div>
        )
    }
}

export default Main
