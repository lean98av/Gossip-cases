import { DataTypes } from 'sequelize';


const categories = [
  {
    name: 'Catálogo exclusivo',
    description: 'Colección especial de productos seleccionados',
  },
  {
    name: 'Catálogo Fundas iP.',
    description: 'Fundas y protectores para iPad y dispositivos',
  },
  {
    name: 'Gossip Cases AirPods',
    description: 'Fundas premium para AirPods y AirPods Pro',
  },
  {
    name: 'Gossip Cases cargadores',
    description: 'Casas y fundas para cargadores y power banks',
  },
];

export default {
  up: async (queryInterface: any) => {
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

  down: async (queryInterface: any) => {
    await queryInterface.bulkDelete('categories', null, {});
  },
};
