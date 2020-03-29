import React, { useEffect } from 'react';
import './App.scss';
import Map from "./components/Map";
import SizeChart from './components/SizeChart';
import ConstructionMaterialChart from './components/ConstructionMaterialChart';
import { fetchData, fetchDataSuccess } from './store/actions/data';
import { useDispatch, useSelector, connect } from 'react-redux';

function App(props: { data: any }) {
  const dispatch = useDispatch();

  useEffect(() => {
    getData();
  }, []);

  function getData() {
    fetch('https://raw.githubusercontent.com/JRGranell/javascript-challenge/master/data/boat_ramps.geojson')
      .then(response => response.json())
      .then(data => {
        dispatch(fetchDataSuccess(data.features))
      })
  }

  function handleClick(e: any) {
    e.preventDefault();
    console.log('The link was clicked.', props.data);
  }


  return (
    <div className="container-fluid">
      <div className="row">
        {/* <a href="#" onClick={handleClick}>
          Click me
        </a> */}
        <div className="col-12 map">
          {props.data.filteredFeatures.length ? <Map data={props.data.filteredFeatures} /> : ''}
        </div>
      </div>
      <div className="row">
        <div className="visuals-block col-6 map">
          {props.data.filteredFeatures.length ? <ConstructionMaterialChart data={props.data.filteredFeatures} /> : ''}
        </div>
        <div className="visuals-block col-6 map">
          {props.data.filteredFeatures.length ? <SizeChart data={props.data.filteredFeatures} /> : ''}
        </div>
      </div>
    </div>
  );
}

function mapStateToProps(state: any) {
  return { data: state.data }
}

export default connect(mapStateToProps)(App);
