# Gym Management System

A web-based **Gym Management System** developed using **HTML, CSS, JavaScript and Firebase**.  
The Gym Management System is a web-based application developed as part of an internship project.
The main objective of this system is to automate and manage gym-related operations such as
member management, package assignment, billing, notifications, and user authentication.

The system provides different dashboards based on user roles such as Admin, Staff (User),
and Member. Firebase Authentication is used for secure login, while Firebase Firestore is used
for real-time data storage and management.

This project helps in reducing manual work, improving data accuracy, and providing a
user-friendly interface for gym administration and members.

---

## 📌 Project Objective

The main objective of this project is to:
- Digitally manage gym operations
- Reduce manual record keeping
- Provide secure role-based access
- Improve efficiency for admin, staff, and members

---

## User Roles

The system supports **three types of users**:

### 1️⃣ Admin
- Login securely
- Manage gym staff (users)
- Add / edit / delete members
- Assign packages
- Create bills
- Send notifications
- View logs of actions

### 2️⃣ User (Gym Staff / Coach)
- View members
- Manage member details
- View bills
- Assist admin operations

### 3️⃣ Member
- Login securely
- View personal profile
- Check membership details
- View bills & payment history
- View notifications
- Logout securely

---

## 🔐 Authentication & Authorization

- Firebase Authentication is used for login
- Role-based redirection after login:
  - Admin → Admin Dashboard
  - User → User Dashboard
  - Member → Member Dashboard
- Unauthorized access is restricted

---

## 🔁 Project Workflow (Execution Flow)

1. User opens `login.html`
2. Login credentials are verified using **Firebase Authentication**
3. User role is fetched from **Firestore (users collection)**
4. User is redirected to the respective dashboard
5. All operations (add, delete, update) interact with **Firestore**
6. Important actions are stored in **logs collection**
7. User can logout securely

---

## Technologies Used

| Technology | Purpose |
|---------|--------|
| HTML | Structure |
| CSS | Styling & Responsive UI |
| JavaScript (ES6) | Logic & Interactions |
| Firebase Authentication | Login System |
| Cloud Firestore | Database |
| Firebase Hosting (optional) | Deployment |

---

## 📁 Project Folder Structure

GYM-management-System/
│
├── index.html
├── login.html
├── admin.html
├── user-dashboard.html
├── member.html
│
├── add-member.html
├── edit-member.html
├── view-members.html
│
├── assign-package.html
├── create-bill.html
├── reports.html
│
├── member-profile.html
├── member-membership.html
├── member-bills.html
├── member-notifications.html
│
├── user-view-members.html
├── user-view-bill.html
├── user-reports.html
│
├── style.css
├── login.css
├── admin.css
├── reports.css
│
├── firebase.js
├── login.js
├── logger.js
│
├── add-member.js
├── edit-member.js
├── view-members.js
├── assign-package.js
├── create-bill.js
├── reports.js
│
├── member.js
├── member-profile.js
├── member-membership.js
├── member-bills.js
├── member-notifications.js
│
├── user-dashboard.js
├── user-view-members.js
├── user-view-bill.js
├── user-reports.js
│
├── frontpage.jpg
│
├── README.md

---

## How to Run the Project

1. Clone or download the project
2. Open the project folder in **VS Code**
3. Setup Firebase:
   - Create Firebase project
   - Enable Authentication (Email/Password)
   - Create Firestore database
4. Update Firebase config in `firebase.js`
5. Run using:
   - **Live Server**
   - or open `login.html` in browser

---

## Coding Standards Followed

- Modular JavaScript files
- Meaningful variable & function names
- Comments for clarity
- Separation of concerns (HTML / CSS / JS)
- Reusable Firebase configuration
- Role-based logic handling

---

## Testing

- Tested all dashboards separately
- Verified role-based access
- Checked Firestore CRUD operations
- Verified logout & authentication flow

---

## Future Enhancements

- Attendance tracking
- Payment gateway integration
- Admin analytics dashboard
- Email / SMS notifications
- Mobile responsive enhancements

---

## Developer Details

Name: Karishma Yadav  
Course: Bachelor of Computer Applications (BCA)  
Semester: Final Semester  
Role: Web Developer Intern  
Project Type: Internship Project  
Technology Stack: HTML, CSS, JavaScript, Firebase (Authentication & Firestore)
Email:karishmayadav@gmail.com

---

## Acknowledgement

I would like to thank my faculty for guidance and support during the development of this project.




