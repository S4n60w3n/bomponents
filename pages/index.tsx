import { NextPage } from 'next'
import React from 'react'

import { Experience } from '../components/Profile/Experience'
import { Header } from '../components/Profile/Header'
import {
  BACKGROUND_IMAGE,
  DESCRIPTION,
  EXPERIENCE,
  FULL_NAME,
  PROFILE_IMAGE,
} from '../utils/constants'

type Props = {}

const Home: NextPage<Props> = ({}) => {
  return (
    <div className="p-4 max-w-screen-lg mx-auto">
      <Header
        fullName={FULL_NAME}
        avatar={PROFILE_IMAGE}
        background={BACKGROUND_IMAGE}
        description={DESCRIPTION}
      />
      <Experience data={EXPERIENCE} />
    </div>
  )
}
Home.displayName = 'Home'
export default Home
