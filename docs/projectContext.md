# 📌 Contexto Técnico — E-commerce Monolítico (TypeScript + Sequelize + PostgreSQL)

## 🏗️ Arquitectura General

- **Servidor**: VPS único (ej. Hostinger), sin Docker.
- **Stack**: Node.js (LTS) + TypeScript + Express + Sequelize (Postgres).
- **Frontend**: EJS + Bootstrap.
- **Backoffice**: `/admin`, accesible solo mediante URL oculta con parámetro `pass`.
- **Seguridad**: HTTPS con Nginx + Let's Encrypt.
- **Migración**: simple (código + dump DB).

## 📂 Estructura del Proyecto

### Código

```
/ecommerce
  /src
    /controllers
      productController.ts
      searchController.ts
      adminController.ts
      cartController.ts
      orderController.ts
    /models
      product.ts
      category.ts
      order.ts
    /routes
      productRoutes.ts
      searchRoutes.ts
      adminRoutes.ts
      cartRoutes.ts
    /middlewares
      adminPassMiddleware.ts
      cookieParser.ts
    /views
      products.ejs
      productDetail.ejs
      cart.ejs
      search.ejs
      admin/products.ejs
      admin/productForm.ejs
      admin/orders.ejs
    /config
      db.ts
      env.ts
  /migrations
  /seeders
  app.ts
```

### 🗄️ Modelos Sequelize (TypeScript)

#### Product

**Campos:**

- `id`: `number`
- `name`: `string`
- `price`: `number`
- `description?`: `string`
- `image?`: `string` (base64 ≤ 2MB)
- `categoryId`: `number`
- `showToClients`: `boolean` → controla visibilidad en catálogo y buscador
- `outStock`: `boolean` → si `true`, se muestra como "Fuera de stock" (botón deshabilitado)

#### Category

Precargada por seeder, fija.

Relación: `Product.belongsTo(Category)`.

#### Order

**Campos:**

- `id`: `number`
- `products`: `number[]` (array de IDs)
- `total`: `number`
- `status`: `'pending' | 'confirmed'`
- `createdAt`: `Date`

## 🌐 Endpoints

### Públicos

- `GET /products` → lista productos visibles (`showToClients=true`).
- `GET /products/:id` → detalle producto (solo si visible).
- `GET /search?q=texto` → buscador (filtra por `name`/`description`, solo visibles).
- `POST /buy/:id` → flujo de compra directa: valida producto, añade `productId` a cookie `cart` y redirige a `/cart`.
- `POST /cart/add/:id` → flujo de carrito: valida producto y añade `productId` a cookie `cart`.
- `GET /cart` → muestra carrito, limpia productos ocultos o fuera de stock.
- `POST /checkout` → botón **"Continuar con la compra"** en la vista del carrito. Acción pendiente de definición (placeholder).

### Admin (con `pass` en URL)

- ✅ No hay login ni JWT.
- ✅ Se accede mediante URL oculta con parámetro `pass`.
- ✅ El `pass` se valida en el método del controller.

**Endpoints:**

- `GET /admin/products?pass=XXXX` → lista completa.
- `POST /admin/products?pass=XXXX` → crear producto.
- `PUT /admin/products/:id?pass=XXXX` → editar producto (incluye `showToClients` y `outStock`).
- `DELETE /admin/products/:id?pass=XXXX` → eliminar producto.
- `GET /admin/orders?pass=XXXX` → listar pedidos.

## 🛒 Flujos de compra

### 1. Comprar directo

- Botón en cada producto → `POST /buy/:id`.
- Backend valida `showToClients=true && outStock=false`.
- Añade el `productId` a la cookie `cart`.
- Redirige automáticamente a `/cart`.

### 2. Añadir al carrito

- Botón en cada producto → `POST /cart/add/:id`.
- Backend valida `showToClients=true && outStock=false`.
- Agrega el `productId` a la cookie `cart`.
- El usuario luego puede ir a `/cart` y hacer checkout de varios productos juntos.

### 3. Continuar con la compra

- En la vista `/cart`, debajo de la lista de productos hay un botón **"Continuar con la compra"**.
- Acción pendiente de definición (placeholder).
- Por ahora, solo muestra un mensaje o redirige a una página temporal.

## 🔒 Seguridad

- Admin: acceso mediante URL oculta con parámetro `pass`.
- Cookies: `{ httpOnly: true, secure: true, sameSite: 'Lax' }`.
- Firewall VPS: solo puertos 80/443 abiertos.
- HTTPS obligatorio con Nginx + Let's Encrypt.

## 📜 Scripts recomendados

```json
{
  "scripts": {
    "dev": "ts-node-dev --respawn --transpile-only src/app.ts",
    "build": "tsc",
    "start": "node dist/app.js",
    "migrate": "npx sequelize-cli db:migrate",
    "seed": "npx sequelize-cli db:seed:all",
    "lint": "eslint . --ext .ts"
  }
}
```

## ✅ Checklist de entrega

- [ ] Inicializar repo TypeScript con ESLint y Prettier.
- [ ] Configurar Sequelize + migraciones + seeders (categorías fijas + admin pass).
- [ ] Implementar modelos TS: Product, Category, Order.
- [ ] Implementar rutas públicas (`/products`, `/search`, `/buy/:id`, `/cart`, `/checkout`).
- [ ] Implementar flujo de compra directa → añade a cookie y redirige a `/cart`.
- [ ] Implementar flujo de carrito (`/cart/add/:id`, `/cart`, `/checkout`).
- [ ] Implementar botón **"Continuar con la compra"** en `/cart` (acción pendiente).
- [ ] Implementar backoffice con validación de `pass` en URL.
- [ ] Validar imágenes (base64 ≤ 2MB).
- [ ] Implementar vistas EJS con Bootstrap.
- [ ] Configurar Nginx + HTTPS en VPS.
- [ ] Documentar comandos de migración, seed y despliegue.