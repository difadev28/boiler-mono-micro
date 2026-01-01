 

### **Prompt: Microfrontend Setup with Clean Architecture & Atomic Design**

**Objective:**
Bangun sebuah ekosistem **Microfrontend** berbasis **Monorepo (pnpm workspaces)** menggunakan **React Vite**. Sistem terdiri dari `apps/host` (Consumer) dan `apps/remote` (Provider) menggunakan **Module Federation**.

**1. Architectural Requirements:**

* **UI Architecture:** Implementasikan **Atomic Design** (Atoms, Molecules, Organisms, Pages).
* **Logic Architecture:** Implementasikan **Clean Architecture (Uncle Bob)** dengan pemisahan layer yang ketat:
* **Domain Layer:** Entities dan Interfaces (Repository Contract).
* **Use Case Layer:** Business Logic (Application layer).
* **Infrastructure Layer:** Data Sources. Pisahkan secara total antara `MockAuthRepository` dan `RealAuthRepository` ke dalam file berbeda.


* **Dependency Injection:** Buat sebuah file `registry.ts` sebagai satu-satunya "Switch" untuk menentukan apakah aplikasi menggunakan Mock atau Real API.

**2. Feature Requirements (Login Page):**

* Buat 1 halaman Login di `apps/host`.
* **UI Design:** Minimalis, bersih, dan modern.
* **Theming:** Dukungan Dark Mode dan Light Mode (menggunakan Tailwind CSS).
* **Logic:** Integrasikan form login dengan `AuthLoginUseCase`. Pastikan Presentation layer (UI) tidak memanggil Repository secara langsung.

**3. Tech Stack & Tools:**

* **Bundler:** Vite dengan `@originjs/vite-plugin-federation`.
* **Styling:** Tailwind CSS.
* **State Management:** Zustand (Integrasikan ke dalam Clean Architecture).
* **Language:** TypeScript (Pastikan *type-safety* antar module).

**4. DevOps & Build:**

* **Docker:** Buat `Dockerfile` multi-stage untuk `apps/host` yang menggunakan Nginx untuk melayani file statis di production.
* **Efficiency:** Gunakan *shared dependencies* di Module Federation config untuk `react` dan `react-dom` agar tidak terjadi double-loading.

**5. Clean Code Principles:**

* Gunakan kode yang modular, readable, dan maintanable.
* Terapkan Error Boundary dan Suspense untuk memuat fitur dari `remote`.
* Pemisahan folder harus scannable sesuai dengan struktur: `core/`, `components/`, `pages/`, `infrastructure/`.

---

### **Output yang Diharapkan (Struktur File):**

```text
my-monorepo/
├── apps/
│   ├── host/
│   │   ├── src/
│   │   │   ├── core/
│   │   │   │   ├── domain/ (Entities & IRepository)
│   │   │   │   ├── usecases/ (AuthUseCase)
│   │   │   │   ├── infrastructure/ (MockAuthRepo & ApiAuthRepo)
│   │   │   │   └── registry.ts (The Switcher)
│   │   │   ├── components/ (Atoms, Molecules, Organisms)
│   │   │   └── pages/ (LoginPage)
│   │   ├── Dockerfile
│   │   └── vite.config.ts
│   └── remote/
│       └── vite.config.ts (Exposes Atomic Components)
├── pnpm-workspace.yaml
└── package.json

``` 