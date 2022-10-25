const { API_KEY } = process.env;
const { Dog, Temperament } = require("../db");
const fetch = require("node-fetch");

//This controller get information from API and the DB and gather all together.

// Data Base
const dogDB = async () => {
  return Dog.findAll({
    include: {
      model: Temperament,
      attributes: ["temperament"],
      through: {
        attributes: [],
      },
    },
  });
};

// API

const apiDB = async () => {
  const dogApi = await fetch(
    `https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`,
    { method: "GET" }
  );
  const dataJson = await dogApi.json();
  let allData = [];
  for (let perro of dataJson) {
    let dog = {};

    dog["name"] = perro.name;
    dog["minHeight"] = perro.height.imperial.split("-")[0].trim();
    dog["maxHeight"] = perro.height.imperial.split("-").reverse()[0].trim();
    dog["minWeight"] = perro.weight.imperial.split("-")[0].trim();
    dog["maxWeight"] = perro.weight.imperial.split("-").reverse()[0].trim();
    dog["life_expectancy"] = perro.life_span;
    dog["image"] = perro.image.url;
    const temperament = perro.temperament;

    let nuevo = await Dog.create(dog);
    linkTempera(nuevo, temperament);
    allData.push(dog);
  }

  return allData;
};

const getTemperaments = async () => {
  let arr = [];
  const temp = {};
  const apiTemperaments = await fetch(
    `https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`,
    { method: "GET" }
  );
  const dataJson = await apiTemperaments.json();

  const allTemperaments = dataJson
    .map((data) => data.temperament)
    .join()
    .split(",")
    .sort();

  await allTemperaments
    .filter((t, i) => allTemperaments.indexOf(t) === i)
    .forEach(
      (t) =>
        t.trim() !== "" &&
        Temperament.findOrCreate({
          where: {
            temperament: t.trim(),
          },
        })
    );
  const dogsTemperaments = await Temperament.findAll({
    order: [["temperament"]],
  });

  for (let i = 0; i < dogsTemperaments.length; i++) {
    arr.push(dogsTemperaments[i].temperament);
  }
  temp["temperamento"] = arr;
  return temp;
};

const linkTempera = async (perro, temperamentos) => {
  if (temperamentos !== undefined) {
    const allTemperaments = temperamentos.split(",");

    for (let i = 0; i < allTemperaments.length; i++) {
      const temperamento = await Temperament.findAll({
        where: { temperament: allTemperaments[i].trim() },
      });
      perro.addTemperament(temperamento);
    }
  }
  return undefined;
};

const validate = async () => {
  const v = await Dog.findByPk(1);
  if (v === null) {
    const data = await apiDB();
    return data;
  }
};

module.exports = { dogDB, apiDB, getTemperaments, validate };
