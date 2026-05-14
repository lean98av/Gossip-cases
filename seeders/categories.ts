import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db';
import Category from '../models/category';

const categories = [
  {
    name: 'Electrónica',
    description: 'Celulares, laptops, tablets y accesorios tecnológicos',
  },
  {
    name: 'Accesorios',
    description: 'Cascos, fundas, cargadores y accesorios para dispositivos',
  },
  {
    name: 'Móviles',
    description: 'Smartphones y tabletas de las principales marcas',
  },
  {
    name: 'Audio',
    description: 'Altavoces, auriculares y sistemas de sonido',
  },
  {
    name: 'Smart Home',
    description: 'Dispositivos para automatización del hogar',
  },
  {
    name: 'Gaming',
    description: 'Consolas, accesorios y periféricos para gamers',
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
