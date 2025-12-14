# Micro Frontend Monorepo Boilerplate

A scalable **Monorepo Micro Frontend boilerplate** built with **React, Vite, and Module Federation**.
This repository demonstrates how to structure, develop, and deploy multiple independent frontend applications
while sharing common dependencies and UI components.

## ✨ Key Features
- 🧩 **Micro Frontend Architecture** using Module Federation
- 🗂️ **Monorepo setup** for managing multiple apps and shared packages
- ⚡ **Vite + SWC** for fast development and builds
- 🔄 **Shared dependencies** (React, i18n, state, utilities)
- 🎨 **Shared UI Component Library**
- 🌍 **Internationalization ready** (react-i18next)
- 🧪 **Testing-ready** setup (Jest + RTL)
- 🚀 Optimized for **scalability and team collaboration**

## 🏗️ Architecture Overview
- **Host App** – Main container that loads remote applications
- **Remote Apps** – Independently developed & deployed MFEs
- **Shared Packages** – UI components, hooks, utils, and configs

## 📦 Tech Stack
- React
- Vite + SWC
- Module Federation
- TypeScript
- Tailwind CSS / SCSS
- Jest & React Testing Library

## 🎯 Use Cases
- Large-scale frontend applications
- Multi-team frontend development
- Gradual migration from monolith to micro frontend
- Enterprise-grade UI platforms

## 📁 Project Structure
apps/
- host
- remote-search
- remote-results

packages/
- ui-components
- shared-utils
- config

## 🚀 Getting Started
```bash
npm install
npm run dev
