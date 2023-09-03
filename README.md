Live link: https://book-server-pi.vercel.app/

# User

1. api/v1/auth/signup
2. api/v1/users (GET)
3. api/v1/users/1f4790c4-f72e-469b-a03e-dd773b1852b2 (GET)
4. api/v1/users/1f4790c4-f72e-469b-a03e-dd773b1852b2 (Patch)
5. api/v1/users/df8abbdc-300f-4347-9a28-209b06c2a0cb (DELETE)
6. api/v1/profile

# Category

1. api/v1/categories/create-category (POST)
2. api/v1/categories (GET)
3. api/v1/categories/aaff7152-ac4e-4c86-b65b-c77d8eacf14c (Single Get)
4. api/v1/categories/aaff7152-ac4e-4c86-b65b-c77d8eacf14c (PATCH)
5. api/v1/categories/dea30771-2eb1-4f74-88fa-6ff1f673d031 (DELETE)

# Books

1. api/v1/books/create-book (POST)
2. api/v1/books (GET)
3. api/v1/books/:categoryId/category (GET)
4. api/v1/books/:id (PATCH)
5. api/v1/books/:id (DELETE)

# Orders

1. api/v1/orders/create-order (POST)
2. api/v1/orders (GET)
3. api/v1/orders/:orderId (GET)
