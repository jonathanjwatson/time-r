const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const UserSchema = mongoose.Schema({
    email: {
        type: String,
        lowercase: true,
        unique: true,
        require: true
    },
    password: {
        type: String,
        required: true
    },
    token: {
        type: String,
        require: true
    }

},
{
    timestamps: true
});

const ClientSchema = mongoose.Schema({
    name: String,
})

UserSchema.pre('save', function(next){
    const user = this,
        SALT_FACTOR = 8;

    if(!user.isModified('password')) return next();

    bcrypt.genSalt(SALT_FACTOR, function(err, salt){
        if (err) return next(err);

        bcrypt.hash(user.password, salt, null, function(err, hash){
            if (err) return next(err);
            user.password = hash;
            next();
        });
    });
});

UserSchema.methods.comparePassword = function(candidatePassword, cb){
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch){
        if (err) {return cb(err); }

        cb(null, isMatch);
    });
};

const User = mongoose.model('User', UserSchema);
const Client = mongoose.model('Client', ClientSchema);

module.exports = {
    User, Client
}