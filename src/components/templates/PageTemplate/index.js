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
          {this.props.sidebar}
        </NavDrawer>
        <Panel>
          <AppBar title="Rich Trove Archive"  leftIcon='menu' onLeftIconClick={ this.toggleDrawerActive } >

            <Navigation type='horizontal'>
              <Link label='Galleries' icon='grid_on' onClick={this.handleClickAsLink.bind(this, '/galleries')} />
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
        <Sidebar width={ 5 }>
            <div><IconButton icon='close' onClick={ this.toggleDrawerActive }/></div>
            <div style={{ flex: 1 }}>
                <p>Supplemental content goes here.</p>
            </div>
        </Sidebar>
      </Layout>
    );
  }
}

export default PageTemplate
