import React from 'react';
import styled from 'styled-components';
import NewsItem from '../Components/NewsItem';
import axios from 'axios';
import usePromise from '../lib/usePromise';

const NewsListBlock = styled.div`
    box-sizing:border-box; padding-bottom:30px; width:768px; margin:0 auto; margin-top:2rem;
    @media screed and (max-width:768px){
        width:100%; padding-left:10px; padding-right:10px;
    }
`;

const NewsList = ({ category }) => {
    const [loading, response, error] = usePromise(() => {
        const query = category === 'all' ? '' : `&category=${category}`;
        return axios.get(
            `http://newsapi.org/v2/top-headlines?country=kr${query}&apiKey=c497782f4ef74491800dc8f4810bec27`
        )
    }, [category])

    // 대기 중일 때 
    if(loading){
        return <NewsListBlock>대기 중...</NewsListBlock>
    }

    // 아직 response 값이 설정되지 않았을 때 
    if(!response){
        return null;
    }

    // 에러가 발생했을 때
    if(error){
        return <NewsListBlock>에러 발생!</NewsListBlock>
    }

    //response 값이 유효할 때
    const { articles } = response.data;

    //article 값이 유요할때
    return(
        <NewsListBlock>
            {articles.map((article, index) => (
                <NewsItem Key={index} article={article} />
            ))}
        </NewsListBlock>
    )
}

export default NewsList;

// usePromise를 사용하면 NewsList에서 대기 중 상태 관리와 useEffect 설정을 직접 하지 않아도 됨 -> 코드가 훨씬 간결해짐