import * as React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import { ImageUpload } from '../../components/UploadImage/ImageUpload'

storiesOf('UploadImage/ImageUpload', module)
  .add('single', () => (
    <ImageUpload aspect={3 / 4} single onCrop={action('onUpload')} />
  ))
  .add('multiple', () => (
    <ImageUpload aspect={3 / 4} onCrop={action('onUpload')} />
  ))
