'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('announcement', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },

      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      description: {
        type: Sequelize.TEXT,
        allowNull: false,
      },

      companyName: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      location: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      workModel: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      jobType: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      salary: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      salaryRange: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      applicationDeadline: {
        type: Sequelize.DATE,
        allowNull: true,
      },

      benefits: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        allowNull: true,
      },

      requirements: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        allowNull: true,
      },

      responsibilities: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        allowNull: true,
      },

      applyLink: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      workload: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        allowNull: true,
      },

      schedule: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        allowNull: true,
      },

      isActive: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
        allowNull: false,
      },

      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },

      bannerColor: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      allowWhatsapp: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },

      allowEmail: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },

      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('NOW()'),
      },

      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('NOW()'),
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('announcement');
  },
};
