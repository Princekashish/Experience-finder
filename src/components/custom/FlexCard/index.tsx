import React from "react";
interface flexCard {
  label?: string;
  className?: string;
  imageUrl?: string;
}

const FlexCard: React.FC<flexCard> = ({ label, className, imageUrl }) => {
  return (
    <div className={className}>
      {imageUrl && (
        <img src={imageUrl} alt="Card Image" className=" object-cover" />
      )}
      {label}
    </div>
  );
};

export default FlexCard;
