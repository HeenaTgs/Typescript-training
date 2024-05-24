const db = require("../../models");
const Product = db.product;


// Create a product
exports.create = async (req, res) => {
  const t = await db.sequelize.transaction();
  try {
    const existingProduct = await Product.findOne({ where: { name: req.body.name }, transaction: t });

    if (existingProduct) {
      await t.rollback();
      return res.status(400).json({ error: 'Product already exists' });
    }

    const prod = {
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      quantity: req.body.quantity,
      category: req.body.category,
      mfg_date: req.body.mfg_date,
      exp_date: req.body.exp_date,
      isDeleted: 0,
      created_at: new Date(),
      created_by: req.user,
    };

    // Call the stored procedure to add product
    const result = await db.sequelize.query('CALL add_product(:name, :description, :price, :quantity, :category, :mfg_date, :exp_date, :isDeleted, :created_at, :created_by)', {
      replacements: {
        name: prod.name,
        description: prod.description,
        price: prod.price,
        quantity: prod.quantity,
        category: prod.category,
        mfg_date: prod.mfg_date,
        exp_date: prod.exp_date,
        isDeleted: prod.isDeleted,
        created_at: prod.created_at,
        created_by: prod.created_by
      },
      transaction: t
    },
    );
    // Check if the result is defined and has a length greater than 0
    if (result && result.length > 0) {
      const createdProduct = result[0];
      await t.commit();
      res.status(201).json(createdProduct);
    } else {
      throw new Error('Failed to create product');
    }
  } catch (error) {
    await t.rollback();
    res.status(500).json({ error: error.message });
  }
};


// Retrieving data
exports.findAllProducts = async (req, res) => {
  const t = await db.sequelize.transaction();
  try {
    const result = await db.sequelize.query('CALL get_all_products()', { transaction: t });
    if (result && result.length > 0) {
      const products = result;
      await t.commit();
      res.json(products);
    } else {
      res.status(404).json({ error: 'No products found' });
    }
  } catch (error) {
    await t.rollback();
    console.error('Error fetching products:', error);
    res.status(500).json({ error: error.message });
  }
};


// Retrieving a Single data
exports.findOne = async (req, res) => {
  const t = await db.sequelize.transaction();
  try {
    const result = await db.sequelize.query('CALL get_product(:id)', {
      replacements: { id: req.params.id },
      transaction: t
    });

    if (result && result.length > 0) {
      const product = result;
      await t.commit();
      res.json(product);
    } else {
      return res.status(404).send({ error: 'Product not found' });
    }
  } catch (error) {
    await t.rollback();
    console.error('Error fetching product:', error);
    return res.status(500).send({ error: error.message });
  }
};



// Updating a data
exports.update = async (req, res) => {
  const t = await db.sequelize.transaction();
  try {
    const userId = req.user; // user ID is stored in req.user after authentication
    const productId = req.params.id;

    // Find the product
    const product = await Product.findByPk(productId, { transaction: t });
    if (!product) {
      await t.rollback();
      return res.status(404).send({ message: 'Product not found' });
    }

    // Check if the user is authorized to update the product
    // if (product.created_by !== userId) {
    //   await t.rollback();
    //   return res.status(403).json({ message: 'User is not authorized to update this product' });
    // }

    // Call the stored procedure to update the product
    const result = await db.sequelize.query('CALL update_product(:productId, :name, :description, :price, :quantity, :category, :mfg_date, :exp_date, :updated_at, :updated_by)', {
      replacements: {
        productId: productId,
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        quantity: req.body.quantity,
        category: req.body.category,
        mfg_date: req.body.mfg_date,
        exp_date: req.body.exp_date,
        updated_at: new Date(),
        updated_by: userId
      },
      transaction: t
    });

    // Check if the update was successful
    if (result && result.length > 0) {
      await t.commit();
      return res.send({ message: 'Product updated successfully' });
    } else {
      await t.rollback();
      return res.status(500).send({ message: 'Failed to update product' });
    }
  } catch (error) {
    await t.rollback();
    return res.status(500).send({ message: error.message });
  }
};



// Deleting a Data
exports.delete = async (req, res) => {

  const t = await db.sequelize.transaction();
  try {
    // Check if productId and deletedBy exist in the request object
    if (!req.params.id || !req.user) {
      throw new Error('ProductId or deletedBy is missing in the request.');
    }

    const productId = req.params.id;

    // Find the product
    const product = await Product.findByPk(productId, { transaction: t });
    if (!product) {
      await t.rollback();
      return res.status(404).send({ message: 'Product not found' });
    }

    // Check if the user is authorized to delete the product
    // if (product.created_by !== req.user) {
    //   await t.rollback();
    //   return res.status(403).json({ message: 'You are not allowed to delete this product' });
    // }

    // Call the stored procedure
    const result = await db.sequelize.query('CALL delete_product(:p_id, :p_deleted_by)', {
      replacements: { p_id: req.params.id, p_deleted_by: req.user },
      transaction: t
    });

    // Check if the delete operation was successful

    await t.commit();
    res.send({ result });
  } catch (error) {
    await t.rollback();
    console.error('Error soft deleting product:', error.message);
    // return { success: false, message: error.message };
  }
};



