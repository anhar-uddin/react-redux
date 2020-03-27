import React, { useEffect } from 'react';
import './App.scss';
import Map from "./components/Map";
import SizeChart from './components/SizeChart';
import ConstructionMaterialChart from './components/ConstructionMaterialChart';
import { fetchData, fetchDataSuccess } from './store/actions/data';
import { useDispatch, useSelector } from 'react-redux';

function App() {
  const dispatch = useDispatch();
  const state: any = useSelector(state => state);

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
    console.log('The link was clicked.', state.data);
  }


  return (
    <div className="container-fluid">
      <div className="row">
        {/* <a href="#" onClick={handleClick}>
          Click me
        </a> */}
        <div className="col-12 map">
          {state.data.filteredFeatures.length ? <Map data={state.data.filteredFeatures} /> : ''}
        </div>
      </div>
      <div className="row">
        <div className="visuals-block col-6 map">
          <ConstructionMaterialChart />
        </div>
        <div className="visuals-block col-6 map">
          <SizeChart />
        </div>
      </div>
    </div>
  );
}

export default App;
