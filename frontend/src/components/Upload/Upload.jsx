import React, { Component } from 'react'
import { Button, Card, img, Image } from 'semantic-ui-react'
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
            type:this.props.type
        };
    }

    componentDidMount() {
      //For profile picture
        if(this.state.type == "Profile"){

          axios.get('/api/get_profile_image').then((res) => {
                console.log(res.data.image)
                this.setState({
                    imagePreviewUrl: res.data.image.path
                })
            }).catch( (err) => {

            });

        }
        //For explore picture or blah
        else{


        }
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

                        <input id="profile_input" type="file"
                          name = "file"
                          onChange = {
                            (e) => this._handleImageChange(e)
                          }/>
                        <Button type = "submit"> Upload Image</Button>
                        </Card.Content>
                        </Card>
                        <input type = "hidden"
                        name = "type"
                        value={this.state.type}/>
                        </form>
                        </div>
                    )
                }
            }

            export default Upload
