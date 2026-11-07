# 🪔 Diwali Wishes — Ankur Edition 1.0

A world-class, cinematic, interactive 3D Diwali greeting website and visitor guestbook designed with an obsidian-black, royal plum, and champagne-gold Indian aesthetic.

![Diwali Wishes — Ankur Edition](https://img.shields.io/badge/Edition-Ankur%201.0-D4AF37?style=for-the-badge)
![React](https://img.shields.io/badge/React-18.3.1-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-Spark%20Plan-FFA611?style=for-the-badge&logo=firebase&logoColor=black)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

---

## ✨ Features

### 🌟 Cinematic 3D Visual Experience
* **Interactive 3D Diya:** Realistic layered golden lotus geometry, organic flame flicker, golden reflections, mouse/touch parallax, and an interactive particle burst when lit.
* **Ankur's Royal Portrait Medallion:** Authentic photograph framed in a handcrafted golden filigree medallion with depth perspective.
* **Canvas Fireworks & Embers:** Dynamic golden, saffron, and crimson particle trails. Automatically respects `prefers-reduced-motion: reduce` by replacing particle bursts with calm static ambient embers.
* **Harmonic Festive Audio:** Synthesized in real time using the browser's Web Audio API (C-major pentatonic bell chimes and a meditative C# tanpura drone). Zero external audio files or network latency.

### 💌 Personalized Greetings & Sharing
* Enter your name with mandatory consent to unlock dedicated festive blessings from Ankur.
* One-click direct **WhatsApp Greeting Share** with custom festive typography and emoji styling.
* One-click **Copy Greeting** for sharing across SMS, Instagram, or email.

### 🛡️ Secure Admin Portal & Visitor Management
* **Google Admin Authentication:** Restricted strictly to Ankur's authorized Firebase User UID (`kAyEZzqc3PPPVLE53awnCvg4wD62`).
* **Visitor Dashboard:** Real-time visitor list formatted in **Indian Standard Time (IST — `Asia/Kolkata`)**.
* **Query Safety & Scalability:** Enforces 50 records per query batch with cursor-based pagination (`startAfter`).
* **Two-Step Deletion:** Deletion requires explicit interactive confirmation to prevent accidental removals.
* **Hardened Cloud Firestore Rules:** Public write is validated strictly against schema; public read is completely denied.

---

## 🔒 Privacy Notice & Data Transparency

* **What Firestore Stores:**
  When a visitor submits their greeting, Cloud Firestore stores **only three fields**:
  1. `name` (string, trimmed, 1–40 characters)
  2. `consent` (boolean `true`)
  3. `createdAt` (`serverTimestamp()`)
* **What the Application Does NOT Store:**
  The application **never** collects, tracks, or stores visitor email addresses, phone numbers, IP addresses, user-agents, or device identifiers.
* **Hosting Provider Infrastructure:**
  While the application's database stores zero IP or network telemetry, standard static web hosting providers (such as GitHub Pages) process standard web server access and network security logs as part of delivering CDN content and mitigating DDoS traffic.

---

## 🚀 Tech Stack

| Layer | Technology |
| :--- | :--- |
| **Frontend Framework** | React 18.3 + Vite 5 |
| **Icons & UI** | Lucide React |
| **Visual Effects** | HTML5 Canvas (Fireworks, Embers) + Canvas Confetti |
| **Sound Engine** | Web Audio API (Offline Harmonic Synthesis) |
| **Backend & Database** | Google Cloud Firestore (Firebase Web SDK v13.2) |
| **Authentication** | Firebase Authentication (Google Identity Provider) |
| **Hosting** | GitHub Pages (`/diwali-wishes-ankur/`) |
| **Tier** | 100% Free Firebase Spark Plan ($0 cost) |

---

## 🛠️ Local Development & Setup

### 1. Clone & Install
```bash
git clone https://github.com/<your-username>/diwali-wishes-ankur.git
cd diwali-wishes-ankur
npm install
```

### 2. Configure Environment Variables
Create a `.env.local` file in the project root (this file is excluded from Git):
```env
VITE_FIREBASE_API_KEY=AIzaSyChTFwBavAI2PH03wkR6TBlNWux0w6dwoo
VITE_FIREBASE_AUTH_DOMAIN=diwali-wishes-ankur.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=diwali-wishes-ankur
VITE_FIREBASE_STORAGE_BUCKET=diwali-wishes-ankur.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=776575298445
VITE_FIREBASE_APP_ID=1:776575298445:web:438c91dafa6acaf2946bc4
VITE_ADMIN_UID=kAyEZzqc3PPPVLE53awnCvg4wD62
```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:5173/diwali-wishes-ankur/](http://localhost:5173/diwali-wishes-ankur/) in your browser.

### 4. Build for Production
```bash
npm run build
```

---

## 🔐 Firestore Security Rules Setup

To activate database rules:
1. Open the [Firebase Console](https://console.firebase.google.com/) $\rightarrow$ Project **`diwali-wishes-ankur`**.
2. Go to **Firestore Database** $\rightarrow$ **Rules**.
3. Paste the contents of `firestore.rules`:
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    function isAuthenticated() {
      return request.auth != null;
    }
    function isAdmin() {
      return isAuthenticated() && request.auth.uid == 'kAyEZzqc3PPPVLE53awnCvg4wD62';
    }
    match /visitorEntries/{entryId} {
      allow create: if request.resource.data.keys().hasAll(['name', 'consent', 'createdAt'])
                    && request.resource.data.keys().hasOnly(['name', 'consent', 'createdAt'])
                    && request.resource.data.name is string
                    && request.resource.data.name.size() >= 1
                    && request.resource.data.name.size() <= 40
                    && request.resource.data.name.matches('^\\S(.*\\S)?$')
                    && request.resource.data.consent == true
                    && request.resource.data.createdAt == request.time;
      allow get: if isAdmin();
      allow list: if isAdmin() && request.query.limit != null && request.query.limit <= 50;
      allow delete: if isAdmin();
      allow update: if false;
    }
    match /{document=**} {
      allow read, write: if false;
    }
  }
}
```
4. Click **Publish**.

---

## 🌐 GitHub Pages Deployment

This repository includes an automated GitHub Actions deployment workflow located at `.github/workflows/deploy.yml`.

To deploy:
1. Push the code to GitHub on the `main` branch.
2. In your GitHub repository, go to **Settings** $\rightarrow$ **Pages**.
3. Under **Build and deployment** $\rightarrow$ **Source**, select **GitHub Actions**.
4. In **Settings** $\rightarrow$ **Secrets and variables** $\rightarrow$ **Actions**, optionally add your Firebase environment variables as Secrets.
5. In the **Firebase Console** under **Authentication** $\rightarrow$ **Settings** $\rightarrow$ **Authorized domains**, add `<your-username>.github.io`.

---

## 📄 License

This project is open-source under the [MIT License](LICENSE). Designed and built with ❤️ by Ankur.
