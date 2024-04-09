/*
  checkId.js
  Description: Middleware function to check if the provided ID parameter is a valid MongoDB ObjectId.
*/

import { isValidObjectId } from "mongoose";

/**
 * checkId:
 * Description: Middleware function to validate if the provided ID parameter is a valid MongoDB ObjectId.
 * If the ID is not valid, it sends a 404 status response with an error message.
 * If the ID is valid, it passes control to the next middleware function in the request-response cycle.
 *
 * @param {Object} req - The request object containing parameters, such as req.params.id.
 * @param {Object} res - The response object to send back error messages or status codes.
 * @param {Function} next - The next middleware function in the request-response cycle.
 * @returns {void}
 */
function checkId(req, res, next) {
  // Check if the provided ID is a valid MongoDB ObjectId
  if (!isValidObjectId(req.params.id)) {
    res.status(404); // Not Found
    throw new Error(`Invalid Object ID: ${req.params.id}`);
  }
  // If the ID is valid, pass control to the next middleware function
  next();
}

// Export the middleware function
export default checkId;
