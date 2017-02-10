import React from 'react';
import ImageGallery from 'react-image-gallery';
import Lightbox from 'react-images';
import Switch from 'react-toolbox/lib/switch';

class GalleryDetail extends React.Component {
  constructor (props) {
		super(props);

  // Copied from example https://github.com/jossmac/react-images/blob/master/examples/src/components/Gallery.js
		this.closeLightbox = this.closeLightbox.bind(this);
		this.gotoNext = this.gotoNext.bind(this);
		this.gotoPrevious = this.gotoPrevious.bind(this);
		this.gotoImage = this.gotoImage.bind(this);
		this.handleClickImage = this.handleClickImage.bind(this);
		this.openLightbox = this.openLightbox.bind(this);
	}
  state = {
    switch_view: false,
    lightboxIsOpen: false,
		currentImage: 0,
  };

  handleChange = (field, value) => {
    this.setState({...this.state, [field]: value});
  };


	openLightbox (index, event) {
		event.preventDefault();
		this.setState({
			currentImage: index,
			lightboxIsOpen: true,
		});
	}
	closeLightbox () {
		this.setState({
			currentImage: 0,
			lightboxIsOpen: false,
		});
	}
	gotoPrevious () {
		this.setState({
			currentImage: this.state.currentImage - 1,
		});
	}
	gotoNext () {
		this.setState({
			currentImage: this.state.currentImage + 1,
		});
	}
	gotoImage (index) {
		this.setState({
			currentImage: index,
		});
	}
	handleClickImage () {
		if (this.state.currentImage === this.props.images.length - 1) return;

		this.gotoNext();
	}

  render() {
    var that = this;
    var images = [];
    var view;
    if (this.props.gallery.images) {
      var base = "http://richtrove.com/" + this.props.gallery.stub.replace(/--/, '/') + '/';
      for (var key in this.props.gallery.images) {
        if (this.state.switch_view) {
          images.push({
            thumbnail: base + this.props.gallery.images[key],
            original: base + this.props.gallery.images[key].replace('thumbnails/', 'images/'),
          });
        }
        else {
          images.push({
            thumbnail: base + this.props.gallery.images[key],
            src: base + this.props.gallery.images[key].replace('thumbnails/', 'images/'),
          });
        }
      }
    }
    if (this.state.switch_view) {
      view = (
        <ImageGallery
          items={images}
          slideInterval={2000}
          onImageLoad={this.handleImageLoad}
          thumbnailPosition="left"
          />
      );
    }
    else {
      var targetWidth=90;
      view = (
        <div>
            {images.map((image, i) =>
              <div key={image.thumbnail} className="gallery-detail-grid__item">
                <a href={image.src}  onClick={(e) => this.openLightbox(i, e)} className="gallery-detail-grid__link">
                  <img src={image.thumbnail} className="gallery-detail-grid__image"/>
                </a>
              </div>
            )}
          <Lightbox
            images={images}
            currentImage={this.state.currentImage}
  					isOpen={this.state.lightboxIsOpen}
  					onClickImage={this.handleClickImage}
  					onClickNext={this.gotoNext}
  					onClickPrev={this.gotoPrevious}
  					onClickThumbnail={this.gotoImage}
  					onClose={this.closeLightbox}
          />
        </div>
      );
    }
    return (
      <section>
        <h1>{that.props.gallery.name}</h1>
        <Switch
          checked={this.state.switch_view}
          label="Carousel"
          onChange={this.handleChange.bind(this, 'switch_view')}
          />
        {view}
      </section>
    );
  }
}


export default GalleryDetail
