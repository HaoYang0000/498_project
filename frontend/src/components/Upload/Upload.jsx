import React, { Component } from 'react'
import { Button, Card, img, Image, Label } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import axios from 'axios'

class Upload extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUser: {
                id:'',
                email: ''
            },
            file: '',
            imagePreviewUrl: '',
            type:this.props.type,
            story_id: this.props.story_id
        };
    }

    componentDidMount() {
      //For profile picture
        if(this.state.type == "Profile"){

          axios.get('/api/get_profile_image').then((res) => {
                 if(res.status == 200){
                    this.setState({
                        imagePreviewUrl: res.data.image.path
                    })
                }
            }).catch( (err) => {
                this.setState({
                     imagePreviewUrl: "uploads/random_"+(Math.floor(Math.random() * 6) + 1)+".png"
                 });
            });

        }
        //For explore picture or blah
        else {}
    }

    _handleImageChange(e) {
        e.preventDefault();

        let reader = new FileReader();
        let file = e.target.files[0];

        reader.onloadend = () => {
            this.setState({
                file: file,
                imagePreviewUrl: reader.result
            });
        }

        reader.readAsDataURL(file)
    }

    render() {
      let imageType = null;
    if (this.state.type == "Profile") {
      imageType = <img className="profile" />;
    }
    else {
      imageType = <img className="explore" />;
    }
            let {
                imagePreviewUrl
            } = this.state;
            let $imagePreview = null;
            if (imagePreviewUrl) {
                $imagePreview = ( < Image src = {
                        imagePreviewUrl
                    } size="large"
                    />);
                }
                else {
                    $imagePreview = ( < div className = "previewText" > Please select an Image
                        for Preview < /div>);
                    }
                    return (
                        <div id="profile_id">
                        <form action = "/api/upload"
                        encType = "multipart/form-data"
                        method = "post" >

                        <Card centered>
                          {
                              $imagePreview
                          }
                        <Card.Content extra>
                        <Button.Group>
                        <label className="ui small pink button">
                        <input id="input_upload" type = "file"
                        name = "file"
                        onChange = {
                            (e) => this._handleImageChange(e)
                        }/>
                            Choose Photo
                        </label>
                            <Button.Or text='' />
                            <Button color="pink" size = "small" type = "submit" disabled = {!this.state.file}> Upload Image</Button>
                          </Button.Group>
                        </Card.Content>
                        </Card>
                        <input type = "hidden"
                        name = "type"
                        value={this.state.type}/>
                        <input type = "hidden"
                        name = "story_id"
                        value={this.state.story_id}/>
                        </form>
                        </div>
                    )
                }
            }

            export default Upload
