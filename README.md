This is a website-portfolio for me or anyone who find it as a good base.  
  
It uses Next.JS framework (based on the React.JS) as an JS framework and Tailwind CSS as an CSS framework and has been deployed to vercel.app.  
I've also used some vector icons from the heroicons here.
  
It contains two pages: main page with information about me and the projects list.  
Projects are fetched from the Github by official Github API. It fetches **only** public repositories.  
  
Project are published under the MIT license, so feel free to use and modify it in any way you want.

## Installation
For production build (faster and safer for use):
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
2. Put your photo in the ``public/`` folder under the name "photo". It should have .jpg extension and at least 200x200 pixels. I'd also recommend it to be a square.  

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

By default site avialable on http://localhost:3000. You can change this by adding --hostname (or just -H) and --port (or just -p) options like that:  
```
npm start -- --hostname 127.0.0.1 --port 3001
```
