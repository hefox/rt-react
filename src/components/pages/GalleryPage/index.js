import React from 'react'
import { PageTemplate } from 'components'
import GalleryContainer from 'containers/Gallery'

const GalleryPage = (props) => {
  return (
    <PageTemplate>
      <GalleryContainer stub={props.params.id} />
    </PageTemplate>
  )
}

export default GalleryPage
