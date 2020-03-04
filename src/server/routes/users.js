module.exports = function (userModel, express, logger) {
    const router = express.Router();
  
    router.add('/', (req, res, next) => {
        return userModel.addUser(req.body,
            (error, user) => {
              if (error) {
                console.log(error)
              } else {
                res.status(204).end();
              }
            });
    });

    router.post('/add', (req, res, next) => {
        return userModel.addUser(req.body,
            (error, user) => {
              if (error) {
                console.log(error)
              } else {
                res.status(204).end();
              }
            });
    });

    router.get('/get', (req, res, next) => {
      // Write GET handler here
      return userModel.getUsers(
        (error, user) => {
          if (error) {
            console.log(error)
          } else {
            console.log("something")
            res.status(204).end();
          }
        }
        )
    });

    router.delete('/:userid', (req, res, next) => {
      // Write DELETE handler here
    });

    return router;
}
