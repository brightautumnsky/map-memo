import React, { useState, useEffect } from "react";
import "./App.css";
import ReactMapGL, { Marker } from "react-map-gl";
import axios from "axios";
import { FaMapPin } from "react-icons/fa";
import Header from "./components/Header";
import StyledPopup from "./components/StyledPopup";

function App() {
  const [pins, setPins] = useState([]);
  const [currentPinId, setCurrentPinId] = useState(null);
  const [newPlace, setNewPlace] = useState(null);
  const [title, setTitle] = useState(null);
  const [desc, setDesc] = useState(null);
  const [rating, setRating] = useState(0);

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
      } catch (e) {
        console.log(e);
      }
    };
    getPins();
  }, []);

  const handleMarkerClick = (id, long, lat) => {
    setCurrentPinId(id);
    setViewport({ ...viewport, longitude: long, latitude: lat });
  };

  const handleAddClick = (e) => {
    const [long, lat] = e.lngLat;
    setNewPlace({
      long,
      lat,
    });
  };

  const cu = "jane";
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPin = {
      username: cu,
      title,
      desc,
      rating,
      lat: newPlace.lat,
      long: newPlace.long,
    };

    try {
      const res = await axios.post("/pins", newPin);
      setPins([...pins, res.data]);
      // 팝업 닫기
      setNewPlace(null);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="App">
      <Header title="Let's Memo Our Travle! 소중한 기록을 남겨보세요." />
      <div
        style={{
          width: "100%",
          height: "100vh",
        }}
      >
        <ReactMapGL
          {...viewport}
          mapboxApiAccessToken={tk}
          onViewportChange={(nextViewport) => setViewport(nextViewport)}
          onDblClick={handleAddClick}
          mapStyle="mapbox://styles/brightautmnsky21/cl1yk3jux001g14o5fy213k62"
          transitionDuration="300"
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
                      fontSize: viewport.zoom * 7,
                      color: cu === pin.username ? "seagreen" : "red",
                      cursor: "pointer",
                    }}
                    onClick={() =>
                      handleMarkerClick(pin._id, pin.long, pin.lat)
                    }
                  />
                }
              </Marker>
              {
                <StyledPopup
                  pins={pins}
                  currentPinId={currentPinId}
                  handleMarkerClick={handleMarkerClick}
                />
              }
            </>
          ))}
          {newPlace && (
            <StyledPopup
              newPlace={newPlace}
              setNewPlace={setNewPlace}
              setTitle={setTitle}
              setDesc={setDesc}
              setRating={setRating}
              handleSubmit={handleSubmit}
            />
          )}
        </ReactMapGL>
      </div>
    </div>
  );
}

export default App;
