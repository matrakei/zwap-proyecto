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
  const nuevoUsuario = { id: Date.now(), Favoritos: [], ...req.body };
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
// 💖 FAVORITOS
// ------------------------------

// ➕ Agregar a favoritos
app.post("/api/favoritos", async (req, res) => {
  const { correo, publicacionId } = req.body;
  if (!correo || !publicacionId) {
    return res.status(400).json({ message: "Faltan datos (correo o publicacionId)" });
  }

  const db = await readDB();
  const usuario = db.usuarios.find((u) => u.CorreoElectronico === correo);
  if (!usuario) return res.status(404).json({ message: "Usuario no encontrado" });

  // Crear el array si no existe
  if (!Array.isArray(usuario.Favoritos)) usuario.Favoritos = [];

  // Evitar duplicados
  if (!usuario.Favoritos.includes(publicacionId)) {
    usuario.Favoritos.push(publicacionId);
    await saveDB(db);
  }

  res.json({ message: "Agregado a favoritos", favoritos: usuario.Favoritos });
});

// ❌ Eliminar de favoritos
app.delete("/api/favoritos", async (req, res) => {
  const { correo, publicacionId } = req.body;
  if (!correo || !publicacionId) {
    return res.status(400).json({ message: "Faltan datos (correo o publicacionId)" });
  }

  const db = await readDB();
  const usuario = db.usuarios.find((u) => u.CorreoElectronico === correo);
  if (!usuario) return res.status(404).json({ message: "Usuario no encontrado" });

  usuario.Favoritos = (usuario.Favoritos || []).filter((id) => id !== publicacionId);
  await saveDB(db);

  res.json({ message: "Eliminado de favoritos", favoritos: usuario.Favoritos });
});

// 📄 Obtener los favoritos del usuario (con datos completos de publicaciones)
app.get("/api/favoritos/:correo", async (req, res) => {
  const correo = req.params.correo;
  const db = await readDB();

  const usuario = db.usuarios.find((u) => u.CorreoElectronico === correo);
  if (!usuario) return res.status(404).json({ message: "Usuario no encontrado" });

  const favoritosIds = usuario.Favoritos || [];
  const favoritosPublicaciones = db.publicaciones.filter((p) =>
    favoritosIds.includes(p.id)
  );

  res.json(favoritosPublicaciones);
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
