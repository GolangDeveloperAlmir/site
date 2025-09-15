Almir Personal Site Structure

This document outlines the structure of the personalised website based on your answers to the 160 yes/no questions. Each section is optional and can be toggled via the design editor.
Sections are ordered as they would appear in the navigation.

## Global features

- Dark mode with glass UI: Enabled by default with the ability to switch themes (dark/light/sepia).
- Design editor: Adjust colours, fonts (with switcher), animation presets, and save/load the entire configuration as JSON.
- Presets: Multiple ready-made themes with the ability for visitors to pick their preferred palette.
- Font switcher: Users can choose between a few predefined fonts.
- Cookie consent: A small banner informs visitors about cookies.
- Announcement bar: A top bar for news or updates.
- Visitor counter: Displays the total number of visits.
- Reading progress indicator: Shows how far down the current page the visitor has scrolled.
- Back-to-top button: Always visible in the bottom-right corner.
- Global search: Searches across all sections.
- RSS feed link: Exposed in the footer.
- QR code: An automatically generated QR code that links to the site.
- Donate button: Links to an external donation page.
- Analytics: Integrates a privacy-friendly analytics script (e.g., Plausible) with support for robots, sitemap and OpenGraph tags.
- Keyboard hints: Brief tooltips for available hotkeys (e.g. / to search).

## Navigation and Layout

- Sticky header: Contains the logo, site name, navigation links and a colour-changing underline.
- Scrollable nav bar: On mobile, items overflow horizontally.
- Footer: Includes the RSS link, sitemap link and a small credit (“Built with Next.js”).
- Floating control bar: Contains quick actions (scroll to top, contact, open design editor).
- Left-side timeline marker: For timeline sections, a vertical line emphasises the chronology.
- Menu hover animations: Subtle scale/colour change on hover.

## Hero (Главная)

- Shows your name and tagline but hides the domain on small screens.
- Buttons for Email, Telegram, Discord, Facebook, Steam and GitHub; icons are loaded from Lucide.
- Random inspirational quote displayed beneath the tagline.
- Animated background grid with optional parallax.
- “Contact” button leads to the contact section.
- “Edit design” triggers the editor panel.

## About (Обо мне)

- A longer paragraph about yourself (more than just one line).
- A “Read more” link reveals further details or redirects to your career timeline.
- Facts and fun tidbits can be added as bullets.
- Optional photo on the side.

## Mission / Vision

- Separate section where you can describe your mission and values.
- Could include three pillars or principles that guide your work and life.

## Skills & Languages (Навыки и языки)

- Skills are grouped by category (e.g. Backend/Go, Observability, Infrastructure).
- Each skill has a level (frequent, occasional, beginner) and is colour-coded.
- Programming languages (Русский, English, Deutsch) appear as small badges beneath the technical skills.
- A radar chart visualises your proficiency across the main categories.
- “Currently learning” shows technologies you are exploring.

## Projects (Проекты)

- Shows up to six projects on the home page.
- Each card lists the project name, description, tags and either a GitHub link or a “believe me” note if no link is available.
- Cards animate slightly on hover.
- A “Show more” button loads additional projects.
- A “All projects” link navigates to a dedicated page.
- Cards display the last update date.
- Placeholder projects can be defined via environment variables.

## Interview Questions (Вопросы с собеседований)

- A searchable and filterable list of interview questions.
- Filters: frequency (часто/норма/редко) and complexity.
- Each question has tags (e.g. “Go”, “Database”) and a checkbox to mark it as done (persisted in localStorage).
- Buttons to import/export the question set as JSON and to sync to the cloud (via your API).
- Optional difficulty sorting.
- Search input with fuzzy search.

## Travel (Путешествия / Пути)

- Displayed as a grid grouped by year.
- Each card shows the destination, date and a personal note.
- No map or distance statistics.
- Scrollable within its own container.
- If there are no trips, it displays “пока тут пусто”.

## Gallery (Галерея)

- Initially shows nine images in a 3×3 grid.
- Supports external images via NEXT_PUBLIC_GALLERY_URLS; if empty, a “пока тут пусто” message is shown.
- Hover zoom effect on each image.
- A toggle switches between grid and slide-show view.
- Clicking an image opens a lightbox with arrows for navigation and dark overlay.

## Timelines

### Career Timeline

- Dedicated timeline for your career milestones.
- Each entry includes a title, company, date, and short description.
- Expand/collapse button toggles the timeline’s visibility.
- Minimal styling (no icons or emoji).

### Personal Timeline

- A separate timeline for life events (optional).
- Shorter and less detailed than the career timeline.

## Achievements (Достижения)

- A set of badge-style cards highlighting major accomplishments.
- At least four items, without year or external links.
- Each badge is colour-coded or icon-based.

## Inspiration (Вдохновение)

- Divided into “Reading”, “Watching” and “Listening”.
- Items link to playlists or channels (no automatic cover retrieval).
- A “Save for later” list lets you store links you want to consume later.
- Random quotes appear in the hero (global feature).

## FAQ (Частые вопросы)

- Displays a list of frequently asked questions.
- The first item is expanded by default.
- Search input filters questions.
- No “expand all” button.
- Proper ARIA attributes for accessibility.

## Now (Сейчас)

- Lists your current activities/goals.
- Shows the date of last update.
- A “Share update” button copies a link to the clipboard.
- No progress bars.

## Recommended (Рекомендую)

- A section linking to your favourite courses, books or resources.
- Each item includes a short summary and link.
- The list can be sorted or filtered if needed.

## Tools (Рабочие инструменты)

- Lists your daily tools (IDEs, languages, services).
- Each item includes a brief description and optional link.

## Theme Presets

- A selection of predefined colour schemes that visitors can apply.
- Appears in the design editor.
- Changing a preset automatically updates the site palette.

## Microblog / Journal (Дневник)

- A timeline-style feed with short posts.
- Each entry has a timestamp, title and a few sentences.
- Posts can be filtered or searched.
- The site owner can tag posts and readers can mark favourites.

## Music (Музыка)

- Lists playlists or albums you enjoy.
- Each entry links to an external platform (Spotify, YouTube, etc.).
- Could display an embedded player if allowed.

## Coming Soon (Скоро)

- Placeholder cards for upcoming projects or features.
- Visitors can subscribe via RSS to be notified when these launch (but no email form).

## Contact (Где меня найти)

- Divided into three groups: Social (Facebook, Instagram, YouTube, etc.), Professional (Email, LinkedIn, GitHub, Telegram), and Gaming (Steam, Discord).
- Each item appears with an icon and label.
- All links are defined through environment variables (NEXT_PUBLIC_EMAIL, NEXT_PUBLIC_TELEGRAM, etc.).
- No contact form is provided.

## Extras

- Pomodoro timer: A small widget accessible from the floating bar.
- Random quote generator: Displays a different quote on each page load.
- GitHub widget: Shows recent commits to selected repositories.
- Gallery tags: Each image can be assigned categories for filtering.
- Visitor count: A simple counter increments on each visit (can be stored in localStorage or a backend if available).
- Site map: A small text-based site map appears in the footer.
- Environment-driven links: Most external links (projects, playlists, socials, gallery) are pulled from .env variables for easy editing without code changes.

## Not Included

- No download of CV/Resume PDF.
- No testimonials or endorsements section.
- No volunteering/community involvement section.
- No education section.
- No form submission (no contact form or newsletter subscribe).
- No reading time estimates on articles.
- No star ratings for materials.
- No map or statistics in the travel section.
- Current year is not shown in the footer.


## Repository Structure

- `src/` – application source (pages, components, styles)
- `scripts/` – helper scripts
- `secrets/` – generated secrets (ignored by git)
- `certs/` – TLS certificates for HTTPS
- `deployments/` – Docker and Nginx configuration
- `docs/` – additional documentation such as [deployment](docs/deployment.md) and [design](docs/design.md) guides

## Development

This project uses Next.js with TypeScript and Yarn.
If Yarn is unavailable, enable it with `corepack enable`.
To start the site locally, run:

```bash
yarn install
yarn dev
```

Then open http://localhost:3000 in your browser.

Generate a random application secret:

```bash
make generate-secret
```

## Deployment

See [docs/deployment.md](docs/deployment.md) for Docker and HTTPS instructions.

To build a container image directly:

```bash
docker build -t personal-site .
```
