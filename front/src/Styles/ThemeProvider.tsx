import { createMuiTheme} from '@material-ui/core/styles';

const Theme = createMuiTheme({
  palette: {
    background: {
      default: '#DEE9F0',
      paper: 'rgba(0,0,0,0)'
    },
    primary: {
      main: '#97BBD1'
    },
    secondary: {
      main: '#CE7B5C'
    },
    info: {
      main: '#8B89A2'
    },
    type: 'dark',
    text: {
      primary: '#2F2635',
      secondary: '#8B89A2'
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
            margin: 10,
            color: '#8B89A2',
            backgroundColor: 'rgba(0, 0, 0, 0.1)'
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
        backgroundColor: '#97BBD1',
        color: '#2F2635'
      }
    },
    MuiButton: {
      textPrimary: {
        color: '#2F2635'
      }
    },
    MuiSelect: {
      icon: {
        color: "#000"
      }
    }
  },
});

export default Theme;