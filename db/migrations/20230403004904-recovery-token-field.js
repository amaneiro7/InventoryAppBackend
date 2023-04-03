'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('user', 'recovery_token', {
      allowNull: true,
      type: Sequelize.STRING,
    })
  },

  async down (queryInterface) {
    await queryInterface.removeColumn('user', 'recovery_token')
  }
};
