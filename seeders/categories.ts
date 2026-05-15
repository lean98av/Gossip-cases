import { QueryInterface } from 'sequelize';

const categories = [
  {
    name: 'Gossip Cases cargadores',
    description: 'Casas y fundas para cargadores y power banks',
  },
  {
    name: 'Gossip Cases AirPods',
    description: 'Fundas premium para AirPods y AirPods Pro',
  },
  {
    name: 'Catálogo Fundas iP.',
    description: 'Fundas y protectores para iPad y dispositivos',
  },
  {
    name: 'catálogo exclusivo',
    description: 'Colección especial de productos seleccionados',
  },
  {
    name: 'stock disponible',
    description: 'Productos con stock disponible para envío inmediato',
  },
];

export default {
  async up(queryInterface: QueryInterface): Promise<void> {
    await queryInterface.bulkInsert(
      'categories',
      categories.map((category) => ({
        ...category,
        createdAt: new Date(),
        updatedAt: new Date(),
      })),
      {}
    );
  },

  async down(queryInterface: QueryInterface): Promise<void> {
    await queryInterface.bulkDelete('categories', {}, {});
  },
};
