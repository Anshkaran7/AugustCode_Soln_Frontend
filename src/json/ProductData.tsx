const ProductData = () => {
  return [
    {
      images: [
        "/products/earbuds.jpg",
        "/products/earphone.jpg",
        "/products/mic.jpg",
      ],
      name: "EARPHONE",
      originalPrice: 46000,
      stock: 100,
      vendor: "Vitco",
      availability: "In Stock",
      type: "Electronics",
    },
    {
      images: [
        "/products/speaker.jpg",
        
      ],
      name: "LAPTOP",
      originalPrice: 150000,
      stock: 50,
      vendor: "TechStore",
      availability: "In Stock",
      type: "Electronics",
    },
    {
      images: [
        "/products/mic.jpg",
        
      ],
      name: "SMARTWATCH",
      originalPrice: 30000,
      stock: 75,
      vendor: "SmartGadgets",
      availability: "In Stock",
      type: "Wearable",
    },
    {
      images: [
        "/products/earphone.jpg",
       
      ],
      name: "CAMERA",
      originalPrice: 85000,
      stock: 30,
      vendor: "PhotoPro",
      availability: "Out of Stock",
      type: "Photography",
    },
  ];
}

export default ProductData;
