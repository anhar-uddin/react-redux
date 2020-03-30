import { AreaSize } from "../../lib/types";

const INITIAL_STATE = {
    features: [],
    isFetching: false,
    error: undefined,
    filteredFeatures: [],
    featuresWithinBounds: [],
    mapBounds: undefined,
    areaSize: {
        minSize: 0, maxSize: 0
    },
    material: 'all'
};

const dataReducer = (state = INITIAL_STATE, action: any) => {
    switch (action.type) {
        case 'FETCH_DATA':
            return state;
        case 'FETCH_DATA_SUCCESS':
            return {
                ...state,
                features: action.payload.data,
                filteredFeatures: action.payload.data,
                featuresWithinBounds: action.payload.data
            };
        case 'FETCH_DATA_ERROR':
            return state;
        case 'GET_DATA_WITHIN_BOUNDS':
            return {
                ...state,
                featuresWithinBounds: featuresWithinMapBounds(state.features, action.payload.bounds),
                filteredFeatures: filterRamps(state.features, state.areaSize, state.material, action.payload.bounds),
                mapBounds: action.payload.bounds
            }
        case 'GET_FILTERED_RAMPS':
            return {
                ...state,
                size: action.payload.areaAize
            }
        case 'SET_AREA_SIZE':
            return {
                ...state,
                filteredFeatures: filterRamps(state.features, action.payload.areaSize, state.material, state.mapBounds),
                areaSize: action.payload.areaSize
            }
        case 'SET_MATERIAL':
            return {
                ...state,
                filteredFeatures: filterRamps(state.features, state.areaSize, action.payload.material, state.mapBounds),
                material: action.payload.material
            }
        case 'RESET_DATA':
            switch (action.payload.type) {
                case 'map':
                    return {
                        ...state,
                        isFetching: false,
                        error: undefined,
                        features: [...state.features],
                        filteredFeatures: state.features,
                        featuresWithinBounds: [],
                        mapBounds: undefined,
                        areaSize: {
                            minSize: 0, maxSize: 0
                        },
                        material: 'all'
                    }
                case 'material':
                    return {
                        ...state,
                        isFetching: false,
                        error: undefined,
                        filteredFeatures: filterRamps(state.features, state.areaSize, 'all', state.mapBounds),
                        material: 'all'
                    }
                case 'area_size':
                    return {
                        ...state,
                        isFetching: false,
                        error: undefined,
                        filteredFeatures: filterRamps(state.features, {
                            minSize: 0, maxSize: 0
                        }, state.material, state.mapBounds),
                        areaSize: {
                            minSize: 0, maxSize: 0
                        },
                    }
            }
        default:
            return state;
    }
};

export default dataReducer;

const filterRamps = (features: any, areaSize: AreaSize, material: string, mapBounds: any) => {
    return features.filter((feature: any) => {
        let point = {
            long: feature.geometry.coordinates[0][0][0][0],
            lat: feature.geometry.coordinates[0][0][0][1]
        }
        if (areaSize.maxSize > 0 && areaSize.minSize > 0 && !isAreaSize(feature, areaSize)) {
            return false
        }

        if (material !== 'all' && material !== feature.properties.material) {
            return false
        }

        if (mapBounds && !isInBound(point, mapBounds)) {
            return false
        }
        return true
    });
}

const isAreaSize = (feature: any, areaSize: AreaSize) => {
    let featureArea = feature.properties.area_;
    let point = {
        long: feature.geometry.coordinates[0][0][0][0],
        lat: feature.geometry.coordinates[0][0][0][1]
    }
    if (featureArea >= areaSize.minSize && featureArea <= areaSize.maxSize) {
        return true;
    }
    return false
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