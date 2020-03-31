import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getDataWithinBounds } from "../store/actions/data";

export interface Props { data: any; features: any }
declare const google: any;

const Map: React.FC<Props> = props => {

    const dispatch = useDispatch();
    const initAreas: any = [];
    const [subAreas, setSubAreas] = useState(initAreas);
    const [map, setMap] = useState(0);

    useEffect(() => {
        initMap()
    }, []);

    useEffect(() => {
        initMap()
    }, [props.features]);

    useEffect(() => {
        removeAllAreas();
        renderToMaps(map);
    }, [props.data]);


    const initMap = () => {
        let initCenter = { lat: props.data[0].geometry.coordinates[0][0][0][1], lng: props.data[0].geometry.coordinates[0][0][0][0] };
        let newMap = new google.maps.Map(document.getElementById('map'), {
            center: initCenter,
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
            let bounds = {
                NE: { long: newMap.getBounds().Ua.j, lat: newMap.getBounds().Za.j }, SW: { long: newMap.getBounds().Ua.i, lat: newMap.getBounds().Za.i }
            }            
            dispatch(getDataWithinBounds(bounds))
        });

        newMap.addListener('zoom_changed', () => {
            let bounds = {
                NE: { long: newMap.getBounds().Ua.j, lat: newMap.getBounds().Za.j }, SW: { long: newMap.getBounds().Ua.i, lat: newMap.getBounds().Za.i }
            }
            dispatch(getDataWithinBounds(bounds))

        });
        setMap(newMap)
        window.setTimeout(() => {
            renderToMaps(newMap)
        }, 1000);
    }

    const renderToMaps = (m: any) => {
        let tempArray: any = [];
        props.data.forEach((feature: any) => {
    
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

    return (
        <>
                <div className="maps" id="map"></div>

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

