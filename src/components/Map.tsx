import React, { useEffect } from "react";
import GoogleMapReact from 'google-map-react';
import { useDispatch } from "react-redux";
import { getDateWithinBounds } from "../store/actions/data";

export interface Props { data: any; }
declare const google: any;

const Map: React.FC<Props> = props => {

    let map: any;
    let coordinates: any[] = [];
    let bounds = new google.maps.LatLngBounds();
    const dispatch = useDispatch();

    // constructor(props: any) {
    //     super(props);
    //     console.log('props', props);
    //     this.dispatch = useDispatch();
    // }


    useEffect(() => {
        initMap()
        renderToMaps();
        // map.setOptions({ maxZoom: 15 });
        map.fitBounds(bounds);
    }, []);


    const initMap = () => {
        map = new google.maps.Map(document.getElementById('map'), {
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
        map.addListener('center_changed', () => {
            // 3 seconds after the center of the map has changed, pan back to the
            // marker.
            // window.setTimeout(function() {
            //   map.panTo(marker.getPosition());
            // }, 3000);
            // console.log('map changed', this.map.getBounds());
            // this.dispatch(getDateWithinBounds(this.map.getBounds()));

        });

        map.addListener('zoom_changed', () => {
            // 3 seconds after the center of the map has changed, pan back to the
            // marker.
            // window.setTimeout(() => {
            //     console.log('huh');

            // //   map.panTo(marker.getPosition());
            // }, 3000);
            console.log('zoom_changed changed', map.getBounds());
            // dispatch(getDateWithinBounds(map.getBounds()))

        });
    }

    const renderToMaps = () => {
        // map.setOptions({ maxZoom: 15 });
        // map.fitBounds(bounds);
        props.data.forEach((feature: any) => {
            if (feature.geometry.type === "MultiPolygon") {
                renderCoordinate(feature.geometry.coordinates[0][0]);
            } else if (feature.geometry.type === "Polygon") {
                renderCoordinate(feature.geometry.coordinates[0]);
            }

            let sortedCord = sortCords(feature.geometry.coordinates[0]);
            let sub_area = new google.maps.Polygon({
                paths: sortedCord,
                strokeColor: '#FF0000',
                strokeOpacity: 0.8,
                strokeWeight: 2,
                fillColor: '#FF0000',
                fillOpacity: 0.35,
                editable: false
            });

            sub_area.setMap(map);
        });
    }

    const sortCords = (cords: any) => {
        return cords[0].map((ll: any) => {
            return { lat: ll[1], lng: ll[0] }
        });
    }

    const renderCoordinate = (paths: any) => {
        let position = 0;
        paths.map((location: any) => {
            if (position % 10 === 0) {
                coordinates.push({ "lat": location[1], "lng": location[0] });
                bounds.extend({ "lat": location[1], "lng": location[0] });
            }
            position++
            return true;
        });
    }

    return (
        <>
            <div className="map-conatiner">
                <div className="maps" id="map"></div>
            </div>

        </>
    );
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

