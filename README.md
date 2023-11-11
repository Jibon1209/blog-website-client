# BLOGTREKKER - Blog Website Project

Welcome to BLOGTREKKER, a comprehensive blog website project that leverages the power of modern web development technologies to create a feature-rich platform for blogging and content sharing. The project combines React, Firebase, React Router, Node, Express, and MongoDB to build an engaging and dynamic website.

# website Live Link: (https://blog-website-client.web.app)

# Server site Live Link: (https://blog-website-server-production.up.railway.app)

# Project Overview

BLOGTREKKER is designed to provide a user-friendly and visually appealing experience for bloggers and readers. It incorporates essential features and functionalities to enhance the user experience and foster content creation and sharing.

# Key Features

- Implement secure email and password-based authentication using Firebase. Allow users to log in and register for an account. Additionally, provide social login options, such as Facebook, GitHub, and Google.

- The homepage features a clean and attractive layout with a header, banner, recent blog posts, newsletter subscription, and a footer. The navigation bar includes links for various sections of the website.

- Display a list of the most recent blog posts on the homepage, complete with titles, images, short descriptions, categories, and buttons for viewing details and adding blogs to the user's wishlist.

- Allow users to subscribe to the website's newsletter by providing their email. Upon submission, a toast message confirms their subscription.

- Users can add blogs to their wishlist for easy access to their favorite content. A separate database collection is maintained for wishlisted blogs.

- Create a dedicated page to view all blogs added by users. Users can filter blogs by category and search for blogs by title, enhancing content discoverability.

- Each blog has its own details page, showcasing the title, image, short description, long description, and a comment section where users can engage in discussions.

- Enable users to comment on blogs, with comments displaying the owner's name and profile picture. Ensure that users cannot comment on their own blogs.

- Blog owners can edit and update their content by clicking on the "update" button, which leads to a dynamic route for editing the blog details.

- Highlight the top 10 blogs based on word count in their long descriptions. Visualize this data in an interactive table.

# Technology Stack

- Frontend: Built with React and React Router for dynamic and responsive user interfaces.
- Authentication: Firebase authentication handles user registration and login.
- Backend: Node.js and Express are used to create a server for handling API requests and database interactions.
- Database: MongoDB stores blogs, comments, users and user wishlists.
- Styling: Tailwind CSS is used to style the website, and additional libraries or frameworks can be integrated for design enhancement.
