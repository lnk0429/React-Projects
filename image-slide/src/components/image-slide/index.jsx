import { useState, useEffect } from "react";
import { FaCircleArrowLeft } from "react-icons/fa6";
import { FaCircleArrowRight } from "react-icons/fa6";
import "./style.css";

export default function ImageSlide({ url, page, limit }) {
  //STATE
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [load, setLoad] = useState(false);
  // ⬆️ fetch data state
  // ------------------
  // ⬇️ slider  state
  const [curPage, setCurPage] = useState(0);

  // Fetch data
  //   https://picsum.photos/v2/list?page=1&limit=5

  // 01 Fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setError("");
        setLoad(true);
        const response = await fetch(`${url}page=${page}&limit=${limit}`);
        if (!response.ok) {
          throw new Error("Failed to fetch data.Please check the url.");
        }
        const result = await response.json();
        setData(result);
      } catch (e) {
        setError(e.message);
        console.error(e);
      } finally {
        setLoad(false);
      }
    };
    fetchData();
  }, [url, limit, page]);

  if (error) {
    return <div>Error occurred: {error}</div>;
  }

  if (load) {
    return <div>Loading...</div>;
  }
  // FUNCTION

  function prevPage() {
    setCurPage((prev) => (prev === 0 ? data.length - 1 : prev - 1));
  }

  function nextPage() {
    setCurPage((prev) => (prev === data.length - 1 ? 0 : prev + 1));
  }

  function handleClick(clickedPage) {
    setCurPage(clickedPage);
  }
  // REACT
  return (
    <div className="container">
      {data && data.length > 0 ? (
        <div className="images">
          <FaCircleArrowLeft className="arrow arrow-left" onClick={prevPage} />
          {data.map((dataItem, index) => (
            <img
              key={index}
              alt={dataItem.download_url}
              src={dataItem.download_url}
              className={
                curPage === index
                  ? "current-img"
                  : "current-img hide-current-img"
              }
            ></img>
          ))}
          <FaCircleArrowRight
            className="arrow arrow-right"
            onClick={nextPage}
          />
        </div>
      ) : (
        <div>No images available</div>
      )}
      <span className="circle-indicators">
        {data && data.length > 0
          ? data.map((items, index) => (
              <button
                className={
                  curPage === index
                    ? "circle-indicator-active"
                    : "circle-indicator"
                }
                key={index}
                onClick={() => handleClick(index)}
              ></button>
            ))
          : null}
      </span>
    </div>
  );
}

/* <FaCircleArrowLeft className="arrow arrow-left" onClick={prevPage} />;
{
  data && data.length > 0 ? (
    data.map((dataItem, index) => (
      <img
        key={dataItem.id}
        src={dataItem.download_url}
        alt={dataItem.download_url}
        className={curPage === index ? "active-img" : "inactive-img"}
      ></img>
    ))
  ) : (
    <div>No images available</div>
  );
}
<FaCircleArrowRight className="arrow arrow-right" onClick={nextPage} />; */
