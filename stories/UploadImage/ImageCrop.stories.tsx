import * as React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import styled from 'styled-components'

import { ImageCrop } from '../../components/UploadImage/ImageCrop/ImageCrop'

const Wrap = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
`

storiesOf('UploadImage/ImageCrop', module).add('default', () => (
  <Wrap>
    <ImageCrop
      image="https://img.huffingtonpost.com/asset/5ab4d4ac2000007d06eb2c56.jpeg?cache=sih0jwle4e&ops=1910_1000"
      aspect={3 / 4}
      onSubmit={action('onSubmit')}
    />
  </Wrap>
))
