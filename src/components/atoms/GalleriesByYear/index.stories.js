import React from 'react'
import { storiesOf } from '@kadira/storybook'
import GalleriesByYear from '.'

storiesOf('GalleriesByYear', module)
  .add('default', () => (
    <GalleriesByYear>
      <li>Item 1</li>
      <li>Item 2</li>
      <li>Item 3</li>
    </GalleriesByYear>
  ))
  .add('ordered', () => (
    <GalleriesByYear ordered>
      <li>Item 1</li>
      <li>Item 2</li>
      <li>Item 3</li>
    </GalleriesByYear>
  ))
  .add('palette', () => (
    <GalleriesByYear palette="primary">
      <li>Item 1</li>
      <li>Item 2</li>
      <li>Item 3</li>
    </GalleriesByYear>
  ))
  .add('palette reverse', () => (
    <GalleriesByYear palette="primary" reverse>
      <li>Item 1</li>
      <li>Item 2</li>
      <li>Item 3</li>
    </GalleriesByYear>
  ))
