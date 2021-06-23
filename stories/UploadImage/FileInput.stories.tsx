import * as React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { Form, Formik } from 'formik'
import styled from 'styled-components'

import { FileInput } from '../../components/UploadImage/FileInput'
import { pxToRem } from '../../utils/utils'

const SFileInput = styled(FileInput)`
  max-width: ${pxToRem(300)};
`

storiesOf('UploadImage/FileInput', module)
  .add('default', () => (
    <Formik
      initialValues={{ name: [] }}
      validate={() => ({ name: '' })}
      onSubmit={({ name }) => {
        action('onSubmit')(name)
      }}
    >
      <Form>
        <SFileInput
          maxWidth={300}
          maxHeight={400}
          label="Label"
          name="name"
          aspect={3 / 4}
          onUpload={() =>
            new Promise((res) => {
              setTimeout(() => {
                res(true)
              }, 2000)
            })
          }
        />
      </Form>
    </Formik>
  ))
  .add('single', () => (
    <Formik
      initialValues={{ name: [] }}
      validate={() => ({ name: '' })}
      onSubmit={({ name }) => {
        action('onSubmit')(name)
      }}
    >
      <Form>
        <SFileInput
          maxWidth={300}
          maxHeight={400}
          label="Label"
          maxAmount={1}
          name="name"
          aspect={3 / 4}
          onUpload={() =>
            new Promise((res) => {
              setTimeout(() => {
                res(true)
              }, 2000)
            })
          }
        />
      </Form>
    </Formik>
  ))
