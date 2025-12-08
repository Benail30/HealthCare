// const { Sequelize, DataTypes } = require('sequelize');

// const sequelize = new Sequelize('doctor', 'root', 'Yh1010100', {
//   host: 'localhost',
//   dialect: 'mysql',
// });


// const User = sequelize.define('User', {
//   FirstName: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   LastName: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },

//   Username: {
//     type: DataTypes.STRING,
//     allowNull: false,
//     unique: true,
//   },
//   Email: {
//     type: DataTypes.STRING,
//     allowNull: false,
//     unique: true,
//   },
//   Password: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   UserType: {
//     type: DataTypes.ENUM('Patient', 'Doctor'),
//     defaultValue: 'Patient',
//   },
//   Speciality: {
//     type: DataTypes.STRING,
//     allowNull: true,
//   },
//   PhoneNumber: {
//     type: DataTypes.STRING,
//     allowNull: true,
//   },
//   ImageUrl: {
//     type: DataTypes.STRING,
//     defaultValue: '',
//     allowNull: true
//   },
// })


// const Doctor = sequelize.define('Doctor', {
//   FirstName: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   LastName: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },

//   Username: {
//     type: DataTypes.STRING,
//     allowNull: false,
//     unique: true,
//   },
//   Email: {
//     type: DataTypes.STRING,
//     allowNull: false,
//     unique: true,
//   },
//   Password: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   PhoneNumber: {
//     type: DataTypes.STRING,
//     allowNull: true,
//   },
//   ImageUrl: {
//     type: DataTypes.STRING,
//     defaultValue: '',
//     allowNull: false
//   },
//   Speciality: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
// });

// const Message = sequelize.define('Message', {
//   content: {
//     type: DataTypes.TEXT,
//     allowNull: false,
//   },

 
//   });

// const Appointment = sequelize.define('Appointment', {

//   AppointmentTime: {
//     type: DataTypes.DATE,
//   },
//   Status: {
//     type: DataTypes.ENUM('Pending', 'Accepted', 'Rejected'),
//     defaultValue: 'Pending',
//   },
//   PaymentStatus: {
//     type: DataTypes.ENUM('Paid', 'Unpaid'),
//     defaultValue: 'Unpaid',
//   },
//   AppointmentDepartment: {
//     type: DataTypes.STRING,
//   allowNull: true,
//   },
//   Doctor: {
//     type: DataTypes.INTEGER,
//     allowNull: false,
//   }
// });


// const RatingsComments = sequelize.define('RatingsComments', {
//   rating: {
//     type: DataTypes.INTEGER,

//   },
//   review: {
//     type: DataTypes.TEXT,
//   },
//   imageSrc: { 
//     type: DataTypes.TEXT,
//     allowNull: true,
//   },
//   name: {
//     type: DataTypes.STRING,
//     allowNull: true,
//   },
//   }
  
// );



// const Admin = sequelize.define('Admin', {
 
//   Username: {
//     type: DataTypes.STRING,
//     allowNull: false,
//     unique: true,
//   },
//   Email: {
//     type: DataTypes.STRING,
//     allowNull: false,
//     unique: true,
//   },
//   Password: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
// });


// const Payments = sequelize.define('Payments', {

//   Amount: {
//     type: DataTypes.DECIMAL(10, 2),
//   },
//   PaymentDate: {
//     type: DataTypes.DATE,
//   },
// });


  
// const Blog = sequelize.define('Blog', {
//   Title: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   Text: {
//     type: DataTypes.TEXT,
//     allowNull: false,
//   },
//   ImageUrl: {
//     type: DataTypes.TEXT,
//     allowNull: true,
//   },
// })

// const Comment = sequelize.define('Comment', {

//   author:{
//       type: DataTypes.TEXT,
//     allowNull: false,

//     },
//     comment: {
//     type: DataTypes.TEXT,
//     allowNull: false,
   
//   },
//     timestamp:{
//       type: DataTypes.DATE, 
//     },
//     BlogId: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//     },
//     UserId: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//     }
    
// });

// const Product = sequelize.define('Product', {
//   name: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   price: {
//     type: DataTypes.DECIMAL(10, 2),
//     allowNull: false,
//   },
//   ImageUrl: {
//     type: DataTypes.TEXT,
//     allowNull: true,
//   },
//   Category: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   }
// });


// User.hasMany(RatingsComments);
// User.hasMany(Appointment);
// User.hasMany(Blog);
// Blog.belongsTo(User);
// Blog.hasMany(Comment); 
// Comment.belongsTo(Blog);

// module.exports = {
//   User,
//   Doctor,
//   Appointment,
//   RatingsComments,
//   Payments,
//   Message,
//   Blog,
//   Product,
//   Comment,
// };

// // sequelize.sync()
// //   .then(() => {
// //     console.log('Database and tables created!');
// //   })
// //   .catch((error) => {
// //     console.error('Error creating database and/or tables:', error);
// //   });


