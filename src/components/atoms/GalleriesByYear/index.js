import React from 'react'
import { Link } from 'react-router'
import { Dropdown, Input } from 'react-toolbox';
import { List, ListItem, ListSubHeader } from 'react-toolbox/lib/list';
import { addQuery, removeQuery } from 'utils/query';

class GalleriesByYear extends React.Component {

  render() {
    var that = this;
    return (
      <section>
        <ul className="sidebar-list">
          {that.props.galleries.map((gallery) =>
            <li key={gallery.stub} className="sidebar-list__item">
              <Link to={"/galleries/" + gallery.stub} >{gallery.name}</Link>
            </li>
          )}
        </ul>
      </section>
    );
  }
}


export default GalleriesByYear
