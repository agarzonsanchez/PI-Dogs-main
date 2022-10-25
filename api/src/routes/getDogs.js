const { Router } = require("express");
const { Temperament } = require("../db");
const {
  validate,
  getTemperaments,
  dogDB,
} = require("../controllers/dogController");

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get("/", async (req, res) => {
  const { name } = req.query;
  getTemperaments(name);
  try {
    const dogs = await validate();

    if (!name) {
      res.status(200).json(await dogDB());
    } else {
      const dogFilter = dogs.filter((dog) =>
        dog.name.toLowerCase().includes(name.toLowerCase())
      );
      if (dogFilter.length > 0) {
        res.status(200).json(dogFilter);
      } else {
        res.status(400).json({ error: "Dog requested doesn't exist" });
      }
    }
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const dogs = await dogDB();
    if (!id) {
      res.status(200).json(dogs);
    } else {
      const dogFilter = dogs.filter((dog) => dog.id === parseInt(id));
      if (dogFilter.length > 0) {
        res.status(200).json(dogFilter[0]);
      } else {
        res.status(400).json({ error: "ID not found" });
      }
    }
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
