var axios = require('axios');

// Fetch galleries information
class GalleriesService  {
  allAlbums;
  loadedAlbums = {}
  getGalleries() {
    if (!this.allAlbums) {
      this.allAlbums = new Promise(function(resolve, reject) {
        axios.get('/api/albums.json').then(function(response) {
          var albums = [];
          var seen = {};
          for (var i in response.data) {
            if (!seen[response.data[i].stub]) {
              seen[response.data[i].stub] = true;
              albums.push({
                name: response.data[i].name,
                date: new Date(response.data[i].date),
                stub: response.data[i].stub.replace(/\//g,'--')
              })
            }
          }
          resolve(albums);
        });
      });
    }
    return this.allAlbums;
  }
  getGallery(stub) {
    if (!this.loadedAlbums[stub]) {
      this.loadedAlbums[stub] = new Promise(function(resolve, reject) {
        axios.get('/api/albums/' + stub + '.json').then(function(response) {
          response.data.date = new Date(response.data.date);
          resolve(response.data);
        })
      });
    }
    return this.loadedAlbums[stub];
  }
}

export default new GalleriesService();