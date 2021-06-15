import * as React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import styled from 'styled-components'

import { Preview } from '../../components/UploadImage/Preview/Preview'

const SPreview = styled(Preview)`
  width: 15rem;
`

storiesOf('UploadImage/Preview', module).add('default', () => (
  <SPreview
    src="https://picsum.photos/200/300"
    alt=""
    onEdit={action('onEdit')}
    onDelete={action('onDelete')}
  />
))
