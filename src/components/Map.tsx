import React from "react";
import GoogleMapReact from 'google-map-react';

export interface Props { data: any; }
declare const google: any;

class Map extends React.Component<Props, {}> {

    map: any;
    coordinates: any[] = [];
    bounds = new google.maps.LatLngBounds();

    constructor(props: any) {
        super(props);
        console.log('props', props);
    }

    componentDidMount() {
        this._initMap()
        this.renderToMaps();
    }

    _initMap() {
        this.map = new google.maps.Map(document.getElementById('map'), {
            center: { lat: -27.897575560605485, lng: 153.29237339772322 },
            zoom: 10,
            zoomControl: true,
            zoomControlOptions: {
                position: google.maps.ControlPosition.RIGHT_CENTER
            },
            scrollwheel: false,
            streetViewControl: false,
            mapTypeControl: false,
            mapTypeId: 'roadmap',
        });
        this.map.addListener('center_changed', () => {
            // 3 seconds after the center of the map has changed, pan back to the
            // marker.
            // window.setTimeout(function() {
            //   map.panTo(marker.getPosition());
            // }, 3000);
            // console.log('map changed', this.map.getBounds());

        });

        this.map.addListener('zoom_changed', () => {
            // 3 seconds after the center of the map has changed, pan back to the
            // marker.
            // window.setTimeout(function() {
            //   map.panTo(marker.getPosition());
            // }, 3000);
            // console.log('zoom_changed changed', this.map.getBounds());

        });
    }

    renderToMaps() {
        this.props.data.forEach((feature: any) => {
            if (feature.geometry.type === "MultiPolygon") {
                this.renderCoordinate(feature.geometry.coordinates[0][0]);
            } else if (feature.geometry.type === "Polygon") {
                this.renderCoordinate(feature.geometry.coordinates[0]);
            } else {
                alert('option.geojson.type: MultiPolygon & Polygon');
            }

            let sub_area = new google.maps.Polygon({
                paths: feature.geometry.coordinates,
                strokeColor: '#FF0000',
                strokeOpacity: 0.8,
                strokeWeight: 2,
                fillColor: '#FF0000',
                fillOpacity: 0.35,
                editable: true
            });

            sub_area.setMap(this.map);
            this.map.setOptions({ maxZoom: 15 });
            this.map.fitBounds(this.bounds);

        });
    }

    getFormattedCoordinates(paths: any){
        console.log('');
    }

    renderCoordinate(paths: any) {
        let position = 0;
        paths.map((location: any) => {
            if (position % 10 === 0) {
                this.coordinates.push({ "lat": location[1], "lng": location[0] });
                this.bounds.extend({ "lat": location[1], "lng": location[0] });
            }
            position++
            return true;
        });
    }


    // renderToMaps() {
    //     this.props.data.forEach((feature: any) => {
    //     //   if(coordinates.length > 1){
    //     //     sub_area = new window.google.maps.Polygon({
    //     //       paths: coordinates,
    //     //       strokeColor: color[1],
    //     //       strokeOpacity: 0.8,
    //     //       strokeWeight: 2,
    //     //       fillColor: color[1],
    //     //       fillOpacity: 0.35,
    //     //       editable: true
    //     //     });
    //     }
    //     // selectedOptions.forEach((option) => {

    //     //   if(option.geojson.type === "MultiPolygon"){
    //     //     this.renderCoordinate(option.geojson.coordinates[0][0]);
    //     //   }else if(option.geojson.type === "Polygon"){
    //     //     this.renderCoordinate(option.geojson.coordinates[0]);
    //     //   }else{
    //     //     alert('option.geojson.type: MultiPolygon & Polygon');
    //     //   }

    //     //   if(coordinates.length > 1){
    //     //     sub_area = new window.google.maps.Polygon({
    //     //       paths: coordinates,
    //     //       strokeColor: color[1],
    //     //       strokeOpacity: 0.8,
    //     //       strokeWeight: 2,
    //     //       fillColor: color[1],
    //     //       fillOpacity: 0.35,
    //     //       editable: true
    //     //     });

    //     //     sub_area.setMap(map);
    //     //     map.setOptions({ maxZoom: 15 });
    //     //     map.fitBounds(bounds);

    //     //     coordinates = [];
    //     //   }
    //     // })

    // }

    render() {
        return (
            <>
                <div className="map-conatiner">
                    <div className="maps" id="map"></div>

                    {/* <GoogleMapReact
                        bootstrapURLKeys={{ key: 'AIzaSyDPB-kOrZArLYazR1XTIIiBcVwP7wvMXEk' }}
                        defaultCenter={{
                            lat: 11.0168, lng: 76.9558
                        }}
                        defaultZoom={13}
                    >
                        <Marker
                            lat={11.0168}
                            lng={76.9558}
                            name="My Marker"
                            color="blue"
                        />
                    </GoogleMapReact> */}
                </div>

            </>
        );
    }
}

export default Map;


const Marker = (props: any) => {
    const { color, name, id } = props;
    return (
        <div className="marker"
            style={{ backgroundColor: color, cursor: 'pointer' }}
            title={name}
        />
    );
};

