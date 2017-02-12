import React from 'react'
import { Route, IndexRoute, browserHistory } from 'react-router'

import App from 'components/App'
import { HomePage } from 'components'
import { GalleryPage } from 'components'
import { GalleriesPage } from 'components'

var subdir = "" //"/rt/dist"

const routes = (
  <Route path="/" component={App} >
    <IndexRoute component={HomePage} />
    <Route path={subdir + "/galleries"} component={GalleriesPage}/>
    <Route path={subdir + "/galleries/:id"} component={GalleryPage}/>
  </Route>
)

export default routes
