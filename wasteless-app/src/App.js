import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import SplashScreen from "./pages/SplashScreen";
import ResetPassword from "./pages/ResetPassword";
import ForgotPassword from "./pages/ForgotPassword";
import ResetSuccess from "./pages/ResetSuccess";
import CheckEmail from "./pages/CheckEmail";
import ImpactDashboard from "./pages/ImpactDashboard";
import InventoryHomeExpiring from "./pages/InventoryHomeExpiring";
import InventoryHomeSafe from "./pages/InventoryHomeSafe";
import Notifications from "./pages/Notifications";
import RecipePage from "./pages/RecipePage";
import Settings from "./pages/Settings";
import RecipeSearch from "./pages/RecipeSearch";
import RecipesEmpty from "./pages/RecipesEmpty";
import RecipeSearchNotFound from "./pages/RecipeSearchNotFound";
import ImpactEmpty from "./pages/ImpactEmpty";
import InventoryHomeEmpty from "./pages/InventoryHomeEmpty";
import Onboarding from "./pages/Onboarding";
import ItemDetails from "./pages/ItemDetails";
import TallyScore from "./pages/TallyScore";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/resetpassword" element={<ResetPassword />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/resetsuccess" element={<ResetSuccess />} />
        <Route path="/checkemail" element={<CheckEmail />} />
        <Route path="/recipesempty" element={<RecipesEmpty />} />
        <Route path="/recipenotfound" element={<RecipeSearchNotFound />} />
        <Route path="/impactempty" element={<ImpactEmpty />} />
        <Route path="/inventoryempty" element={<InventoryHomeEmpty />} />
        <Route path="/splashscreen" element={<SplashScreen />} />
        <Route path="/impactdashboard" element={<ImpactDashboard />} />
        <Route path="/inventorysafe" element={<InventoryHomeSafe />} />
        <Route path="/inventoryexpiring" element={<InventoryHomeExpiring />} />
        <Route path="/recipepage" element={<RecipePage />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/recipesearch" element={<RecipeSearch />} />
        <Route path="/notifications" element={<Notifications />} />
        {/* <Route path="/inventoryexpiring" element={<InventoryHomeExpiring />} />
    
        
        
        <Route path="/settings" element={<Settings />} /> */}


        {/* Routes by Philips */}

        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/itemdetails" element={<ItemDetails />} />
        <Route path="/itemdetails" element={<ItemDetails />} />
        <Route path="/tallyscore" element={<TallyScore />} />


      </Routes>
    </Router>
  );
}

export default App;
