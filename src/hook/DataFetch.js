import {useState, useEffect} from 'react';

export default function useFetch(url) {
  /*데이터 가져옴, 가져온 데이터 페이지 +1, 임시로 API로 구축함*/
  const _getData = async () => {
    const url = 'https://jsonplaceholder.typicode.com/photos?_limit=10';
    fetch(url) //url에서 정보 추출 .json
      .then(res => res.json())
      .then(data => {
        this.setState({
          data: this.state.refreshing ? data : this.state.data.concat(data),
          page: this.state.page + 1,
          refreshing: false,
        });
      });
  };
  return _getData;
}
