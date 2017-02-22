/**
 * Provide a category (tags, venue) filter.
 */
import React from 'react';
import GalleriesServiceInstance from 'services/galleries';
import { Dropdown } from 'react-toolbox';

class CategoryFilter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {tags: []};
  }

  componentDidMount() {
    var tags = [];
    var label = this.props.label || 'tags';
    GalleriesServiceInstance.getCategories(label).then(function(cats) {
      for (var key in cats) {
        var cat = cats[key];
        tags.push({value: cat, label: cat})
      }
      tags.unshift({value: '', label: '[' + label + ']'});
      this.setState({tags: tags});
    }.bind(this));
  }

  render() {
    return (
      <Dropdown
        auto
        onChange={this.props.handleChange}
        source={this.state.tags}
        value={this.props.value}
        className="gallery-list__form-item gallery-list__form-item--{this.props.label}"
      />);
  }
}


export default CategoryFilter