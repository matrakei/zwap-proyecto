import express from "express";
import fs from "fs-extra";
import cors from "cors";

const app = express();
app.use(express.json({ limit: "10mb" }));
app.use(cors());

const DB_PATH = "./database.json";

// Leer DB
async function readDB() {
  const data = await fs.readFile(DB_PATH, "utf-8");
  return JSON.parse(data);
}

// Guardar DB
async function saveDB(data) {
  await fs.writeFile(DB_PATH, JSON.stringify(data, null, 2));
}

// ---------------------------------------------------
// USUARIOS
// ---------------------------------------------------

// Crear usuario
app.post("/api/usuarios", async (req, res) => {
  const db = await readDB();
  const nuevoUsuario = { 
    id: Date.now(), 
    Favoritos: [], 
    FotoPerfil: req.body.FotoPerfil || null,   // ← AGREGADO
    ...req.body 
  };

  db.usuarios.push(nuevoUsuario);
  await saveDB(db);
  res.status(201).json({ usuario: nuevoUsuario });
});

// Login
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

// ⭐⭐ NUEVO: ACTUALIZAR USUARIO (PUT)
app.put("/api/usuarios/:id", async (req, res) => {
  const db = await readDB();
  const id = parseInt(req.params.id);

  const index = db.usuarios.findIndex((u) => u.id === id);
  if (index === -1) {
    return res.status(404).json({ message: "Usuario no encontrado" });
  }

  db.usuarios[index] = {
    ...db.usuarios[index],
    ...req.body
  };

  await saveDB(db);

  res.json({ usuario: db.usuarios[index] });
});

// ---------------------------------------------------
// PUBLICACIONES
// ---------------------------------------------------
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

// ---------------------------------------------------
// FAVORITOS
// ---------------------------------------------------

app.post("/api/favoritos", async (req, res) => {
  const { correo, publicacionId } = req.body;
  if (!correo || !publicacionId) {
    return res.status(400).json({ message: "Faltan datos" });
  }
  const db = await readDB();
  const usuario = db.usuarios.find((u) => u.CorreoElectronico === correo);
  if (!usuario) return res.status(404).json({ message: "Usuario no encontrado" });

  if (!Array.isArray(usuario.Favoritos)) usuario.Favoritos = [];
  if (!usuario.Favoritos.includes(publicacionId)) {
    usuario.Favoritos.push(publicacionId);
    await saveDB(db);
  }
  res.json({ favoritos: usuario.Favoritos });
});

app.delete("/api/favoritos", async (req, res) => {
  const { correo, publicacionId } = req.body;
  const db = await readDB();
  const usuario = db.usuarios.find((u) => u.CorreoElectronico === correo);

  usuario.Favoritos = usuario.Favoritos.filter((id) => id !== publicacionId);
  await saveDB(db);

  res.json({ favoritos: usuario.Favoritos });
});

app.get("/api/favoritos/:correo", async (req, res) => {
  const db = await readDB();
  const usuario = db.usuarios.find((u) => u.CorreoElectronico === req.params.correo);

  if (!usuario) {
    return res.status(404).json({ message: "Usuario no encontrado" });
  }

  // 🛠 Si Favoritos no existe, lo inicializamos
  if (!Array.isArray(usuario.Favoritos)) {
    usuario.Favoritos = [];
    await saveDB(db); // lo guardamos para evitar futuros errores
  }

  const favoritosPublicaciones = db.publicaciones.filter((p) =>
    usuario.Favoritos.includes(p.id)
  );

  res.json(favoritosPublicaciones);
});


// ---------------------------------------------------
app.listen(3001, () => {
  console.log("Servidor en http://localhost:3001");
});
