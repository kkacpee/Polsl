import { ThunkAction } from 'redux-thunk'
import { RootState } from '../Reducers/rootReducer';
import { AddConferencePhotoRequest, AddConferenceRequest, AddToConferenceRequest, ChangeConferenceMainPhotoRequest, Conference, ConferenceAction, CONFERENCE_ADD, CONFERENCE_ADD_FAIL, CONFERENCE_ADD_SUCCESS, CONFERENCE_DELETE, CONFERENCE_DELETE_FAIL, CONFERENCE_DELETE_SUCCESS, CONFERENCE_DETAILS_FAIL, CONFERENCE_DETAILS_LOADING, CONFERENCE_DETAILS_SUCCESS, CONFERENCE_EDIT, CONFERENCE_EDIT_FAIL, CONFERENCE_EDIT_SUCCESS, CONFERENCE_LIST_FAIL, CONFERENCE_LIST_LOADING, CONFERENCE_LIST_SUCCESS, DeleteFromConferenceRequest, requestType } from '../Types/ConferenceTypes';
import { apiClient } from './ApiClient';



export const GetConferenceList = (): ThunkAction<void, RootState, null, ConferenceAction> => 
{ return async dispatch => {
    try{
        dispatch({
            type: CONFERENCE_LIST_LOADING
        });
        const result = await apiClient.get(`/api/Conference/get`)
        
        dispatch({
            type: CONFERENCE_LIST_SUCCESS,
            payload: result.data
        })
    } catch (e){
        dispatch({
            type: CONFERENCE_LIST_FAIL,
            payload: e.message
        })
    }
    }
}

export const GetConferenceDetails = (id:number): ThunkAction<void, RootState, null, ConferenceAction> => 
{ return async dispatch => {
    try{
        dispatch({
            type: CONFERENCE_DETAILS_LOADING
        });
        const result = await apiClient.get(`/api/Conference/get/${id}`)
        
        dispatch({
            type: CONFERENCE_DETAILS_SUCCESS,
            payload: result.data
        })
    } catch (e){
        dispatch({
            type: CONFERENCE_DETAILS_FAIL,
            payload: e.message
        })
    }
    }
}

export const AddConference = (values:AddConferenceRequest): ThunkAction<void, RootState, null, ConferenceAction> => 
{ return async dispatch => {
    try{
        dispatch({
            type: CONFERENCE_ADD
        });
        const response = await apiClient.post(`/api/Conference/add`, {
            ...values
            })
        
        dispatch({
            type: CONFERENCE_ADD_SUCCESS,
            payload: response.statusText
        })
    } catch (e){
        dispatch({
            type: CONFERENCE_ADD_FAIL,
            payload: e.message
        })
    }
    }
}

export const AddConferencePhoto = (values:AddConferencePhotoRequest): ThunkAction<void, RootState, null, ConferenceAction> => 
{ return async dispatch => {
    try{
        dispatch({
            type: CONFERENCE_ADD
        });

        const formData = new FormData();
        formData.append("file", values.file);
        formData.append("id", values.conferenceId.toString());
        const config = {
            headers: {
              'content-type': 'multipart/form-data',
            },
          };

        const response = await apiClient.post(`/api/Conference/ConferencePhoto/add`, formData, config)
        
        dispatch({
            type: CONFERENCE_ADD_SUCCESS,
            payload: response.statusText
        })
    } catch (e){
        dispatch({
            type: CONFERENCE_ADD_FAIL,
            payload: e.message
        })
    }
    }
}

export const ChangeConferencePhoto = (values:ChangeConferenceMainPhotoRequest): ThunkAction<void, RootState, null, ConferenceAction> => 
{ return async dispatch => {
    try{
        dispatch({
            type: CONFERENCE_EDIT
        });
        const response = await apiClient.put(`/api/Conference/ConferencePhoto/change`, {
            ...values
            })
        
        dispatch({
            type: CONFERENCE_EDIT_SUCCESS,
            payload: response.statusText
        })
    } catch (e){
        dispatch({
            type: CONFERENCE_EDIT_FAIL,
            payload: e.message
        })
    }
    }
}

export const DeleteConferencePhoto = (key:number): ThunkAction<void, RootState, null, ConferenceAction> =>
{
    return async dispatch => {
        try{
            dispatch({
                type: CONFERENCE_DELETE
            });
            const response = await apiClient.delete(`/api/Conference/ConferencePhoto/delete/${key}`)
            
            dispatch({
                type: CONFERENCE_DELETE_SUCCESS,
                payload: response.statusText
            })
        } catch (e){
            dispatch({
                type: CONFERENCE_DELETE_FAIL,
                payload: e.message
            })
        }
    }
}

export const AddToConference = (values:AddToConferenceRequest, requestType:requestType): ThunkAction<void, RootState, null, ConferenceAction> => 
{ return async dispatch => {
    try{
        dispatch({
            type: CONFERENCE_ADD
        });
        let request: any;
        switch (requestType){
            case "Accommodation":
                request = {
                    conferenceID: Number(values.conferenceID),
                    accommodationIDs: values.arrayOfIDs
                }
                break;
            case "EmergencyNumber":
                request = {
                    conferenceId: Number(values.conferenceID),
                    emergencyNumberIDs: values.arrayOfIDs
                }
                break;
            case "Organizer":
                request = {
                    conferenceId: Number(values.conferenceID),
                    organizerIDs: values.arrayOfIDs
                }
                break;
            case "Sponsor":
                request = {
                    conferenceId: Number(values.conferenceID),
                    sponsorIDs: values.arrayOfIDs
                }
                break;
            case "PointOfInterest":
                request = {
                    conferenceId: Number(values.conferenceID),
                    pointOfInterestIDs: values.arrayOfIDs
                }
                break;
        }
        const response = await apiClient.post(`/api/Conference/Conference${requestType}/add`, {
            ...request
            })
               
        dispatch({
            type: CONFERENCE_ADD_SUCCESS,
            payload: response.statusText
        })
    } catch (e){
        dispatch({
            type: CONFERENCE_ADD_FAIL,
            payload: e.message
        })
    }
    }
}

export const DeleteConference = (key:number): ThunkAction<void, RootState, null, ConferenceAction> =>
{
    return async dispatch => {
        try{
            dispatch({
                type: CONFERENCE_DELETE
            });
            const response = await apiClient.delete(`/api/Conference/delete/${key}`)
            
            dispatch({
                type: CONFERENCE_DELETE_SUCCESS,
                payload: response.statusText
            })
        } catch (e){
            dispatch({
                type: CONFERENCE_DELETE_FAIL,
                payload: e.message
            })
        }
    }
}

export const DeleteFromConference = (values:DeleteFromConferenceRequest, requestType:requestType): ThunkAction<void, RootState, null, ConferenceAction> =>
{
    return async dispatch => {
        try{
            dispatch({
                type: CONFERENCE_DELETE
            });

        let request: any;
        switch (requestType){
            case "Accommodation":
                request = {
                    conferenceID: Number(values.conferenceID),
                    accommodationIDs: values.arrayOfIDs
                }
                break;
            case "EmergencyNumber":
                request = {
                    conferenceId: Number(values.conferenceID),
                    emergencyNumberIDs: values.arrayOfIDs
                }
                break;
            case "Organizer":
                request = {
                    conferenceId: Number(values.conferenceID),
                    organizerIDs: values.arrayOfIDs
                }
                break;
            case "Sponsor":
                request = {
                    conferenceId: Number(values.conferenceID),
                    sponsorIDs: values.arrayOfIDs
                }
                break;
            case "PointOfInterest":
                request = {
                    conferenceId: Number(values.conferenceID),
                    pointOfInterestIDs: values.arrayOfIDs
                }
                break;
            }
            const response = await apiClient.post(`/api/Conference/Conference${requestType}/delete`, {
                ...request
                })
            
            dispatch({
                type: CONFERENCE_DELETE_SUCCESS,
                payload: response.statusText
            })
        } catch (e){
            dispatch({
                type: CONFERENCE_DELETE_FAIL,
                payload: e.message
            })
        }
    }
}

export const EditConference = (values:Conference): ThunkAction<void, RootState, null, ConferenceAction> => 
{ return async dispatch => {
    try{
        dispatch({
            type: CONFERENCE_EDIT
        });
        const response = await apiClient.put(`/api/Conference/edit`, {
            ...values
            })
        
        dispatch({
            type: CONFERENCE_EDIT_SUCCESS,
            payload: response.statusText
        })
    } catch (e){
        dispatch({
            type: CONFERENCE_EDIT_FAIL,
            payload: e.message
        })
    }
    }
}