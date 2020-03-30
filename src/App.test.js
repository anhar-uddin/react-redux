import React from 'react';
import App from './App';
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { INITIAL_STATE } from './store/reducers/dataReducer'
import { mount } from 'enzyme';
import { mockData } from './lib/mock';
import allReducer from './store/reducers/index'
import { fetchDataSuccess } from './store/actions/data';
import { getDataWithinBounds } from './store/actions/data';
import { setMaterial } from './store/actions/data';
import { dataReducer } from './store/reducers/dataReducer';


const store = createStore(
  allReducer
)

const render = () => mount(
  <Provider store={store}>
    <App />
  </Provider>
);

test('render card titles', () => {
  const component = render();

  expect(component.find('[data-test-id="map-heading-text"]').text()).toBe('Map');
  expect(component.find('[data-test-id="material-heading-text"]').text()).toBe('Material Type');
  expect(component.find('[data-test-id="area-size-heading-text"]').text()).toBe('Area Size');
});

test('should create an action to save data', () => {
  const expectedActions =
  {
    payload: {
      data: mockData.features
    },
    type: 'FETCH_DATA_SUCCESS',
  }

  expect(fetchDataSuccess(mockData.features)).toEqual(expectedActions)
});


test('should return the initial state', () => {
  expect(dataReducer(undefined, {})).toEqual(
    INITIAL_STATE
  )
});


test('Should return features within map bounds', () => {
  let state = {
    features: mockData.features,
    isFetching: false,
    error: undefined,
    filteredFeatures: mockData.features,
    mapBounds: undefined,
    areaSize: {
      minSize: 0, maxSize: 0
    },
    material: 'all'
  }
  let mockBounds = { "NE": { "long": 153.92958042897322, "lat": -27.725093888567443 }, "SW": { "long": 152.65516636647322, "lat": -28.11339720230221 } };

  expect(dataReducer(state, getDataWithinBounds(mockBounds)).filteredFeatures.length).toEqual(
    93
  )
});

test('Should return features with material = Gravel', () => {
  let state = {
    features: mockData.features,
    isFetching: false,
    error: undefined,
    filteredFeatures: mockData.features,
    mapBounds: undefined,
    areaSize: {
      minSize: 0, maxSize: 0
    },
    material: 'all'
  }

  expect(dataReducer(state, setMaterial('Gravel')).filteredFeatures[0].properties.material).toEqual(
    'Gravel'
  )
});