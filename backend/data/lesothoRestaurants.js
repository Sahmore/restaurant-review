// data/lesothoRestaurants.js
const lesothoRestaurants = [
  {
    id: "lesotho-1",
    name: "Semonkong Lodge Restaurant",
    image_url: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/16/c0/db/3c/semonkong-lodge.jpg?w=700&h=-1&s=1",
    url: "https://semonkonglodge.com",
    review_count: 47,
    categories: [
      { alias: "african", title: "African" },
      { alias: "lodges", title: "Lodges" }
    ],
    rating: 4.5,
    price: "$$",
    location: {
      address1: "Semonkong Village",
      city: "Semonkong",
      state: "Maseru",
      zip_code: "900",
      country: "LS",
      display_address: ["Semonkong Village", "Semonkong, Lesotho"]
    },
    coordinates: { latitude: -29.8386, longitude: 28.0553 },
    phone: "+266 2232 1234",
    display_phone: "+266 2232 1234",
    photos: [
      "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/16/c0/db/3c/semonkong-lodge.jpg?w=700&h=-1&s=1",
      "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/16/c0/db/3c/semonkong-lodge.jpg?w=700&h=-1&s=1"
    ],
    hours: [{ is_open_now: true }],
    transactions: ["pickup", "delivery"],
    description: "Traditional Basotho cuisine with stunning mountain views. Famous for their papa (maize porridge) and moroho (wild spinach)."
  },
  {
    id: "lesotho-2",
    name: "Mokhotlong Mountain Cafe",
    image_url: "https://images.unsplash.com/photo-1587314168485-3236d6710814?w=600",
    url: "",
    review_count: 32,
    categories: [
      { alias: "cafe", title: "Cafe" },
      { alias: "bakery", title: "Bakery" }
    ],
    rating: 4.2,
    price: "$",
    location: {
      address1: "Main Street",
      city: "Mokhotlong",
      state: "Mokhotlong",
      zip_code: "500",
      country: "LS",
      display_address: ["Main Street", "Mokhotlong, Lesotho"]
    },
    coordinates: { latitude: -29.2886, longitude: 29.0553 },
    phone: "+266 2298 7654",
    display_phone: "+266 2298 7654",
    photos: [
      "https://images.unsplash.com/photo-1587314168485-3236d6710814?w=600",
      "https://images.unsplash.com/photo-1587314168561-4b9b83e8a06d?w=600"
    ],
    hours: [{ is_open_now: true }],
    transactions: ["pickup"],
    description: "Cozy mountain cafe serving fresh coffee, homemade bread, and local pastries. Perfect stop for hikers."
  },
  {
    id: "lesotho-3",
    name: "Thaba-Bosiu Cultural Restaurant",
    image_url: "https://images.unsplash.com/photo-1534939561126-855b8675edd7?w=600",
    url: "",
    review_count: 89,
    categories: [
      { alias: "traditional", title: "Traditional" },
      { alias: "cultural", title: "Cultural Experience" }
    ],
    rating: 4.7,
    price: "$$",
    location: {
      address1: "Thaba-Bosiu Cultural Village",
      city: "Thaba-Bosiu",
      state: "Maseru",
      zip_code: "100",
      country: "LS",
      display_address: ["Thaba-Bosiu Cultural Village", "Thaba-Bosiu, Lesotho"]
    },
    coordinates: { latitude: -29.3686, longitude: 27.6553 },
    phone: "+266 2231 5566",
    display_phone: "+266 2231 5566",
    photos: [
      "https://images.unsplash.com/photo-1534939561126-855b8675edd7?w=600",
      "https://images.unsplash.com/photo-1534939644357-5ff51471b836?w=600"
    ],
    hours: [{ is_open_now: false }],
    transactions: ["pickup", "reservations"],
    description: "Authentic Basotho cultural experience with traditional dancing, music, and heritage dishes."
  },
  {
    id: "lesotho-4",
    name: "Maletsunyane Falls Bistro",
    image_url: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/16/c0/db/52/semonkong-lodge.jpg?w=1400&h=800&s=1",
    url: "",
    review_count: 56,
    categories: [
      { alias: "bistro", title: "Bistro" },
      { alias: "international", title: "International" }
    ],
    rating: 4.4,
    price: "$$$",
    location: {
      address1: "Near Maletsunyane Falls",
      city: "Semonkong",
      state: "Maseru",
      zip_code: "900",
      country: "LS",
      display_address: ["Near Maletsunyane Falls", "Semonkong, Lesotho"]
    },
    coordinates: { latitude: -29.8986, longitude: 28.0853 },
    phone: "+266 2232 8899",
    display_phone: "+266 2232 8899",
    photos: [
      "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/16/c0/db/52/semonkong-lodge.jpg?w=1400&h=800&s=1",
      "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/16/c0/db/52/semonkong-lodge.jpg?w=1400&h=800&s=1"
    ],
    hours: [{ is_open_now: true }],
    transactions: ["reservations"],
    description: "Fine dining with breathtaking views of the Maletsunyane Falls. International cuisine with local ingredients."
  },
  {
    id: "lesotho-5",
    name: "Masero Street Food Market",
    image_url: "https://media-cdn.tripadvisor.com/media/photo-s/0f/0d/b0/1c/restaurant-and-bar-area.jpg",
    url: "",
    review_count: 124,
    categories: [
      { alias: "streetfood", title: "Street Food" },
      { alias: "market", title: "Market" }
    ],
    rating: 4.3,
    price: "$",
    location: {
      address1: "Kingsway Street",
      city: "Maseru",
      state: "Maseru",
      zip_code: "100",
      country: "LS",
      display_address: ["Kingsway Street", "Maseru, Lesotho"]
    },
    coordinates: { latitude: -29.3186, longitude: 27.4853 },
    phone: "",
    display_phone: "",
    photos: [
      "https://media-cdn.tripadvisor.com/media/photo-s/0f/0d/b0/1c/restaurant-and-bar-area.jpg",
      "https://media-cdn.tripadvisor.com/media/photo-s/0f/0d/b0/1c/restaurant-and-bar-area.jpg"
    ],
    hours: [{ is_open_now: true }],
    transactions: ["pickup"],
    description: "Vibrant street food market offering local delicacies like boerewors rolls, fat cakes, and grilled meats."
  },
  {
    id: "lesotho-6",
    name: "Katse Dam View Restaurant",
    image_url: "https://www.motebong.com/assets/user/page-gallery/bar-dining-2.jpg",
    url: "",
    review_count: 41,
    categories: [
      { alias: "seafood", title: "Seafood" },
      { alias: "fine_dining", title: "Fine Dining" }
    ],
    rating: 4.6,
    price: "$$$",
    location: {
      address1: "Katse Dam Complex",
      city: "Katse",
      state: "Butha-Buthe",
      zip_code: "400",
      country: "LS",
      display_address: ["Katse Dam Complex", "Katse, Lesotho"]
    },
    coordinates: { latitude: -29.3386, longitude: 28.5053 },
    phone: "+266 2295 4433",
    display_phone: "+266 2295 4433",
    photos: [
      "https://www.motebong.com/assets/user/page-gallery/bar-dining-2.jpg",
      "https://www.motebong.com/assets/user/page-gallery/bar-dining-2.jpg"
    ],
    hours: [{ is_open_now: true }],
    transactions: ["reservations"],
    description: "Luxury dining experience overlooking the magnificent Katse Dam. Fresh trout from local waters."
  }
];

module.exports = lesothoRestaurants;
