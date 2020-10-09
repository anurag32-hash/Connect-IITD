# Design Specifications Document

# For

# Connect@IITD

## Table of Contents


- 1. Introduction
   - 1.1 Purpose
   - 1.2 Scope
   - 1.3 Overview
   - 1.4 Reference
   - 1.5 Definitions, Acronyms and Abbreviations
   - 1.5.1 Definitions
   - 1.5.2 Acronyms & Abbreviations
- 2. System Overview
   - 2.1 Architecture Design
   - 2.2 Modules
      - 2.2.1 Signup
      - 2.2.2 Verify
      - 2.2.3 Signin
      - 2.2.4 ShowAllPosts
      - 2.2.5 AddPost
      - 2.2.6 EditPost
      - 2.2.7 DeletePost
      - 2.2.8 AddPersonalPost
      - 2.2.9 EditPersonalPost
      - 2.2.10 DelPersonalPost
      - 2.2.11 AddPostComment
      - 2.2.12 EditPostComment
      - 2.2.13 DeletePostComment
   - 2.3 Tools and Technologies Used
      - Backend/Frontend:
      - Development Tools:
- 3. Detailed Design
   - 3.1 Module APIs
      - 3.1.1 Users Management:
      - 3.1.2 Sessions Management
      - 3.1.3 Posts Management
      - 3.1.4 Comments Management
- 4. Database Design
- 5. UI Design
   - 5.1: Login Screen
   - 5.2: Register Screen
   - 5.3: Posts & Comments Screen
   - 5.4: Submit a Personal Post Screen
- 6. Use Cases
   - 6.1: Login
   - 6.2: Submit a Post
   - 6.3: Submit a Personal Post
   - 6.4: Submit a Post Comment
- 7. Development Details
   - 7.1 Overall structure:
   - 7.2 Main Routes Used:


## 1. Introduction

### 1.1 Purpose

The design document provides a high level design and description of Connect@IITD. It also enlists the
technology and frameworks used to develop and implement the same. The document will be used to
identify and address any contradictions before actual coding. The main goal of this document is to
provide design level information in an easy to understand format.

### 1.2 Scope

This design document provides details of the system specification, architecture and implementation
design of Connect@IITD. This document also serves as a mandate for the design standards, data
structures and design patterns to be followed. UML diagrams are included to show how different
components interact with each other. This document is subject to change during the development
process because of continuous increments on the functionalities.

### 1.3 Overview

The system is designed to give registered users a way to share their posts/comments for others to see.
In addition to posting own messages a user can comment on a post from another user. A user can also
send a private message to another user which only the target user can see. For simplicity we are
assuming all users can see everyone else’s broadcast messages and we are considering only text
messages to be used on the site. We have divided the design document in different sections:

- **System Overview** : This section includes a high level architectural design of the system which
    has all the modules and their relationship.
- **Detailed Design:** This section has detailed design elements and modules that are used in the
    final product.
- **Modules/API Details:** This section includes the details of various API/Technologies used.

### 1.4 Reference

- Nodejs.org
- Expressjs.com


- Socket.io
- Mongodb.com

### 1.5 Definitions, Acronyms and Abbreviations

### 1.5.1 Definitions

- Registered User: A registered user is someone who has signed up and confirmed his/her
    email id and thus has access to our site.
- Post – a message submitted/posted by a registered user, can be a broadcast message that
    can be seen by everyone in the site or can be a private/personal message addressed to a
    particular user.

### 1.5.2 Acronyms & Abbreviations

- HTML - Hyper Text Mark-up Language
- HTTP - Hyper Text Transfer Protocol
- JSON - JavaScript Object Notation


## 2. System Overview

### 2.1 Architecture Design

### 2.2 Modules

#### 2.2.1 Signup

This module encapsulates the sign up sequence of events:

```
The signup requires a user to have valid email address, username and a password which they
enter on the signup screen, if the email address already exists the site gives an error message.
Once the proper inputs are entered the user is registered and a validation email is sent to the
user’s email address for them to verify. Only after verification the user is authorized to login
to the system.
```
#### 2.2.2 Verify


```
This module is for the user to verify his/her email id that was used at the time of signing up,
the software sends a verification email which the user must receive and use the verification
code from that email to verify the email address as his own.
```
#### 2.2.3 Signin

```
Once the user is verified, he/she is authorized to login to the software and use it. The
username and password both have to be right for a user to login into the software.
```
#### 2.2.4 ShowAllPosts

```
This is the default page that is shown to a logged in user, it shows all the posts from other
users and the current user in the order of posting date/time.
```
#### 2.2.5 AddPost

```
A user can add a broadcast post that can be seen by all logged in users. As explained earlier
we are handling only text posts in this implementation.
```
#### 2.2.6 EditPost

```
A user can edit his own post if he wish to, once the post is made it can either be edited or
can also be deleted.
```
#### 2.2.7 DeletePost

```
A user can delete a post at a later stage, the post content will be replaced by the test “Post
Deleted By User”, meaning once a post is made, it can be deleted but its impression will be
there as other’s might have already seen the post, So, we replace it with a placeholder
instead of actually deleting the whole post.
```
#### 2.2.8 AddPersonalPost

```
A user can send a personal post to another registered user, when the target user logs in they
can see all the private posts addressed to them along with username, date and time.
```
#### 2.2.9 EditPersonalPost


```
A personal post can be edited by the user at a later stage.
```
#### 2.2.10 DelPersonalPost

```
A personal post can be deleted by the user at a later stage, but as explained in other delete
options, it will not be deleted but will just be replaced by a text message that the post was
deleted by the user.
```
#### 2.2.11 AddPostComment

```
Any user can post comments to the posts whether it’s a broadcast post or a private post,
accordingly the visibility of the post comment is handled.
```
#### 2.2.12 EditPostComment

```
A user can edit/modify the post comment that was made by him/her at a later stage.
```
#### 2.2.13 DeletePostComment

```
A user can delete a post comment at a later stage, as in other parts, it will not be deleted but
be replaced by a placeholder text “Post Comment Deleted by the User”
```
### 2.3 Tools and Technologies Used

#### Backend/Frontend:

```
o Nodejs.org – Node.js is an open-source, cross-platform, JavaScript runtime
environment that executes JavaScript code outside a web browser, built on Chrome's
V8 JavaScript engine.
```
```
o Expressjs.com - Express.js, or simply Express, is a web application framework for
Node.js, released as free and open-source software under the MIT License. It is
designed for building web applications and APIs. It has been called the de facto
standard server framework for Node.js.
```
```
o Socket.io - Socket.IO is a JavaScript library for realtime web applications. It enables
realtime, bi-directional communication between web clients and servers. It has two
```

```
parts: a client-side library that runs in the browser, and a server-side library for
Node.js. Both components have a nearly identical API
```
```
o Bcrypt library: bcrypt is a password-hashing function based on the Blowfish cipher.
```
```
o MongoDB Database: MongoDB is a cross-platform document-oriented database
program. Classified as a NoSQL database program, MongoDB uses JSON-like
documents with optional schemas.
o Mangoose: Mongoose is an Object Data Modeling (ODM) library for MongoDB and
Node. js. It manages relationships between data, provides schema validation, and is
used to translate between objects in code and the representation of those objects in
MongoDB.hsxvxsjb
o Nodemailer: node.js module to send emails.
```
```
o Javascript: Javascript is used at both frontend and backend to do all the required
programming and defining modules.
o Bootstrap: Bootstrap is a free and open-source CSS framework directed at responsive,
mobile-first front-end web development. It contains CSS- and JavaScript-based design
templates for typography, forms, buttons, navigation, and other interface
components.
```
```
o JSON: for data transfer between various modules/functions.
```
#### Development Tools:

```
o Visual Studio Code: VSCode is a great free IDE tool to write source code.
```
## 3. Detailed Design

### 3.1 Module APIs

#### 3.1.1 Users Management:


1. create_account (emailid, username, password)
2. send_email (emailid, username)
3. verify_account (emailid, username)
4. check_password (inputusername, inputpassword)
5. login_user(username, password)
6. get_all_logged_on_users()
7. logout()

#### 3.1.2 Sessions Management

1. start_session(session_id)
2. update_session(session_id)
3. stop_session(session_id)

#### 3.1.3 Posts Management

1. add_broadcast_post(user_id, post_content)
2. add_personal_post(user_id, target_user_id, post_content)
3. show_all_posts(user_id)
4. show_all_personal_posts(user_id)
5. delete_post(post_id)

#### 3.1.4 Comments Management

1. add_comment(user_id, post_id, comment_content)
2. show_all_comments(post_id)
3. delete_comment(comment_id)

## 4. Database Design


Schema Details:

- USERS – contains information about the user’s registration info.
- POSTS – contains posts created by various users, includes broadcast and personal posts.
- COMMENTS – stores all the comments stored by various users on different posts.
- SESSIONS - stores session data and the last post user has seen, this way we can show him the
    new posts when a new session is started.

Relationships:

```
As seen in the database schema the tables have relationships between them using the primary
and foreign keys.
USERS and POSTS: 1 to many: each Post can be linked to one and only one user, each user can
make zero to many posts.
POSTS and COMMENTS: 0 to many: Each Post can have 0-many comments
USERS and SESSIONS: each user can have 0 to many sessions.
USERS and COMMENTS: each user can make 0 to many comments on posts.
```
## 5. UI Design

### 5.1: Login Screen

#### USERS

UserUsernameId (^)
PasswordEmailId

#### IsVerified

```
IntText (PK)
```
TextText (^)

#### Boolean

#### POSTS

PostIdPostUserId (^)
PostDateTimePostContent
PostToUserId
IntInt (PK)(FK) (^)
DateText (^)
Int

#### SESSIONS

SessionSessionIdUserId (^)
SessionLatestSeenPostId
IntInt (PK)(FK) (^)
Int (FK2)

#### COMMENTS

CommentIdCommentUserId (^)

#### CommentPostDateTimeCommentContent

IntInt (PK)(FK) (^)
DateText (^)



### 5.2: Register Screen


### 5.3: Posts & Comments Screen


### 5.4: Submit a Personal Post Screen


## 6. Use Cases

### 6.1: Login


### 6.2: Submit a Post

### 6.3: Submit a Personal Post


### 6.4: Submit a Post Comment


## 7. Development Details

### 7.1 Overall structure:

```
The application is designed as a web application using the node.js framework as the backbone
and express.js library is used to handle the request and response between the server and the
client side. We decided to use expess.js because it makes building web-apps using node.js very
easy and is coded in javascript.
We have used the port 5000 as the port at which our app works.
```
### 7.2 Main Routes Used:

```
As we worked with express.js which is used to handle the communication between the
server and the client which is basically done using the browser, Express.js gives us high level
of control over the URL, Querystring and other such elements which are needed to handle
the information flow between the server and the client. We have defined various routes for
the same:
```
- / - root route: this is the route that is used whenever the application is started, by
    default a user just opens the main URL/path of the application and this route handles
    that.
- /posts – handles the POSTS related content like show posts, create post, edit post,
    delete post as so on.
- /comments – handles all content related to comments like show, create, edit and delete.
- /api/users – API for Users management – get users, login, logout etc.


