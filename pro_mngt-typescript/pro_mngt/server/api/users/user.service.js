const db = require("../../models");
const { genSaltSync, hashSync } = require('bcrypt');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { Op } = require('sequelize');
const User = db.user;

// Register User
exports.create = async (req, res) => {
    const t = await db.sequelize.transaction();
    try {
        // Check if username or email already exists
        const existingUser = await User.findOne({
            where: {
                [Op.or]: [
                    { username: req.body.username },
                    { email: req.body.email }
                ]
            }
        });

        if (existingUser) {
            return res.status(409).send({ message: "Username or email already exists" });
        }

        const salt = bcrypt.genSaltSync(10);
        // Create User
        const user = {
            username: req.body.username,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, salt),
        };

        // Save user in the database
        const createdUser = await User.create(user, { transaction: t });
        await t.commit();
        res.send(createdUser);
    } catch (err) {
        await t.rollback();
        res.status(500).send({
            message: err.message || "Some error occurred while creating the User."
        });
    }
};


// Login user
exports.login = async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ where: { email } });
      if (!user) return res.status(404).send({ error: 'Email not found' });

      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) return res.status(401).send({ message: "Invalid email or password" });

      const token = jwt.sign({ id: user.id }, 'test');
      res.json({ token });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
};
