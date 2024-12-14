const bcrypt = require('bcrypt');

const plainPassword = 'passAdminpass1234@allons'; // Replace with the password you want for the admin
bcrypt.hash(plainPassword, 10).then((hashedPassword) => {
    console.log('Hashed Password:', hashedPassword);
}).catch((err) => {
    console.error('Error hashing password:', err.message);
});

