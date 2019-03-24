import { createMuiTheme } from '@material-ui/core/styles'
const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#e3f2fd',
      main: '#3f50b5',
      dark: '#002884',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main: '#26a69a',
      dark: '#00695c',
      contrastText: '#000',
    },
  },
  typography: {
    useNextVariants: true,
  },
})

export default theme;