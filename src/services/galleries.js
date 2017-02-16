/**
 * Return data about galleries, current stored in static diretory.
 */


var axios = require('axios');
var currentBaseName = 'http://localhost:3030/';

// Fetch galleries information
class GalleriesService  {
  allAlbums = {};
  loadedAlbums = {}
  // Retrieve all the albums.
  getGalleries(year) {
    // Cache so only retrieved once.
    if (!this.allAlbums[year]) {
      this.allAlbums[year] = new Promise(function(resolve, reject) {
        var query = year ? '?year=' + year : '';
        axios.get(currentBaseName + 'api/galleries' + query).then(function(response) {
          for (var key in response.data.galleries) {
            response.data.galleries[key].date = response.data.galleries[key] ? new Date(response.data.galleries[key].date) : null;
          }
          console.log(response.data.galleries);
          resolve(response.data.galleries);
        });
      });
    }
    return this.allAlbums[year];
  }
  // Retrieve a specific gallery identified by distinct stub.
  getGallery(stub) {
    if (!this.loadedAlbums[stub]) {
      this.loadedAlbums[stub] = new Promise(function(resolve, reject) {
        axios.get(currentBaseName + 'api/galleries/' + stub + '.json').then(function(response) {
          response.data.date = new Date(response.data.date);
          var base = "http://richtrove.com/" + response.data.href + '/';
          for (var i in response.data.images) {
            var image = response.data.images[i];
            response.data.images[i] = {
              src: base + image.replace('thumbnails/', 'images/'),
              thumbnail: base + image,
            }
          }
          resolve(response.data);
        })
      });
    }
    return this.loadedAlbums[stub];
  }
}

export default new GalleriesService();