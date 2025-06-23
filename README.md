# NETFLIX GPT

- create react app
- configured TailwindCss
- Header section with netflix logo
- Routing of App
- Login form
- Sign up form
- Form validation
- useRef hook
- Firebase Setup
- Deploying app to production
- Create signup user account in firebase
- Implemented sign in user API
- Created Redux store with userSlice
- Implemented Sign out feature
- Unsubscribed to the onAuthStateChanged callback
- Add hardcoded values to constants file
- Register for TMDB API and create an app and get API access token
- Get data from TMDB with now playing movies list via API
- Custom hook for now playing movies
- Create movieSlice
- Update store with movies data
- Planned mainContainer & secondary container
- Fetch data for trailer video
- update store with trailer video data
- Embedded the Youtube video and made it autoplay on mute
- used TailwindCSS to make the MainContainer look like Netflix
- Built secondary component
- Built movie list
- Built movie card
- Got the TMDB poster image URL
- used custom hooks for seperate sections

# BUG FIXES

- Sign up user displayName and profile picture update
- If the user is not logged in then redirect to browse to login page and vice versa

# FEATURES BUILDING ON NETFLIX-GPT

- Login/Signup Page
  - Sing In/ SignUp form
  - Redirect to Browse page
- Browse Page - for signed in user ->after authentication
  - Header
  - Main Movie
    -Trailer in background
    - Title and description
    - Movie Suggestions
      - Movie lists - Horizontal scroll
- Netflix GPT
  - Search Bar
  - Movie Suggestions

# BROWSE PAGE IN DETAIL

Header
MainContainer

- Video Background
- Video title
  Secondary Container
- Movie List x n
- cards x n

Secondary Container

- MovieList - Popular
  MovieCard x n
- MovieList - Now playing
- MovieList - Trending
- MovieList - Horror

# STEPS FOR DEPLOYMENT IN FIREBASE

- Install firbase CLI - npm install -g firebase-tools
- Firebase Login - firebase login
- Initialize firebase - firebase init (then select Hosting)
- Deploy command - firebase deploy
