import React from 'react'
import GalleriesServiceInstance from 'services/galleries'
import { GalleryList } from 'components'

class GalleriesContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {galleries: []};
  }

  componentDidMount() {
    GalleriesServiceInstance.getGalleries().then(function(albums) {
      this.setState({galleries: albums})
    }.bind(this));
  }

  render() {
    return (<GalleryList galleries={this.state.galleries} query={this.props.query} />);
  }
}


export default GalleriesContainer