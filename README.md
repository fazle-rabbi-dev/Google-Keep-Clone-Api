<div align="">
  <img width="20%" src="/icon.png" alt="Keep Icon" />
  <h1>Google-Keep-Clone-Api</h1>
</div>

This project serves as the backend API for my Google Keep Clone built with React. It provides the necessary endpoints to manage notes, enabling seamless integration with the corresponding frontend application. 

### `.env` Setup
```
MONGODB_URI=<your mongodb uri>
SECRET_KEY=<secret key for hash password>
```

## 🚀 Live
* http://keep-clone.cyclic.sh

## 📃 Docs
#### Authentication
- **/auth/register**
  - `<method>POST`: Create a new account
  - request body:
  ```js
  {
    username: "",
    email: "",
    password: ""
  }
  ```
- **/auth/login**
  - `<method>POST`: Login to your account
  - request body:
  ```js
  {
    email: "",
    password: ""
  }
  ```

---
#### CRUD With Notes
- **/notes**
  - `<method>POST`: Create a new note
  - request body:
  ```js
  {
    title: "Demo", // Note Title
    body: "Hello this is a note...", // Actual Note
    // Optional
    preferences: {
      bgcolor: "bg-red-800", // Tailwindcss class
      pin: true, // Is note pinned?
    }
  }
  ```
- **/notes**
  - `<method>GET`: Get all notes
  - required to send `session-token` as `authorization` header with `Bearer` prefix. e.g: { "authorization": "Bearer token" }

- **/notes/id**
  - `id` is your note_id
  - `<method>PATCH`: Update a specific note
  - required to send `session-token` as `authorization` header with `Bearer` prefix. e.g: { "authorization": "Bearer token" }

- **/notes/id**
  - `id` is your note_id
  - `<method>DELETE`: Delete a specific note
  - required to send `session-token` as `authorization` header with `Bearer` prefix. e.g: { "authorization": "Bearer token" }
