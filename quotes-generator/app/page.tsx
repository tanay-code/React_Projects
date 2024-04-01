"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import image from "../images/city.jpg";

const Home = () => {
  const [apiResponse, setapiResponse] = useState("");
  const [imageUrl, setimageUrl] = useState(
    "https://images.pexels.com/photos/20263255/pexels-photo-20263255/free-photo-of-top-down-to-east-side-new-york.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  );
  const [page, setPage] = useState(1);

  useEffect(() => console.log(imageUrl), [imageUrl]);

  //api for image
  const getImages = async () => {
    let config2 = {
      method: "get",
      maxBodyLength: Infinity,
      url: `https://api.pexels.com/v1/search?per_page=1&query=city&page=${page}`,
      headers: {
        Authorization:
          "ZEQntwkbpQinQovHO0lykGLrLQSJQIMzRP8qMa6qN7HbrgAmJQMe91Vz",
      },
    };

    try {
      const response = await axios.request(config2);
      if (response.status === 200) {
        console.log("Pexels");
        setimageUrl(response.data.photos[0].src.large2x);
        setPage(Math.floor(Math.random() * 100 + 1));
        console.log(response.data.photos);
      }
    } catch (e) {
      console.log("in error of pexels");
      console.log(e);
    }
  };
  const apiCall = async () => {
    await getImages();

    // api for advice
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: "https://api.adviceslip.com/advice",
      headers: {},
    };

    try {
      const response = await axios.request(config);
      if (response.status === 200) {
        console.log(response.data);
        setapiResponse(response.data.slip.advice);
      }
    } catch (e) {
      console.log(e);
      return {};
    }
  };

  return (
    <>
      <div
        className="app"
        style={{
          // backgroundImage: `url(${imageUrl})`,
          background: `linear-gradient( rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3) ), url(${imageUrl})`,
        }}
      >
        <div className="card">
          <h1 className="heading">{apiResponse}</h1>
          <button className="button" onClick={() => apiCall()}>
            <span>GIVE ME ADVICE!</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Home;
