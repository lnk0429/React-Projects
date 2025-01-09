import { useState } from "react";

import { FaStar } from "react-icons/fa";

import "./style.css";

export default function StarRating({ numOfStar = 5 }) {
  // STATE
  //clicked star
  const [starClicked, setStarClicked] = useState(0);
  //hover star
  const [starHover, setStarHover] = useState(0);

  //   FUNC
  //click
  function clickStar(starIndex) {
    setStarClicked(starIndex);
  }

  // hover
  function hoverStar(starIndex) {
    setStarHover(starIndex);
  }

  //mouse move out
  function leaveStar() {
    setStarHover(starClicked);
  }
  //   因为星星的个数会因为滑动而增加或减少，当我没有选择时，那么星星的数量还是会回到之前点击的那个位置。所以setStarHover(starClicked);

  return (
    <div className="star-rating">
      <div className="star">
        {[...Array(numOfStar)].map((_, index) => {
          const starIndex = index + 1;
          return (
            <FaStar
              key={index}
              size="50"
              onClick={() => clickStar(starIndex)}
              onMouseEnter={() => hoverStar(starIndex)}
              onMouseLeave={leaveStar}
              className={
                starIndex <= (starHover || starClicked) ? "active" : "inactive"
              }
            />
          );
        })}
      </div>
    </div>
  );
}
