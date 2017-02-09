import React from 'react'
import { storiesOf } from '@kadira/storybook'
import GalleryList from '.'

storiesOf('GalleryList', module)
  .add('default', () => (
    <GalleryList>
      <li>Item 1</li>
      <li>Item 2</li>
      <li>Item 3</li>
    </GalleryList>
  ))
  .add('ordered', () => (
    <GalleryList ordered>
      <li>Item 1</li>
      <li>Item 2</li>
      <li>Item 3</li>
    </GalleryList>
  ))
  .add('palette', () => (
    <GalleryList palette="primary">
      <li>Item 1</li>
      <li>Item 2</li>
      <li>Item 3</li>
    </GalleryList>
  ))
  .add('palette reverse', () => (
    <GalleryList palette="primary" reverse>
      <li>Item 1</li>
      <li>Item 2</li>
      <li>Item 3</li>
    </GalleryList>
  ))
