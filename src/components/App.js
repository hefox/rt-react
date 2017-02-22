import React, { PropTypes } from 'react'
import { Button } from 'react-toolbox/lib/button';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      is18: localStorage.getItem('is18') == 'true',
    };
  }

  confirmAge = () => {
    localStorage.setItem('is18', 'true')
    this.setState({is18: true});
  };

  render() {
    var that = this;
    if (!that.state.is18) {
      return (
        <div>
          This site contains 18+ material blahlbah.
          <Button href='http://google.com/' icon="exit_to_app">Leave</Button>
          <Button onClick={this.confirmAge}>Confirm Age</Button>
        </div>
      );
    }
    return (
      <div>
        {that.props.children}
      </div>
    );
  }
}


App.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
}

export default App
