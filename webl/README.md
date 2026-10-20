# A little love letter

A responsive, no-build romantic website made with HTML, CSS, and plain JavaScript. There are no package installs, frameworks, or external image assets to manage.

## Run in VS Code

1. Open this folder in VS Code.
2. Use the **Live Server** extension and choose **Open with Live Server** for a local preview.
3. Test the first-screen buttons, then try the love-letter buttons and floating hearts.

Use Live Server or an HTTPS deployment for playback. Opening `index.html` directly may show the page, but browsers can block access to the local MP3 from a `file://` URL.

## Personalize it

- Open `script.js` and edit the `LOVE` object to change the nickname, hidden letter, or playful messages.
- Edit the love-message paragraphs and the final message in `index.html`.
- Change the colors in the `:root` custom properties at the top of `styles.css`.
- After she taps “I love u, Janu,” the final screen plays the bundled MP3 for “Hona Tha Pyar” by Atif Aslam. Playback starts when allowed; browser autoplay rules may require tapping the audio player's play button.
- Keep `Atif_Aslam_-_Hona_Tha_Pyaar_Bol_-_(mp3.pm).mp3` in the project folder so the relative audio URL works locally and on Netlify.

## Publish a public HTTPS link

### Netlify (quickest)

1. Create a free account at [netlify.com](https://www.netlify.com/).
2. In the Netlify dashboard, choose **Add new site → Deploy manually**.
3. Drag this project folder (including `netlify.toml`, `index.html`, `styles.css`, `script.js`, and `Atif_Aslam_-_Hona_Tha_Pyaar_Bol_-_(mp3.pm).mp3`) into the deploy area.
4. Netlify publishes the static site and provides a public `https://...netlify.app` URL. You can customize the site name in **Site configuration**.

For automatic deploys after changes, push the folder to a GitHub repository and choose **Add new site → Import an existing project** in Netlify. The included `netlify.toml` sets the static publish directory; no build command or dependencies are required.

### Vercel

1. Create a free account at [vercel.com](https://vercel.com/) and import this folder from a GitHub repository, or use Vercel's CLI.
2. For a static site, leave the framework preset as **Other**, the build command empty, and the output directory as `.`.
3. Deploy; Vercel will provide a public HTTPS URL. For the GitHub option, push these three site files to a repository, then select that repository in Vercel.

No secrets, backend, build step, or environment variables are needed. Check the deployed URL on a phone before sharing it.
