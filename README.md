# Svelte Notes - Frontend Internship Challenge

This is a simple note-taking web application built with SvelteKit and TailwindCSS. It allows users to perform full CRUD (Create, Read, Update, Delete) operations on a list of notes, interacting with a local mock API.

The application is fully responsive and includes several bonus features such as dark mode, search, sorting, and user-friendly modals for operations.

---

## 🚀 How to Run the Application

To get the application running on your local machine, please follow these steps. You will need [Node.js](https://nodejs.org/) installed.

**1. Clone the Repository**

```bash
git clone https://github.com/StackOverflowed512/frontend_assign
```

**2. Install Dependencies**

This will install all the necessary packages for both the SvelteKit frontend and the local API server.

```bash
npm install
```

**3. Run the Application**

You will need to run two separate processes in two different terminal windows.

**In your first terminal, start the local API server:**
The API is powered by `json-server` and runs on port `3001`.

```bash
npm run api
```

**In your second terminal, start the SvelteKit development server:**
The frontend application runs on port `5173`.

```bash
npm run dev
```

**4. Open in Browser**

Open your web browser and navigate to `http://localhost:5173`. You should see the application running!

---

## 🧰 Tech Stack

-   **Frontend Framework:** SvelteKit
-   **Styling:** TailwindCSS (with `forms` and `typography` plugins)
-   **Local API:** `json-server`
-   **Language:** TypeScript
-   **HTTP Client:** Fetch API

---

## 📄 Features Implemented

-   **Full CRUD:** Create, Read, Update, and Delete notes.
-   **Responsive Design:** A mobile-first UI that scales beautifully to desktop.
-   **Dark Mode:** A theme toggle with persistence in `localStorage`.
-   **Search:** A real-time search box to filter notes by title.
-   **Sorting:** Users can sort notes by creation date or title.
-   **UX Feedback:** Loading spinners and disabled buttons provide clear feedback during async operations.
-   **Confirmation Modals:** A confirmation step for deleting notes prevents accidental data loss.
-   **Professional Typography:** Uses the `@tailwindcss/typography` plugin to beautifully render note content.

---

## 💡 Trade-offs and Assumptions

-   **Local API:** I chose `json-server` to keep the project self-contained and easy to run. In a production scenario, this would be replaced by a real backend and database.
-   **State Management:** For this application's scope, Svelte's built-in stores (`writable`) and component state are sufficient. I avoided more complex state management libraries to keep the solution focused and clean.
-   **Error Handling:** Errors from the API are caught and displayed using native `alert()` dialogs for simplicity. A production app would benefit from a more polished, non-blocking toast notification system.

---

## ⏳ What I'd Do With More Time

-   **Toast Notifications:** Replace `alert()` with a toast library like `svelte-sonner` for a better user experience.
-   **Animations:** Use Svelte's transition and animation modules to animate the notes grid when items are added, removed, or re-sorted.
-   **Form Validation:** Implement more robust, real-time form validation using a schema library like `zod` to provide instant feedback on input fields.
-   **Testing:** Add unit tests for API services and components with `Vitest`, and end-to-end tests with `Playwright` to ensure application stability.
-   **Pagination:** If a large number of notes were expected, I would implement pagination or infinite scroll to improve initial load performance.
