INSERT INTO public.orders
(id, products, total, status, "createdAt", "updatedAt")
VALUES
(DEFAULT, ARRAY[1, 2], 149.99, 'pending', NOW(), NOW()),
(DEFAULT, ARRAY[3], 89.99, 'confirmed', NOW(), NOW()),
(DEFAULT, ARRAY[1, 4, 5], 239.97, 'confirmed', NOW(), NOW()),
(DEFAULT, ARRAY[2, 3, 4, 5], 459.94, 'pending', NOW(), NOW()),
(DEFAULT, ARRAY[1], 99.99, 'cancelled', NOW(), NOW()),
(DEFAULT, ARRAY[1, 2, 3, 4, 5], 589.93, 'confirmed', NOW(), NOW()),
(DEFAULT, ARRAY[3, 4], 179.98, 'pending', NOW(), NOW()),
(DEFAULT, ARRAY[5], 119.99, 'confirmed', NOW(), NOW()),
(DEFAULT, ARRAY[1, 4, 5], 319.97, 'pending', NOW(), NOW()),
(DEFAULT, ARRAY[2, 3, 4, 5], 559.94, 'confirmed', NOW(), NOW());
