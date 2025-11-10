import express from "express";
import fs from "fs";
import { saveToDatabase } from "../server.js";

const router = express.Router();

const getDB = () => JSON.parse(fs.readFileSync("./database.json", "utf-8"));

// Crear reseña
router.post("/", (req, res) => {
  const db = getDB();
  const nuevaReseña = {
    id: Date.now(),
    ...req.body,
  };
  db.reseñas.push(nuevaReseña);
  saveToDatabase(db);
  res.status(201).json({ message: "Reseña creada", reseña: nuevaReseña });
});

// Obtener todas las reseñas
router.get("/", (req, res) => {
  const db = getDB();
  res.json(db.reseñas);
});

export default router;
