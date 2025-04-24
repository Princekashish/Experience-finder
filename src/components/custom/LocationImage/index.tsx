import React, { useEffect, useState } from "react";
import { fetchLocationImage } from "../../../lib/utils/unsplash";

interface LocationImageProps {
  location: string;
  className?: string;
}

const LocationImage: React.FC<LocationImageProps> = ({
  location,
  className = "",
}) => {
  const [imageUrl, setImageUrl] = useState<string>("");

  // Include location in the dependency array to trigger when location changes
  useEffect(() => {
    const loadImage = async () => {
      const url = await fetchLocationImage(location);
      setImageUrl(url);
    };

    loadImage();
  }, [location]); // Update when location changes

  return (
    <div className={`w-full p-2 `}>
       
      {imageUrl && (
        <img
          src={imageUrl}
          alt={`${location} location`}
          className={`${className} object-cover`}
        />
      )}
    </div>
  );
};

export default LocationImage;
