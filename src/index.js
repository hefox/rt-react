import React from 'react'
import { render } from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import { Router, browserHistory, applyRouterMiddleware } from 'react-router'

import routes from 'routes'

const root = document.getElementById('app')

require('./styles/app.scss');

const renderApp = () => (
  <AppContainer>
    <Router history={browserHistory} routes={routes} />
  </AppContainer>
)

render(renderApp(), root)

if (module.hot) {
  module.hot.accept('routes', () => {
    require('routes')
    render(renderApp(), root)
  })
}
