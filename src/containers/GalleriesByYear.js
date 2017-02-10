import React from 'react'
import GalleriesServiceInstance from 'services/galleries'
import { GalleriesByYear } from 'components'

class GalleriesByYearContainer extends React.Component {
  state = {gallery: {}, galleries: []};

  componentDidMount() {
    var that =  this;
    GalleriesServiceInstance.getGallery(this.props.stub).then(function(gallery) {
      var year = gallery.date.getYear();
      if (year) {
        GalleriesServiceInstance.getGalleries().then(function(albums) {
          var galleries = [];
          for (var i in albums) {
            if (albums[i].date.getYear() == year) {
              galleries.push(albums[i]);
            }
          }
          galleries.sort(function (a, b) {return b.date > a.date ? 1 : -1});
          that.setState({gallery: gallery, galleries: galleries})
        });
      }
    });
  }

  render() {
    return (<GalleriesByYear gallery={this.state.gallery} galleries={this.state.galleries} />);
  }
}


export default GalleriesByYearContainer