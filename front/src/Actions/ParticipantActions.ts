import { ThunkAction } from 'redux-thunk'
import { RootState } from '../Reducers/rootReducer';
import { AddParticipantRequest, EditParticipantPhotoRequest, Participant, ParticipantAction, PARTICIPANT_ADD, PARTICIPANT_ADD_FAIL, PARTICIPANT_ADD_SUCCESS, PARTICIPANT_DELETE, PARTICIPANT_DELETE_FAIL, PARTICIPANT_DELETE_SUCCESS, PARTICIPANT_EDIT, PARTICIPANT_EDIT_FAIL, PARTICIPANT_EDIT_SUCCESS, PARTICIPANT_LIST_FAIL, PARTICIPANT_LIST_LOADING, PARTICIPANT_LIST_SUCCESS } from '../Types/ParticipantTypes';
import { apiClient } from './ApiClient';


export const GetParticipantList = (): ThunkAction<void, RootState, null, ParticipantAction> => 
{ return async dispatch => {
    try{
        dispatch({
            type: PARTICIPANT_LIST_LOADING
        });
        const result = await apiClient.get(`/api/Participant/get`)
        
        dispatch({
            type: PARTICIPANT_LIST_SUCCESS,
            payload: result.data
        })
    } catch (e){
        dispatch({
            type: PARTICIPANT_LIST_FAIL,
            payload: e.message
        })
    }
    }
}

export const GetParticipantsForPresentationList = (id:number): ThunkAction<void, RootState, null, ParticipantAction> => 
{ return async dispatch => {
    try{
        dispatch({
            type: PARTICIPANT_LIST_LOADING
        });
        const result = await apiClient.get(`/api/Participant/get/${id}`)
        
        dispatch({
            type: PARTICIPANT_LIST_SUCCESS,
            payload: result.data
        })
    } catch (e){
        dispatch({
            type: PARTICIPANT_LIST_FAIL,
            payload: e.message
        })
    }
    }
}

export const AddParticipant = (values:AddParticipantRequest): ThunkAction<void, RootState, null, ParticipantAction> => 
{ return async dispatch => {
    try{
        dispatch({
            type: PARTICIPANT_ADD
        });

        const formData = new FormData();
        if( values.file != undefined){
            formData.append("file", values.file!);
        }
        formData.append("affiliation", values.affiliation);
        formData.append("company", values.company);
        formData.append("country", values.country);
        formData.append("description", values.description);
        formData.append("firstName", values.firstName);
        formData.append("lastName", values.lastName);
        const config = {
            headers: {
              'content-type': 'multipart/form-data',
            },
          };
        const response = await apiClient.post(`/api/Participant/add`,formData, config)
        
        dispatch({
            type: PARTICIPANT_ADD_SUCCESS,
            payload: response.statusText
        })
    } catch (e){
        dispatch({
            type: PARTICIPANT_ADD_FAIL,
            payload: e.message
        })
    }
    }
}

export const DeleteParticipant = (key:number): ThunkAction<void, RootState, null, ParticipantAction> =>
{
    return async dispatch => {
        try{
            dispatch({
                type: PARTICIPANT_DELETE
            });
            const response = await apiClient.delete(`/api/Participant/delete/${key}`)
            
            dispatch({
                type: PARTICIPANT_DELETE_SUCCESS,
                payload: response.statusText
            })
        } catch (e){
            dispatch({
                type: PARTICIPANT_DELETE_FAIL,
                payload: e.message
            })
        }
    }
}

export const EditParticipant = (values:Participant): ThunkAction<void, RootState, null, ParticipantAction> => 
{ return async dispatch => {
    try{
        dispatch({
            type: PARTICIPANT_EDIT
        });
        const response = await apiClient.post(`/api/Participant/edit`, {
            ...values
            })
        
        dispatch({
            type: PARTICIPANT_EDIT_SUCCESS,
            payload: response.statusText
        })
    } catch (e){
        dispatch({
            type: PARTICIPANT_EDIT_FAIL,
            payload: e.message
        })
    }
    }
}

export const EditParticipantPhoto = (values:EditParticipantPhotoRequest): ThunkAction<void, RootState, null, ParticipantAction> => 
{ return async dispatch => {
    try{
        dispatch({
            type: PARTICIPANT_EDIT
        });

        const formData = new FormData();
        formData.append("file", values.file!);
        formData.append("id", values.id.toString());
        const config = {
            headers: {
              'content-type': 'multipart/form-data',
            },
          };
        const response = await apiClient.post(`/api/Participant/ParticipantPhoto/edit`,formData ,config )
        
        dispatch({
            type: PARTICIPANT_EDIT_SUCCESS,
            payload: response.statusText
        })
    } catch (e){
        dispatch({
            type: PARTICIPANT_EDIT_FAIL,
            payload: e.message
        })
    }
    }
}
