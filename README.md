# Gossip Cases - E-commerce Monolítico

Proyecto e-commerce desarrollado con **TypeScript**, **Node.js**, **Express**, **Sequelize** y **PostgreSQL**.

## Tech Stack

- **Backend**: Node.js (LTS) + TypeScript + Express
- **ORM**: Sequelize (PostgreSQL)
- **Frontend**: EJS + Bootstrap
- **Admin Panel**: Rutas protegidas con parámetro `pass` en URL

## Requisitos Previos

- [Node.js](https://nodejs.org/) LTS (versión 20+)
- [PostgreSQL](https://www.postgresql.org/) 14+
- [Git](https://git-scm.com/)

## Instalación

```bash
# Clonar el repositorio
git clone <repo-url>
cd gossip-cases

# Instalar dependencias
npm install
```

## Configuración

### 1. Base de Datos PostgreSQL
para iniciar el servidor de postgre ejecutá en cmd como administrador:
net start postgresql-x64-18

Crea una base de datos:

```sql
CREATE DATABASE gossip_ecommerce;
```

### 2. Archivo `.env`

Copia el ejemplo y actualiza las credenciales:

```bash
copy .env.example .env
```

O edita manualmente el archivo `.env` con:

```env
# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_NAME=gossip_ecommerce
DB_USER=postgres
DB_PASSWORD=tu_contraseña_postgres

# Admin Configuration
ADMIN_PASS=admin123

# Server Configuration
PORT=3001
```

## Comandos

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | **Desarrollo** - Arranca el servidor con recarga automática |
| `npm run build` | **Compilar** - Compila TypeScript a JavaScript |
| `npm start` | **Producción** - Ejecuta la versión compilada |
| `npm run migrate` | Ejecutar migraciones de la base de datos |

en /seeders
ejecutar esos scripts para tener categorias y productos de prueba

## Estructura del Proyecto

```
src/
├── config/
│   ├── db.ts      # Configuración de Sequelize
│   ├── env.ts     # Variables de entorno (PORT)
│   └── error.ts   # Manejo de errores global
├── controllers/
│   ├── adminController.ts
│   └── productController.ts
├── models/
│   ├── index.ts
│   ├── product.ts
│   ├── category.ts
│   ├── order.ts
│   └── user.ts
├── routes/
│   ├── adminRoutes.ts
│   ├── productRoutes.ts
│   ├── cartRoutes.ts
│   ├── authRoutes.ts
│   └── searchRoutes.ts
└── app.ts         # App Express con middleware y rutas
```

## Endpoints

### Público

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/api/products` | Listar productos |
| GET | `/api/products/:id` | Obtener producto por ID |
| GET | `/api/search?q=buscar` | Buscar productos |
| POST | `/api/cart/add/:id` | Añadir al carrito |
| GET | `/api/cart` | Obtener carrito |

### Autenticación (Sin JWT)

| Método | Ruta | Descripción |
|--------|------|-------------|
| POST | `/api/auth/login` | Login simple por email/contraseña |
| GET | `/api/auth/verify` | Verificar autenticación por parámetro `pass` en URL |

**Nota**: La autenticación no usa JWT. Solo verifica una contraseña simple por URL (poca seguridad).

### Admin (requiere `pass=admin123`)

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/api/admin/products` | Listar todos los productos |
| GET | `/api/admin/orders` | Listar todos los pedidos |

## Desarrollo

```bash
# Iniciar servidor de desarrollo
npm run dev
```

El servidor se ejecuta en `http://localhost:3001`

## Notas Importantes

- Los routes de `/api/admin/*` requieren el parámetro `pass` en la URL (ej: `?pass=admin123`)
- El carrito usa cookies `httpOnly` con `sameSite: 'lax'`
- Las imágenes validadas deben ser base64 ≤ 2MB
- Los productos tienen visibilidad `showToClients` y estado de stock `outStock`

## License

ISC
