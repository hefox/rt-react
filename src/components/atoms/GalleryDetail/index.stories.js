import React from 'react'
import { storiesOf } from '@kadira/storybook'
import GalleryDetail from '.'

storiesOf('GalleryDetail', module)
  .add('default', () => (
    <GalleryDetail>
      <li>Item 1</li>
      <li>Item 2</li>
      <li>Item 3</li>
    </GalleryDetail>
  ))
  .add('ordered', () => (
    <GalleryDetail ordered>
      <li>Item 1</li>
      <li>Item 2</li>
      <li>Item 3</li>
    </GalleryDetail>
  ))
  .add('palette', () => (
    <GalleryDetail palette="primary">
      <li>Item 1</li>
      <li>Item 2</li>
      <li>Item 3</li>
    </GalleryDetail>
  ))
  .add('palette reverse', () => (
    <GalleryDetail palette="primary" reverse>
      <li>Item 1</li>
      <li>Item 2</li>
      <li>Item 3</li>
    </GalleryDetail>
  ))
