"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import { getData } from "@/actions/get-data";

const getWeather = async (formData?: FormData) => {
  let city;
  if (formData) {
    city = formData.get("city");
    if (city === null || city === undefined) {
      city = "Prague";
    }
  } else {
    city = "Prague";
  }

  const data = await getData(city);

  let weatherIcon = document.getElementById("weather-icon");
  let tempIcon = document.getElementById("temp-ico");
  if (data.cod === "404") {
    document.getElementById("error")!.innerHTML =
      "Check spelling and try it again";
    return;
  }

  if (data.weather[0].main == "Clouds") {
    // @ts-ignore
    weatherIcon.src = "/images/clouds.svg";
  }
  if (data.weather[0].main == "Thunderstorm") {
    // @ts-ignore
    weatherIcon.src = "/images/thunder.svg";
  }
  if (data.weather[0].main == "Drizzle") {
    // @ts-ignore
    weatherIcon.src = "/images/drizzle.svg";
  }
  if (data.weather[0].main == "Rain") {
    // @ts-ignore
    weatherIcon.src = "/images/rain.svg";
  }
  if (data.weather[0].main == "Clear") {
    // @ts-ignore
    weatherIcon.src = "/images/sun.svg";
  }

  if (data.main.temp < 5) {
    // @ts-ignore
    tempIcon.src = "/icons/snow.svg";
  }

  document.getElementById("error")!.innerHTML = "";
  document.getElementById("city")!.innerHTML = data.name;
  document.getElementById("temperature")!.innerHTML =
    Math.round(data.main.temp) + "°C";
  document.getElementById("humidity")!.innerHTML = data.main.humidity + "%";
  document.getElementById("wind-speed")!.innerHTML = data.wind.speed + "km/h";

  return;
};
const Page = () => {
  useEffect(() => {
    getWeather();
  }, []);
  return (
    <section className="max-w-[400px] mx-auto size-full  flex flex-col items-center py-5 gap-8">
      <h1 className="font-bold text-3xl">WEATHER</h1>
      <p className="" id="error"></p>
      <form
        action={getWeather}
        className="w-[80%] flex h-[30px] justify-around"
      >
        <input
          name="city"
          type="text"
          placeholder="search city..."
          className="placeholder:text-slate-800 rounded-md px-2 bg-white/20 border-2 border-black outline-none"
        />
        <button
          type="submit"
          className="px-1 border-black border-2 bg-white/20 rounded-md"
        >
          <Image src="/icons/search.svg" alt="search" width={24} height={24} />
        </button>
      </form>
      <div className="flex flex-col w-full items-center gap-5">
        <div className="flex gap-2">
          <Image src="/icons/pin.svg" alt="location" width={24} height={24} />
          <h2 className="text-3xl font-medium" id="city">
            Belgium
          </h2>
        </div>
        <Image
          id="weather-icon"
          src="/images/thunder.svg"
          alt="weather"
          width={200}
          height={200}
        />
      </div>

      {/*weather info*/}
      <div className="grid grid-cols-2 w-[80%] justify-items-center gap-y-3">
        {/*temp*/}
        <div className="flex gap-2">
          <Image
            src="/icons/sunny.svg"
            alt="temp-ico"
            id="temp-ico"
            width={35}
            height={35}
          />
          <div className="flex flex-col  min-w-[70px]">
            <h3 className="text-2xl leading-6" id="temperature">
              27C
            </h3>

            <p className="text-[10px] leading-tight">temperature</p>
          </div>
        </div>
        {/*wind speed*/}
        <div className="flex gap-2">
          <Image src="/icons/wind.svg" alt="wind-ico" width={35} height={35} />
          <div className="flex flex-col">
            <h3 className="text-2xl leading-6" id="wind-speed">
              80 m/s
            </h3>
            <p className="text-[10px] leading-tight">wind speed</p>
          </div>
        </div>
        {/*humidity*/}
        <div className="flex gap-2">
          <Image
            src="/icons/humidity.svg"
            alt="humidity-ico"
            width={35}
            height={35}
          />
          <div className="flex flex-col min-w-[70px]">
            <h3 className="text-2xl leading-6" id="humidity">
              80%
            </h3>
            <p className="text-[10px] leading-tight">humidity</p>
          </div>
        </div>
      </div>
      <div className="flex-1 flex items-end ">
        <p>
          Wether powered <br /> by{" "}
          <span className="font-light">OpenWeather</span>
        </p>
      </div>
    </section>
  );
};

export default Page;
