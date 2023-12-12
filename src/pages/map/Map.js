import GoogleMapReact from 'google-map-react';
import { useNavigate } from 'react-router-dom';

const Marker = ({text}) => {
    const navigate = useNavigate()
    const handleNavigate = () => {
        if (text.startsWith('AWLR') || text.startsWith('awlr')) {
            navigate(`/dashboard/${text.split(' ')[1]}`)
        } else {
            navigate(`/history/${text.split(' ')[1]}`)
        }
    }
    return (
        <div onClick={handleNavigate}
        className="flex items-center font-semibold w-fit px-3 h-[50px] cursor-pointer group">
            <div className="w-[30px] h-[30px] rounded-full overflo-hidden shadow border border-blue-700 mr-2">
                <img src="https://cdn-icons-png.flaticon.com/512/119/119573.png" alt="ICN" className='w-full h-full object-cover'/>
            </div>
            <p className='rounded-md bg-yellow-100 px-3 text-lg whitespace-nowrap group-hover:bg-yellow-400'>{text}</p>
        </div>
    )
}

const Map = () => {
    const stasiun = {
        'AWLR Purwodadi': [-7.80483304165883, 112.74396200866504],
        'AWLR Dhompo': [-7.657989032817421, 112.86132803433979],
        'ARR Cendono': [-7.75797992, 112.69253151],
        'ARR Lawang': [-7.832884, 112.697698]
    }
    const defaultProps = {
        center: {
          lat: -7.724863 ,
          lng: 112.760337
        },
        zoom: 11.5
      };

    const handleApiLoaded = (map, maps) => {
    // use map and maps objects
    console.log(map); console.log(maps);
    };
    return ( 
        <>
            <div className='text-left'>
                <p className="text-3xl font-semibold text-left my-3">FLOOD FORECASTING AND WARNING SYSTEM</p>
                <p className="text-sm italic mb-5">Sistem Peramalan dan Peringatan Banjir</p>
            </div>
            <div className="w-full h-[600px]">
                <GoogleMapReact
                    bootstrapURLKeys={{ key: process.env.REACT_APP_MAP_API_KEY }}
                    defaultCenter={defaultProps.center}
                    defaultZoom={defaultProps.zoom}
                    yesIWantToUseGoogleMapApiInternals
                    onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
                >
                    {Object.keys(stasiun).map((item, i) => (
                        <Marker text={item} key={i} lat={stasiun[item][0]} lng={stasiun[item][1]}/>
                    ))}
                </GoogleMapReact>
            </div>
            <p className="text-sm text-black italic mt-5 font-semibold">Petunjuk :  untuk melihat peramalan dan peringatan dini di stasiun monitoring, silakan klik titik stasiun monitoring yang diinginkan</p>
        </>
     );
}
 
export default Map;
