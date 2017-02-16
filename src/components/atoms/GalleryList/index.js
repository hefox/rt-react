/**
 * Display a list of galleries filtered by year/month/keyword.
 */

import React from 'react'
import { Link } from 'react-router'
import { Dropdown, Input } from 'react-toolbox';
import { List, ListItem, ListSubHeader } from 'react-toolbox/lib/list';
import { addQuery, removeQuery } from 'utils/query';

class GalleryList extends React.Component {
  galleryKey = '_id';
  constructor(props) {
    super(props);
    // Inherit the current query params.
    var newState = {};
    if (props.query) {
      Object.assign(newState, props.query);
    }
    this.state = this.getStatefulGalleries(props, newState);
  }

  // Filter galleries by searched properties
  getStatefulGalleries(props, newState, updateQuery) {
    // newState takes priority, then this.state is checked, then default.
    var month = props.year ? (newState && newState.hasOwnProperty('month') ? newState.month :
      (this.state && this.state.month ? this.state.month : 0)) : 0;
    var search = newState && newState.hasOwnProperty('search') ? newState.search :
      (this.state && this.state.search ? this.state.search : '');
    var searchLower = search ? search.toLowerCase() : null;


    var albums = [], months = [];
    // Find galleries that match the search.
    for (var i in props.galleries) {
      var galleryMonth = props.galleries[i].date.getMonth();
      // Filter by search if provided.
      var matchesSearch = (!searchLower || props.galleries[i].name.toLowerCase().indexOf(searchLower) > -1);
      if ((!month || galleryMonth+1 == month) && matchesSearch) {
        albums.push(props.galleries[i]);
      }
      // Add Month if part of year & matches search
      if (props.year && matchesSearch) {
        var monthKey = props.galleries[i].date.getMonth();
        if (!months[monthKey]) {
          months[monthKey+1] = {value: monthKey+1, label: this.printMonthName(monthKey)}
        }
      }
    }
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
      galleries: albums,
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
      this.setState(this.getStatefulGalleries(nextProps, this.state));
    }
  }

 handleSearchChange = (search) => {
    this.setState(this.getStatefulGalleries(this.props, {search: search}, true));
  };

  handleYearChange = (year) => {
    this.props.updateGalleries(year);
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

    // Filter by year @todo likely need an api call to find out range
    // or include it in current api call as top level data.
    var years = [];
    for (var year = new Date().getFullYear(); year >= 2000 ;year--) {
      years.push({ value: year.toString(), label: year.toString()});
    }
    var year = that.props.year ? that.props.year.toString() : '';
    years.unshift({value: '', label: 'All Years'});
    var yearDropdown = (<Dropdown
      auto
      onChange={that.handleYearChange}
      source={years}
      value={year}
      className="gallery-list__form-item allery-list__form-item--years"
    />);

    // Filter by month
    var monthDropdown = that.props.year && that.props.year > 0 && this.state.months.length > 2 ? (
      <Dropdown
        auto
        onChange={that.handleMonthChange}
        source={that.state.months}
        value={that.state.month}
        className="gallery-list__form-item allery-list__form-item--months"
      />
    ) : '';
    // Search titles
    var searchInput = (<Input type='text' value={this.state.search} label='Search' hint='Search Albums' onChange={this.handleSearchChange} icon='search'  className="gallery-list__form-item allery-list__form-item--search"/>);

    return (
      <section >
        <div className="gallery-list__form">
          {yearDropdown}
          {monthDropdown}
          {searchInput}
        </div>
        <List selectable ripple>
          <ListSubHeader caption={year} />
          {that.state.galleries.map((gallery) =>
            <span key={gallery[that.galleryKey]}>
              {this.printMonthHeader(gallery.date, headers)}
              <ListItem
                caption={gallery.title}
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
