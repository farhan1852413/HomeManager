import Left from "./Left"
import Right from "./Right"
import Middle from "./Middle"
import { useEffect, useState } from "react"

const RoomDetail = ({id, data, houseId}) => {
    const [roomData, setRoomData] = useState([])
    const [devices, setDevices] = useState([]);
    const [currentRoom, setCurrentRoom] = useState()
    // console.log(data);
    // console.log(id);

    useEffect(() => {
        if(data && data.rooms){
            setRoomData(data.rooms)
        }
    },[data])

    useEffect(() => {
        const fetchDevices = async() => {
            if(!id){
                return;
            }
            if (!roomData || !Array.isArray(roomData) || roomData.length === 0) {
                console.log("House data is undefined or empty.");
                return;
            }
            const room = roomData.find(room => room._id === id)
            if(room){
                setCurrentRoom(room)
                setDevices(room.devices)
            } else {
                console.log("Room not found");
            }
        }
        fetchDevices();
    },[roomData, id, data])

    if(devices === null){
        return <div>Loading...</div>
    }
    
    return(
            <div className="flex items-stretch">
                <div className="w-1/3 box-border">
                    <Left />
                </div>
                <div className="w-1/3 box-border">
                    <Middle imageURL = {currentRoom?.img} devices = {devices} houseId={houseId} roomId={currentRoom?._id}/>
                </div>
                {/* {console.log(currentRoom._id)} */}
                <div className="w-1/3 box-border">
                    <Right isAc={currentRoom?.aC}/>
                </div>
            </div>
    )
}

export default RoomDetail