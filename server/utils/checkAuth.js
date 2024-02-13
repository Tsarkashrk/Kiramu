import jwt from "jsonwebtoken";

export default (req, res, next) => {
    const token = (req.headers.authorization || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWNiNGE4ZGNjN2ZmYjE3Nzc2OGEzOGUiLCJpYXQiOjE3MDc4MjMzOTIsImV4cCI6MTcxMDQxNTM5Mn0._A9IsSoZoXoUcth05MEXSgTITrrRzuQ2mLHKhTIsn9o").replace(/Bearer\s?/, "");

  if (token) {
    try {
      console.log(req.userId)
      const decoded = jwt.verify(token, "secret123");

      req.userId = decoded._id;
      next();
    } catch(e) {
      return res.status(403).json({
        message: "Нет доступа"
      });
    }
  } else {
    return res.status(403).json({
      message: "Нет доступа"
    });
  }
};