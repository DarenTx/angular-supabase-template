# Angular Supabase Template

A production-ready starter template for Angular applications with Supabase authentication. Includes Google OAuth, email magic link login, a functional auth guard, PWA support, and GitHub Pages deployment.

## Tech Stack

| Layer          | Technology                                                   |
| -------------- | ------------------------------------------------------------ |
| **Framework**  | Angular 21 — standalone components, signals, `@for` control  |
| **Styling**    | SCSS                                                         |
| **Auth**       | [Supabase](https://supabase.com) — Google OAuth + Magic Link |
| **PWA**        | `@angular/pwa` — service worker, web app manifest            |
| **Hosting**    | GitHub Pages (via GitHub Actions)                            |
| **Unit Tests** | Vitest + jsdom                                               |
| **E2E Tests**  | [Playwright](https://playwright.dev)                         |
| **Language**   | TypeScript ~5.9                                              |
| **Runtime**    | Node.js 22 / npm 10                                          |

---

## Getting Started

### 1. Clone the template

```bash
git clone https://github.com/your-org/angular-supabase-template.git my-app
cd my-app
npm install
```

### 2. Create a Supabase project

1. Go to [supabase.com](https://supabase.com) and create a new project.
2. Under **Auth → URL Configuration**, add the following to the **Redirect URLs** allow-list:
   - `https://your-domain.com/login/callback`
   - `http://localhost:4200/login/callback`
3. In your project's **Auth → Providers** settings, enable **Google** and note the **Callback URL (for OAuth)** shown — you will need it in the next step.

### 3. Set up Google OAuth in Google Cloud Console

1. Go to [console.cloud.google.com](https://console.cloud.google.com) and create a new project (or select an existing one).
2. Navigate to **APIs & Services → OAuth consent screen**:
   - Choose **External** user type (unless this is an internal Google Workspace app).
   - Fill in the required fields: **App name**, **User support email**, and **Developer contact email**.
   - Add the scope `openid`, `email`, and `profile` under **Scopes** (these are added by default for most apps).
   - Add your production domain under **Authorized domains** (e.g. `your-domain.com`).
   - Save and continue through the remaining screens.
3. Navigate to **APIs & Services → Credentials** and click **Create Credentials → OAuth 2.0 Client ID**:
   - Application type: **Web application**
   - Under **Authorized redirect URIs**, add the Supabase callback URL from step 2.3 (it looks like `https://<project-id>.supabase.co/auth/v1/callback`).
   - Click **Create** and copy the generated **Client ID** and **Client Secret**.
4. Back in the Supabase dashboard under **Auth → Providers → Google**, paste the **Client ID** and **Client Secret**, then save.

### 4. Configure environment variables

Update both environment files with your Supabase credentials and app URL:

**`src/environments/environment.ts`** (local dev):

```typescript
export const environment = {
  production: false,
  supabase: {
    url: 'https://your-project-id.supabase.co',
    anonKey: 'your-supabase-anon-key',
  },
  appUrl: 'http://localhost:4200',
};
```

**`src/environments/environment.prod.ts`** (production):

```typescript
export const environment = {
  production: true,
  supabase: {
    url: 'https://your-project-id.supabase.co',
    anonKey: 'your-supabase-anon-key',
  },
  appUrl: 'https://your-domain.com',
};
```

Your Supabase project URL and anon key are found in **Project Settings → API**.

### 5. Rename the project

Replace `angular-supabase-template` with your project name in:

- `package.json` — `"name"` field
- `angular.json` — project key and `buildTarget` references
- `.github/workflows/deploy.yml` — `dist/angular-supabase-template/browser` paths
- `src/index.html` — `<title>` tag
- `public/manifest.webmanifest` — `"name"` and `"short_name"` fields

### 6. Customize the login page

The login page heading is in `src/app/features/login/login-page.html`:

```html
<h1 id="login-heading">Sign in</h1>
```

Update this to match your app name.

### 7. Replace the logo

Add your logo to the `public/` folder and reference it in your components. A placeholder SVG (`public/logo.svg`) is included.

### 8. Update PWA icons

Replace the icons in `public/icons/` with your own app icons (72×72 through 512×512 PNG files).

---

## Local Development

```bash
npm start          # Dev server → http://localhost:4200
npm test           # Unit tests (Vitest, watch mode)
npm run test:e2e   # Playwright e2e tests (starts dev server automatically)
ng build           # Production build → dist/angular-supabase-template
```

---

## Deployment (GitHub Pages)

The included GitHub Actions workflow (`.github/workflows/deploy.yml`) builds and deploys to GitHub Pages on every push to `main`.

**Required setup:**

1. In your GitHub repo, go to **Settings → Pages** and set the source to **GitHub Actions**.
2. The `public/CNAME` file contains the custom domain — update it with your domain or delete it if using the default `*.github.io` domain.

---

## Project Structure

```
src/
  app/
    core/
      auth/
        authentication.service.ts   # Supabase auth methods (Google OAuth, magic link, session)
        auth.guard.ts                # Route guard — redirects unauthenticated users to /login
        redirect-destination.ts     # Stores/restores post-login redirect path in sessionStorage
        supabase.provider.ts         # Provides the SupabaseClient via DI
    features/
      login/
        login-page.ts / .html        # Combined login page (Google OAuth + magic link form)
        auth-callback-page.ts        # Handles OAuth/magic-link callback, exchanges code for session
        login.routes.ts              # Route definitions for /login and /login/callback
    home/                            # Placeholder home page (replace with your app content)
  environments/
    environment.ts                   # Dev environment config
    environment.prod.ts              # Production environment config
```

---

## Per-Project Settings Checklist

| Setting                     | Location                                                       |
| --------------------------- | -------------------------------------------------------------- |
| Supabase project URL        | `src/environments/environment*.ts`                             |
| Supabase anon key           | `src/environments/environment*.ts`                             |
| Production app URL          | `src/environments/environment.prod.ts` → `appUrl`              |
| App title                   | `src/index.html`, `public/manifest.webmanifest`                |
| Project name (build output) | `package.json`, `angular.json`, `.github/workflows/deploy.yml` |
| GitHub Pages custom domain  | `public/CNAME`                                                 |
| OAuth redirect URLs         | Supabase dashboard → Auth → URL Configuration                  |
| Google OAuth credentials    | Google Cloud Console + Supabase Auth → Providers               |
| Login page heading          | `src/app/features/login/login-page.html`                       |
| PWA icons                   | `public/icons/`                                                |
| Logo                        | `public/logo.svg` (replace with your own)                      |
