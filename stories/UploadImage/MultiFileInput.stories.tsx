import * as React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { Form, Formik } from 'formik'

import { MultiFileInput } from '../../components/UploadImage/MultiFileInput'

storiesOf('UploadImage/MultiFileInput', module).add('default', () => (
  <Formik
    initialValues={{ name: [] }}
    validate={() => ({ name: '' })}
    onSubmit={({ name }) => {
      action('onSubmit')(name)
    }}
  >
    <Form>
      <MultiFileInput
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
      ,
    </Form>
  </Formik>
))
