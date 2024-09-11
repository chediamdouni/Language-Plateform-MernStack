const multer = require("multer");

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg" ||
    file.mimetype === "video/mp4"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
// image multiple
const multiImageHandler = multer({
  storage: fileStorage,
  fileFilter: fileFilter,
}).any();
// une seul image
const singleImageHandler = multer({
  storage: fileStorage,
  fileFilter: fileFilter,
}).single("image");
// video
const videoHandler = multer({
  storage: fileStorage,
  fileFilter: fileFilter,
}).single("video");

module.exports = {
  multiImageHandler,
  videoHandler,
  singleImageHandler,
};
