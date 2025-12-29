import moment from "moment-timezone";
import { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { countryToTimeZone } from "../../ConstantData";
import { setTimeZone, setLocation, setImage } from "../../redux/features/imagePath";
import { useAppDispatch } from "../../redux/store";
import { getWeatherInfo } from "../utilities";

export const useWeatherLogic = (initialCity?: string) => {
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const [city, setCity] = useState(initialCity || "");

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (initialCity) {
      setCity(initialCity);
    }
  }, [initialCity]);

  const { data, refetch, isError } = useQuery({
    queryFn: () => getWeatherInfo(city),
    queryKey: ["weather-data", city],
    enabled: !!city,
  });
  if (isError) {
    <h2>error happen</h2>;
  }
  // Extracted variables before using them
  const name = data?.location?.name;
  const country = data?.location?.country;

  useEffect(() => {
    if (country && countryToTimeZone[country]) {
      const timeZone = countryToTimeZone[country];
      const updateTime = () => {
        setDate(moment().tz(timeZone).format("YYYY-MM-DD"));
        setTime(moment().tz(timeZone).format("HH:mm:ss"));
      };

      dispatch(setTimeZone({ timeZone }));
      updateTime();
      const interval = setInterval(updateTime, 1000);
      return () => clearInterval(interval);
    } else {
      setDate(moment().format("YYYY-MM-DD"));
      setTime(moment().format("HH:mm:ss"));
    }
  }, [country, dispatch]);

  useEffect(() => {
    if (data?.current?.condition?.text) {
      let path = "/image/weather-image.jpg"; // Default path

      const conditionText = data.current.condition.text.toLowerCase();

      if (conditionText.includes("heavy freezing drizzle")) {
        path = "/image/drizzle.jpg"; 
      } else if (conditionText.includes("freezing drizzle")) {
        path = "/image/drizzle.jpg";
      } else if (conditionText.includes("light freezing rain")) {
        path = "/image/light-freezing-rain.jpg";
      } else if (conditionText.includes("heavy snow")) {
        path = "/image/snow.jpg";
      } else if (conditionText.includes("moderate snow")) {
        path = "/image/snow.jpg";
      } else if (conditionText.includes("light snow")) {
        path = "/image/snow.jpg";
      } else if (conditionText.includes("patchy snow")) {
        path = "/image/patchy-snow.jpg";
      } else if (conditionText.includes("snow")) {
        path = "/image/snow.jpg";
      } else if (conditionText.includes("light drizzle")) {
        path = "/image/drizzle.jpg";
      } else if (conditionText.includes("drizzle")) {
        path = "/image/drizzle.jpg";
      } else if (conditionText.includes("patchy sleet")) {
        path = "/image/patchy-sleet.jpg";
      } else if (conditionText.includes("light sleet")) {
        path = "/image/drizzle.jpg"; 
      } else if (conditionText.includes("patchy rain")) {
        path = "/image/patchy-rain.jpg";
      } else if (conditionText.includes("light rain")) {
        path = "/image/light-rain.jpg";
      } else if (conditionText.includes("rain")) {
        path = "/image/rain.jpg";
      } else if (conditionText.includes("thunder")) {
        path = "/image/thunderstorm.jpg";
      } else if (conditionText.includes("blizzard")) {
        path = "/image/snow.jpg"; // Fallback
      } else if (conditionText.includes("fog")) {
        path = "/image/fog.jpg";
      } else if (conditionText.includes("mist")) {
        path = "/image/mist.jpg";
      } else if (conditionText.includes("overcast")) {
        path = "/image/overcast.jpg";
      } else if (conditionText.includes("cloudy")) {
        path = "/image/cloudy.jpg";
      } else if (conditionText.includes("partly cloudy")) {
        path = "/image/partlycloudy.jpg";
      } else if (conditionText.includes("sunny")) {
        path = "/image/sunny.jpg";
      } else if (conditionText.includes("clear")) {
        path = "/image/clear.jpg";
      } else {
        path = "/image/weather-image.jpg";
      }
      dispatch(setImage({ path }));
      dispatch(setLocation({ name, country }));
    }
  }, [data, dispatch, name, country]);
  //   useEffect(() => {
  //     if (data?.current?.condition?.text) {
  //       let path = "/src/assets/video/weather-video.mp4"; // Default path

  //       const conditionText = data.current.condition.text.toLowerCase();

  //       if (conditionText.includes("partly cloudy")) {
  //         path = "/src/assets/video/partlycloudy.mp4";
  //       } else if (conditionText.includes("light rain")) {
  //         path = "/src/assets/video/light-rain.mp4";
  //       } else if (conditionText.includes("sunny")) {
  //         path = "/src/assets/video/sunny.mp4";
  //       } else if (conditionText.includes("cloudy")) {
  //         path = "/src/assets/video/cloudy.mp4";
  //       } else if (conditionText.includes("overcast")) {
  //         path = "/src/assets/video/overcast.mp4";
  //       } else if (conditionText.includes("snow")) {
  //         path = "/src/assets/video/light-snow.mp4";
  //       } else if (conditionText.includes("thunder")) {
  //         path = "/src/assets/video/thunderstorm.mp4";
  //       } else if (conditionText.includes("rain")) {
  //         path = "/src/assets/video/heavy-rain.mp4";
  //       } else if (conditionText.includes("mist")) {
  //         path = "/src/assets/video/mist.mp4";
  //       } else if (conditionText.includes("fog")) {
  //         path = "/src/assets/video/fog.mp4";
  //       } else if (conditionText.includes("drizzle")) {
  //         path = "/src/assets/video/drizzle.mp4";
  //       } else if (conditionText.includes("clear")) {
  //         path = "/src/assets/video/clear.mp4";
  //       } else if (conditionText.includes("patchy rain")) {
  //         path = "/src/assets/video/patchy-rain.mp4";
  //       } else if (conditionText.includes("patchy snow")) {
  //         path = "/src/assets/video/patchy-snow.mp4";
  //       } else if (conditionText.includes("patchy sleet")) {
  //         path = "/src/assets/video/patchy-sleet.mp4";
  //       } else if (conditionText.includes("blizzard")) {
  //         path = "/src/assets/video/blizzard.mp4";
  //       } else if (conditionText.includes("freezing drizzle")) {
  //         path = "/src/assets/video/freezing-drizzle.mp4";
  //       } else if (conditionText.includes("heavy freezing drizzle")) {
  //         path = "/src/assets/video/heavy-freezing-drizzle.mp4";
  //       } else if (conditionText.includes("light drizzle")) {
  //         path = "/src/assets/video/light-drizzle.mp4";
  //       } else if (conditionText.includes("light freezing rain")) {
  //         path = "/src/assets/video/light-freezing-rain.mp4";
  //       } else if (conditionText.includes("light sleet")) {
  //         path = "/src/assets/video/light-sleet.mp4";
  //       } else if (conditionText.includes("light snow")) {
  //         path = "/src/assets/video/light-snow.mp4";
  //       } else if (conditionText.includes("moderate snow")) {
  //         path = "/src/assets/video/moderate-snow.mp4";
  //       } else if (conditionText.includes("heavy snow")) {
  //         path = "/src/assets/video/heavy-snow.mp4";
  //       } else {
  //         path = "/src/assets/video/weather-video.mp4";
  //       }
  //       dispatch(setVideo({ path }));
  //       dispatch(setLocation({ name, country }));
  //     }
  //   }, [data, dispatch, name, country]);

  return {
    data,
    time,
    date,
    city,
    setCity,
    refetch,
  };
};
