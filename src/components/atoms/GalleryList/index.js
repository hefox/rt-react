import React from 'react'
import { Link } from 'react-router'
import { Dropdown, Input } from 'react-toolbox';
import { List, ListItem, ListSubHeader } from 'react-toolbox/lib/list';



class GalleryList extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.getStatefulByYear(new Date().getFullYear(), props);
  }

  // Filter galleries by year.
  getStatefulByYear(year, props, search) {
    year = parseInt(year);
    var searchLower = search ? search.toLowerCase() : null;
    var albums = [], years = [];
    for (var i in props.galleries) {
      var galleryYear = props.galleries[i].date.getFullYear();
      if (galleryYear > 0 && galleryYear !== NaN) {
        if (galleryYear == year
          && (!searchLower || props.galleries[i].name.toLowerCase().indexOf(searchLower) > -1)) {
          albums.push(props.galleries[i]);
        }
        years[galleryYear] = { value: galleryYear.toString(), label: galleryYear.toString()};
      }
    }
    years = years.filter(n => true);
    years.reverse();
    albums.sort(function (a, b) {return b.date > a.date});
    return {
      year: year.toString(),
      galleries: albums,
      years: years,
      search: search
    };
  }

  componentWillReceiveProps = (nextProps) => {
    // Load new data when the dataSource property changes.
    if (nextProps.galleries.length !== this.props.galleries.length) {
      this.setState(this.getStatefulByYear(this.state.year, nextProps));
    }
  }

 handleSearchChange = (search) => {
   console.log('search', search)
    this.setState(this.getStatefulByYear(this.state.year, this.props, search));
  };

  handleChange = (year) => {
    this.setState(this.getStatefulByYear(year, this.props));
  };


  formatGalleryDate = (date) => {
    return date.toString() + '('
      + (date.getMonth()+1)
      + '/'
      + (date.getDate())
      + '/'
      + date.getFullYear()
      + ')';
  }

  render() {
    var that = this;
    return (
      <section>
        <Dropdown
          auto
          onChange={that.handleChange}
          source={that.state.years}
          value={that.state.year}
        />
        <Input type='text' value={this.state.search} label='Search' hint='Search Albums' onChange={this.handleSearchChange} icon='search' />
        <List selectable ripple>
          <ListSubHeader caption={that.state.year} />
          {that.state.galleries.map((gallery) =>
            <ListItem key={gallery.stub}
              caption={gallery.name}
              legend={that.formatGalleryDate(gallery.date)}
              to={"galleries/" + gallery.stub}
            />
          )}
        </List>
      </section>
    );
  }
}


export default GalleryList
