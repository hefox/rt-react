/**
 * Display a gallery.
 */

import React from 'react';
import ImageGallery from 'react-image-gallery';
import Lightbox from 'react-images';
import Switch from 'react-toolbox/lib/switch';
import { addQuery, removeQuery } from 'utils/query';

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
		var image = this.galleryHasImages(props.gallery) && props.query.image ? parseInt(props.query.image) : 0;
		this.state = {
      switch_view: props.query.switch_view ? true : false,
      lightboxIsOpen: image ? true : false,
  		currentImage: image,
    };
	}
	galleryHasImages(gallery) {
  	return gallery && gallery.images && gallery.images.length;
	}

  componentWillReceiveProps = (nextProps) => {
    // Load new data when the dataSource property changes.
    if (!this.galleryHasImages(this.props.gallery) && this.galleryHasImages(nextProps.gallery) && nextProps.query.image)  {
  		this.setState({
  			currentImage: parseInt(nextProps.query.image),
  			lightboxIsOpen: true,
  		});
    }
  }

  handleChange = (field, value) => {
		addQuery({[field]: value});
    this.setState({...this.state, [field]: value});
  };

	openLightbox (index, event) {
		event.preventDefault();
		addQuery({'image': index});
		this.setState({
			currentImage: index,
			lightboxIsOpen: true,
		});
	}
	closeLightbox () {
		removeQuery('image');
		this.setState({
			currentImage: 0,
			lightboxIsOpen: false,
		});
	}
	gotoPrevious () {
  	var currentImage = this.state.currentImage - 1;
		addQuery({'image': currentImage});
		this.setState({
			currentImage: currentImage,
		});
	}
	gotoNext () {
  	var currentImage = this.state.currentImage + 1;
		addQuery({'image': currentImage});
		this.setState({
			currentImage: currentImage,
		});
	}
	gotoImage (index) {
		addQuery({'image': index});
		this.setState({
			currentImage: index,
		});
	}
	handleClickImage () {
		if (this.state.currentImage === this.props.images.length - 1) return;

		this.gotoNext();
	}

  render() {
    // @todo Seperate into smaller components.
    var that = this;
    var images = this.galleryHasImages(this.props.gallery) ? this.props.gallery.images : [];
    var view;
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
      for (var key in images) {
        images[key]['original'] = images[key]['src'];
      }
      var targetWidth=90;
      // Make this it's own component.
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
