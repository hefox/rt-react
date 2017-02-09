import React from 'react'
var axios = require('axios');
import { GalleryList } from 'components'
//import { axios } from 'axios'

class GalleriesContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {galleries: []};
  }

  componentDidMount() {
    axios.get('/api/albums.json').then(function(response) {
      var albums = [];
      var seen = {};
      for (var i in response.data) {
        if (!seen[response.data[i].stub]) {
          seen[response.data[i].stub] = true;
          albums.push({
            name: response.data[i].name,
            date: new Date(response.data[i].date),
            stub: response.data[i].stub.replace('/','--')
          })
        }
      }
      this.setState({galleries: albums})
    }.bind(this));
  }

  render() {
    return (<GalleryList galleries={this.state.galleries} query={this.props.query} />);
  }
}


export default GalleriesContainer