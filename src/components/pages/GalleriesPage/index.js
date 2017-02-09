import React from 'react'
import { PageTemplate } from 'components'
import GalleriesContainer from 'containers/Galleries'

const GalleriesPage = (props) => {
  return (
    <PageTemplate>
      <h1>Gallery Page</h1>
      <GalleriesContainer query={props.location.query} />
    </PageTemplate>
  )
}

export default GalleriesPage
