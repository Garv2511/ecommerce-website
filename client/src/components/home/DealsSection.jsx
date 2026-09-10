import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function DealsSection() {
  // ================= COUNTDOWN TARGET =================

  const [targetDate] = useState(() => {
    const date = new Date();
    date.setHours(date.getHours() + 12);
    return date.getTime();
  });

  // ================= CALCULATE TIME =================

  const calculateTime = () => {
    const difference = Math.max(
      targetDate - Date.now(),
      0
    );

    const hours = Math.floor(
      difference / (1000 * 60 * 60)
    );

    const minutes = Math.floor(
      (difference / (1000 * 60)) % 60
    );

    const seconds = Math.floor(
      (difference / 1000) % 60
    );

    return {
      hours,
      minutes,
      seconds,
    };
  };

  const [timeLeft, setTimeLeft] = useState(
    calculateTime()
  );

  // ================= COUNTDOWN =================

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTime());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // ================= TIME BOX =================

  const TimeBox = ({ value, label }) => {
    return (
      <div className="flex flex-col items-center justify-center bg-white text-gray-900 rounded-xl w-20 h-20 shadow-lg">
        <span className="text-2xl font-extrabold">
          {String(value).padStart(2, "0")}
        </span>

        <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
          {label}
        </span>
      </div>
    );
  };

  // ================= RETURN =================

  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-red-500 via-orange-500 to-amber-500 text-white py-16 sm:py-20">

      {/* ================= BACKGROUND DECORATION ================= */}

      <div className="absolute -top-24 -right-24 w-72 h-72 bg-white/10 rounded-full blur-3xl" />

      <div className="absolute -bottom-32 -left-24 w-80 h-80 bg-red-600/20 rounded-full blur-3xl" />

      {/* ================= CONTENT ================= */}

      <div className="relative max-w-7xl mx-auto px-6">

        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">

          {/* ================= LEFT CONTENT ================= */}

          <div className="max-w-2xl text-center lg:text-left">

            {/* BADGE */}

            <span className="inline-flex items-center gap-2 bg-yellow-400 text-gray-900 px-4 py-2 rounded-full text-sm font-bold shadow-sm">
              🔥 Deal of the Day
            </span>

            {/* HEADING */}

            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mt-6 leading-tight">
              Apple AirPods Pro
            </h2>

            {/* DESCRIPTION */}

            <p className="mt-5 text-lg sm:text-xl text-white/90 max-w-xl">
              Save 50% on today's hottest deal. Grab it before
              the offer disappears!
            </p>

            {/* ================= COUNTDOWN ================= */}

            <div className="mt-8">

              <p className="text-sm font-semibold uppercase tracking-wider text-white/80 mb-3">
                Offer ends in
              </p>

              <div className="flex justify-center lg:justify-start gap-3 sm:gap-4">

                <TimeBox
                  value={timeLeft.hours}
                  label="Hours"
                />

                <div className="flex items-center text-2xl font-bold">
                  :
                </div>

                <TimeBox
                  value={timeLeft.minutes}
                  label="Minutes"
                />

                <div className="flex items-center text-2xl font-bold">
                  :
                </div>

                <TimeBox
                  value={timeLeft.seconds}
                  label="Seconds"
                />

              </div>
            </div>

            {/* ================= CTA ================= */}

            <Link
              to="/products"
              className="group inline-flex items-center gap-2 mt-8 bg-white text-red-600 px-7 py-3.5 rounded-xl font-bold shadow-lg hover:bg-gray-100 hover:-translate-y-0.5 transition-all duration-300"
            >
              Shop This Deal

              <span className="text-lg transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </Link>

          </div>

          {/* ================= PRODUCT IMAGE ================= */}

          <div className="relative flex-shrink-0">

            {/* IMAGE BACKDROP */}

            <div className="absolute inset-0 bg-white/20 rounded-3xl blur-2xl scale-90" />

            <div className="relative bg-white/10 backdrop-blur-sm p-3 rounded-3xl border border-white/20">

              <img
                src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600"
                alt="Featured headphones"
                className="w-72 sm:w-80 lg:w-96 h-72 sm:h-80 lg:h-96 object-cover rounded-2xl shadow-2xl"
              />

              {/* DISCOUNT BADGE */}

              <div className="absolute -top-4 -right-4 bg-red-600 text-white w-20 h-20 rounded-full flex flex-col items-center justify-center shadow-xl border-4 border-white">

                <span className="text-xl font-extrabold">
                  50%
                </span>

                <span className="text-[10px] font-bold uppercase">
                  OFF
                </span>

              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default DealsSection;