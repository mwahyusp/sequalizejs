const Sequelize = require('sequelize');

const sequelize = new Sequelize('company', 'root', 'myrootpassword', {
    host: 'localhost',
    // query: {
    //     raw: true
    // },
    dialect: 'mysql',
    operatorsAliases: false,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
});

const Users = sequelize.define('user', {
    firstName: {
        type: Sequelize.STRING
    },
    lastName: {
        type: Sequelize.STRING
    }
});

// force: true will drop the table if it already exists
Users.sync({
    force: true
}).then(async () => {
    // Table created

    // Create
    await Users.create({
        firstName: 'John',
        lastName: 'Hancock'
    });

    await Users.create({
        firstName: 'John',
        lastName: 'Wich'
    });

    // Read
    await Users.findAll({
        raw: true
    }).then(users => {
        console.log("----------------------------------------------------------------------------------------------------")
        console.log("Get All")
        console.log(users)
    })

    // Read One
    await Users.findById(1, {
        raw: true
    }).then(users => {
        console.log("----------------------------------------------------------------------------------------------------")
        console.log("Get One")
        console.log(users)
    })

    // Update
    await Users.update({
            firstName: "Helloooo"
        }, {
            returning: true,
            where: {
                id: 1
            }
        })
        .then((result) => {
            if (result[1] === 1) {
                console.log("----------------------------------------------------------------------------------------------------")
                console.log("Update Success!!")
            }
        })

    // Get All
    await Users.findAll({
        raw: true
    }).then(users => {
        console.log("----------------------------------------------------------------------------------------------------")
        console.log("Get All After Update")
        console.log(users)
    })


});