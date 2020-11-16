import React from 'react';
import Pagination from '@material-ui/lab/Pagination';
import PaginationItem from '@material-ui/lab/PaginationItem';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import {default as MyTheme} from '../../Styles/ThemeProvider'
import { ComponentProps, DataGrid } from '@material-ui/data-grid';

  function customCheckbox(theme: Theme) {
    return {
      '& .MuiCheckbox-root svg': {
        width: 16,
        height: 16,
        backgroundColor: 'transparent',
        border: `1px solid ${
            theme.palette.type === 'light' ? '#d9d9d9' : 'rgb(67, 67, 67)'
        }`,
        borderRadius: 2,
      },
      '& .MuiCheckbox-root svg path': {
        display: 'none',
      },
      '& .MuiCheckbox-root.Mui-checked:not(.MuiCheckbox-indeterminate) svg': {
        backgroundColor: '#1890ff',
        borderColor: '#1890ff',
      },
      '& .MuiCheckbox-root.Mui-checked .MuiIconButton-label:after': {
        position: 'absolute',
        display: 'table',
        border: '2px solid #fff',
        borderTop: 0,
        borderLeft: 0,
        transform: 'rotate(45deg) translate(-50%,-50%)',
        opacity: 1,
        transition: 'all .2s cubic-bezier(.12,.4,.29,1.46) .1s',
        content: '""',
        top: '50%',
        left: '39%',
        width: 5.71428571,
        height: 9.14285714,
      },
      '& .MuiCheckbox-root.MuiCheckbox-indeterminate .MuiIconButton-label:after': {
        width: 8,
        height: 8,
        backgroundColor: '#1890ff',
        transform: 'none',
        top: '39%',
        border: 0,
      },
    };
  }
  
  export const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      root: {
        marginTop: 5,
        border: 0,
        color:
          theme.palette.type === 'light'
            ? 'rgba(0,0,0,.85)'
            : ` ${theme.palette.text.secondary}`,
        fontFamily: [
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          '"Helvetica Neue"',
          'Arial',
          'sans-serif',
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
        ].join(','),
        WebkitFontSmoothing: 'auto',
        letterSpacing: 'normal',
        '& .MuiDataGrid-columnsContainer': {
          backgroundColor: theme.palette.type === 'light' ? '#fafafa' : '#1d1d1d',
        },
        '& .MuiDataGrid-iconSeparator': {
          display: 'none',
        },
        '& .MuiDataGrid-colCell, .MuiDataGrid-cell': {
          border: `1px solid ${
            theme.palette.type === 'light' ? '#f0f0f0' : '#303030'
          }
          `,
        },
        '& .MuiDataGrid-columnsContainer, .MuiDataGrid-cell': {
          borderBottom: `1px solid ${
            theme.palette.type === 'light' ? '#f0f0f0' : '#303030'
          }`,
        },
        '& .MuiDataGrid-cell': {
          color:
            theme.palette.type === 'light'
              ? 'rgba(0,0,0,.85)'
              : ` ${theme.palette.text.primary}`,
        },
        '& .MuiPaginationItem-root': {
          borderRadius: 0,
          color: ` ${theme.palette.text.primary}`,
          borderColor:  `${theme.palette.text.primary}`
        },
        ...customCheckbox(theme),
      },
    }),
  )
  
  export function CustomPagination(props: ComponentProps) {
    const { paginationProps } = props;
  
    return (
      <Pagination
        color='secondary'
        variant="outlined"
        shape="rounded"
        page={paginationProps.page}
        count={paginationProps.pageCount}
        // @ts-expect-error
        renderItem={(props2) => <PaginationItem {...props2} disableRipple />}
        onChange={(event, value) => paginationProps.setPage(value)}
      />
    );
  };

  export default CustomPagination;