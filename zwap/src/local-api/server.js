import express from "express";
import fs from "fs-extra";
import cors from "cors";

const app = express();
app.use(express.json({ limit: "10mb" }));
app.use(cors());

const DB_PATH = "./database.json";

// 🔄 Leer base de datos
async function readDB() {
  const data = await fs.readFile(DB_PATH, "utf-8");
  return JSON.parse(data);
}

// 💾 Guardar base de datos
async function saveDB(data) {
  await fs.writeFile(DB_PATH, JSON.stringify(data, null, 2));
}

// ------------------------------
// 🧍‍♀️ USUARIOS
// ------------------------------
app.post("/api/usuarios", async (req, res) => {
  const db = await readDB();
  const nuevoUsuario = { id: Date.now(), ...req.body };
  db.usuarios.push(nuevoUsuario);
  await saveDB(db);
  res.status(201).json({ usuario: nuevoUsuario });
});

app.post("/api/login", async (req, res) => {
  const db = await readDB();
  const { CorreoElectronico, Contrasena } = req.body;
  const usuario = db.usuarios.find(
    (u) => u.CorreoElectronico === CorreoElectronico && u.Contrasena === Contrasena
  );
  if (usuario) {
    res.json({ usuario, token: "fake-jwt-token" });
  } else {
    res.status(401).json({ message: "Credenciales inválidas" });
  }
});

// ------------------------------
// 🏠 PUBLICACIONES
// ------------------------------
app.get("/api/publicaciones", async (req, res) => {
  const db = await readDB();
  res.json(db.publicaciones);
});

app.post("/api/publicaciones", async (req, res) => {
  const db = await readDB();
  const nuevaPublicacion = { id: Date.now(), ...req.body };
  db.publicaciones.push(nuevaPublicacion);
  await saveDB(db);
  res.status(201).json({ publicacion: nuevaPublicacion });
});

app.put("/api/publicaciones/:id", async (req, res) => {
  const db = await readDB();
  const id = parseInt(req.params.id);
  const index = db.publicaciones.findIndex((p) => p.id === id);
  if (index === -1) return res.status(404).json({ message: "No encontrada" });

  db.publicaciones[index] = { ...db.publicaciones[index], ...req.body };
  await saveDB(db);
  res.json({ publicacion: db.publicaciones[index] });
});

// ------------------------------
// ⭐ RESEÑAS (para más adelante)
// ------------------------------
app.post("/api/resenas", async (req, res) => {
  const db = await readDB();
  const nuevaResena = { id: Date.now(), ...req.body };
  db.reseñas.push(nuevaResena);
  await saveDB(db);
  res.status(201).json({ resena: nuevaResena });
});

// ------------------------------
app.listen(3001, () => {
  console.log("✅ Servidor local corriendo en http://localhost:3001");
});
