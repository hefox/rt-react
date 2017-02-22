/**
 * Return data about galleries, current stored in static diretory.
 */


var axios = require('axios');
var currentBaseName = 'http://localhost:3030/';

// Fetch galleries information
class GalleriesService  {
  allAlbums = {};
  loadedAlbums = {};
  categories = {};
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
        axios.get(currentBaseName + 'api/galleries/stub/' + stub).then(function(response) {
          response.data.date = new Date(response.data.date);
          resolve(response.data);
        })
      });
    }
    return this.loadedAlbums[stub];
  }
  // Retrieve tags.
  getCategories(label) {
    if (!this.categories[label]) {
      this.categories[label] = new Promise(function(resolve, reject) {
        axios.get(currentBaseName + 'api/galleries/' + label).then(function(response) {
          resolve(response.data);
        })
      });
    }
    return this.categories[label];
  }
}

export default new GalleriesService();