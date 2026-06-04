import BgOne from "./styled-components/BgOne";
import SignUp from "./SignUp";
import { useEffect, useState } from "react";
import useData from "../utils/useData";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import Header from "./Header";
import BACKEND_URL from "../config";


const Home = () => {
    const { userHouseData, loading, error } = useData();
    const [shouldRenderForm, setShouldRenderForm] = useState(false)
    const navigate = useNavigate();
    useEffect(() => {
      let isMounted = true;
      if (loading){
        console.log("Data is Loading...")
        return;
      }
      if (error){
        console.log("Error fetching data", error);
        return;
      }
      console.log("Home Rendered");
      
      if(isMounted){
        if(!userHouseData || userHouseData.length === 0 || userHouseData.rooms.length === 0){
            setShouldRenderForm(true)
            console.log("If rendered");
            
        } 
        else {
            const roomData = userHouseData?.rooms;
            if(roomData.length > 0){
                navigate(`/rooms/${roomData[0]._id}`)
            }
        }
      }
      return () => {
        isMounted = false;
      }
    }, [navigate, userHouseData, loading, error])

    if(shouldRenderForm){
        return (
            <div>
                <Header />
            </div>
        )
    }

    return <div>Loading....</div>
  }

const Body = () => {
    const [isRegistered, setIsRegistered] = useState(false);
    const [isLoading, setIsLoading] = useState(true)
    const checkValidation = async() => {
        const storedToken = localStorage.getItem("token");
        // console.log(storedToken);
        
        if (storedToken) {
            try{
                const response = await fetch(`${BACKEND_URL}/auth/check`, {
                    headers:{
                        'Authorization': `Bearer ${storedToken}`
                    }
                })
                // console.log(response);
                if(response.ok) setIsRegistered(true);
                else{
                    localStorage.removeItem('token');
                    setIsRegistered(false);
                }
            } catch(error) {
                localStorage.removeItem('token');
                setIsRegistered(false)
            }
        } else {
            setIsRegistered(false);
        }
        setIsLoading(false);
    }
    useEffect(() => {
        checkValidation();
      }, []);
    
      if(isLoading){
        return <div>Loading....</div>
      }
 
    return(
        <div className="flex items-center justify-center min-h-screen text-white">
            <BgOne>
            {isRegistered ? (
                <div>
                <Router>
                    <Routes>
                        <Route path="/rooms/:id" element={<Header />} />
                        <Route path='/' element={<Home />} />
                    </Routes>
                </Router>
                </div> ) : (
                    <SignUp onSuccessfullRegistration = {checkValidation} />
                )
            }
            </BgOne>
        </div>
    )
}

export default Body;