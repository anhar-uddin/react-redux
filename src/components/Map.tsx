import React from "react";
import GoogleMapReact from 'google-map-react';

export interface Props { data: any; }

class Map extends React.Component<Props, {}> {

    constructor(props: any) {
        super(props);
        console.log('props', props);
    }

    render() {
        return (
            <>
                <div className="map-conatiner">
                    <GoogleMapReact
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
                    </GoogleMapReact>
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

