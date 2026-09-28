'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('tasks', 'due_date', {
      type: Sequelize.DATE,
      allowNull: true

    });

    await queryInterface.addColumn('tasks', 'tag_id', {
      type: Sequelize.INTEGER,
      references: {
        model: 'tags',
        key: 'id',
      },
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
      allowNull: true
    });


  },

  async down(queryInterface, Sequelize) {
    try {
      await queryInterface.removeColumn('tasks', 'due_date');
    } catch (e) { }
    try {
      await queryInterface.removeColumn('tasks', 'tag_id');
    } catch (e) { }
  }
};
