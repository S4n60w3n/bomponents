import { withThemesProvider } from "storybook-addon-styled-component-theme";
import { theme } from '../themes'
import { ThemeProvider } from "styled-components";
import {addDecorator} from "@storybook/react";

import '../styles/globals.css'
import 'rc-slider/assets/index.css'

const themes = [theme];
addDecorator(withThemesProvider(themes), ThemeProvider);
