'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
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

    await queryInterface.changeColumn('orders', 'products', {
      type: Sequelize.STRING,
      allowNull: false,
    });

    await queryInterface.sequelize.query(`
      DO $$
      BEGIN
        IF NOT EXISTS (
          SELECT 1
          FROM pg_type t
          JOIN pg_enum e ON t.oid = e.enumtypid
          WHERE t.typname = 'enum_orders_status'
            AND e.enumlabel = 'inProgress'
        ) THEN
          ALTER TYPE "enum_orders_status" ADD VALUE 'inProgress';
        END IF;
        IF NOT EXISTS (
          SELECT 1
          FROM pg_type t
          JOIN pg_enum e ON t.oid = e.enumtypid
          WHERE t.typname = 'enum_orders_status'
            AND e.enumlabel = 'payed'
        ) THEN
          ALTER TYPE "enum_orders_status" ADD VALUE 'payed';
        END IF;
      END
      $$;
    `);

    await queryInterface.changeColumn('orders', 'status', {
      type: Sequelize.ENUM('pending', 'inProgress', 'payed', 'cancelled'),
      allowNull: false,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn('orders', 'status', {
      type: Sequelize.ENUM('pending', 'confirmed', 'cancelled'),
      allowNull: false,
    });

    await queryInterface.changeColumn('orders', 'products', {
      type: Sequelize.ARRAY(Sequelize.INTEGER),
      allowNull: false,
    });

    await queryInterface.removeColumn('orders', 'clientNotes');
    await queryInterface.removeColumn('orders', 'clientName');
    await queryInterface.removeColumn('orders', 'address');
  },
};
