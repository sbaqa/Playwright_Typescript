# Playwright_Typescript

This repository contains automated tests written using **Playwright** with **TypeScript**. It’s designed for fast, reliable, and maintainable end-to-end (E2E) testing of web applications.

---

## 🚀 Features

- ✅ End-to-end browser automation with Playwright
- ⚡ Written in TypeScript for type safety and better tooling
- 🔍 Supports cross-browser testing (Chromium, Firefox, WebKit)
- 🛠️ Easily configurable test settings
- 📄 Reports and screenshots on failures

---

## 📦 Installation

1. **Clone the repo:**

   ```bash
   git clone https://github.com/sbaqa/Playwright_Typescript.git
   cd Playwright_Typescript
   npm install
   ```

2. **Running Tests**

- All tests run: ``` npx playwright test ```
- Run tests with a specific tag or file:  ``` npx playwright test tests/example.spec.ts ```
- Run with UI for better debugging:  ``` npx playwright test --ui ```

3. **Generate Reports**
After running tests, generate an HTML report: ``` npx playwright show-report ```
