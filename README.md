# Gym-management-system
A web-based Gym Management System using HTML, CSS, JS and Firebase.

## Basic Workflow & Execution of the Project

The Gym Management System follows a role-based workflow using Firebase Authentication and Firestore Database.

### Project Execution Flow
1. User opens the application using `index.html`
2. User is redirected to the Login page
3. Firebase Authentication validates email and password
4. After successful login:
   - User role is fetched from Firestore (`users` collection)
   - Based on role, user is redirected to the respective dashboard

### Role-Based Workflow

#### Admin Workflow
- Admin logs in using credentials
- Admin dashboard is loaded
- Admin can:
  - Add new members
  - Update member details
  - Delete members
  - Create and assign bills
  - Assign membership packages
  - Send notifications
  - View reports
- Each important action (Add, Update, Delete, Bill Creation, Login, Logout) is logged in Firestore

#### User (Gym Staff) Workflow
- User logs in using credentials
- User dashboard is loaded
- User can:
  - View member details
  - View bills
  - View reports
- User has limited access (no delete or update permissions)


#### Member Workflow
- Member logs in using credentials
- Member dashboard is loaded
- Member can:
  - View personal profile
  - View membership plan
  - View payment history (bills)
  - View notifications
- Member can logout securely

### Database Execution Flow
- Firebase Authentication handles login & logout
- Firestore Database stores:
  - User roles
  - Member data
  - Bills
  - Packages
  - Notifications
  - Logs
- Queries are executed securely using Firebase rules and indexes
- 
## Coding Standards Followed

The following coding standards are followed in the project:

- Modular JavaScript (separate JS files for each module)
- ES6 import/export syntax
- Meaningful variable and function names
- Proper file and folder structure
- Separation of concerns:
  - HTML for structure
  - CSS for styling
  - JavaScript for logic
- Firebase best practices for authentication and database operations
- Consistent indentation and formatting
- Reusable functions and components
- Error handling using try-catch blocks



