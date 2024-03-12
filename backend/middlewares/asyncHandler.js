// asyncHandler is a higher-order function that wraps asynchronous route handlers
// It takes a function 'fn' as input, which represents an asynchronous route handler function
// It returns a new function that takes 'req', 'res', and 'next' as parameters, representing the request, response, and next middleware in the chain
// Inside the returned function, 'fn' is called with 'req', 'res', and 'next', and its result is wrapped in a Promise.resolve() to handle both synchronous and asynchronous code
// If 'fn' resolves successfully, the promise is resolved, and the next middleware in the chain is called
// If 'fn' rejects with an error, the promise is rejected, and the error is caught in the catch block
// In case of an error, the response is sent with a 500 status code and a JSON object containing the error message

const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch((error) => {
    // Send error message in JSON format with status code 500
    res.status(500).json({ message: error.message });
  });
};

// Export the asyncHandler middleware for use in other modules
export default asyncHandler;
