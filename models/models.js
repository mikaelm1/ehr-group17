// var db = require('../db');
// var Sequelize = require("sequelize");

// // console.log(db);

// var System = db.define('system', {
//     id: {
//         type: Sequelize.INTEGER,
//         autoIncrement: true,
//         primaryKey: true, 
//     },
//     name: {
//         type: Sequelize.STRING,
//         allowNull: false
//     }
// });

// var Patient = db.define('patient', {
//     id: {
//         type: Sequelize.INTEGER,
//         autoIncrement: true,
//         primaryKey: true
//     },
//     firstName: {
//         type: Sequelize.STRING,
//         allowNull: false
//     },
//     lastName: {
//         type: Sequelize.STRING,
//         allowNull: false
//     },

// });

// var Provider = db.define('provider', {
//     id: {
//         type: Sequelize.INTEGER,
//         autoIncrement: true,
//         primaryKey: true
//     },
//     firstName: {
//         type: Sequelize.STRING,
//         allowNull: false
//     },
//     lastName: {
//         type: Sequelize.STRING,
//         allowNull: false
//     },
//     employer: {
//         type: Sequelize.STRING,
//     },
//     systemID: {
//         type: Sequelize.INTEGER,
//         references: {
//             model: System,
//             key: 'id'
//         }
//     }
// });

// var ProviderPatient = db.define('provider_patient', {
//     id: {
//         type: Sequelize.INTEGER,
//         autoIncrement: true,
//         primaryKey: true
//     },
//     patientID: {
//         type: Sequelize.INTEGER,
//         references: {
//             model: Patient,
//             key: 'id'
//         }
//     },
//     providerID: {
//         type: Sequelize.INTEGER,
//         references: {
//             model: Provider,
//             key: 'id'
//         }
//     }
// });

// var Rating = db.define('rating', {
//     providerID: {
//         type: Sequelize.INTEGER,
//         references: {
//             model: Provider,
//             key: 'id'
//         }
//     },
//     systemID: {
//         type: Sequelize.INTEGER,
//         references: {
//             model: System,
//             key: 'id'
//         }
//     },
//     ratingValue: {
//         type: Sequelize.INTEGER,
//         allowNull: false
//     } 
// });

// var Cost = db.define('cost', {
//     providerID: {
//         type: Sequelize.INTEGER,
//         references: {
//             model: Provider,
//             key: 'id'
//         }
//     },
//     systemID: {
//         type: Sequelize.INTEGER,
//         references: {
//             model: System,
//             key: 'id'
//         }
//     },
//     systemCost: {
//         type: Sequelize.INTEGER
//     }
// });

// module.exports = {
//     System,
//     Provider,
//     Rating,
//     Cost,
// }