// import { useEffect, useState } from "react";
import Carousel from 'react-bootstrap/Carousel'
import NewsImage from '../assets/images/news-image.jpeg';

const News = () => {
    // const [newsData, setNewsData] = useState([]);
    // const [fetchNewsData, setFetchNewsData] = useState(false);
    // const [loading, setLoading] = useState(true);
    // useEffect(() => {
    //   fetchData()
    //     console.log(newsData);
    // },[newsData])
    
    // const fetchData = async() => {
    //   setLoading(true)
    //   try{
    //     const apiKey = process.env.REACT_APP_YOUR_WORLD_NEWS_API_KEY;
    //     // console.log(apiKey);
    //     const response = await fetch(`https://api.worldnewsapi.com/top-news?api-key=${apiKey}&source-country=in&language=en`);
    //     if(response.ok) setFetchNewsData(true);
    //     const jsonData = await response.json();
    //     setNewsData(jsonData);
    //   } catch(error){
    //     console.error('Error fetching news:', error);
    //   } finally{
    //     setLoading(false);
    //   }
    // }

  return (
  //   <>
  //   {fetchNewsData? (
  //     <>
  //     {loading && newsData && newsData.top_news && newsData.top_news.length > 0 &&(
  //     <Carousel className="w-full" controls={false} indicators={false}>
  //     {newsData.top_news.map((news, index) => {
  //       return(
  //       <Carousel.Item key={index} interval={1000}>
  //       <div className="relative w-full h-[150px]">
  //       <a href={news[0]?.url}>
  //         <img
  //           src={news[0]?.image}
  //           alt="news-image"
  //           className="w-full h-[150px] object-cover rounded-3xl"
  //         />
  //         </a>
  //         <div className="absolute inset-x-0 bottom-0 text-white p-2 rounded-3xl text-left">
  //           <h3 className='text-xl'>{news[0]?.title}</h3>
  //           {/* <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p> */}
  //         </div>
  //       </div>
  //     </Carousel.Item>
  //     )})}
  //     </Carousel>
  //     )}
  // </>
  // ) : (
    <Carousel className="w-full" controls={false} indicators={false}>
    <Carousel.Item interval={1000}>
      <div className="relative w-full h-[150px]">
        <img
          src={NewsImage}
          alt="news-image"
          className="w-full h-[150px] object-cover rounded-3xl"
        />
        <div className="absolute inset-x-0 bottom-0 text-white p-2 rounded-3xl text-left">
          <h3 className='text-xl'>First slide label</h3>
          {/* <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p> */}
        </div>
      </div>
    </Carousel.Item>
    <Carousel.Item interval={2*1000}>
      <div className="relative w-full h-[150px] rounded-3xl">
        <img
          src={NewsImage}
          alt="news-image"
          className="w-full h-[150px] object-cover rounded-3xl"
        />
        <div className="absolute inset-x-0 bottom-0 text-white p-2 rounded-3xl text-left">
          <h3 className='text-xl'>Second slide label</h3>
          {/* <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p> */}
        </div>
      </div>
    </Carousel.Item>
    <Carousel.Item interval={2*1000}>
      <div className="relative w-full h-[150px] rounded-3xl">
        <img
          src={NewsImage}
          alt="news-image"
          className="w-full h-[150px] object-cover rounded-3xl"
        />
        <div className="absolute inset-x-0 bottom-0 text-white p-2 rounded-3xl text-left">
          <h3 className='text-xl'>Third slide label</h3>
          {/* <p className='leading-tight'>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p> */}
        </div>
      </div>
    </Carousel.Item>
  </Carousel>
  )
}

export default News;