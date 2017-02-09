import React from 'react'
import { PageTemplate } from 'components'
import GalleriesContainer from 'containers/Galleries'

const GalleriesPage = () => {
  return (
    <PageTemplate>
      <h1>Gallery Page</h1>
      <GalleriesContainer />
    </PageTemplate>
  )
}

export default GalleriesPage
