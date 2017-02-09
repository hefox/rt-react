import React from 'react';
import ImageGallery from 'react-image-gallery';


class GalleryDetail extends React.Component {

  render() {
    var that = this;
    var images = [];
    if (this.props.gallery.images) {
      var base = "http://richtrove.com/" + this.props.gallery.stub.replace(/--/, '/') + '/';
      for (var key in this.props.gallery.images) {
        images.push({
          thumbnail: base + this.props.gallery.images[key].replace('thumbnails/', 'images/'),
          original: base + this.props.gallery.images[key].replace('thumbnails/', 'images/'),
        });
      }
    }
    return (
      <section>
        <h1>{that.props.gallery.name}</h1>
        <ImageGallery
          items={images}
          slideInterval={2000}
          onImageLoad={this.handleImageLoad}
          thumbnailPosition="left"
          />
      </section>
    );
  }
}


export default GalleryDetail
