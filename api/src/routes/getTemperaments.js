const { Router } = require("express");
const { Temperament } = require("../db");

const router = Router();

router.get("/", async (req, res) => {
  try {
    const temperamento = await Temperament.findAll();
    res.status(200).json(temperamento);
  } catch (error) {
    res.status(400).json({ error: "temperaments not found" });
  }
});

module.exports = router;
