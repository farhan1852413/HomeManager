import Devices from "./Devices"
import BgTwo from "./styled-components/BgTwo"
import livingRoom from "../assets/images/living-room.jpg"
import BACKEND_URL from "../config";

const Middle = ({imageURL, devices, houseId, roomId}) => {
    return (
        <div className="flex flex-col justify-between h-full">
                <BgTwo className="">
                    <img className="rounded-3xl p-2" src={imageURL? `${BACKEND_URL}/images/${imageURL}` : livingRoom} alt={imageURL} />
                </BgTwo>
            <div className="flex-grow flex items-center justify-center">
                <Devices devices={devices} houseId={houseId} roomId={roomId}/>
            </div>
        </div>
    )
}

export default Middle