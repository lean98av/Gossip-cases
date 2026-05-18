INSERT INTO public.orders(
	id, products, total, status, "createdAt", "updatedAt", address, "clientName", "clientNotes")
VALUES
(DEFAULT, '1,2,3', 149.99, 'pending', NOW(), NOW(), 'Dirección 1', 'Cliente 1', 'Notas 1'),
(DEFAULT, '1,2,3', 89.99, 'inProgress', NOW(), NOW(), 'Dirección 2', 'Cliente 2', 'Notas 2'),
(DEFAULT, '1,2,3', 239.97, 'inProgress', NOW(), NOW(), 'Dirección 3', 'Cliente 3', 'Notas 3'),
(DEFAULT, '1,2,3', 459.94, 'payed', NOW(), NOW(), 'Dirección 4', 'Cliente 4', 'Notas 4'),
(DEFAULT, '1,2,3', 99.99, 'cancelled', NOW(), NOW(), 'Dirección 5', 'Cliente 5', 'Notas 5'),
(DEFAULT, '1,2,3', 589.93, 'inProgress', NOW(), NOW(), 'Dirección 6', 'Cliente 6', 'Notas 6'),
(DEFAULT, '1,2,3', 179.98, 'pending', NOW(), NOW(), 'Dirección 7', 'Cliente 7', 'Notas 7'),
(DEFAULT, '1,2,3', 119.99, 'payed', NOW(), NOW(), 'Dirección 8', 'Cliente 8', 'Notas 8'),
(DEFAULT, '1,2,3', 319.97, 'pending', NOW(), NOW(), 'Dirección 9', 'Cliente 9', 'Notas 9'),
(DEFAULT, '1,2,3', 559.94, 'inProgress', NOW(), NOW(), 'Dirección 10', 'Cliente 10', 'Notas 10');
