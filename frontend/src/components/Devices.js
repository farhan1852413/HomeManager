import React, { useState, useEffect} from "react";
import Switch from "react-switch";
import wifiIcon from "../assets/images/wifi-icon.svg";
import BgTwo from "./styled-components/BgTwo";
import BACKEND_URL from "../config";

const DeviceCard = ({ icon, name, checked = false, onToggle, isSpeed, speed, className }) => (

    <div className={`backdrop-blur-3xl m-1 rounded-3xl w-[30%] h-[120px] p-1 flex flex-col items-start justify-between ${className}`}>
        <div className="flex justify-between space-x-7 items-center">
            <img className="p-2 bg-white rounded-full scale-75" src={icon} alt={name} />
            <span className="opacity-50">{checked ? 'On' : 'Off'}</span>
        </div>
        <div className="py-1 flex flex-col m-1 space-y-1">
            <h1 className="text-left">{name}</h1>
                <div className="flex items-center">
                    <Switch
                        checked={checked}
                        onChange={onToggle}
                        onColor="#86d3ff"
                        onHandleColor="#2693e6"
                        offColor="#ffffff"
                        offHandleColor="#dddddd"
                        handleDiameter={15}
                        uncheckedIcon={false}
                        checkedIcon={false}
                        boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                        activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                        height={20}
                        width={35}
                    />
                </div>
        </div>
    </div>
);

const Devices = ({devices, houseId, roomId}) => {
    const [devicesData, setDevicesData] = useState(devices)
    const [internetSpeed, setInternetSpeed] = useState(null);
    const [hasSixDevices, setHasSixDevices] = useState(false)

    const speedCheck = () => {
        if (navigator.connection) {
            setInternetSpeed(navigator.connection.downlink);
        }
    }
    
    useEffect(() => {
        if(devicesData){
            setHasSixDevices(devicesData.length <= 5);
        }
        // console.log(devices);
        
    },[devicesData, devices])

    useEffect(() => {
        setDevicesData(devices);  // Update devicesData when devices prop changes
    }, [devices]);


    useEffect(() => {
        speedCheck();
        setInterval(speedCheck, 10 * 60 * 1000);
    }, []);

    const toggleDevice = async(index) => {
        const updatedDevice = { ...devicesData[index], status: !devicesData[index].status, lastUpdated: new Date()}
        devicesData[index] = updatedDevice;
        // console.log(updatedDevice);
        
        try{
        const response = await fetch(`${BACKEND_URL}/houses/${houseId}/rooms/${roomId}/devices/${updatedDevice._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedDevice),
        })
        // console.log(response);
        
        if(!response.ok) throw new Error(`Error updating device status: ${response.statusText}`)
        const updatedDeviceFromBackend = await response.json();
        console.log("Data from backend:",updatedDeviceFromBackend);
        // devicesData[index] = updatedDeviceFromBackend;
        devicesData[index] = updatedDeviceFromBackend

        const newDevicesData = devicesData.map((device, i) => 
            i === index ? updatedDeviceFromBackend : device
        );

        setDevicesData(newDevicesData);
        // console.log(devicesData);
        
        }
        catch(error){
            console.error('Error updating device status:', error);
            // Handle error gracefully, e.g., show an error message to the user
        };
    };

    // useEffect(() => {
    //     console.log('Devices Data Updated:', devicesData);
    // }, [devicesData]);

    return devicesData && (
        <div className={`flex flex-wrap justify-center items-center mx-auto w-full ${
            hasSixDevices ? 'gap-y-8' : ''
        }`}>
        <BgTwo className='w-[30%] h-[120px] p-1 flex flex-col items-start justify-between'>
            <div className="flex justify-between space-x-7 items-center">
                <img className="p-2 bg-white rounded-full scale-75" src={wifiIcon} alt="internet" />
            </div>
            <div className="py-1 flex flex-col m-1 space-y-1">
                <h1 className="text-left">Internet</h1>
                <h1 className="text-[11px] opacity-75">{internetSpeed} Mbit/s</h1>
            </div>
        </BgTwo>
            {devicesData.map((device, index) => {
                return (
                <DeviceCard
                key={index}
                icon={`${BACKEND_URL}/images/${device.icon}`}
                name={device.name}
                isSpeed={device.isSpeed || false}
                speed={device.isSpeed ? internetSpeed : null}
                checked={device.status}
                onToggle={() => toggleDevice(index)}
                className={device.status ? 'bg-[#3495de]' : 'bg-white/20'}
            />
                )
            })} 
        </div>
    );
};

export default Devices;
