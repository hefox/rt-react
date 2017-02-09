import React from 'react'
import styled from 'styled-components'
import { AppBar, Sidebar } from 'react-toolbox';
import { Layout, NavDrawer, Panel } from 'react-toolbox';
import { Link, Navigation, IconButton } from 'react-toolbox';


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

  render() {
    return (
      <Layout>
        <NavDrawer active={this.state.drawerActive} onOverlayClick={ this.toggleDrawerActive } >
          <p>
            Navigation, account switcher, etc. go here.
          </p>
        </NavDrawer>
        <Panel>
          <AppBar title="Rich Trove Archive"  leftIcon='menu' onLeftIconClick={ this.toggleDrawerActive } >
          </AppBar>
          <div style={{ flex: 1, overflowY: 'auto', padding: '1.8rem' }}>
            <div {...this.props} />
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
