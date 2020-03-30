import { AreaSize } from '../../lib/types';


export const fetchData = () => {
    return {
        type: 'FETCH_DATA'
    };
};

export const fetchDataSuccess = (data: any) => {
    return {
        type: 'FETCH_DATA_SUCCESS', payload: {
            data
        }
    };
};

export const fetchDataError = (error: any) => {
    return {
        type: 'FETCH_DATA_ERROR', payload: {
            error
        }
    };
};

export const getDataWithinBounds = (bounds: any) => {
    return {
        type: 'GET_DATA_WITHIN_BOUNDS', payload: {
            bounds
        }
    };
};


export const setMaterial = (material: string) => {
    return {
        type: 'SET_MATERIAL',
        payload: {
            material
        }
    };
};

export const setAreaSize = (areaSize: AreaSize) => {
    return {
        type: 'SET_AREA_SIZE',
        payload: {
            areaSize
        }
    };
};

export const resetData = (type: string) => {
    return {
        type: 'RESET_DATA',
        payload: {
            type
        }
    };
};