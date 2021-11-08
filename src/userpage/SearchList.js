import { useState } from "react";

const SearchList = () => {
  const [searchedImg, setSearchedImg] = useState([]);
  const [searchedTitle, serSearchedTitle] = useState('리액트');

  return (
    <div className="searchWrap">
      <p className="searchList">최근 검색</p>
    </div>
  )
}

export default SearchList
