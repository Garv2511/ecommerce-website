import { useState } from "react";

function ProductGallery({ product }) {
  const images = [
    product.image,
    product.image,
    product.image,
  ];

  const [selectedImage, setSelectedImage] = useState(product.image);

  return (
    <div>
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <img
          src={selectedImage}
          alt={product.name}
          className="w-full h-[450px] object-cover"
        />
      </div>

      <div className="flex gap-4 mt-4">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(image)}
            className={`w-24 h-24 rounded-lg overflow-hidden border-2 ${
              selectedImage === image
                ? "border-blue-600"
                : "border-transparent"
            }`}
          >
            <img
              src={image}
              alt={`${product.name} ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}

export default ProductGallery;