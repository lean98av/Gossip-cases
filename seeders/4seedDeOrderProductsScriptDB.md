INSERT INTO public.order_products (
    id, productId, orderId
)
VALUES
-- Order 1: products 1, 2 (total: 149.99)
(DEFAULT, 1, 1),
(DEFAULT, 2, 1),

-- Order 2: product 3 (total: 89.99)
(DEFAULT, 3, 2),

-- Order 3: products 1, 4, 5 (total: 239.97)
(DEFAULT, 1, 3),
(DEFAULT, 4, 3),
(DEFAULT, 5, 3),

-- Order 4: products 2, 3, 4, 5 (total: 459.94)
(DEFAULT, 2, 4),
(DEFAULT, 3, 4),
(DEFAULT, 4, 4),
(DEFAULT, 5, 4),

-- Order 5: product 1 (total: 99.99)
(DEFAULT, 1, 5),

-- Order 6: products 1, 2, 3, 4, 5 (total: 589.93)
(DEFAULT, 1, 6),
(DEFAULT, 2, 6),
(DEFAULT, 3, 6),
(DEFAULT, 4, 6),
(DEFAULT, 5, 6),

-- Order 7: products 3, 4 (total: 179.98)
(DEFAULT, 3, 7),
(DEFAULT, 4, 7),

-- Order 8: product 5 (total: 119.99)
(DEFAULT, 5, 8),

-- Order 9: products 1, 4, 5 (total: 319.97)
(DEFAULT, 1, 9),
(DEFAULT, 4, 9),
(DEFAULT, 5, 9),

-- Order 10: products 2, 3, 4, 5 (total: 559.94)
(DEFAULT, 2, 10),
(DEFAULT, 3, 10),
(DEFAULT, 4, 10),
(DEFAULT, 5, 10);
