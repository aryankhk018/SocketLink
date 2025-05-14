let IS_PROD = true;

const server = IS_PROD
  ? "https://socketlink-backend.onrender.com"
  : "http://localhost:8000";
