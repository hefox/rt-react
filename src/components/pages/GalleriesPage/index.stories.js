import React from 'react'
import { storiesOf } from '@kadira/storybook'
import { GalleriesPage } from 'components'

storiesOf('GalleriesPage', module)
  .add('default', () => (
    <GalleriesPage />
  ))
