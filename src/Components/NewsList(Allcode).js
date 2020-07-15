import React, { useState, useEffect } from 'react'; 
import axios from 'axios';

const NewsList = () => {
    
    const [loading, setLoading] = useState(false);
    const [articles, setArticles] = useState(null);

    useEffect(() => {
        const newsApi = 'http://newsapi.org/v2/top-headlines?country=kr&apiKey=c497782f4ef74491800dc8f4810bec27';
        const fetchData = async() => {
            setLoading(true);
            try{
                const response = await axios.get(newsApi)
                console.log(response.data.articles)
                setArticles(response.data.articles)
            }catch(error){
                console.log(error)
            }   
            setLoading(false);
        }
        fetchData();
    },[])

    if(loading){
        return <p>로딩중...</p>
    }
    if(!articles){
        return null;
    }
    return(
        <>
            {articles.map(news => (
                <div key={news.title} className="news_wrap">
                    <p className="news_title">{news.title}</p>
                    <p className="news_date">{news.publishedAt.slice(0, 10)}</p>
                    <p className="news_contents"><div className="nana">{news.description}</div></p>
                </div>
            ))}
        </>
    )
}

export default NewsList;