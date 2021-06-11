import * as React from "react";
import { storiesOf } from "@storybook/react";

import { Index } from "../components";

storiesOf("Index", module).add("default", () => (
  <>
    <Index />
    Hello WOrld
  </>
));
