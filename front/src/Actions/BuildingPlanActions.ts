import { ThunkAction } from 'redux-thunk'
import { RootState } from '../Reducers/rootReducer';
import { AddBuildingPlanRequest, BuildingPlan, BuildingPlanAction, BUILDINGPLAN_ADD, BUILDINGPLAN_ADD_FAIL, BUILDINGPLAN_ADD_SUCCESS, BUILDINGPLAN_DELETE, BUILDINGPLAN_DELETE_FAIL, BUILDINGPLAN_DELETE_SUCCESS, BUILDINGPLAN_EDIT, BUILDINGPLAN_EDIT_FAIL, BUILDINGPLAN_EDIT_SUCCESS, BUILDINGPLAN_LIST_FAIL, BUILDINGPLAN_LIST_LOADING, BUILDINGPLAN_LIST_SUCCESS } from '../Types/BuildingPlanTypes';
import { apiClient } from './ApiClient';


export const GetBuildingPlanList = (): ThunkAction<void, RootState, null, BuildingPlanAction> => 
{ return async dispatch => {
    try{
        dispatch({
            type: BUILDINGPLAN_LIST_LOADING
        });
        const result = await apiClient.get(`/api/BuildingPlan/get`)
        console.log(result)
        dispatch({
            type: BUILDINGPLAN_LIST_SUCCESS,
            payload: result.data
        })
    } catch (e){
        dispatch({
            type: BUILDINGPLAN_LIST_FAIL,
            payload: e.message
        })
    }
    }
}

export const AddBuildingPlan = (values:AddBuildingPlanRequest): ThunkAction<void, RootState, null, BuildingPlanAction> => 
{ return async dispatch => {
    try{
        dispatch({
            type: BUILDINGPLAN_ADD
        });

        const formData = new FormData();
        formData.append("file", values.file);
        formData.append("description", values.description);
        formData.append("name", values.name);
        formData.append("conferenceId", values.conferenceId.toString());
        const config = {
            headers: {
              'content-type': 'multipart/form-data',
            },
          };

        const response = await apiClient.post(`/api/BuildingPlan/add`, formData, config)
        
        dispatch({
            type: BUILDINGPLAN_ADD_SUCCESS,
            payload: response.statusText
        })
    } catch (e){
        dispatch({
            type: BUILDINGPLAN_ADD_FAIL,
            payload: e.message
        })
    }
    }
}

export const DeleteBuildingPlan = (key:number): ThunkAction<void, RootState, null, BuildingPlanAction> =>
{
    return async dispatch => {
        try{
            dispatch({
                type: BUILDINGPLAN_DELETE
            });
            const response = await apiClient.delete(`/api/BuildingPlan/delete/${key}`)
            
            dispatch({
                type: BUILDINGPLAN_DELETE_SUCCESS,
                payload: response.statusText
            })
        } catch (e){
            dispatch({
                type: BUILDINGPLAN_DELETE_FAIL,
                payload: e.message
            })
        }
    }
}

export const EditBuildingPlan = (values:BuildingPlan): ThunkAction<void, RootState, null, BuildingPlanAction> => 
{ return async dispatch => {
    try{
        dispatch({
            type: BUILDINGPLAN_EDIT
        });
        const response = await apiClient.put(`/api/BuildingPlan/edit`, {
            ...values
            })
        
        dispatch({
            type: BUILDINGPLAN_EDIT_SUCCESS,
            payload: response.statusText
        })
    } catch (e){
        dispatch({
            type: BUILDINGPLAN_EDIT_FAIL,
            payload: e.message
        })
    }
    }
}