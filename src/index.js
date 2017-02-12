import React from 'react'
import { render } from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import { Router, browserHistory, applyRouterMiddleware } from 'react-router'
import { useBasename } from 'history'

import routes from 'routes'

const root = document.getElementById('app')

import "react-image-gallery/styles/css/image-gallery.css";
require('./styles/app.scss');

var currentBaseName = '/';
// @fixme Find better way to pass this variable around or better yet
// how to access the current history object easily.
window.rtHistory = useBasename(() => browserHistory)({ basename: currentBaseName});

const renderApp = () => (
  <AppContainer>
    <Router history={window.rtHistory} routes={routes} />
  </AppContainer>
)

render(renderApp(), root)

if (module.hot) {
  module.hot.accept('routes', () => {
    require('routes')
    render(renderApp(), root)
  })
}

