import * as React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import { Avatar } from '../../components/Profile/Avatar'

storiesOf('Profile/Avatar', module).add('default', () => (
  <Avatar src="https://picsum.photos/200/300" alt="alt text" />
))
