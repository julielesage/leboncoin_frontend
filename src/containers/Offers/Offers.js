import React, { useState, useEffect } from "react";
import axios from "axios";
import SearchBar from "../../components/SearchBar";
import Card from "../../components/Card";
import Pagination from "../../components/Pagination";
import "./style.css";

const Offers = ({ onLogin, setShowModal, showModal }) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [skip, setSkip] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const limit = 3;

  // 1rst EX PAGINATION (PREVIOUS/NEXT BUTTON see Pagination components) :
  // const fetchData = async () => {
  //   const response = await axios.get(
  //     `https://leboncoin-de-julie.herokuapp.com/offers/with-count?skip=${skip}&limit=$={limit}`
  //   );
  //   // attention ce sera toujours data apres res(ponse)
  //   setData(response.data);
  //   setIsLoading(false);
  // };
  // useEffect(() => {
  //   fetchData();
  // }, [skip]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `https://leboncoin-de-julie.herokuapp.com/offers/with-count`
      );
      setData(response.data.offers);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  const indexOfLastPost = currentPage * limit;
  const indexOfFirstPost = indexOfLastPost - limit;
  const currentPosts = data.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <div className="orange"></div>
      <div className="wrapper padt200">
        <SearchBar setData={setData} />
        {isLoading === true ? (
          <div> En cours de chargement...</div>
        ) : data.length > 0 ? (
          <>
            <main className="wrapper mt60">
              {currentPosts.map((offer, index) => {
                return <Card key={offer._id} {...offer} />;
              })}
            </main>
          </>
        ) : (
          <div>Il n'y a aucune offre pour le moment</div>
        )}
        <Pagination
          count={data.length}
          skip={skip}
          setSkip={setSkip}
          limit={limit}
          currentPage={currentPage}
          paginate={paginate}
        />
      </div>
    </>
  );
};

export default Offers;
