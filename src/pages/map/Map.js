import { MapContainer, TileLayer, Marker } from 'react-leaflet'
import { useState, useMemo, useId, useEffect } from 'react';
import { createPortal } from "react-dom";
import L from 'leaflet';
import { useNavigate } from 'react-router-dom';
import { useStatistic } from '../../hooks/useStatistic';
import { useGetData } from '../../hooks/useGetData';

const MarkerCustom = ({text, color}) => {
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
            <p className={`${text.startsWith('AWLR') ? 'rounded-full' : ''} ${color} px-3 text-lg whitespace-nowrap`}>{text}</p>
        </div>
    )
}

const EnhancedMarker = ({
    eventHandlers,
    icon: providedIcon,
    ...otherProps
  }) => {
    const [markerRendered, setMarkerRendered] = useState(false);
    const id = "marker-" + useId();
  
    const icon = useMemo(
      () =>
        L.divIcon({
          html: `<div id="${id}"></div>`,
          className: 'dummy'
        }),
      [id]
    );
  
    return (
      <>
        <Marker
          {...otherProps}
          eventHandlers={{
            ...eventHandlers,
            add: (...args) => {
              setMarkerRendered(true);
              if (eventHandlers?.add) eventHandlers.add(...args);
            },
            remove: (...args) => {
              setMarkerRendered(false);
              if (eventHandlers?.remove) eventHandlers.remove(...args);
            },
          }}
          icon={icon}
        />
        {markerRendered &&
          createPortal(providedIcon, document.getElementById(id))}
      </>
    );
  };

const Map = () => {
    const stasiun = {
        'AWLR Purwodadi': [-7.80483304165883, 112.74396200866504],
        'AWLR Dhompo': [-7.657989032817421, 112.86132803433979],
        'ARR Cendono': [-7.75797992, 112.69253151],
        'ARR Lawang': [-7.832884, 112.697698]
    }
    const defaultProps = {
        center: {
          lat: -7.764863 ,
          lng: 112.760337
        },
        zoom: 11
    };

    const colorMapStatus = {
      'Aman' : 'bg-green-400 group-hover:bg-green-500',
      'Siaga' : 'bg-yellow-400 group-hover:bg-yellow-500',
      'Bahaya' : 'bg-red-400 group-hover:bg-red-500',
      "Undefined": 'bg-white'
    }

    const colorMapCurahHujan = {
      'Tidak Hujan': 'bg-green-200 group-hover:bg-green-400',
      'Sangat Ringan': 'bg-aqua-400 group-hover:bg-aqua-600',
      'Ringan': 'bg-blue-400 group-hover:bg-blue-600',
      'Sedang': 'bg-yellow-400 group-hover:bg-yellow-600',
      'Lebat': 'bg-orange-400 group-hover:bg-orange-600',
      'Sangat Lebat': 'bg-red-400 group-hover:bg-red-600',
    }

    const getStatus = (value, stasiunLimitAir) => {
      if (!stasiunLimitAir) {
        return "Undefined"
      }
      return value <= stasiunLimitAir[0] ? "Aman" : value > stasiunLimitAir[0] && value < stasiunLimitAir[1] ? "Siaga" : value >= stasiunLimitAir[1] ? "Bahaya" : "Undefined"
    }

    const getStatusCurahHujan = (value) => {
      if (value >= 20)
        return "Sangat Lebat"
      else if (value >= 10)
        return "Lebat"
      else if (value >= 5)
        return "Sedang"
      else if (value >= 1)
        return "Ringan"
      else if (value >= 0.1)
        return "Sangat Ringan"
      else
        return "Tidak Hujan"
    }

    const [loading, setIsLoading] = useState(true);
    const [aktualData, setAktualData] = useState({});
    const [limitAir, setLimitAir] = useState({});
    const {getChartData} = useStatistic();
    const {getStasiunLimitAir, getSensorHistory} = useGetData();

    console.log(aktualData);

    useEffect(() => {
      const loadData = async () => {
        const stationNames = Object.keys(stasiun)
        const data = await Promise.all(
          stationNames.map(async item => {
            const [typ, stasiunName] = item.split(" ")
  
            // check if awlr or arr
            if (typ === "AWLR") {
              const res = await getChartData("def", stasiunName === "Dhompo" ? "lstm" : "gru", stasiunName, 5)
              const resLimitAir = await getStasiunLimitAir("def", stasiunName === "Dhompo" ? 1 : 2)
              const {batas_air_siaga, batas_air_awas} = resLimitAir.data || [-1, -1]
              let newLimitAir = limitAir
              newLimitAir[item] = [batas_air_siaga, batas_air_awas]
              setLimitAir(newLimitAir)

              let aktual = -1;
              if (res) {
                res.data.map(item => {
                  if (item.aktual) {
                      aktual = item.aktual
                  }
                })
              }
              // set the actual data
              let newData = aktualData
              newData[item] = aktual
              setAktualData(newData)
            } else {
              let res = await getSensorHistory("def", 0, 1, stasiunName)
              res = res.data.history[0]
              
              let newData = aktualData
              newData[item] = stasiunName === "Cendono" ? res.curah_hujan_cendono : res.curah_hujan_lawang;
              setAktualData(newData)
            }
          })
        )

        setIsLoading(false)
      }

      // call the functions
      loadData()
    }, [])


    return ( 
        <>
            <div className='text-left'>
                <p className="text-3xl font-semibold text-left my-3">FLOOD FORECASTING AND WARNING SYSTEM</p>
                <p className="text-sm italic mb-5">Sistem Peramalan dan Peringatan Banjir</p>
            </div>
            <p className="text-sm text-black italic mt-5 font-semibold">Petunjuk :  untuk melihat peramalan dan peringatan dini di stasiun monitoring, silakan klik titik stasiun monitoring yang diinginkan</p>
            <div className="w-full">
                <MapContainer center={[defaultProps.center.lat, defaultProps.center.lng]} zoom={defaultProps.zoom} scrollWheelZoom={false} style={{height: '50vh'}}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {!loading && Object.keys(stasiun).map((item, i) => (
                        <EnhancedMarker position={stasiun[item]} key={i} icon={
                          item.startsWith("ARR") ? 
                          <MarkerCustom text={item} color={colorMapCurahHujan[getStatusCurahHujan(aktualData[item])]}/>
                          :
                        <MarkerCustom text={item} color={colorMapStatus[getStatus(aktualData[item], limitAir[item])]}/>
                      }/>
                    ))}
                </MapContainer>
            </div>
            <div className="flex flex-row">
                <div className='w-[80%]'>
                  <p className='text-lg font-semibold'> Simulasi penelusuran banjir DAS Welang</p>
                  <div className="flex flex-row">
                    <div className="w-[50%]">
                        <img src="Hilir.gif" alt="" className="w-full object-contain"/>
                    </div>
                    <div className="w-[50%]">
                        <img src="Hulu.gif" alt="" className="w-full object-contain"/>
                    </div>
                  </div>
                </div>
                <div className='p-5'>
                  <p className="font-semibold py-3">Keterangan pada Peta</p>
                      <div className="flex items-center">
                        <div className="w-[50px] h-[20px] border-2 border-black mx-1"></div>
                        <p>Curah Hujan</p>
                      </div>
                      <div className="flex items-center my-3">
                        <div className="w-[50px] h-[20px] border-2 rounded-full border-black mx-1"></div>
                        <p>Air Sungai</p>
                      </div>
                </div>
            </div>
        </>
     );
}
 
export default Map;
