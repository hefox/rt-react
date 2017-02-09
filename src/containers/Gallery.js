import React from 'react'
var axios = require('axios');
import { GalleryDetail } from 'components'
//import { axios } from 'axios'

class GalleryContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {gallery: {}};
  }

  componentDidMount() {
    axios.get('/api/albums/' + this.props.stub + '.json').then(function(response) {
      this.setState({gallery: response.data})
    }.bind(this));
  }

  render() {
    return (<GalleryDetail gallery={this.state.gallery} />);
  }
}


export default GalleryContainer