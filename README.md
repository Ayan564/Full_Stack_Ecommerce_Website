<a name="readme-top"></a>

# Ekart - E-commerce Platform Built with MERN Stack

<!-- Table of Contents
<details>
<summary>

# Table of Contents

</summary>

- [Folder Structure](#bangbang-folder-structure)
- [Getting Started](#toolbox-getting-started)
- [Screenshots](#camera-screenshots)
- [Tech Stack](#gear-tech-stack)
- [Acknowledgements](#gem-acknowledgements)
- [Deploy on Vercel](#page_with_curl-deploy-on-vercel)

</details> -->

## Getting Started

1. Ensure **Git** and **NodeJS** are installed.
2. Clone this repository to your local machine.
3. Create `.env` file in the root directory.
4. Add the following environment variables to `.env`:

```bash
# .env

# MongoDB URI for connecting to the database
MONGO_URI=mongodb://127.0.0.1:27017/Ecommerce

# JWT Secret for user authentication
JWT_SECRET=your_jwt_secret

# PayPal Client ID for payment gateway integration
PAYPAL_CLIENT_ID=your_paypal_client_id

# Server Port
PORT=5000

# Node environment (development/production)
NODE_ENV=development


```

11. Open terminal in root directory. Run `npm install` or `yarn install`.

12. Now app is fully configured 👍 and you can start using this app using `npm run dev` or `yarn dev`.

## Screenshots:

![Register Page](/screenshots/register.png "Register Page")
![Login Page](/screenshots/login.png "Login Page")
![Home Page](/screenshots/home.png "Home Page")
![Shopping Page](/screenshots/shop.png "Shopping Page")
![Cart Page](/screenshots/cart.png "Cart Page")
![Favorite Page](/screenshots/favorite.png "Favorite Page")
![Order Page](/screenshots/place-order.png "Order Page")
![Payment Page](/screenshots/payment.png "Payment Page")
![Shipping Page](/screenshots/ship.png "Shipping Page")
![Add Product Page](/screenshots/add-product.png "Add Product Page")
![Add Category Page](/screenshots/add-category.png "Add Category Page")
![Admin Dashboard Page](/screenshots/admin-dash.png "Admin Dashboard Page")
![Manage User Page](/screenshots/manage-user.png "Manage User Page")
![Manage Profile Page](/screenshots/manage-profile.png "Manage profile Page")
![All Products Page](/screenshots/all-products.png "All Products Page")

## Tech Stack

[![React JS](https://skillicons.dev/icons?i=react "React JS")](https://react.dev/ "React JS")[![Javascript](https://skillicons.dev/icons?i=javascript "Javascript")](https://www.javascript.com/ "Javascript")[![Tailwind CSS](https://skillicons.dev/icons?i=tailwind "Tailwind CSS")](https://tailwindcss.com/ "Tailwind CSS") [![Mongodb](https://skillicons.dev/icons?i=mongodb "Mongodb")](https://www.mongodb.com/ "Mongodb")[![Express](https://skillicons.dev/icons?i=expressjs "Express")](https://expressjs.com/ "Express")

## Acknowledgements

Useful resources and dependencies that are used in FreeSpace.

- [bcryptjs](https://www.npmjs.com/package/bcryptjs) - Version: ^2.4.3
- [concurrently](https://www.npmjs.com/package/concurrently) - Version: ^8.2.2
- [cookie-parser](https://www.npmjs.com/package/cookie-parser) - Version: ^1.4.6
- [cors](https://www.npmjs.com/package/cors) - Version: ^2.8.5
- [dotenv](https://www.npmjs.com/package/dotenv) - Version: ^16.4.1
- [express](https://www.npmjs.com/package/express) - Version: ^4.18.2
- [express-async-handler](https://www.npmjs.com/package/express-async-handler) - Version: ^1.2.0
- [express-formidable](https://www.npmjs.com/package/express-formidable) - Version: ^1.2.0
- [flowbite](https://www.npmjs.com/package/flowbite) - Version: ^2.3.0
- [flowbite-react](https://www.npmjs.com/package/flowbite-react) - Version: ^0.7.6
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) - Version: ^9.0.2
- [mongoose](https://www.npmjs.com/package/mongoose) - Version: ^8.1.1
- [multer](https://www.npmjs.com/package/multer) - Version: ^1.4.5-lts.1
- [nodemon](https://www.npmjs.com/package/nodemon) - Version: ^3.0.3
- [react-toastify](https://www.npmjs.com/package/react-toastify) - Version: ^10.0.5

<!-- ## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details. -->
