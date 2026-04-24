import { Component, ChangeDetectionStrategy } from '@angular/core';

export interface BuildStep {
  number: number;
  title: string;
  description: string;
  command?: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.html',
  styles: `
    :host {
      display: block;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Home {
  readonly steps: BuildStep[] = [
    {
      number: 1,
      title: 'Verified Angular CLI',
      description:
        'Confirmed Angular CLI v21.1.4, Node.js v22.15.1, and npm v10.9.2 were available on the system.',
      command: 'ng version',
    },
    {
      number: 2,
      title: 'Scaffolded Angular project',
      description:
        'Created a new Angular 21 project with SCSS styling, routing enabled, and SSR disabled.',
      command: 'ng new my-app --routing true --style scss --skip-git true',
    },
    {
      number: 3,
      title: 'Added PWA support',
      description:
        'Installed @angular/pwa which added a service worker, web app manifest, and app icons for offline capability and installability.',
      command: 'ng add @angular/pwa',
    },
    {
      number: 4,
      title: 'Built the home page',
      description:
        'Generated a standalone Home component with OnPush change detection. Updated app routes to load the Home component at the root path.',
      command: 'ng generate component home',
    },
    {
      number: 5,
      title: 'Configured unit tests',
      description:
        'Wrote Karma/Jasmine unit tests for both the root App component and the Home component, verifying component creation and step data.',
    },
    {
      number: 6,
      title: 'Added Playwright e2e tests',
      description:
        'Installed Playwright and configured functional end-to-end tests that verify the home page renders, all build steps are visible, and the app title is correct.',
      command: 'npm install --save-dev @playwright/test',
    },
    {
      number: 7,
      title: 'Verified the build',
      description:
        'Ran ng build to confirm the project compiles cleanly with no errors, producing a production-ready bundle in the dist/ directory.',
      command: 'ng build',
    },
  ];
}
