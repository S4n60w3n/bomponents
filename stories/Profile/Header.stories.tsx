import * as React from 'react'
import { storiesOf } from '@storybook/react'

import { Header } from '../../components/Profile/Header'

storiesOf('Profile/Header', module).add('default', () => (
  <Header
    fullName="Pedro Pedrson"
    description={`Isthis is a random tags and I’m too lazy to write it on the keyboard so I am dictating this text because I need some Hollywood description so it looks nice with the designs and I canna curious how this dictation the work and if it’s really good enough for this`}
    avatar="https://picsum.photos/200/300"
    background="https://picsum.photos/1000/800"
  />
))
