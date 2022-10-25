const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const { Dog, Temperament } = require("../db");

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.post("/", async (req, res) => {
  try {
    const {
      name,
      minHeight,
      maxHeight,
      minWeight,
      maxWeight,
      life_expectancy,
      temperament,
      image,
    } = req.body;
    const newDog = await Dog.create({
      name,
      maxHeight,
      minHeight,
      maxWeight,
      minWeight,
      life_expectancy,
      image,
    });

    for (let i = 0; i < temperament.length; i++) {
      const aux = {};
      aux["temperament"] = temperament[i];
      console.log(aux);
      const newTemperament = await Temperament.findAll({ where: aux });

      await newDog.addTemperament(newTemperament);
    }

    res.status(200).json(newDog);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    if (id) {
      await Dog.destroy({
        where: {
          id: id,
        },
      });
      res.status(200).json({ message: `Dog ${id} has been deleted` });
    }
  } catch (error) {
    res.status(400).json({ error: "ID not found" });
  }
});

module.exports = router;
