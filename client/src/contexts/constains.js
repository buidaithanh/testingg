export const LOCAL_STORAGE_TOKEN_KEY = "pet-shop";
export const apiUrl =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:5000/api"
    : "https://testingg-backend.onrender.com/api";
