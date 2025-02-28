# 🍫 Proyecto: Detalles Dulces

**Bienvenido/a a Detalles Dulces**, una tienda online de golosinas y bombones con un catálogo de productos disponible para todos los usuarios y un dashboard de administración para gestionar los productos.

Nuestra tienda está construida con **Node.js** y **Express**, y los datos se almacenan en una base de datos **MongoDB Atlas**. Además, el proyecto cuenta con autenticación mediante **Firebase** y está preparado para ser desplegado en **Render**.

## 📁 Estructura de archivos

El proyecto sigue una estructura organizada para facilitar la escalabilidad:

```
.
├── config
│   ├── db.js
│   └── firebase.js (BONUS)
├── controllers
│   ├── productController.js
│   └── authController.js (BONUS)
├── models
│   └── Product.js
│   └── Users.js
├── routes
│   └── productRoutes.js
│   └── authRoutes.js (BONUS)
├── middlewares (BONUS)
│   └── authMiddleware.js
└── index.js
├── test (BONUS)
│   └── productController.test.js
├── public
│   ├── utils
│        └── firebase.js
│   ├── styles.css
│   └── views
├── .env
└── package.json
```

## 🛠️ Instalación y configuración

1. **Clonar el repositorio del ejercicio:**
   ```bash
   git clone <URL_DEL_REPOSITORIO>
   cd detalles-dulces
   ```
2. **Instalar dependencias:**
   ```bash
   npm install
   ```
3. **Configurar variables de entorno:**
   Archivo `.env` en la raíz del proyecto con:
   ```env
   MONGO_URI=<URI_DE_TU_BASE_DE_DATOS>
   PORT=3000
   ```
4. **Ejecutar el servidor:**
   ```bash
   npm start
   ```

## 📌 Funcionalidades

### 🔹 Usuarios
- Registro e inicio de sesión con Firebase Authentication.
- Protección de rutas mediante middleware.

### 🔹 Productos
- Listado de productos disponible para cualquier usuario.
- Filtrado de productos por categorías: **Cestas, Conos, Corazones, Cajas**.
- Dashboard de administrador para gestionar productos (crear, editar, eliminar).

### 🔹 Seguridad
- Autenticación con Firebase.
- Cookies httpOnly para mayor seguridad en la sesión del usuario.

## 🚀 Rutas principales

### 🏪 Rutas públicas
| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/products` | Muestra todos los productos. |
| GET | `/products/:productId` | Muestra el detalle de un producto. |
| GET | `/products/category/:category` | Filtra productos por categoría. |

### 🔐 Rutas protegidas (requieren autenticación)
| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/dashboard` | Muestra todos los productos en el dashboard. |
| GET | `/dashboard/new` | Formulario para agregar un nuevo producto. |
| POST | `/dashboard` | Crea un nuevo producto. |
| GET | `/dashboard/:productId/edit` | Formulario para editar un producto. |
| POST | `/dashboard/:productId` | Actualiza un producto existente. |
| POST | `/dashboard/:productId/delete` | Elimina un producto. |

### 🔑 Autenticación
| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/register` | Muestra el formulario de registro. |
| POST | `/register` | Registra un nuevo usuario. |
| GET | `/login` | Muestra el formulario de inicio de sesión. |
| POST | `/login` | Inicia sesión y guarda un token en cookies. |
| POST | `/logout` | Cierra sesión y elimina el token. |

## 🧪 Tests (Opcional)
Para asegurar que el controlador de productos funciona correctamente, se implementan pruebas con **Jest**.

Ejecutar los tests:
```bash
npm test
```

## 📦 Despliegue

Este proyecto está listo para ser desplegado en **Render**:

1. Crear un nuevo proyecto en Render.
2. Conectar el repositorio de GitHub.
3. Configurar las variables de entorno en Render.
4. Deploy automático con cada push a `main`.

## 📖 Recursos útiles
- [Express](https://expressjs.com/)
- [Mongoose](https://mongoosejs.com/)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- [Firebase Auth](https://firebase.google.com/docs/auth)
- [Render](https://render.com/)
- [Jest (Testing)](https://jestjs.io/)
