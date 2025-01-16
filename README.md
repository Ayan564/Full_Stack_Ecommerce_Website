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

## Folder Structure

Here is the folder structure of this app.

```bash
Full_Stack_Ecommerce_Website/
  |- backend/
    |-- config/
        |--- db.js
    |-- controllers/
        |--- categoryController.js
        |--- orderController.js
        |--- productController.js
        |--- userController.js
    |-- middlewares/
        |--- asyncHandler.js
        |--- authMiddleware.js
        |--- checkId.js
    |-- models/
        |--- categoryModel.js
        |--- orderModel.js
        |--- productModel.js
        |--- userModel.js
    |-- routes/
        |--- categoryRoutes.js
        |--- orderRoutes.js
        |--- productRoutes.js
        |--- uploadRoutes.js
        |--- userRoutes.js
    |-- utils/
        |--- createToken.js
    |-- index.js
  |- frontend/
    |-- /src
        |--- components/
            |---- CategoryForm.jsx
            |---- Header.jsx
            |---- Loader.jsx
            |---- Message.jsx
            |---- Modal.jsx
            |---- PrivateRoute.jsx
            |---- ProgressSteps.jsx
        |--- pages/
            |---- Admin/
                |----- AdminDashboard.jsx
                |----- AdminMenu.jsx
                |----- AdminRoute.jsx
                |----- AllProducts.jsx
                |----- CategoryList.jsx
                |----- OrderList.jsx
                |----- ProductList.jsx
                |----- ProductUpdate.jsx
                |----- UserList.jsx
            |---- Auth/
                |----- Login.jsx
                |----- Navigation.css
                |----- Navigation.jsx
                |----- Register.jsx
            |---- Orders/
                |----- Order.jsx
                |----- PlaceOrder.jsx
                |----- Shipping.jsx
            |---- Products/
                |----- Favorites.jsx
                |----- FavoritesCount.jsx
                |----- HeartIcon.jsx
                |----- Product.jsx
                |----- ProductCard.jsx
                |----- ProductCarousel.jsx
                |----- ProductDetails.jsx
                |----- ProductTabs.jsx
                |----- Ratings.jsx
                |----- SmallProduct.jsx
            |---- User/
                |----- Profile.jsx
                |----- UserOrder.jsx
            |---- Cart.jsx
            |---- Home.jsx
            |---- Shop.jsx
    |-- redux/
        |--- api/
            |---- apiSlice.js
            |---- CategoryApiSlice.js
            |---- orderApiSlice.js
            |---- productApiSlice.js
            |---- userApiSlice.js
        |--- features/
            |---- auth/
                |----- authSlice.js
            |---- cart/
                |----- cartSlice.js
            |---- favorites/
                |----- favoriteSlice.js
            |---- shop/
                |----- shopSlice.js
            |---- constants.js
            |---- store.js
    |-- utils/
        |--- cartUtils.js
        |--- localStorage.js
    |-- App.jsx
    |-- index.css
    |-- main.jsx
  |- .eslintrc.cjs
  |- .gitignore
  |- index.html
  |- package-lock.json
  |- package.json
  |- postcss.config.js
  |- tailwind.config.ts
  |- vite.config.js
```

<br />

## Getting Started

1. Ensure **Git** and **NodeJS** are installed.
2. Clone this repository to your local machine.
3. Create `.env` file in the root directory.
4. Add the following environment variables to `.env`:
5. Create a `uploads` folder in the root directory.

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

[![Javascript](https://skillicons.dev/icons?i=javascript "Javascript")](https://www.javascript.com/ "Javascript") [![Mongodb](https://skillicons.dev/icons?i=mongodb "Mongodb")](https://www.mongodb.com/ "Mongodb") [![Express](https://skillicons.dev/icons?i=expressjs "Express")](https://expressjs.com/ "Express") [![React JS](https://skillicons.dev/icons?i=react "React JS")](https://react.dev/ "React JS") [![React JS](https://skillicons.dev/icons?i=nodejs "Node")](https://nodejs.org/en "Node") [![Redux](https://skillicons.dev/icons?i=redux "Redux")](https://redux.js.org/ "Redux") [![Tailwind CSS](https://skillicons.dev/icons?i=tailwind "Tailwind CSS")](https://tailwindcss.com/ "Tailwind CSS") [![Vite](https://skillicons.dev/icons?i=vite "Vite")](https://vite.dev/ "Vite") [![Postman](https://skillicons.dev/icons?i=postman "Postman")](https://www.postman.com/ "Postman")

## Acknowledgements

Useful resources and dependencies that are used in Ekart.

### Backend Dependencies

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

### Frontend Dependencies

- [@paypal/react-paypal-js](https://www.npmjs.com/package/@paypal/react-paypal-js) - Version: ^8.1.3
- [@reduxjs/toolkit](https://www.npmjs.com/package/@reduxjs/toolkit) - Version: ^2.1.0
- [apexcharts](https://www.npmjs.com/package/apexcharts) - Version: ^3.45.2
- [axios](https://www.npmjs.com/package/axios) - Version: ^1.6.7
- [flowbite](https://www.npmjs.com/package/flowbite) - Version: ^2.2.1
- [moment](https://www.npmjs.com/package/moment) - Version: ^2.30.1
- [react](https://www.npmjs.com/package/react) - Version: ^18.2.0
- [react-apexcharts](https://www.npmjs.com/package/react-apexcharts) - Version: ^1.4.1
- [react-dom](https://www.npmjs.com/package/react-dom) - Version: ^18.2.0
- [react-icons](https://www.npmjs.com/package/react-icons) - Version: ^5.0.1
- [react-redux](https://www.npmjs.com/package/react-redux) - Version: ^9.1.0
- [react-router](https://www.npmjs.com/package/react-router) - Version: ^6.21.3
- [react-router-dom](https://www.npmjs.com/package/react-router-dom) - Version: ^6.21.3
- [react-slick](https://www.npmjs.com/package/react-slick) - Version: ^0.30.0
- [react-toastify](https://www.npmjs.com/package/react-toastify) - Version: ^10.0.4
- [slick-carousel](https://www.npmjs.com/package/slick-carousel) - Version: ^1.8.1

### Frontend Dev Dependencies

- [@types/react](https://www.npmjs.com/package/@types/react) - Version: ^18.2.43
- [@types/react-dom](https://www.npmjs.com/package/@types/react-dom) - Version: ^18.2.17
- [@vitejs/plugin-react](https://www.npmjs.com/package/@vitejs/plugin-react) - Version: ^4.2.1
- [autoprefixer](https://www.npmjs.com/package/autoprefixer) - Version: ^10.4.17
- [eslint](https://www.npmjs.com/package/eslint) - Version: ^8.55.0
- [eslint-plugin-react](https://www.npmjs.com/package/eslint-plugin-react) - Version: ^7.33.2
- [eslint-plugin-react-hooks](https://www.npmjs.com/package/eslint-plugin-react-hooks) - Version: ^4.6.0
- [eslint-plugin-react-refresh](https://www.npmjs.com/package/eslint-plugin-react-refresh) - Version: ^0.4.5
- [postcss](https://www.npmjs.com/package/postcss) - Version: ^8.4.33
- [tailwindcss](https://www.npmjs.com/package/tailwindcss) - Version: ^3.4.1
- [vite](https://www.npmjs.com/package/vite) - Version: ^5.0.8

<!-- ## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details. -->
