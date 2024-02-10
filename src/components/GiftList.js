import React, { useState } from "react";
import GiftItem from "./GiftItem";
import mockData from "../data/mockData";

function GiftList() {
  const [gifts, setGifts] = useState(mockData);

  const handleGiftSelect = (selectedId) => {
    const updatedGifts = gifts.map((gift) => {
      if (gift.id === selectedId && gift.quantity > 0) {
        return { ...gift, quantity: gift.quantity - 1 };
      }
      return gift;
    });

    setGifts(updatedGifts);
  };
  const handleGiftDeselect = (selectedId) => {
    const updatedGifts = gifts.map((gift) => {
      if (
        gift.id === selectedId &&
        gift.quantity < mockData.find((item) => item.id === selectedId).quantity
      ) {
        return { ...gift, quantity: gift.quantity + 1 };
      }
      return gift;
    });

    setGifts(updatedGifts);
  };

  return (
    <div className="gift-list">
      {gifts.map((gift) => (
        <GiftItem
          key={gift.id}
          gift={gift}
          onGiftSelect={handleGiftSelect}
          onGiftDeselect={handleGiftDeselect}
        />
      ))}
    </div>
  );
}

export default GiftList;
