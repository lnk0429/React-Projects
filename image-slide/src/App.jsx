import "./App.css";
import ImageSlide from "./components/image-slide";

function App() {
  return (
    <>
      <ImageSlide
        url={"https://picsum.photos/v2/list?"}
        page={"20"}
        limit={"8"}
      />
    </>
  );
}

export default App;
