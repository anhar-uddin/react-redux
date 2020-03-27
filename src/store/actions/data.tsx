  
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