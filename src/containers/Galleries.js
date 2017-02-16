import React from 'react'
import GalleriesServiceInstance from 'services/galleries'
import { GalleryList } from 'components'

class GalleriesContainer extends React.Component {
  constructor(props) {
    super(props);
    var year = props.query.year ? props.query.year : new Date().getFullYear();
    this.state = {galleries: [], year: year};
  }

  componentDidMount() {
    this.getGalleries(this.state.year);
  }

  getGalleries(year) {
    console.log('get galleries', year);
    GalleriesServiceInstance.getGalleries(year).then(function(albums) {
      console.log('albums', albums);
      this.setState({
        year: year,
        galleries: albums
      })
    }.bind(this));
  }

  render() {
    return (<GalleryList
      galleries={this.state.galleries}
      query={this.props.query}
      year={this.state.year}
      updateGalleries={this.getGalleries.bind(this)}
      />);
  }
}


export default GalleriesContainer