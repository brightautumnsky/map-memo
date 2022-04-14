import React, { useState } from "react";
import "./App.css";
import ReactMapGL from "react-map-gl";
import Header from "./components/Header";

function App() {
  const [viewport, setViewport] = useState({
    latitude: 37,
    longitude: 127,
    width: "100vw",
    height: "100vh",
    zoom: 3,
  });
  const tk = process.env.REACT_APP_MAPBOX;

  console.log(tk);
  return (
    <div className="App">
      <Header title="Let's Memo Our Travle" />
      <div style={{ width: "100%", height: "100vh" }}>
        <ReactMapGL
          {...viewport}
          mapboxApiAccessToken={tk}
          onViewportChange={(nextViewport) => setViewport(nextViewport)}
        ></ReactMapGL>
      </div>
    </div>
  );
}

export default App;
