import { Link } from "react-router-dom";

function Hero() {
  
  return (
    <div className="h-screen flex flex-col items-center justify-center text-center bg-gradient-to-r from-red-400 to-orange-400 ml-2 mr-2 mt-2 mb-2 rounded-3xl px-4">
      <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4">
        Delicious Food, <br /> Delivered To You 🍕
      </h1>
      <p className="text-lg md:text-xl text-white mb-8">
        Order from your favorite restaurants near you.
      </p>
      <div className="flex gap-4">
      <Link
        to="/login"
        className="bg-white text-red-500 font-semibold py-3 px-6 rounded-full shadow-lg hover:bg-gray-100 transition"
      >
        Login 
      </Link>
       <Link
        to="/register"
        className="bg-white text-red-500 font-semibold py-3 px-6 rounded-full shadow-lg hover:bg-gray-100 transition"
      >
        Register
      </Link>
      </div>
    </div>
  );
}

export default Hero;
