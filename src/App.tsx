import React, { useEffect } from 'react';
import './App.scss';
import Map from "./components/Map";
import SizeChart from './components/SizeChart';
import ConstructionMaterialChart from './components/ConstructionMaterialChart';
import { fetchData, fetchDataSuccess, resetData } from './store/actions/data';
import { useDispatch, useSelector, connect } from 'react-redux';

export function App(props: { data: any }) {
  const dispatch = useDispatch();

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    fetch('https://raw.githubusercontent.com/JRGranell/javascript-challenge/master/data/boat_ramps.geojson')
      .then(response => response.json())
      .then(data => {
        dispatch(fetchDataSuccess(data.features))
      })
  }
  const outOfBoundsMessage = () => {
    return <div className="row">
      <div className="col-12 text-center">
        <p>No data is available for area, try <a href="#" onClick={e => dispatch(resetData('map'))}>resetting</a> the map</p>
      </div>
    </div>
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-12 map">
          <div className="card shadow mt-4">
            <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
              <h6 data-test-id="map-heading-text" className="m-0 font-weight-bold text-primary">Map</h6>
              <a href="#" onClick={e => dispatch(resetData('map'))} className="btn btn-sm btn-primary shadow-sm">Reset Map</a>
            </div>
            <div className="map-conatiner">
              {props.data.filteredFeatures.length ? <Map data={props.data.filteredFeatures} features={props.data.features} /> : outOfBoundsMessage()}
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="visuals-block col-6 map">
          <div className="card shadow mt-4">
            <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
              <h6 data-test-id="material-heading-text" className="m-0 font-weight-bold text-primary">Material Type</h6>
              {props.data.material !== 'all' ? <a href="#" onClick={e => dispatch(resetData('material'))} className="btn btn-sm btn-primary shadow-sm">Reset Data</a> : ''}
            </div>
            {props.data.filteredFeatures.length ? <ConstructionMaterialChart data={props.data.filteredFeatures} /> : ''}
          </div>
        </div>
        <div className="visuals-block col-6 map">
          <div className="card shadow mt-4">
            <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
              <h6 data-test-id="area-size-heading-text" className="m-0 font-weight-bold text-primary">Area Size</h6>
              {props.data.areaSize.maxSize !== 1000? <a href="#" onClick={e => dispatch(resetData('area_size'))} className="btn btn-sm btn-primary shadow-sm">Reset Data</a> : ''}
            </div>
            {props.data.filteredFeatures.length ? <SizeChart data={props.data.filteredFeatures} /> : ''}
          </div>
        </div>
      </div>
    </div>
  );
}

function mapStateToProps(state: any) {
  return { data: state.data }
}

export default connect(mapStateToProps)(App);
