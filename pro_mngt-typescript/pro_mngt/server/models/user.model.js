module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("users", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        username: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'Username is required'
                }
            }
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'email is required'
                }
            }
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'Password is required'
                }
            }
        }
    },
    {
        timestamps: false,
    }
    );
    return User;
};