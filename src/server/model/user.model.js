module.exports = function (mongoose, logger) {
    const userSchema = new mongoose.Schema({
        name: { type: String, required: true, trim: true },
        email: { type: String, required: true, trim: true },
        organization: { type: String, required: true, trim: true }
    }, { collection: 'DBUsers' });

    userSchema.statics.addUser = function (data, cb) {
        // Write ADD USER method here
        return this.create(data.body)
        .then(() => {
            cb();
        })
        .catch((err) => {
            logger.error(err);
            cb(err, null);
        } )
    };

    userSchema.statics.getUsers = function (req, cb) {
        // Write GET USERS method here
        return this.find(req.query)
        .sort({date : -1})
        .then(() => { 
            cb();
        })
        .catch((err) => {
            logger.error(err);
            cb(err, null);
        })
    };

    userSchema.statics.removeUser = function (id, cb) {
        return this.deleteOne({ "_id": id})
        .then(() => {
            cb();
        })
        .catch((err) => {
            logger.error(err);
            cb(err, null);
        });
    };

    return mongoose.model('DBUsers', userSchema);
};