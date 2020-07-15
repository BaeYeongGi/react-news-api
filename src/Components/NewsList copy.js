import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import NewsItem from '../Components/NewsItem';
import axios from 'axios';

const NewsListBlock = styled.div`
    box-sizing:border-box; padding-bottom:30px; width:768px; margin:0 auto; margin-top:2rem;
    @media screed and (max-width:768px){
        width:100%; padding-left:10px; padding-right:10px;
    }
`;

const NewsList = () => {
    const [articles, setArticles] = useState(null); // articles 의 초기값은 null
    const [loading, setLoading] = useState(false); // loading 의 초기값은 false

    useEffect(() => {
        // async를 사용하는 함수 따로 선언
        const fetchData = async () => { // promise 를 반환하기위해 asnyc를 사용
            setLoading(true); // loading → setLoading 으로 상태값 변경(실행)
            try{
                const response = await axios.get(  // await 은 async 함수 내부에서만 동작, Javascript가 promise 작업 이후 결과값을 리턴할때까지 잠시 기다리게 만듬
                    'http://newsapi.org/v2/top-headlines?country=kr&apiKey=c497782f4ef74491800dc8f4810bec27',
                );
                setArticles(response.data.articles); // article을 api의 데이터에서 불러옴 
                console.log(response)
            } catch(e){
                console.log('에러가 났습니다')
            }
            setLoading(false);
        };
        fetchData(); // fetchData 함수를 실행
    }, []);

    // 대기 중일 떄 NewsListBlock 컴포넌트를 실행
    if(loading){
        return <NewsListBlock>대기 중...</NewsListBlock>;
    }
    // 아직 articles 값이 설정되지 않았을 때
    if(!articles){
        return null;
    }

    //article 값이 유요할때
    return(
        <NewsListBlock>
            {articles.map(article => (
                <NewsItem Key={article.url} article={article} />
            ))}
        </NewsListBlock>
    )
}

export default NewsList;