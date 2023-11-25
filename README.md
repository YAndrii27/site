This is a website-portfolio for me or anyone who find it as a good base.  
  
It uses the [Next.JS](https://github.com/vercel/next.js) framework (based on the [React.JS](https://github.com/facebook/react)) and [Tailwind CSS](https://github.com/tailwindlabs/tailwindcss) framework and has been deployed to vercel.com.  
I've also used some vector icons from the [heroicons](https://heroicons.com/) in this project.
  
It contains two pages: main page with the information about me and the projects list.  
Projects are fetched from the Github by Github API. It fetches **only** public repositories.  
  
Project are published under the MIT license, so feel free to use and modify it in any way you want.

## Installation
```
git clone https://github.com/YAndrii27/site

cd site

npm install
```

## Before running
If you just want to see what it looks like you'll be fine to you skip this section. Otherwise:  
1. Set the environment variables:  
  NEXT_PUBLIC_USERNAME - username from your github and linkedin account.  
  FULL_NAME or just NAME - your name to display on the 'about me' page.  
  EMAIL - your email for show on the page.
2. Put your photo in the ``public/`` folder under the name "photo". It should have a .jpg extension and size at least 200x200 pixels. I'd also recommend it to be a square.  
3. Replace value of variable ``about`` in file ``/src/app/about.tsx`` with your text.

That's it. Site ready to be used as your own. 

## Running
For production build (faster and safer):  
```
npm run build
npm start
```
For development build (fast-reload and some devtools):
```
npm run dev
```

By default site is avialable on http://localhost:3000. You can change this by adding --hostname (or just -H) and --port (or just -p) options like that:  
```
npm start -- --hostname 127.0.0.1 --port 3001
```
