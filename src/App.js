import React from "react";
import HomePage from "./pages/home";
import RecipeDetailPage from "./pages/recipeDetail";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar";
import { RecipesProvider } from "./context/recipes/index"
import "./styles.scss";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <RecipesProvider>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/recipes/:id" component={RecipeDetailPage} />
          <Route component={({ location }) => (
              <div className="route-not-found">
                The page <code>{location.pathname}</code> could not be found.
              </div>
            )}
          />
        </Switch>
      </RecipesProvider>
    </BrowserRouter>
  );
}

export default App;
