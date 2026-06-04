import AirConditioner from "./AirConditioner";
import Electricity from "./Electricity";
import BgTwo from "./styled-components/BgTwo";


const Right = ({isAc}) => {
      
    return (
        <div className="flex flex-col justify-between h-full">
        <BgTwo className="p-2 text-left flex flex-col justify-between space-y-2">
            <h1 className="m-1 opacity-75">Alerts</h1>
            <div className="m-1">
                <h1 className="text-red-500">To show alerts!</h1>
            </div>
        </BgTwo> 
        <BgTwo className = "h-[335px]">
            <AirConditioner isAc={isAc} />
        </BgTwo>
        <BgTwo>
            <Electricity  />
        </BgTwo>
        </div>
    )
}


export default Right;