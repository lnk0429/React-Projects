import data from "./data";
import { useState } from "react";
import "./style.css";
export default function Accordion() {
  // State
  //state-single select
  const [singleSelect, setSingleSelect] = useState(null);
  //state-multiple selection button
  const [multiSelectBtn, setMultiSelectBtn] = useState(false);

  //state-multiple selection list
  const [multiList, setMultiList] = useState([]);

  //state-multiple selection list
  //   Function
  function handleSingleClick(currentId) {
    setSingleSelect(singleSelect === currentId ? null : currentId);
  }

  function handleMultiSelectionBtn() {
    setMultiSelectBtn((prev) => !prev);
  }

  function handleMultiList(currentId) {
    let copyList = [...multiList];
    const findIndexOfCurrentId = copyList.indexOf(currentId);
    if (findIndexOfCurrentId === -1) copyList.push(currentId);
    else copyList.splice(findIndexOfCurrentId, 1);

    setMultiList(copyList);
  }
  return (
    <>
      <div className="wrapper">
        <button onClick={handleMultiSelectionBtn}>
          {multiSelectBtn
            ? "Disable multi selection"
            : "Enable multi selection"}
        </button>
        <div className="accordion">
          {data && data.length > 0
            ? data.map((item) => (
                <div
                  className="item"
                  key={item.id}
                  onClick={
                    multiSelectBtn
                      ? () => handleMultiList(item.id)
                      : () => handleSingleClick(item.id)
                  }
                >
                  <div className="title">
                    <h3>{item.question}</h3>
                    <span>+</span>
                  </div>
                  {multiSelectBtn
                    ? multiList.indexOf(item.id) !== -1 && (
                        <div className="content">{item.answer}</div>
                      )
                    : singleSelect === item.id && (
                        <div className="content">{item.answer}</div>
                      )}
                </div>
              ))
            : null}
        </div>
      </div>
    </>
  );
}
