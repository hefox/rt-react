import React from 'react';
import GalleriesServiceInstance from 'services/galleries';
import { GalleryList } from 'components';
import { addQuery, removeQuery } from 'utils/query';

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
    GalleriesServiceInstance.getGalleries(year).then(function(albums) {
      if (year != new Date().getFullYear()) {
        addQuery({year: year})
      }
      else {
        removeQuery('year');
      }
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