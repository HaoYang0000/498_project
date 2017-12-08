import React, { Component } from 'react'
import { Sidebar, Segment, Button, Menu, Image, Icon, Header, Card, Input } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

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
                map: '',
                age: '',
                sex: ''
            },
            queue: []  //霖霖 added
        }

        //霖霖 added
        this.like = this.like.bind(this);
        this.dislike = this.dislike.bind(this);
        //霖霖 added

        this.toggleVisibility = () => this.setState({ visible: !this.state.visible });
        this.onSubmit = this.onSubmit.bind(this);
        this.onChangemap = this.onChangemap.bind(this);
        this.onChangeage = this.onChangeage.bind(this);
        this.onChangesex = this.onChangesex.bind(this);
    }

    componentDidMount() {
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

    //霖霖 added
    like() {
       // if queue is empty, we need to add 100 more users
       if(queue.length) {
           // add users to stack
           axios.get('/api/populateQueue')
           .then((res) => {
               this.setState({stack: res})
           })
       }
       cur_other_id = queue.shift();
       // we need to check if the other user also liked us
       axios.put('/api/like', {
           user_id: this.state.user_id,
           other_user_id: this.state.other_user_id
       })
       .then((res) => {

       })
   }

   //霖霖 added
   dislike() {
        // if stack is empty, we need to add 100 more users
        if(queue) {
            // add users to stack
        }
        var queue.pop()；
        // we need to check if the other user also liked us
    }


    onChangemap(e) {
        const filter = this.state.filter;
        filter.map = e.target.value;
        this.setState({
            filter
        })
    }

    onChangeage(e) {
        const filter = this.state.filter;
        filter.age = e.target.value;
        this.setState({
            filter
        })
    }

    onChangesex(e) {
        const filter = this.state.filter;
        filter.sex = e.target.value;
        this.setState({
            filter
        })
    }

    onSubmit(e) {
        e.preventDefault();
        console.dir(this.state.filter)
    }


    render() {
        const { visible } = this.state;

        return(
            <div>
                <Nav/>
                <div id="filter-div">
                    <Sidebar.Pushable>
                        <Sidebar as={Menu} animation='push' width='thin' visible={visible} icon='labeled' vertical inverted id="main-sidebar">
                            <form className="filter-main" action="" onSubmit={this.onSubmit}>
                              <Menu.Item name='map'>
                                <Icon name='map' />
                                Map
                                  <input label="map" onChange={this.onChangemap} />
                              </Menu.Item>
                              <Menu.Item name='users'>
                                  <Icon name='users' />
                                  Age
                                  <input label="age" onChange={this.onChangeage} />
                              </Menu.Item>
                              <Menu.Item name='heterosexual'>
                                  <Icon name='heterosexual' />
                                  Gender
                                  <input label="sex" onChange={this.onChangesex} />
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
                    <h1>PAIR PAIR PAIR</h1>

                    <div class="ui card">
                          <img class="ui image" src={'https://semantic-ui.com/images/avatar/large/jenny.jpg'} />
                          <div class="content">
                                <div class="header">Matthew</div>
                                <div class="meta">
                                    <span class="date">Joined in 2015</span>
                                </div>
                                <div class="description">Matthew is a musician living in Nashville.</div>
                          </div>
                            <div class="extra content">
                            <a>
                            <i aria-hidden="true" class="user icon"></i>22 Friends</a>
                          </div>
                    </div>
                    <button class="ui positive button" role="button" id="main-but"> Like </button>
                    <button class="ui negative button" role="button" id="main-but"> Na.. </button>
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
