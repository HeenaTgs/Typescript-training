module.exports = (sequelize, Sequelize) => {
    const Product = sequelize.define("products", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },      
        name: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'Product name is required'
                }
            }
        },
        description: {
            type: Sequelize.TEXT,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'Description is required'
                }
            }
        },
        price: {
            type: Sequelize.DECIMAL(10, 2),
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'Price is required'
                }
            }
        },
        quantity: {
            type: Sequelize.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'quantity is required'
                }
            }
        },
        category: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'Category is required'
                }
            }
        },
        // picture: {
        //     type: Sequelize.TEXT('long')
        // },
        mfg_date: {
            type: Sequelize.DATEONLY,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'Manufacturing date is required'
                }
            }
        },
        exp_date: {
            type: Sequelize.DATEONLY,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'Expiry date is required'
                }
            }
        },
        isDeleted: {
            type: Sequelize.TINYINT
        },
        created_at: {
            type: Sequelize.DATE
        },
        updated_at: {
            type: Sequelize.DATE
        },
        deleted_at: {
            type: Sequelize.DATE
        },
        created_by: {
            type: Sequelize.INTEGER
        },
        updated_by: {
            type: Sequelize.INTEGER
        },
        deleted_by: {
            type: Sequelize.INTEGER
        },
    },
    {
        timestamps: false,
    }
    );
    return Product;

};