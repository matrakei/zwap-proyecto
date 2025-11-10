import express from "express";
import fs from "fs";
import { saveToDatabase } from "../server.js";

const router = express.Router();

const getDB = () => JSON.parse(fs.readFileSync("./database.json", "utf-8"));

// Crear usuario
router.post("/", (req, res) => {
  const db = getDB();
  const nuevoUsuario = {
    id: Date.now(),
    ...req.body,
  };
  db.usuarios.push(nuevoUsuario);
  saveToDatabase(db);
  res.status(201).json({ message: "Usuario creado", usuario: nuevoUsuario });
});

// Obtener todos los usuarios
router.get("/", (req, res) => {
  const db = getDB();
  res.json(db.usuarios);
});

export default router;
