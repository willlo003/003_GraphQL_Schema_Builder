const testController = {};

export const getSchema = (req, res, next) => {
  try {
    res.locals.code = req.body.newCode.code;
    return next();
  } catch (err) {
    console.log("test error");
  }
};
