import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useWeatherLogic } from "./WeatherFunction";

const WeatherForm: React.FC<{ city?: string }> = ({ city: initialCity }) => {
  const [isCelsius, setIsCelsius] = useState(true);
  const [inputValue, setInputValue] = useState<string>("");

  const navigate = useNavigate();
  const { data, time, date, setCity, refetch } = useWeatherLogic(initialCity);
  // const { image } = useAppSelector((state) => state.im);

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      setCity(inputValue);
      refetch();
      navigate(`/${inputValue}`);
      setInputValue("");
      console.log(data);
      
    }
  };

  return (
    <div className="flex w-full items-center justify-center p-4">
      {/* GLASS CARD CONTAINER */}
      <div className="w-full max-w-md overflow-hidden rounded-3xl border border-white/20 bg-black/20 p-8 shadow-2xl backdrop-blur-xl">
        {/* SEARCH BAR */}
        <form onSubmit={submitHandler} className="mb-8 relative group">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Search city..."
            className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 pl-12 text-white placeholder-white/50 shadow-inner outline-none transition focus:bg-black/30 focus:ring-1 focus:ring-white/30"
          />
          <button
            type="submit"
            className="absolute left-3 top-1/2 -translate-y-1/2 text-white/70 transition hover:text-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
          </button>
        </form>

        {data ? (
          <div className="flex flex-col items-center text-white">
            {/* LOCATION HEADER */}
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-wide drop-shadow-md">{data.location?.name || "Unknown"}</h2>
              <p className="mt-1 text-sm font-light text-white/70">
                {date} • {time}
              </p>
            </div>

            {/* MAIN WEATHER DISPLAY */}
            <div className="my-8 flex flex-col items-center justify-center">
              <div className="relative">
                {/* Subtle glow behind icon */}
                <div className="absolute inset-0 rounded-full bg-white/20 blur-xl"></div>
              </div>

              <div className="mt-4 flex items-start">
                <h1 className="text-7xl font-bold tracking-tighter drop-shadow-lg">
                  {isCelsius ? data.current.temp_c : data.current.temp_f}
                </h1>

                {/* UNIT TOGGLE */}
                <div className="mt-2 flex gap-1 text-lg font-medium">
                  <button
                    onClick={() => setIsCelsius(true)}
                    className={`transition-colors ${isCelsius ? "text-white" : "text-white/40 hover:text-white/80"}`}
                  >
                    °C
                  </button>
                  <span className="text-white/40">|</span>
                  <button
                    onClick={() => setIsCelsius(false)}
                    className={`transition-colors ${!isCelsius ? "text-white" : "text-white/40 hover:text-white/80"}`}
                  >
                    °F
                  </button>
                </div>
              </div>
              <p className="mt-2 text-xl font-medium text-white/90">{data.current.condition.text}</p>
            </div>

            {/* STATS GRID */}
            <div className="grid w-full grid-cols-2 gap-3">
              <StatBox label="Humidity" value={`${data.current.humidity}%`}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 22a7 7 0 0 0 7-7c0-2-2-5-7-14-5 9-7 12-7 14a7 7 0 0 0 7 7z" />
                </svg>
              </StatBox>

              <StatBox label="Wind Speed" value={`${data.current.wind_kph} km/h`}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H2" />
                  <path d="M9.6 4.6A2 2 0 1 1 11 8H2" />
                  <path d="M12.6 19.4A2 2 0 1 0 14 16H2" />
                </svg>
              </StatBox>

              <StatBox label="Pressure" value={`${data.current.pressure_mb} mb`}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M16.2 7.8 12 12" />
                </svg>
              </StatBox>

              <StatBox label="UV Index" value={`${data.current.uv}`}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="4" />
                  <path d="M12 2v2" />
                  <path d="M12 20v2" />
                  <path d="m4.93 4.93 1.41 1.41" />
                  <path d="m17.66 17.66 1.41 1.41" />
                  <path d="M2 12h2" />
                  <path d="M20 12h2" />
                  <path d="m6.34 17.66-1.41 1.41" />
                  <path d="m19.07 4.93-1.41 1.41" />
                </svg>
              </StatBox>

              {/* Full width box for "Feels Like" */}
              <div className="col-span-2 rounded-2xl border border-white/10 bg-white/5 p-3 flex items-center justify-between backdrop-blur-sm transition hover:bg-white/10">
                <div className="flex items-center gap-2 text-sm text-white/70">
                  <span>Feels Like</span>
                </div>
                <span className="text-lg font-semibold text-white">
                  {isCelsius ? data.current.feelslike_c : data.current.feelslike_f}°
                </span>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex h-64 flex-col items-center justify-center text-white/50">
            <p>Enter a city to explore the weather.</p>
          </div>
        )}
      </div>
    </div>
  );
};

// Helper Component for Grid Items
const StatBox = ({ label, value, children }: { label: string; value: string | number; children: React.ReactNode }) => (
  <div className="flex flex-col justify-center rounded-2xl border border-white/10 bg-white/5 p-3 backdrop-blur-sm transition hover:bg-white/10">
    <div className="flex items-center gap-2 text-xs font-medium text-white/70">
      {children}
      {label}
    </div>
    <div className="mt-1 text-lg font-semibold tracking-wide text-white">{value}</div>
  </div>
);

export default WeatherForm;
