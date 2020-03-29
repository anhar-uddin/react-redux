import React, { useEffect, useState } from "react";
import GoogleMapReact from 'google-map-react';
import { useDispatch } from "react-redux";
import { getDateWithinBounds } from "../store/actions/data";

export interface Props { data: any; }
declare const google: any;

const Map: React.FC<Props> = props => {

    // let map: any;
    let coordinates: any[] = [];
    let bounds = new google.maps.LatLngBounds();
    const dispatch = useDispatch();
    const subA: any = [];
    const [subAreas, setSubAreas] = useState(subA);
    const [map, setMap] = useState(0);

    useEffect(() => {
        initMap()
    }, []);

    useEffect(() => {
        removeAllAreas();
        renderToMaps(map);
    }, [props.data]);


    const initMap = () => {
        let newMap = new google.maps.Map(document.getElementById('map'), {
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

        newMap.addListener('center_changed', () => {
  
        });

        newMap.addListener('zoom_changed', () => {
            let bounds = {
                NE: { long: newMap.getBounds().Ua.j, lat: newMap.getBounds().Za.j }, SW: { long: newMap.getBounds().Ua.i, lat: newMap.getBounds().Za.i }
            }
            dispatch(getDateWithinBounds(bounds))

        });
        setMap(newMap)
        window.setTimeout(() => {
            renderToMaps(newMap)
            //   map.panTo(marker.getPosition());
        }, 1000);
    }

    const renderToMaps = (m: any) => {
        let tempArray: any = [];
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
            tempArray.push(sub_area)
            setSubAreas(tempArray);
            sub_area.setMap(m);
        });

    }

    const removeAllAreas = () => {
        subAreas.forEach((subArea: any) => {
            subArea.setMap(null)
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

