import React, { useState, useEffect } from "react";
import "./App.css";
import ReactMapGL, { Marker } from "react-map-gl";
import axios from "axios";
import { FaMapPin } from "react-icons/fa";
import Header from "./components/Header";
import StyledPopup from "./components/StyledPopup";

function App() {
  const [pins, setPins] = useState([]);
  const [viewport, setViewport] = useState({
    latitude: 37,
    longitude: 127,
    width: "100vw",
    height: "100vh",
    zoom: 4,
  });
  const tk = process.env.REACT_APP_MAPBOX;

  useEffect(() => {
    const getPins = async () => {
      try {
        const allPins = await axios.get("/pins");
        setPins(allPins.data);
        console.log(allPins.data);
      } catch (e) {
        console.log(e);
      }
    };
    getPins();
  }, []);

  return (
    <div className="App">
      <Header title="Let's Memo Our Travle" />
      <div style={{ width: "100%", height: "100vh" }}>
        <ReactMapGL
          {...viewport}
          mapboxApiAccessToken={tk}
          onViewportChange={(nextViewport) => setViewport(nextViewport)}
          mapStyle="mapbox://styles/brightautmnsky21/cl1yk3jux001g14o5fy213k62"
        >
          {pins.map((pin, index) => (
            <>
              <Marker
                key={index}
                latitude={pin.lat}
                longitude={pin.long}
                offsetLeft={-3.5 * viewport.zoom}
                offsetTop={-7 * viewport.zoom}
              >
                {
                  <FaMapPin
                    style={{
                      fontSize: viewport.zoom * 10,
                      color: "seagreen",
                    }}
                  />
                }
              </Marker>
              <StyledPopup pins={pins} />
            </>
          ))}
        </ReactMapGL>
      </div>
    </div>
  );
}

export default App;
