import { NextPage } from 'next'
import React from 'react'

import { Header } from '../components/Profile/Header'
import {
  BACKGROUND_IMAGE,
  DESCRIPTION,
  FULL_NAME,
  PROFILE_IMAGE,
} from '../utils/constants'

type Props = {}

const Home: NextPage<Props> = ({}) => {
  return (
    <div className="p-4">
      <Header
        fullName={FULL_NAME}
        avatar={PROFILE_IMAGE}
        background={BACKGROUND_IMAGE}
        description={DESCRIPTION}
      />
    </div>
  )
}
Home.displayName = 'Home'
export default Home
