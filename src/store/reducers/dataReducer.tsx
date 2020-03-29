const INITIAL_STATE = {
    features: [],
    isFetching: false,
    error: undefined,
    filteredFeatures: [],
    mapBounds: undefined
};

const dataReducer = (state = INITIAL_STATE, action: any) => {
    switch (action.type) {
        case 'FETCH_DATA':
            return state;
        case 'FETCH_DATA_SUCCESS':
            return {
                ...state,
                features: action.payload.data,
                filteredFeatures: action.payload.data
            };
        case 'FETCH_DATA_ERROR':
            return state;
        case 'GET_DATA_WITHIN_BOUNDS':
            return {
                ...state,
                filteredFeatures: featuresWithinMapBounds(state.features, action.payload.bounds),
                mapBounds: action.payload.bounds
            }
        case 'GET_DATA_AREA_SIZE':
            return {
                ...state,
                filteredFeatures: featuresWithAreaSize(state.features, state.mapBounds, action.payload.minSize, action.payload.maxSize)
            }
        default:
            return state;
    }
};

export default dataReducer;


const featuresWithAreaSize = (features: any, mapBounds: any, minSize: number, maxSize: number) => {
    return features.filter((feature: any) => {
        let featureArea = feature.properties.area_;
        let point = {
            long: feature.geometry.coordinates[0][0][0][0],
            lat: feature.geometry.coordinates[0][0][0][1]
        }
        if (featureArea >= minSize && featureArea <= maxSize) {
            if (mapBounds) {
                return isInBound(point, mapBounds)
            } else {
                return true;
            }
        }
        return false
    });
}

const featuresWithinMapBounds = (features: any, bounds: any) => {
    return features.filter((feature: any) => {
        // console.log('feature', feature);
        let point = {
            long: feature.geometry.coordinates[0][0][0][0],
            lat: feature.geometry.coordinates[0][0][0][1]
        }
        return isInBound(point, bounds);
    });
}

function isInBound(point: { long: number; lat: number; }, bounds: { NE: { long: number; lat: number; }; SW: { long: number; lat: number; }; }) {
    var eastBound = point.long < bounds.NE.long;
    var westBound = point.long > bounds.SW.long;
    var inLong;

    if (bounds.NE.long < bounds.SW.long) {
        inLong = eastBound || westBound;
    } else {
        inLong = eastBound && westBound;
    }

    var inLat = point.lat > bounds.SW.lat && point.lat < bounds.NE.lat;
    return inLat && inLong;
}