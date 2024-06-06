"use server";

export const getData = async (city: any) => {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.API_KEY}`,
  );

  const data = await response.json();

  return data;
};
