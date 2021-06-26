import Document, { Html, Head, Main, NextScript } from 'next/document'

import { CSS_FILES } from '../utils/constants'

type Props = {}

class MyDocument extends Document<Props> {
  static displayName: string = '_document'
  render() {
    return (
      <Html lang="en">
        <Head />
        <link href={CSS_FILES} rel="stylesheet" />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
