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
import RecipeDetails from "./pages/RecipeDetails";
import FirstModal from "./components/modals/FirstModal";
import SortAndFilter from "./components/SortAndFilter";
import DesktopNav from "./components/DesktopNav";
import ProtectedRoute from "./components/ProtectedRoute";
import InventoryHome from "./pages/InventoryHome";
import ItemEntry from "./pages/ItemEntry";
import EditProfile from "./pages/EditProfile";
import NotificationSettings from "./pages/NotificationSettings";
import ChangePassword from "./pages/ChangePassword";
import DonationPage from "./pages/DonationPage";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SplashScreen />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/resetpassword" element={<ResetPassword />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/resetsuccess" element={<ResetSuccess />} />
        <Route path="/checkemail" element={<CheckEmail />} />
        <Route path="/recipesempty" element={<RecipesEmpty />} />
        <Route path="/recipenotfound" element={<RecipeSearchNotFound />} />
        <Route path="/impactempty" element={<ProtectedRoute><ImpactEmpty /></ProtectedRoute>} />
        <Route path="/inventory" element={<ProtectedRoute><InventoryHome /></ProtectedRoute>} />
        <Route path="/itementry" element={<ProtectedRoute><ItemEntry /></ProtectedRoute>} />
        <Route path="/item-entry" element={<ProtectedRoute><ItemEntry /></ProtectedRoute>} />
        <Route path="/inventoryempty" element={<ProtectedRoute><InventoryHomeEmpty /></ProtectedRoute>} />
        <Route path="/splashscreen" element={<SplashScreen />} />
        <Route path="/impactdashboard" element={<ProtectedRoute><ImpactDashboard /></ProtectedRoute>} />
        <Route path="/impact" element={<ProtectedRoute><ImpactDashboard /></ProtectedRoute>} />
        <Route path="/inventorysafe" element={<ProtectedRoute><InventoryHomeSafe /></ProtectedRoute>} />
        <Route path="/inventoryexpiring" element={<ProtectedRoute><InventoryHomeExpiring /></ProtectedRoute>} />
        <Route path="/recipepage" element={<ProtectedRoute><RecipePage /></ProtectedRoute>} />
        <Route path="/recipes" element={<ProtectedRoute><RecipePage /></ProtectedRoute>} />
        <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
        <Route path="/edit-profile" element={<ProtectedRoute><EditProfile /></ProtectedRoute>} />
        <Route path="/notification-settings" element={<ProtectedRoute><NotificationSettings /></ProtectedRoute>} />
        <Route path="/change-password" element={<ProtectedRoute><ChangePassword /></ProtectedRoute>} />
        <Route path="/recipesearch" element={<ProtectedRoute><RecipeSearch /></ProtectedRoute>} />
        <Route path="/notifications" element={<ProtectedRoute><Notifications /></ProtectedRoute>} />
        <Route path="/donations" element={<ProtectedRoute><DonationPage /></ProtectedRoute>} />
        <Route path="/donation" element={<ProtectedRoute><DonationPage /></ProtectedRoute>} />
        {/* <Route path="/inventoryexpiring" element={<InventoryHomeExpiring />} />



        <Route path="/settings" element={<Settings />} /> */}


        {/* Routes by Philips */}

        <Route path="/onboarding" element={<ProtectedRoute><Onboarding /></ProtectedRoute>} />
        <Route path="/itemdetails" element={<ProtectedRoute><ItemDetails /></ProtectedRoute>} />
        <Route path="/itemdetails/:itemId" element={<ProtectedRoute><ItemDetails /></ProtectedRoute>} />
        <Route path="/recipedetails" element={<ProtectedRoute><RecipeDetails /></ProtectedRoute>} />
        <Route path="/recipe-details/:recipeId" element={<ProtectedRoute><RecipeDetails /></ProtectedRoute>} />
        <Route path="/tallyscore" element={<ProtectedRoute><TallyScore /></ProtectedRoute>} />
        <Route path="/sort" element={<ProtectedRoute><SortAndFilter /></ProtectedRoute>} />
        <Route path="/first" element={<ProtectedRoute><FirstModal /></ProtectedRoute>} />
        <Route path="/dnav" element={<ProtectedRoute><DesktopNav /></ProtectedRoute>} />


      </Routes>
    </Router>
  );
}

export default App;
