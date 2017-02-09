import React from 'react'
import { Link } from 'react-router'
import { Dropdown, Input } from 'react-toolbox';
import { List, ListItem, ListSubHeader } from 'react-toolbox/lib/list';
import { addQuery, removeQuery } from 'utils/query';

class GalleryList extends React.Component {
  constructor(props) {
    super(props);
    var newState = {year: new Date().getFullYear()};
    // Inherit the current query params.
    if (props.query) {
      Object.assign(newState, props.query);
    }
    this.state = this.getStatefulGalleries(props, newState);
  }

  // Filter galleries by searched properties
  getStatefulGalleries(props, newState, updateQuery) {
    // newState takes priority, then this.state is checked, then default.
    var year = newState && newState.hasOwnProperty('year') ? parseInt(newState.year) :
      (this.state && this.state.year ? this.state.year : null);
    var month = year ? (newState && newState.hasOwnProperty('month') ? newState.month :
      (this.state && this.state.month ? this.state.month : 0)) : 0;
    var search = newState && newState.hasOwnProperty('search') ? newState.search :
      (this.state && this.state.search ? this.state.search : '');
    var searchLower = search ? search.toLowerCase() : null;


    var albums = [], years = [], months = [];
    // Find galleries that match the search.
    for (var i in props.galleries) {
      var galleryYear = props.galleries[i].date.getFullYear();
      var galleryMonth = props.galleries[i].date.getMonth();
      // Filter by search if provided.
      var matchesSearch = (!searchLower || props.galleries[i].name.toLowerCase().indexOf(searchLower) > -1);
      if ((!year || galleryYear == year) && (!month || galleryMonth+1 == month) && matchesSearch) {
        albums.push(props.galleries[i]);
      }
      // Add Month if part of year & search
      if (year && galleryYear == year && matchesSearch) {
        var monthKey = props.galleries[i].date.getMonth();
        if (!months[monthKey]) {
          months[monthKey+1] = {value: monthKey+1, label: this.printMonthName(monthKey)}
        }
      }
      // Add the years value if not set already.
      if (!years[galleryYear]) {
        years[galleryYear] = { value: galleryYear.toString(), label: galleryYear.toString()};
      }
    }
    // Sort by most recent years.
    years = years.filter(n => true);
    years.push({value: '', label: 'All Years'});
    years.reverse();
    // Sort by date.
    albums.sort(function (a, b) {return b.date > a.date ? 1 : -1});
    if (months) {
      months[0] = {value: 0, label: 'All Months'};
      months = months.filter(n => true);
    }

    // Save the state via query params.
    if (updateQuery) {
      for (var statekey in newState) {
        if (!newState[statekey]) {
          delete newState[statekey];
          removeQuery(statekey)
        }
      }
      if (newState) {
        addQuery(newState)
      }
    }
    return {
      year: year ? year.toString() : '',
      galleries: albums,
      years: years,
      search: search,
      month: parseInt(month),
      months: months,
    };
  }
  printMonthName (number) {
    var monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    return monthNames[number];
  }

  componentWillReceiveProps = (nextProps) => {
    // Load new data when the dataSource property changes.
    if (nextProps.galleries.length !== this.props.galleries.length) {
      this.setState(this.getStatefulGalleries(nextProps));
    }
  }

 handleSearchChange = (search) => {
    this.setState(this.getStatefulGalleries(this.props, {search: search}, true));
  };

  handleYearChange = (year) => {
    this.setState(this.getStatefulGalleries(this.props, {year: year}, true));
  };

  handleMonthChange = (month) => {
    this.setState(this.getStatefulGalleries(this.props, {month: month}, true));
  };


  formatGalleryDate = (date) => {
    return '('
      + (date.getMonth()+1)
      + '/'
      + (date.getDate())
      + '/'
      + date.getFullYear()
      + ')';
  }

  printMonthHeader(date, headers) {
    var month = date.getMonth();
    if (!headers[month]) {
      headers[month] = true;
      return (
        <ListSubHeader caption={this.printMonthName(month)} />
      );
    }
    return;
  }

  render() {
    var that = this;
    var headers = {};
    return (
      <section >
        <div className="gallery-list__form">
          <Dropdown
            auto
            onChange={that.handleYearChange}
            source={that.state.years}
            value={that.state.year}
            className="gallery-list__form-item allery-list__form-item--years"
          />
          {parseInt(this.state.year) > 0 && this.state.months.length > 2 &&
            <Dropdown
              auto
              onChange={that.handleMonthChange}
              source={that.state.months}
              value={that.state.month}
              className="gallery-list__form-item allery-list__form-item--months"
            />
          }
          <Input type='text' value={this.state.search} label='Search' hint='Search Albums' onChange={this.handleSearchChange} icon='search'  className="gallery-list__form-item allery-list__form-item--search"/>
        </div>
        <List selectable ripple>
          <ListSubHeader caption={that.state.year} />
          {that.state.galleries.map((gallery) =>
            <span key={gallery.stub}>
              {this.printMonthHeader(gallery.date, headers)}
              <ListItem
                caption={gallery.name}
                legend={that.formatGalleryDate(gallery.date)}
                to={"galleries/" + gallery.stub}
              />
            </span>
          )}
        </List>
      </section>
    );
  }
}


export default GalleryList
