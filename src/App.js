import React from 'react';
//import NewsList from './Components/NewsList'
//import Categories from './Components/Categories'
import { Route } from 'react-router-dom';
import NewsPage from './Components/NewsPage';
import './App.css';

const App = () => {

  return(
    <>
      <Route path="/:category?" component={NewsPage} />
      {/*
      :category? 와 같은 형태로 물음표 문자가 들어가면,
      category 값이 선택적이라는 의미, 있을 수도 없을 수도 있다는 뜻
      */}
    </>
  )
}

export default App;
