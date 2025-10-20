# Octo Eureka

**Octo Eureka** is a sleek and intuitive to-do app designed to significantly boost your productivity. With its user-friendly interface, you can effortlessly manage tasks and achieve more by simply embracing the “just do it” mindset.

## 🛠️ Getting Started

Follow the steps below to set up and run Octo Eureka locally:

### 1. Clone the Repository

First, clone this repo and navigate to the project’s root directory:

```bash
git clone https://github.com/your-username/octo-eureka.git
cd octo-eureka
```

### 2. Install Dependencies

Make sure you have a package manager installed (`pnpm`, `npm`, or `yarn`). This project uses [pnpm](https://pnpm.io/), but you can use any of the following commands:

```bash
pnpm install  # or npm install, yarn install
```

### 3. Run the App (Development Mode)

To start the app with hot-reload during development, use:

```bash
pnpm dev  # or npm run dev, yarn dev
```

### 4. Build for Production

To compile, type-check, and minify the app for production:

```bash
pnpm build  # or npm run build, yarn build
```

### 5. Run Unit Test

To run the unit test with one time, to watch for changes and show unit test coverage

```bash
pnpm test:unit  # or npm run test:unit, yarn test:unit
pnpm test:watch  # or npm run test:watch, yarn test:watch
pnpm test:coverage  # or npm run test:coverage, yarn test:coverage
```

### 6. Run End to End Test

To run the end-to-end (E2E) test

```bash
pnpm test:e2e  # or npm run test:e2e, yarn test:e2e
```

## Tech Stack

Here are list of tech and tools I used to create this project:

### Front-end

- Vue 3 Typescript with `<script setup>`
- TailwindCSS
- Icons for icones.js.org

### State Management

- Pinia
- Pinia Persisted State Plugin
- Zipson

### Testing

- Vitest
- Playwright
- Pinia Tests

### Utilties

- Vueuse/core
- Zipson
- DayJS

## What Have I Done?

- [x] Add basic features for MVP todo app
  - ADD, EDIT & DELELE todo
- [x] Create a modal for dropdown menu
- [x] Create priority dropdown and add priority to todo item
- [x] Add sidebar for editing items
- [x] Add subtask functionality
- [x] Add light/dark mode
- [x] Add due date functions
- [x] Add basic filter functionality
  - ALL, COMPLETED & ON-GOING TODOS
- [x] Add pinia state to local storage
- [x] Add auto-version using semantic-release
  - generate release notes & change log
- [x] Start writing test for the app
  - 100% coverage for pinia store and utils funcs
  - playwright test for adding todo (CI was added for this!)
- [x] Create a demo of the app
- [x] Show number of todos compared to completed todos

## What Am I Working?

- [ ] Add setting feature
  - Input validation & App limitation
  - Custom Accent Color
  - clearing data
  - Visualization


> 💡 **Note:**  
>  Please check out the [CHANGELOG.md](/CHANGELOG.md) to see a full list of the features I have worked on, because the list above may not be exhaustive.


## 📄 License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.