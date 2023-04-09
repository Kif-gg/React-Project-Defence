# SoftUni-ReactJS - Project defence

 **NOTE:** The project is **not perfect**, it still can have a lot of optimization but due to my lack of **free time** it might have **bugs or/and incorrectly handled errors!**
 
# Overview


**This project does not have an official name for it, but here is a brief explanation and intro:**
An online store for the sewing and clothing industry. It has **four** categories of products:
- Fabric
- Stones/crystals used for creating patterns and stamps on the clothes
- Stamps which only need to be applied to clothes
- Clothes

Each category has subcategories and types, for example -> clothes: bridal dresses, prom dresses, t-shirts, pants, etc and other factors to filter them.

## Links/paths

The application has **17 paths/pages**:
### Accessible to users and guests:
- Home
	>Every time you navigate to it, it puts three random products from different categories, based on their high rating and randomizing algorithm.
- Fabric
	>	This page contains all the offers from the fabric category, it has filtering form/search so users can find what they want faster and easier. **This filtering feature is applied to the other three categories as well**.
- Stones
- Stamps
- Clothes
	>Details pages for all products from the four categories
- About (static, just for aesthetics)
- FAQ/Frequently Asked Questions (static, no meaningful things, just for aesthetics)


### Accessible to users only:
- A personal profile page, which contains the user's info and some other functionalities:
	- Edit user data **(email, phone number and password)**
	- Delete profile
- Favorites page
	>Included as path in the profile page

- Cart (includes fake checkout functionality)
- Logout

**Users also have functionalities to post reviews, edit them and also delete them, add products to their favorites page and also add products to their cart.**

### Accessible to guests only:
- Login
- Register


# Information about technologies used

The project is created from two parts: **server** and **client**
## Client side

For the client side, I used [ReactJS](https://react.dev/), a library usually for creating SPA


## Server side

For the server side, I used [ExpressJS](https://expressjs.com/), a framework that helps building server side of projects. This framework is for the [Node.JS](https://nodejs.org/en) runtime environment.

### Other libraries and third-party libraries and resources used

For the database I chose to work with [MongoDB](https://www.mongodb.com/), a NoSQL DataBase.
They provide a nice tool for managing database visually instead of using commands: [MongoDB Compass](https://www.mongodb.com/products/compass)

The back-end uses [MongooseJS](https://mongoosejs.com/) which provides elegant object modeling for **MongoDB**

For validations I used: 
- [bcrypt](https://www.npmjs.com/package/bcrypt), which is a hashing tool for passwords
- [express-validator](https://www.npmjs.com/package/express-validator), which provides functions for validating user inputs
- [cookie-parser](https://www.npmjs.com/package/cookie-parser), which provides middleware for cookie sending and receiving, checking etc.
- [JsonWebToken(JWT)](https://www.npmjs.com/package/jsonwebtoken), which is alternative for cookies, and can contain much more data

For developing I used [nodemon](https://www.npmjs.com/package/nodemon): a tool which automatically restarts the application upon detecting changes in files/directories

# How to start the project
**NOTE:** You must have installed **MongoDB** for storing data first
When you download the project:
- Open two terminals in [Visual Studio Code](https://code.visualstudio.com/)
- With the first terminal navigate to the 'Server' folder
	>type `npm i`, after the process is finished type `npm start`
- With the second terminal navigate to the 'Client' folder and repeat the previous commands.
- The Client side will open usually on the address **localhost:3000**
- The Server side will be started on the address **localhost:3030**
