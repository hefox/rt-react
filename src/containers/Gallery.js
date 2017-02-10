import React from 'react'
import GalleriesServiceInstance from 'services/galleries'
import { GalleryDetail } from 'components'
//import { axios } from 'axios'

class GalleryContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {gallery: {}};
  }

  componentDidMount() {
    this.setStateByStub(this.props.stub);
  }

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.stub != this.props.stub) {
      this.setStateByStub(nextProps.stub);
    }
  }

  setStateByStub(stub) {
    GalleriesServiceInstance.getGallery(stub).then(function(gallery) {
      this.setState({gallery: gallery})
    }.bind(this));
  }

  render() {
    return (<GalleryDetail gallery={this.state.gallery} query={this.props.query} />);
  }
}


export default GalleryContainer