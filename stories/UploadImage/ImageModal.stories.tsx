import * as React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import { ImageModal } from '../../components/UploadImage/ImageModal'

storiesOf('UploadImage/ImageModal', module).add('default', () => (
  <ImageModal
    isOpen={true}
    aspect={3 / 4}
    onClose={action('onClose')}
    onUpload={action('onUpload')}
  />
))
