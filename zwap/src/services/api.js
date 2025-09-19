// api.js
const BASE_URL = "http://localhost:3000";

// -------------------- USUARIOS --------------------

// Crear un nuevo usuario
export async function crearUsuario(usuario) {
  const res = await fetch(`${BASE_URL}/usuarios`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(usuario),
  });
  return res.json();
}

// Eliminar usuario
export async function eliminarUsuario(credenciales) {
  const res = await fetch(`${BASE_URL}/Usuario`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credenciales),
  });
  return res.json();
}

// Actualizar usuario
export async function actualizarUsuario(correo, datos) {
  const res = await fetch(`${BASE_URL}/Usuario/${correo}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(datos),
  });
  return res.json();
}

// -------------------- AUTENTICACIÓN --------------------

// Login
export async function login(credenciales) {
  const res = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credenciales),
  });
  const data = await res.json();
  if (data.token) {
    localStorage.setItem("token", data.token);
  }
  return data;
}

// Pedir código de recuperación
export async function pedirCodigo(correo) {
  const res = await fetch(`${BASE_URL}/recuperar`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ CorreoElectronico: correo }),
  });
  return res.json();
}

// Restablecer contraseña
export async function restablecerPassword(datos) {
  const res = await fetch(`${BASE_URL}/restablecer`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(datos),
  });
  return res.json();
}

// -------------------- PUBLICACIONES --------------------

export async function crearPublicacion(datos, file) {
  const token = localStorage.getItem("token");
  const formData = new FormData();

  // Campos de la publicación
  for (const key in datos) {
    if (Array.isArray(datos[key])) {
      datos[key].forEach((item) => formData.append(`${key}[]`, item));
    } else {
      formData.append(key, datos[key]);
    }
  }

  // Archivo (imagen)
  if (file) {
    formData.append("imagen", file);
  }

  const res = await fetch(`${BASE_URL}/api/publicaciones`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body: formData,
  });
  return res.json();
}
