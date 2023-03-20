'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('item', 'status', {
      allowNull: false,
      type: Sequelize.BOOLEAN,
      defaultValue: true
    })

  },

  async down (queryInterface) {
    await queryInterface.removeColumn('item', 'status')
  }
};
