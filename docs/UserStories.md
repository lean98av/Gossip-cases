# 📌 User Stories y Tasks — Backend

---

## US01 — Catálogo de productos

**Como** cliente  
**Quiero** ver el listado de productos disponibles para poder elegir qué comprar.

### Criterios de aceptación

- ✅ Solo se muestran productos con `showToClients=true`.
- ✅ Si `outStock=true`, se muestran deshabilitados.

### Tasks

- [ ] Modelo `Product` con campos (`showToClients`, `outStock`).
- [ ] Endpoint `GET /products`.
- [ ] Renderizar vista `products.ejs`.

---

## US02 — Detalle de producto

**Como** cliente  
**Quiero** ver el detalle de un producto para conocer su información antes de comprar.

### Criterios de aceptación

- ✅ Solo accesible si `showToClients=true`.
- ✅ Si `outStock=true`, botón de compra deshabilitado.

### Tasks

- [ ] Endpoint `GET /products/:id`.
- [ ] Renderizar vista `productDetail.ejs`.
- [ ] Validar flags `showToClients` y `outStock`.

---

## US03 — Buscador de productos

**Como** cliente  
**Quiero** buscar productos por nombre o descripción para encontrarlos fácilmente.

### Criterios de aceptación

- ✅ Solo devuelve productos con `showToClients=true`.
- ✅ Si `outStock=true`, aparecen pero deshabilitados.

### Tasks

- [ ] Endpoint `GET /search?q=texto`.
- [ ] Query con `ILIKE` en Sequelize.
- [ ] Renderizar vista `search.ejs`.

---

## US04 — Comprar directo

**Como** cliente  
**Quiero** comprar un producto directamente desde su ficha para agilizar la compra.

### Criterios de aceptación

- ✅ Solo permitido si `showToClients=true && outStock=false`.
- ✅ Añade el `productId` a la cookie `cart`.
- ✅ Redirige automáticamente a `/cart`.

### Tasks

- [ ] Endpoint `POST /buy/:id`.
- [ ] Validar flags del producto.
- [ ] Añadir `productId` a cookie `cart`.
- [ ] Redirigir a `/cart`.

---

## US05 — Añadir al carrito

**Como** cliente  
**Quiero** añadir productos al carrito para comprarlos juntos más tarde.

### Criterios de aceptación

- ✅ Solo permitido si `showToClients=true && outStock=false`.
- ✅ Se guarda en cookie `cart`.

### Tasks

- [ ] Endpoint `POST /cart/add/:id`.
- [ ] Validar flags del producto.
- [ ] Actualizar cookie `cart`.

---

## US06 — Ver carrito

**Como** cliente  
**Quiero** ver mi carrito para revisar los productos antes de pagar.

### Criterios de aceptación

- ✅ Se eliminan productos ocultos (`showToClients=false`) o fuera de stock (`outStock=true`).
- ✅ Se renderiza vista `cart.ejs`.
- ✅ Debajo de todo aparece botón **"Continuar con la compra"**.

### Tasks

- [ ] Endpoint `GET /cart`.
- [ ] Leer cookie `cart`.
- [ ] Consultar DB y filtrar productos válidos.
- [ ] Actualizar cookie con IDs válidos.
- [ ] Renderizar vista `cart.ejs` con botón **"Continuar con la compra"**.

---

## US07 — Continuar con la compra

**Como** cliente  
**Quiero** poder continuar con la compra desde el carrito.

### Criterios de aceptación

- ✅ Botón **"Continuar con la compra"** presente en `/cart`.
- ⏳ Acción pendiente de definición (placeholder).

### Tasks

- [ ] Endpoint `POST /checkout`.
- [ ] Por ahora: devolver mensaje o redirigir a página temporal.
- [ ] Dejar preparado para futura integración.

---

## US08 — Acceso al backoffice

**Como** admin  
**Quiero** acceder a un panel oculto para gestionar productos y pedidos.

### Criterios de aceptación

- ✅ No hay login ni JWT.
- ✅ Se accede mediante URL oculta con parámetro `pass`.
- ✅ El `pass` se valida en el método del controller.

### Tasks

- [ ] Implementar `adminController` con validación de `req.query.pass`.
- [ ] Configurar `ADMIN_PASS` en `.env`.
- [ ] Proteger endpoints `/admin/*` con middleware que valide `pass`.
- [ ] Renderizar vistas de backoffice (`admin/products.ejs`, `admin/orders.ejs`).

---

## US09 — CRUD de productos (Admin)

**Como** admin  
**Quiero** crear, editar y eliminar productos para mantener actualizado el catálogo.

### Criterios de aceptación

- ✅ Admin puede configurar `showToClients` y `outStock`.
- ✅ Validación de imagen ≤ 2MB.

### Tasks

- [ ] Endpoint `GET /admin/products` (lista).
- [ ] Endpoint `POST /admin/products` (crear).
- [ ] Endpoint `PUT /admin/products/:id` (editar).
- [ ] Endpoint `DELETE /admin/products/:id` (eliminar).
- [ ] Validar flags y tamaño de imagen.

---

## US10 — Gestión de pedidos (Admin)

**Como** admin  
**Quiero** ver los pedidos realizados para tener control de las ventas.

### Criterios de aceptación

- ✅ Listado de pedidos con productos y estado.

### Tasks

- [ ] Endpoint `GET /admin/orders`.
- [ ] Endpoint `GET /admin/orders/:id`.
- [ ] Renderizar vista `admin/orders.ejs`.

---