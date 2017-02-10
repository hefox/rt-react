import React from 'react'
import { PageTemplate } from 'components'
import GalleryContainer from 'containers/Gallery'
import GalleriesByYearContainer from 'containers/GalleriesByYear'
import GalleriesServiceInstance from 'services/galleries'

const GalleryPage = (props) => {
  var sidebar = <GalleriesByYearContainer stub={props.params.id} />;
  return (
    <PageTemplate sidebar={sidebar} >
      <GalleryContainer stub={props.params.id} query={props.location.query} />
    </PageTemplate>
  )
}

export default GalleryPage
