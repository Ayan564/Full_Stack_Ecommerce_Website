/*
  uploadRoutes.js
  Description: Defines a route for uploading images using Multer middleware.
*/

import path from "path";
import express from "express";
import multer from "multer";

const router = express.Router();

// Multer configuration for storing uploaded images
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Destination folder for storing images
  },
  filename: (req, file, cb) => {
    const extname = path.extname(file.originalname);
    cb(null, `${file.fieldname}-${Date.now()}${extname}`); // Filename with current timestamp
  },
});

// File filter to allow only image files
const fileFilter = (req, file, cb) => {
  const filetypes = /jpe?g|png|webp/;
  const mimetypes = /image\/jpe?g|image\/png|image\/webp/;
  const extname = path.extname(file.originalname).toLowerCase();
  const mimetype = file.mimetype;

  if (filetypes.test(extname) && mimetypes.test(mimetype)) {
    cb(null, true); // Accept the file
  } else {
    cb(new Error("Images only"), false); // Reject the file
  }
};

// Initialize Multer with storage and file filter configuration
const upload = multer({ storage, fileFilter });
const uploadSingleImage = upload.single("image"); // Single image upload middleware

// Route for handling image uploads
router.post("/", (req, res) => {
  // Handle single image upload
  uploadSingleImage(req, res, (err) => {
    if (err) {
      res.status(400).send({ message: err.message }); // Error during upload
    } else if (req.file) {
      res.status(200).send({
        message: "Image uploaded successfully", // Upload successful
        image: `/${req.file.path}`, // Path to the uploaded image
      });
    } else {
      res.status(400).send({ message: "No image file provided" }); // No file provided
    }
  });
});

export default router;
