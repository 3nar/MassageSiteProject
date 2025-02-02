


# MassageSiteProject

## Overview
This project is a professional, user-friendly website for a massage service provider. It offers features like multilingual support, service descriptions, and a contact form, ensuring an elegant and functional design.

---

## File Structure
```
MassageSiteProject/
|-- index.html        # Main HTML file
|-- assets/           # Folder for stylesheets and scripts
|   |-- css/
|   |   |-- styles.css       # Main stylesheet
|   |-- js/
|   |   |-- main.js          # Main JavaScript file
|-- images/           # Folder for images
|   |-- logo.png             # Logo
|   |-- massage.jpeg         # Main image
|   |-- massage1.jpeg        # Service image 1
|   |-- massage2.jpeg        # Service image 2
|   |-- massage3.jpeg        # Service image 3
|-- translations/     # JSON files for multilingual support
|   |-- en.json              # English translation
|   |-- ar.json              # Arabic translation
|   |-- ru.json              # Russian translation
|-- server/           # Folder for backend server files
|   |-- app.py               # Python server file
```

---

## Features
- **Multilingual Support:** English, Arabic, and Russian.
- **Responsive Design:** Works seamlessly on all devices.
- **Service Highlights:** Professional imagery and detailed descriptions.
- **Contact Form:** Easy communication for customers.

---

## How to Run
1. **Clone the repository:**
   ```bash
   git clone <https://github.com/3nar/MassageSiteProject.git>
   cd MassageSiteProject
   ```

2. **Install dependencies (for backend):**
   Ensure Python is installed, then run:
   ```bash
   pip install flask
   ```

3. **Start the server:**
   ```bash
   python server/app.py
   ```

4. **Access the website:**
   Open your browser and navigate to `http://127.0.0.1:5000`.

---

## Technologies Used
- **Frontend:** HTML, CSS, JavaScript.
- **Backend:** Python (Flask).
- **Assets:** JSON for translations, high-quality images.

---

## Customization
- Modify `index.html` to adjust the content or structure.
- Update styles in `assets/css/styles.css`.
- Edit language files in `translations/` for additional or updated translations.
- Add or replace images in `images/`.

---

## Notes
- Ensure all required dependencies are installed before running the server.
- For deploying to production, consider using tools like `gunicorn` or `nginx` for the backend.
