From https://medium.com/@Charles_Stover/optimal-file-structure-for-react-applications-f3e35ad0a145

An additional directory I like to add is src/routes. These are the Components provided directly to react-router's <Route>s. If I have a page located at charlesstover.com/portfolio, I will have that Component entry point be at src/routes/portfolio/index.js. It may use Components from src/components, but route entry points are unique in that their best name is where they are not what they do. Because of this, they get the special treatment of the routes directory.
