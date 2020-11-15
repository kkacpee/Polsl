import { createMuiTheme} from '@material-ui/core/styles';

const Theme = createMuiTheme({
  palette: {
    background: {
      default: '#2F2635',
      paper: '#F4F7F3'
    },
    primary: {
      main: '#CA506E'
    },
    secondary: {
      main: '#CE7B5C'
    },
    info: {
      main: '#8B89A2'
    },
    type: 'light',
    text: {
      primary: '#2F2635',
      secondary: '#F4F7F3'
    }
  },
  overrides: {
  //   // Style sheet name ⚛️
  //   // MuiButton: {
  //   //   // Name of the rule
  //   //   text: {
  //   //     // Some CSS
  //   //     background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
  //   //     borderRadius: 3,
  //   //     border: 0,
  //   //     color: 'white',
  //   //     height: 48,
  //   //     padding: '0 30px',
  //   //     boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  //   //   },
  //   },
    MuiCard: {
        root: {
            maxWidth: 345,
            margin: 10
        }
    },
    MuiCardMedia: {
        root: {
            height: 0,
            paddingTop: '56.25%', // 16:9
          }
    },
    MuiPaper: {
      root: {
        backgroundColor: '#8B89A2',
        color: '#2F2635'
      }
    }
  },
});

export default Theme;