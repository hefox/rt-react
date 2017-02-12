/**
 * Wrapper around pages displaying an optional sidebar.
 */


import React from 'react'
import { AppBar, Sidebar } from 'react-toolbox';
import { Layout, NavDrawer, Panel } from 'react-toolbox';
import { Link, Navigation, IconButton } from 'react-toolbox';
import GalleriesContainer from 'containers/Galleries'
import { goToLocation } from 'utils/query';



class PageTemplate extends React.Component {
  constructor(props) {
    super(props);
  }
  state = {
    drawerActive: false,
  };

  toggleDrawerActive = () => {
    this.setState({ drawerActive: !this.state.drawerActive });
  };
  handleClickAsLink(path, event) {
    event.preventDefault();
    goToLocation(path);
  }

  render() {
    return (
      <Layout>
        <NavDrawer active={this.state.drawerActive} onOverlayClick={ this.toggleDrawerActive } width="wide">
          {this.props.sidebar || <Link label='Galleries' icon='grid_on' onClick={this.handleClickAsLink.bind(this, '/galleries')} /> }
        </NavDrawer>
        <Panel>
          <AppBar title="Rich Trove Archive"  leftIcon='menu' onLeftIconClick={ this.toggleDrawerActive } >

            <Navigation type='horizontal'>
              <Link href="/galleries" label='Galleries' icon='grid_on' onClick={this.handleClickAsLink.bind(this, '/galleries')} />
              <Link href='http://www.richtrove.com/' active label='Richtrove.com' icon='web'
                 />
            </Navigation>
          </AppBar>
          <div style={{ flex: 1, overflowY: 'auto', padding: '1.8rem' }}>
            <div>
              {this.props.children}
            </div>
          </div>
        </Panel>
      </Layout>
    );
  }
}

export default PageTemplate
