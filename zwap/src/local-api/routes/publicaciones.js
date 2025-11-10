import express from "express";
import fs from "fs";
import { saveToDatabase } from "../server.js";

const router = express.Router();

const getDB = () => JSON.parse(fs.readFileSync("./database.json", "utf-8"));

// Crear publicación
router.post("/", (req, res) => {
  const db = getDB();
  const nuevaPublicacion = {
    id: Date.now(),
    ...req.body,
  };
  db.publicaciones.push(nuevaPublicacion);
  saveToDatabase(db);
  res.status(201).json({ message: "Publicación creada", publicacion: nuevaPublicacion });
});

// Obtener todas las publicaciones
router.get("/", (req, res) => {
  const db = getDB();
  res.json(db.publicaciones);
});

export default router;
