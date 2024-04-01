"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "axios";


const InfiniteScrollExample1 = () => {
  const [items, setItems] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1); // Define page state here

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    const config = {
      method: 'get',
      url: `https://api.pexels.com/v1/search?per_page=5&query=cat&page=${page}`,
      headers: { 
        'Authorization': 'ZEQntwkbpQinQovHO0lykGLrLQSJQIMzRP8qMa6qN7HbrgAmJQMe91Vz'
      }
    };
    
    axios.request(config)
    .then((response) => {
      const newData = response.data.photos;
      setItems(prevItems => [...prevItems, ...newData]);
      setPage(prevPage => prevPage + 1);
      setHasMore(newData.length > 0);
    })
    .catch((error) => {
      console.log(error);
    });
  };

  return (
    <InfiniteScroll
      dataLength={items.length}
      next={fetchData}
      hasMore={hasMore}
      loader={<p>Loading...</p>}
    >
      <div className="container">
        <div className="row">
          {items.map(item => (
            <div key={item.id} className="col-md-4 mb-3">
              <img className="aspect-square" src={item.src.large} alt={item.photographer} />
            </div>
          ))}
        </div>
      </div>
    </InfiniteScroll>
  );
};

export default InfiniteScrollExample1;
