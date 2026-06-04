import { useEffect, useMemo, useState } from "react";
import useData from "../utils/useData";
import closeIcon from "../assets/images/close-icon.svg"
import { toastSuccess, toastWarning } from "../utils/Toast";
import BACKEND_URL from "../config";

const Form = ({handleForm, addButton}) => {
    const [localRoomName, setLocalRoomName] = useState('');
    const [suggestions, setSuggestions] = useState([])
    const [dropdownOpen, setDropdownOpen] = useState(false)
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [ac, setAc] = useState(false)
    const {userHouseData} = useData()
    const [selectOption, setSelectedOption] = useState('Select an option')
    const [user, setUser] = useState('');
    const devices = ['Light', 'Fan', 'TV', 'Fridge', 'Heater', 'Coffee Maker'];
    const rooms = useMemo(() => {
        return ['Living Room', 'Bed Room', 'Kitchen Room', 'Dining Room', 'Study Room']
    }, []) 
    const [addedDevices, setAddedDevices] = useState(['Security', 'Camera']);
    const [isChecked, setIsChecked] = useState({
        Light: false,
        Fan: false,
        TV: false,
        Fridge: false,
        Heater: false,
        'Coffee Maker': false
    });
    const handleCheckbox = (name) => {
        setIsChecked((prevStates) => {
            return {
                ...prevStates,
                [name]: !prevStates[name]
            }
        });
        setAddedDevices((prevDevices) => {
            if (prevDevices.includes(name)){
                return prevDevices.filter(device => device !== name)
            } else {
                return [...prevDevices, name]
            }
        });
    }
    const handleChange = (e) => {
        const newRoom = e.target.value
        setLocalRoomName(newRoom)
        if(newRoom){
            const filteredSuggestions = rooms.filter(room => room.toLowerCase().includes(newRoom.toLowerCase()))
            setSuggestions(filteredSuggestions)
        } else {
            setSuggestions(rooms);
        }
    }
    const handleClick = async(e) => {
        e.preventDefault();
        if(localRoomName.trim() && selectOption !== 'Select an option'){
            const roomId = await postRooms(localRoomName);
            // console.log(localRoomName);
            addButton(roomId)
            toastSuccess('Added '+ localRoomName)
            setLocalRoomName('')
        } else if(!localRoomName){
            toastWarning("Please enter your room name")
            return;
        } else if(selectOption === 'Select an option'){
            toastWarning("Please select an option")
            return;
        }
    }

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen)
    }

    const handleSelectOption = (option) => {
        setSelectedOption(option);
        setDropdownOpen(false);
    }

    const postRooms = async(localRoomName) => {
        const token = localStorage.getItem('token');
        if(user && localRoomName){
            const response = await fetch(`${BACKEND_URL}/house`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`, 
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userName: user,
                    room: {
                        roomName: localRoomName,
                        aC: ac,
                        img: localRoomName.toLowerCase().replace(/\s+/g, "") + ".jpg",
                        devices: addedDevices.map((device, deviceIndex) => ({
                                id: deviceIndex,
                                icon: device.toLowerCase().replace(/\s+/g, "") + ".svg",
                                name: device,
                                status: false
                        }))
                    }
                })
            })
        if(!response.ok){
            console.log("failed");
            
        }
            const data = await response.json()
            console.log("Successfully added in database", data)
            console.log(data.house);
            
            const roomName = await data?.house?.rooms?.find(room => room.roomName === localRoomName)
            return roomName?._id
        }
    }

    useEffect(() => {
        setSuggestions(rooms);
    }, [rooms])

    useEffect(() => {
        const getUserName = async () => {
            const response = await fetch(`${BACKEND_URL}/users/${localStorage.getItem('userId')}`);
            const data = await response.json();
            // console.log(data);
            setUser(data.firstName);
        }
        getUserName();
    },[])

    return (
        <form onSubmit={handleClick}>
        <div className={`backdrop-blur-3xl p-3 rounded-3xl ${userHouseData?.rooms ? 'bg-black/50' : 'bg-black'} `}>
            <div className="flex flex-col items-center">
                <div className="m-2 flex justify-center flex-col items-start relative">
                    <label className="mb-1 text-lg" htmlFor="room-name">Name of the Room:</label>
                    <input className="rounded-lg w-80 border-2 p-2 bg-transparent focus:outline-none" onClick={() => setShowSuggestions(true)} onChange={handleChange} value={localRoomName} type="text" name="room-name" placeholder="Enter name of the room"/>
                    {suggestions && showSuggestions && (
                    <ul className="mt-2 border-2 z-20 rounded-lg w-80 absolute top-full bg-black/80">
                    {suggestions.map((suggestion, index) => (
                        <li onMouseOver={() => setLocalRoomName(suggestion)}
                            onMouseOut={() => setLocalRoomName("")}
                            key={index} 
                            className="p-2 m-1 cursor-pointer hover:bg-blue-500 rounded-lg"
                            onClick={() => {
                                setLocalRoomName(suggestion)
                                setShowSuggestions(false)
                            }}
                        >
                            {suggestion}
                        </li>
                    ))}
                </ul>
            )}

                </div>
                <div className="grid grid-cols-3 gap-3 p-2" onClick={() => setShowSuggestions(false)}>
                {devices.map((device, index) => {
                    return (
                        <div key={index} className="flex items-center space-x-1">
                            <input type="checkbox" className={`appearance-none w-3 h-3 
                                border-2 ${isChecked[device]? 'bg-blue-800' : 'bg-white'} rounded-full border-grey-400 
                                cursor-pointer`} name="checkbox" onChange={() =>handleCheckbox(device)}/>
                            <label htmlFor="checkbox" className="text-base">{device}</label>
                    </div>
                    )
                })}
                </div>
                <div className="flex items-center space-x-2 m-2 mb-3">
                    <p className="text-lg">Looking to stay cool? </p>
                    <div className="relative border rounded-lg w-48 z-10">
                        <button type="button" className="w-48 p-1" onClick={toggleDropdown}>{selectOption}</button>
                        {dropdownOpen && (
                            <ul className="absolute bg-black/50 border cursor-pointer mt-1 w-full rounded-lg left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                                <li className="hover:bg-blue-500 rounded-lg p-1 m-1" onClick={() => {
                                    handleSelectOption('Add an A/c!')
                                    setAc(true)
                                }}>Add an A/C</li>
                                <li className="hover:bg-blue-500 rounded-lg p-1 m-1" onClick={() => {
                                    handleSelectOption('Enjoy the natural breeze!')
                                    setAc(false)
                                }}>Enjoy the natural breeze</li>
                            </ul>
                        )}
                    </div>
                </div>
                <div>
                    <button className="bg-gradient-to-r from-[#000046] to-[#1CB5E0] px-4 py-1 rounded-3xl hover:opacity-85 text-lg active:scale-95" type="submit">Add</button>
                </div>
            </div>
            <img
                className="absolute top-0 right-0 m-2 cursor-pointer hover:opacity-75 active:scale-90"
                src={closeIcon}
                alt="close-icon"
                onClick={handleForm} // Add onClick handler to close the form
            />
        </div> 
        </form>   
    )
}

export default Form;