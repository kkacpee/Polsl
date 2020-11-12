import { createMuiTheme} from '@material-ui/core/styles';

const Theme = createMuiTheme({
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
    }
  }
});

export default Theme;