
	INSERT INTO public.products (
	id, name, price, description, image, "categoryId", "showToClients", "outStock", "createdAt", "updatedAt")
VALUES
-- Categoría 1 - Gossip Cases cargadores
(DEFAULT, 'Casas para Cargador Samsung', 29.99, 'Fundas premium para cargadores Samsung', NULL, 1, true, false, NOW(), NOW()),
(DEFAULT, 'Funda Power Bank 10000mAh', 34.99, 'Protección para power banks de 10000mAh', NULL, 1, true, false, NOW(), NOW()),
(DEFAULT, 'Casas para Cargador Xiaomi', 24.99, 'Diseño elegante para cargadores Xiaomi', NULL, 1, true, false, NOW(), NOW()),
(DEFAULT, 'Funda Cargador Apple', 27.99, 'Protección oficial para cargadores Apple', NULL, 1, true, false, NOW(), NOW()),
(DEFAULT, 'Casas para Cargador Sony', 28.99, 'Estilo y protección para cargadores Sony', NULL, 1, true, false, NOW(), NOW()),

-- Categoría 2 - Gossip Cases AirPods
(DEFAULT, 'Funda AirPods Pro Max', 39.99, 'Protección completa para AirPods Pro Max', NULL, 2, true, false, NOW(), NOW()),
(DEFAULT, 'Casas AirPods Pro 2', 44.99, 'Diseño premium para AirPods Pro 2', NULL, 2, true, false, NOW(), NOW()),
(DEFAULT, 'Funda AirPods 2024', 34.99, 'Protección para la última generación de AirPods', NULL, 2, true, false, NOW(), NOW()),
(DEFAULT, 'Casas AirPods Max', 59.99, 'Protección especializada para AirPods Max', NULL, 2, true, false, NOW(), NOW()),
(DEFAULT, 'Funda AirPods Case', 24.99, 'Protección para el estuche de carga', NULL, 2, true, false, NOW(), NOW()),

-- Categoría 3 - Catálogo Fundas iP
(DEFAULT, 'Funda iPad Pro 12.9', 49.99, 'Protección premium para iPad Pro 12.9 pulgadas', NULL, 3, true, false, NOW(), NOW()),
(DEFAULT, 'Casas iPad Air', 39.99, 'Diseño elegante para iPad Air', NULL, 3, true, false, NOW(), NOW()),
(DEFAULT, 'Funda iPad 10 pulgadas', 34.99, 'Protección para iPad 10 pulgadas', NULL, 3, true, false, NOW(), NOW()),
(DEFAULT, 'Casas iPad Mini', 29.99, 'Protección compacta para iPad Mini', NULL, 3, true, false, NOW(), NOW()),
(DEFAULT, 'Funda iPad Tablet', 44.99, 'Protección universal para tablets iPad', NULL, 3, true, false, NOW(), NOW()),

-- Categoría 4 - Catálogo exclusivo
(DEFAULT, 'Colección Limitada Apple', 99.99, 'Productos seleccionados de Apple', NULL, 4, true, false, NOW(), NOW()),
(DEFAULT, 'Funda Exclusiva Samsung', 79.99, 'Diseño exclusivo de Samsung', NULL, 4, true, false, NOW(), NOW()),
(DEFAULT, 'Kit Premium AirPods', 149.99, 'Kit completo con accesorios premium', NULL, 4, true, false, NOW(), NOW()),
(DEFAULT, 'Casas Exclusivas iPad', 129.99, 'Colección exclusiva para iPad', NULL, 4, true, false, NOW(), NOW()),
(DEFAULT, 'Funda Limitada Power Bank', 89.99, 'Edición limitada de power bank', NULL, 4, true, false, NOW(), NOW()),

-- Categoría 1 - Gossip Cases cargadores (stock disponible)
(DEFAULT, 'Casas Cargador iPhone', 26.99, 'Compatibilidad universal con cargadores iPhone', NULL, 1, true, false, NOW(), NOW()),
(DEFAULT, 'Funda Power Bank Pro', 36.99, 'Protección profesional para power banks', NULL, 1, true, false, NOW(), NOW()),

-- Categoría 2 - Gossip Cases AirPods (stock disponible)
(DEFAULT, 'Casas AirPods 3', 37.99, 'Protección para AirPods 3ª generación', NULL, 2, true, false, NOW(), NOW()),
(DEFAULT, 'Funda AirPods Pro 1', 32.99, 'Casas AirPods Pro 1ª generación', NULL, 2, true, false, NOW(), NOW()),
(DEFAULT, 'Casas AirPods Lite', 22.99, 'Opción económica para AirPods', NULL, 2, true, false, NOW(), NOW()),

-- Categoría 3 - Catálogo Fundas iP (stock disponible)
(DEFAULT, 'Funda iPad 9 pulgadas', 32.99, 'Protección para iPad 9 pulgadas', NULL, 3, true, false, NOW(), NOW()),
(DEFAULT, 'Casas iPad Pro 11 pulgadas', 46.99, 'Protección para iPad Pro 11 pulgadas', NULL, 3, true, false, NOW(), NOW()),
(DEFAULT, 'Funda iPad Mini 6', 27.99, 'Protección para iPad Mini 6', NULL, 3, true, false, NOW(), NOW());

