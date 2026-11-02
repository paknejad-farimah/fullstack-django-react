# Manual deployment notes (Netlify + PythonAnywhere)

## Frontend — Netlify
- Create a new site and upload the repository or the contents of a local build manually.
- If building in Netlify, set the base directory to `frontend`, build command to `npm ci && npm run build`, and publish directory to `build`.
- Set the environment variable `REACT_APP_API_BASE_URL` to the HTTPS origin of the deployed Django API, without a trailing slash (for example, `https://yourusername.pythonanywhere.com`).
- The `netlify.toml` file supplies SPA fallback routing for React Router.
- For a manual drag-and-drop deploy, run `npm install` then `npm run build` from `frontend`, and upload the generated `frontend/build` folder.

## Backend — PythonAnywhere
- Upload the contents of `backend/` to a directory such as `/home/yourusername/fullstack-django-react/backend`.
- Create a virtualenv using a Python version supported by your PythonAnywhere account, then install `backend/requirements.txt`.
- Copy `.env.example` to `.env`; generate a new random Django secret and fill in the real domain and any mail/payment credentials. Never upload the real `.env` file to GitHub.
- Configure the PythonAnywhere WSGI file to add the backend directory to `sys.path`, set `DJANGO_SETTINGS_MODULE = "backend.settings"`, then expose `application = get_wsgi_application()`.
- In the web app settings, point the virtualenv to the one you created and configure static files: URL `/static/` -> `.../backend/staticfiles`; uploaded media URL `/images/` -> `.../backend/static/images`.
- Run `python manage.py migrate` and `python manage.py collectstatic --noinput` from the backend directory, then reload the web app.

## Important
- Replace every example domain with the actual domain values. Keep DEBUG=False.
- This project currently uses SQLite. It is suitable only for a small demonstration; keep backups and do not treat it as a production-grade shop database.
- Email activation and Zibal checkout need working provider credentials and outbound connectivity; they are not validated by these configuration changes.
- A file removed from the current branch may still exist in earlier Git commits and on other branches. Rotate any credentials that were ever committed, and clean repository history separately if you need to purge exposed secrets.
- This guide is a checklist, not a report of a successful live deployment. Test the build and Django checks before opening the demo to users.
