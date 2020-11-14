import React from 'react';
import { Box, CircularProgress } from '@material-ui/core';

const LoadingScreen = () => {
    return(
        <>
        <Box component='div' width='100%' height='100%' >
            <Box alignSelf='center' justifySelf='center'>
            <CircularProgress />
            </Box>     
        </Box>
        </>
    )
};

export default LoadingScreen;