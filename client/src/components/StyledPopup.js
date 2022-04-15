import React from "react";
import styled from "styled-components";
import { Popup } from "react-map-gl";
import { FaStar } from "react-icons/fa";
import { format } from "timeago.js";

const PopupWrapper = styled.div`
  form {
    display: flex;
    flex-direction: column;
    input,
    textarea,
    select,
    .submit-btn {
      margin: 5px 0;
      border: 1px solid #5584ac;
    }
    input {
      border: none;
      border-bottom: 1px solid #5584ac;
    }
    textarea {
      resize: none;
      border: none;
      border-bottom: 1px solid #5584ac;
    }
    .submit-btn {
      background-color: #5584ac;
      padding: 3px 0;
      color: white;
      border-radius: 5px;
      cursor: pointer;
    }
    input::placeholder,
    textarea::placeholder {
      font-size: 12px;
      color: darkgray;
    }
  }
  .info-box {
    display: flex;
    flex-direction: column;
    width: 270px;
    height: 270px;
    padding: 12px;
    justify-content: space-around;
    h4,
    p,
    .stars,
    .review,
    .info,
    .date {
      margin: 5px 0;
    }
    .stars {
      font-size: 21px;
      color: gold;
    }
    .info {
      display: flex;
      flex-direction: column;
    }
    .username {
      font-size: 14px;
    }
    .date {
      font-size: 11px;
    }
  }

  label {
    width: max-content;
    color: #5584ac;
    font-size: 15px;
    border-bottom: 1px solid #5584ac;
  }
`;

const StyledPopup = ({
  pins,
  currentPinId,
  handleMarkerClick,
  newPlace,
  setNewPlace,
  setTitle,
  setDesc,
  setRating,
  handleSubmit,
}) => {
  return (
    <PopupWrapper>
      {!newPlace ? (
        pins.map(
          (pin, index) =>
            pin._id === currentPinId && (
              <Popup
                key={index}
                latitude={pin.lat}
                longitude={pin.long}
                closeButton={true}
                closeOnClick={false}
                anchor="left"
                onClose={() => handleMarkerClick(null, pin.long, pin.lat)}
              >
                <div className="info-box">
                  <label>장소</label>
                  <h4 className="place">{pin.title}</h4>
                  <label>후기</label>
                  <div className="review">
                    <p>{pin.desc}</p>
                  </div>
                  <label>별점</label>
                  <div className="stars">
                    {Array(pin.rating).fill(<FaStar />)}
                  </div>
                  <label>정보</label>
                  <div className="info">
                    <span className="username">{pin.username}</span>
                    <span className="date">{format(pin.createAt)}</span>
                  </div>
                </div>
              </Popup>
            )
        )
      ) : (
        // 더블 클릭으로 새 위치를 입력할 때
        <Popup
          latitude={newPlace.lat}
          longitude={newPlace.long}
          closeButton={true}
          closeOnClick={false}
          anchor="left"
          onClose={() => setNewPlace(null)}
        >
          <div>
            <form onSubmit={handleSubmit}>
              <label>장소</label>
              <input
                placeholder="어느 곳에 방문하셨나요?"
                onChange={(e) => setTitle(e.target.value)}
              />
              <label>후기</label>
              <textarea
                placeholder="어떤 일을 경험하셨나요?"
                onChange={(e) => setDesc(e.target.value)}
              />
              <label>별점</label>
              <select onChange={(e) => setRating(e.target.value)}>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </select>
              <button className="submit-btn" type="submit">
                메모
              </button>
            </form>
          </div>
        </Popup>
      )}
    </PopupWrapper>
  );
};

export default StyledPopup;
