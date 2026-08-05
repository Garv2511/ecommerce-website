import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function DealsSection() {
  const targetDate = new Date();
  targetDate.setHours(targetDate.getHours() + 12);

  const calculateTime = () => {
    const difference = targetDate - new Date();

    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((difference / (1000 * 60)) % 60);
    const seconds = Math.floor((difference / 1000) % 60);

    return { hours, minutes, seconds };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTime());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTime());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="bg-gradient-to-r from-red-500 to-orange-500 text-white py-20">
      <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center justify-between gap-10">

        <div>
          <span className="bg-yellow-400 text-black px-4 py-1 rounded-full font-semibold">
            🔥 Deal of the Day
          </span>

          <h2 className="text-5xl font-bold mt-6">
            Apple AirPods Pro
          </h2>

          <p className="mt-4 text-lg">
            Save 50% today. Limited-time offer!
          </p>

          <div className="flex gap-4 mt-8">

            <div className="bg-white text-black px-5 py-3 rounded-lg font-bold">
              {timeLeft.hours}h
            </div>

            <div className="bg-white text-black px-5 py-3 rounded-lg font-bold">
              {timeLeft.minutes}m
            </div>

            <div className="bg-white text-black px-5 py-3 rounded-lg font-bold">
              {timeLeft.seconds}s
            </div>

          </div>

          <Link
            to="/products"
            className="inline-block mt-8 bg-white text-red-500 px-8 py-3 rounded-lg font-semibold hover:bg-gray-200"
          >
            Shop Now
          </Link>
        </div>

        <img
          src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600"
          alt="AirPods"
          className="rounded-2xl shadow-2xl w-80"
        />

      </div>
    </section>
  );
}

export default DealsSection;