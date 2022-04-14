import React from "react";
import styled from "styled-components";
import { Popup } from "react-map-gl";
import { FaStar } from "react-icons/fa";
import { format } from "timeago.js";

const PopupWrapper = styled.div`
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
    color: seagreen;
    font-size: 15px;
    border-bottom: 1px solid seagreen;
  }
`;

const StyledPopup = ({ pins, currentPinId, handleMarkerClick }) => {
  return (
    <PopupWrapper>
      {pins.map(
        (pin, index) =>
          pin._id === currentPinId && (
            <Popup
              key={index}
              latitude={pin.lat}
              longitude={pin.long}
              closeButton={true}
              closeOnClick={false}
              anchor="left"
              onClose={() => handleMarkerClick()}
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
                  <FaStar />
                  <FaStar />
                  <FaStar />
                </div>
                <label>정보</label>
                <div className="info">
                  <span className="username">{pin.username}</span>
                  <span className="date">{format(pin.createAt)}</span>
                </div>
              </div>
            </Popup>
          )
      )}
    </PopupWrapper>
  );
};

export default StyledPopup;
