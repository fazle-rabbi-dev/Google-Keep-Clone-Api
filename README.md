<div align="">
  <img width="20%" src="/icon.png" alt="Keep Icon" />
  <h1>Google-Keep-Clone</h1>
</div>

*Rest api for Google-Keep-Clone React App*


### `.env` Setup
```
MONGODB_URI=<your mongodb uri>
```

## 🚀 Live
* http://keep-clone.cyclic.sh

## 📃 Docs
- **/users**
  - `<method>POST`: Create a new note
    - request body:
    ```js
    username: "",
    email: "",
    password: ""
    ```
- **/users/id**
  - `<method>DELETE`: Delete user by id
    - required to send `session-token` as authorization header

---
- **/notes**
  - `<method>POST`: Create a new user
    - request body:
    ```js
    title: <Your Note Title>,
    body: <Actual Note>,
    preferences: {
      bgcolor: "bg-red-800", // tailwindcss class
      pin: true/false, // is note pinned or not
    }
    ```
- **/notes**
  - `<method>GET`: Get all notes
    - required to send `session-token` as authorization header

- **/notes/id**
  - `<method>PATCH`: Update specific note
    - required to send `session-token` as authorization header

- **/notes/id**
  - `<method>DELETE`: Delete a note
    - required to send `session-token` as authorization header


