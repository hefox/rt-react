import React from 'react'
import { storiesOf } from '@kadira/storybook'
import { GalleryPage } from 'components'

storiesOf('GalleryPage', module)
  .add('default', () => (
    <GalleryPage />
  ))
