'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('order_products', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      productId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'products',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      orderId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'orders',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
    });

    await queryInterface.addIndex('order_products', ['productId']);
    await queryInterface.addIndex('order_products', ['orderId']);

    await queryInterface.removeColumn('orders', 'products');

    await queryInterface.addColumn('orders', 'address', {
      type: Sequelize.STRING,
      allowNull: false,
    });

    await queryInterface.addColumn('orders', 'clientName', {
      type: Sequelize.STRING,
      allowNull: false,
    });

    await queryInterface.addColumn('orders', 'clientNotes', {
      type: Sequelize.STRING,
      allowNull: false,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('orders', 'address');
    await queryInterface.removeColumn('orders', 'clientName');
    await queryInterface.removeColumn('orders', 'clientNotes');
    await queryInterface.addColumn('orders', 'products', {
      type: Sequelize.ARRAY(Sequelize.INTEGER),
      allowNull: false,
    });
    await queryInterface.dropTable('order_products');
  },
};
