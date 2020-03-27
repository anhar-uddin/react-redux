const INITIAL_STATE = {
    features: [],
    isFetching: false,
    error: undefined,
    filteredFeatures: []
};

const dataReducer = (state = INITIAL_STATE, action: any) => {
    switch (action.type) {
        case 'FETCH_DATA':
            return state;
        case 'FETCH_DATA_SUCCESS':
            console.log('fetch succ', action.payload.data );
            
            return {
                ...state,
                features: action.payload.data,
                filteredFeatures : action.payload.data
              };
        case 'FETCH_DATA_ERROR':
            return state;
        default:
            return state;
    }
};

export default dataReducer;