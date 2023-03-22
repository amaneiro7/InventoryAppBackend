'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('item', 'obsolete', {
      allowNull: false,
      type: Sequelize.BOOLEAN,
      defaultValue: false
    })
  },

  async down (queryInterface) {
    await queryInterface.removeColumn('item', 'obsolete');
  }
};
