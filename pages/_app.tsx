import { NextPage } from "next";
import React from "react";

import "../styles/globals.css";

type Props = {
  pageProps: any;
  Component: NextPage;
};

const MyApp: NextPage<Props> = ({ pageProps, Component }) => {
  return (
    <>
      <Component {...pageProps} />
    </>
  );
};
MyApp.displayName = "_app";

export default MyApp;
