import powerIcon from "../assets/images/power-icon.svg"
import {CircularProgressbar} from "react-circular-progressbar"
import 'react-circular-progressbar/dist/styles.css'
import plusIcon from "../assets/images/plus-icon.svg"
import minusIcon from "../assets/images/minus-icon.svg"
import fanIcon from "../assets/images/fan-icon.svg"
import timerIcon from "../assets/images/timer-icon.svg"
import normalIcon from "../assets/images/normal-icon.svg"
import errorIcon from "../assets/images/error.svg"
import { useState } from "react"
import heatIcon from "../assets/images/heat-icon.svg"
import coolIcon from "../assets/images/cool-icon.svg"

const AirConditioner = ({isAc}) => {
    const [value, setValue] = useState(20);
    const [control, setControl] = useState(false);
    const [fanSpeed, setFanSpeed] = useState("Fan");
    const [timer, setTimer] = useState("Timer");
    const speeds = ["Slow", "Med", "Fast"]
    const times = ["2 hrs", "5 hrs", "8 hrs", "Off"]
    const [mode, setMode] = useState("Mode");
    const modes = ["Cool", "Heat"];
    const [icon, setIcon] = useState(normalIcon)
    const icons = [coolIcon, heatIcon]
 
    const handleIncrement = () => {
        if(value < 34){
            setValue(value + 1);
        }        
    }
    const handleDecrement = () => {
        if(value > 16){
            setValue(value - 1);
        }
    }
    const handleClick = () => {
        setControl((prevState) => {
            return !prevState
        })
    }
    const calcColor = (value, min, max) => {
        const ratio = (value - min) / (max - min);
        return `hsl(${ratio * 120}, 100%, 50%)`; // Generates a color based on the value.
    };
    const handleFanSpeed = () => {
        if(fanSpeed === "Fan Speed"){
            setFanSpeed("Slow")
        } else {
            const curInd = speeds.indexOf(fanSpeed);
            const nexInd = (curInd + 1) % speeds.length;
            setFanSpeed(speeds[nexInd])
        }
    }
    const handleTimer = () => {
        if(timer === "Timer"){
            setTimer("2 hrs")
        } else {
            const curInd = times.indexOf(timer);
            const nexInd = (curInd + 1) % times.length;
            setTimer(times[nexInd])
        }
    }
    const handleMode = () => {
        if(mode === "Mode"){
            setMode("Cool")
            setIcon(coolIcon)
        } else {
            const curMode = modes.indexOf(mode)
            const nexMode = (curMode + 1) % modes.length;
            // const curIcon = icons.indexOf(icon)
            // const nexIcon = (curIcon + 1) % icons.length
            setMode(modes[nexMode])
            setIcon(icons[nexMode])
        }
    }

    return (
        <div className="p-2 h-full flex items-center justify-center">
            {isAc? (
            <div className="">
            <div className="flex justify-between m-2">
                <div className="items-center flex space-x-2">
                    <div className={`w-2 h-2 shadow-2xl rounded-full ${control ? 'bg-green-500 shadow-green-500 animate-pulse' : 'bg-red-500 shadow-red-500'}`}></div>
                    <h1 className="text-white">Air Conditioner</h1>
                </div>
                <button onClick={handleClick}>
                <img className="cursor-pointer" src={powerIcon} alt="power-icon" />
                </button>
            </div>
            <div className="flex justify-between">
            <div className="m-3">
            <div className="relative w-56 h-56 mx-auto">
                <CircularProgressbar
                    value={value}
                    minValue={16}
                    text={`${value}\u00B0c`}
                    maxValue={34}
                    circleRatio={0.7}
                    styles={{
                    trail: {
                        strokeLinecap: 'round',
                        transform: 'rotate(-126deg)',
                        transformOrigin: 'center center',
                    },
                    path: {
                        strokeLinecap: 'round',
                        transform: 'rotate(-126deg)',
                        transformOrigin: 'center center',
                        stroke: calcColor(value, 0, 120),
                    },
                    text: {
                        fill: '#ddd',
                    },
                    }}
                    strokeWidth={5}
                />
                    <div className="absolute left-0 bottom-6 flex items-center justify-center w-16 transform translate-x-6 translate-y-1/2">
                        <button onClick={handleDecrement} className="p-2 rounded-full bg-slate-300 cursor-pointer">
                            <img src={minusIcon} alt="minus" className="w-6 h-6" />
                        </button>
                    </div>
                    <div className="absolute right-0 bottom-6 flex items-center justify-center w-16 transform -translate-x-6 translate-y-1/2">
                        <button onClick={handleIncrement} className="p-2 rounded-full bg-slate-300 cursor-pointer">
                            <img src={plusIcon} alt="plus" className="w-6 h-6" />
                        </button>
                    </div>
            </div>
            </div>
            <div className="flex flex-col justify-between my-4 mr-[9px]">
                <div className="flex flex-col items-center text-white cursor-pointer" onClick={handleFanSpeed}>
                    <button className="" ><img className="mb-1" src={fanIcon} alt="fan" /></button>
                        <h1>{fanSpeed}</h1>
                </div>
                <div className="flex flex-col items-center text-white cursor-pointer" onClick={handleTimer}>
                    <img className="mb-1" src={timerIcon} alt="timer" />
                    <h1>{timer}</h1>
                </div>
                <div className="flex flex-col items-center text-white cursor-pointer" onClick={handleMode}>
                    <img className="mb-1" src={icon} alt="normal" />
                    <h1>{mode}</h1>
                </div>
            </div>
            </div>
            </div>
             ) : (
                <div className="flex ">
                    <img className="scale-75" src={errorIcon} alt="err" />
                    <p>No A/C added in this room</p>
                </div>
            )}
        </div>
    );
};

export default AirConditioner