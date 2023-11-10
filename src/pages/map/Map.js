import GoogleMapReact from 'google-map-react';

const AnyComponent = ({text}) => {return <div className="">{text}</div>}

const Map = () => {
    const defaultProps = {
        center: {
          lat: -7.282065711602091,
          lng: 112.79555694522266
        },
        zoom: 15
      };
    return ( 
        <>
            <p className="text-3xl font-semibold text-left pt-3 pb-7">Lokasi statiusn yang ada</p>
            <div className="w-full h-[600px]">
                <GoogleMapReact
                    bootstrapURLKeys={{ key: "" }}
                    defaultCenter={defaultProps.center}
                    defaultZoom={defaultProps.zoom}
                >
                    <AnyComponent
                    lat={-7.282065711602091}
                    lng={112.79555694522266}
                    text="My Marker"
                    />
                </GoogleMapReact>
            </div>
        </>
     );
}
 
export default Map;