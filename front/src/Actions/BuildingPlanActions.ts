import axios from 'axios';
import { ThunkAction } from 'redux-thunk'
import { RootState } from '../Reducers/rootReducer';
import { AddBuildingPlanRequest, BuildingPlanAction, BUILDINGPLAN_ADD, BUILDINGPLAN_ADD_FAIL, BUILDINGPLAN_ADD_SUCCESS, BUILDINGPLAN_DELETE, BUILDINGPLAN_DELETE_FAIL, BUILDINGPLAN_DELETE_SUCCESS, BUILDINGPLAN_LIST_FAIL, BUILDINGPLAN_LIST_LOADING, BUILDINGPLAN_LIST_SUCCESS } from '../Types/BuildingPlanTypes';


export const GetBuildingPlanList = (): ThunkAction<void, RootState, null, BuildingPlanAction> => 
{ return async dispatch => {
    try{
        dispatch({
            type: BUILDINGPLAN_LIST_LOADING
        });
        const result = await axios.get(`${process.env.REACT_APP_API_URI}/api/BuildingPlan/get`)
        
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
        const response = await axios.post(`${process.env.REACT_APP_API_URI}/api/BuildingPlan/add`, {
            ...values
            })
        
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
            const response = await axios.delete(`${process.env.REACT_APP_API_URI}/api/BuildingPlan/delete/${key}`)
            
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