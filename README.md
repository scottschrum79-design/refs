# CV Soccer U8 Referee Signups

Parents register 12–16-year-old referees for specific CV Soccer games. Each game accepts one referee. A referee may claim multiple games, but the database rejects overlapping game windows.

## Technology

- GitHub Pages: public signup and Creator pages
- Supabase: database, row-level security, atomic claims, and Creator authentication
- Google Apps Script: optional parent and administrator confirmation emails

## Setup

1. Create a new Supabase project.
2. Run `supabase/schema.sql` in its SQL Editor.
3. In Supabase Authentication, create `scott@cvsoccer.club` as a user.
4. Copy the Supabase Project URL and publishable/anon key into `config.js`.
5. Optionally deploy `google-apps-script/Code.gs` and add its `/exec` URL to `config.js`.
6. In GitHub repository Settings → Pages, deploy from the `main` branch and `/ (root)`.

Never put a Supabase service-role key in this public repository.
