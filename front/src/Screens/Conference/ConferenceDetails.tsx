import React from 'react';
import { useParams } from 'react-router-dom';

const ConferenceDetails = () => {
    const { id } = useParams();

    return(
        <div> Conference {id} Details</div>
    )
};

export default ConferenceDetails;