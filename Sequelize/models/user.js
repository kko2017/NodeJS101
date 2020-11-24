const Sequelize = require('sequelize');

// sequelize는 id를 자동생성하기 때문에 작성할
// 필요없다.
// (mySQL:) DATETIME = (sequelize:) sequelize.DATE
// (mySQL:) DATE = (sequelize:) sequelize.DATEONLY
module.exports = class user extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            name: {
                type: Sequelize.STRING(20),
                allowNull: false,
                unique: true,
            },
            age: {
                type: Sequelize.INTEGER.UNSIGNED,
                allowNull: false,
            },
            married: {
                type: Sequelize.BOOLEAN,
                allowNULL: false,
            },
            comment: {
                type: Sequelize.TEXT,
                allowNULL: true,
            },
            created_at: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.NOW,
            },
        }, {
            sequelize,
            timestamps: false,
            underscored: false,
            modelName: 'User',
            tableName: 'users',
            paranoid: false,
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
        })
    }

    static associate(db) {
        db.User.hasMany(db.Comment, {
            foreignKey: 'commenter', sourceKey: 'id'
        });
    }
};

// paranoid를 true로 하면 deleted_at이 생성된다.
// 영구삭제가 아닌 soft delete을 할 때 사용