//Packages Import
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
//  --------------------------------------------Auth Screens--------------------------------------------
//Private routes Component
import PrivateRoute from "./components/PrivateRoute";
import Login from "./components/login/login";
import Signup from "./components/signup/Signup";
import AdminSignin from "./pages/Admin/Admin-Sigin/AdminSignin";
import InviteSignup from "./components/signup/InviteSignup";
// --------------------------------------------Reset Password Screen--------------------------------------------
import ResetPassword from "./components/resetPassword/ResetPassword";
import NewPassword from "./components/resetPassword/NewPassword";
import ResetPassSuccess from "./components/resetPassword/ResetPassSuccess";
// --------------------------------------------Admin Routes--------------------------------------------
// import ConsumerProfile from './pages/Admin/Admin-Consumer/AdminProfile';
import Dashboard from "./components/dashboard/Dashboard";
import PointTransferListing from "./pages/Admin/Admin-Points/PT_Listing/PointTransferListing";
import PointTransferForm from "./pages/Admin/Admin-Points/PT_Form/PointTransferForm";
import TransactionListing from "./pages/Admin/Admin-Transactions/TransactionListing";
import Consumer from "./pages/Admin/Admin-Consumer/Consumer_Listing/Consumer";
import ConsumerDetail from "./pages/Admin/Admin-Consumer/Consumer_Detail/ConsumerDetail";
import RuleListing from "./pages/Admin/Admin-Rules/Rule_Listing/RuleListing";
import RuleTypeListing from "./pages/Admin/Admin-Rules/Rule-Type-Listing/RuleTypeListing";
import RuleTypeForm from "./pages/Admin/Admin-Rules/Rule-Type-Form/RuleTypeForm";
import ChangePassword from "./pages/Admin/Admin-Consumer/Consumer_Detail/ChangePassword";
import EditCompany from "./pages/Admin/Admin-Company/Company_Form/EditCompany";
// --------------------------------------------Company Routes--------------------------------------------
// import CompanyDshboard from "./components/dashboard/CompanyDashboard";
import AddAudienceName from "./pages/Company/Campaign/Segment/AddAudienceName";
import AddAudience from "./pages/Company/Campaign/Segment/AddAudience";
import CompanyListing from "./pages/Admin/Admin-Company/Company_Listing/CompanyListing";
import CompanyForm from "./pages/Admin/Admin-Company/Company_Form/CompanyForm";
import CampaignListing from "./pages/Company/Campaign/CampaignListing";
import CompanyStoreListing from "./pages/Company/Company-Store/Company_Store_Listing/CompanyStoreListing";
import CompanyConsumerListing from "./pages/Company/Company-Consumer/CompanyConsumerListing";
import CompanyPointTransfer from "./pages/Company/Company-Point/CPTListing/CompanyPointTransfer";
import CompanyRuleListing from "./pages/Company/Company-Rule/CompanyRuleListing";
import CompanyTransaction from "./pages/Company/Company-Transaction/CompanyTransaction";
import CompanyConsumerForm from "./pages/Company/Company-Consumer/CompanyConsumerForm";
import Dashboard2 from "./components/dashboard/Dashboard2";
import AddStore from "./pages/Company/Company-Store/Company_Store_Form/AddStore";
import AddPointTransfer from "./pages/Company/Company-Point/AddPointTranfer";
import CompanyStoreDetail from "./pages/Company/Company-Store/Company_Store_Detail/CompanyStoreDetail";
import RewardForm from "./pages/Company/company reward/Create_Screens/RewardForm";
import EmailListing from "./pages/Company/Campaign/EmailListing";
import JournyListing from "./pages/Company/Campaign/JournyListing";
import SMSListing from "./pages/Company/Campaign/SMSListing";
import AudienceListing from "./pages/Company/Campaign/Audience";
import AddEmailCreative from "./pages/Company/Campaign/AddEmailCreative";
import AddCampaign from "./pages/Company/Campaign/AddCampaign/AddCampaign";
import AddNewJourney from "./pages/Company/Campaign/Journey/AddNewJourney";
import AddAudienceQueryBuilder from "./pages/Company/Campaign/Segment/AddAudienceQueryBuilder";
import ProductListing from "./pages/Company/product/ProductListing";
import ListingComp from "./pages/Company/Refferal_reward/ListingComp";
import AddRuleForm from "./pages/Company/Company-Rule/ruleForms/AddRuleForm";
import EditReward from "./pages/Company/company reward/edit_Screens/EditReward";
import IntegrationListing from "./pages/Company/integration/IntegrationListing";
import EditEmailCreative from "./pages/Company/Campaign/EditEmailCreative";
// --------------------------------------------Consumer Routes--------------------------------------------
// import ConsumerProfileUpdate from "./pages/Consumer/profile/ConsumerProfileUpdate";
import ConsumerDashboard from "./components/dashboard/ConsumerDashboard";
import ConsumerPoints from "./pages/Consumer/MyPoints/ConsumerPoints";
import ConsumerTransactionListing from "./pages/Consumer/Consumer-Transaction/ConsumerTransactionListing";
import ConsumerProfile from "./pages/Consumer/profile/ConsumerProfile";
import ConsumerFAQ from "./pages/Consumer/FAQ/ConsumerFAQ";
import FreindListing from "./pages/Consumer/Friend/FreindListing";
import OfferSaleListing from "./pages/Consumer/Sale/OfferSaleListing";
import LoyaltyReward from "./pages/Consumer/Reward/loyalty-reward/LoyaltyReward";
import Stepper from "./components/Buttons/ReactStepper";
import Level from "./pages/Consumer/Reward/level/Level";
import AvailableReward from "./pages/Consumer/Reward/available_Reward/AvailableReward";
import EarnPoint from "./pages/Consumer/Reward/earn-point/EranPoint";
import EarnCard from "./components/Cards/EarnCard";
import ActiveHistory from "./pages/Consumer/Reward/active-history/ActiveHistory";
import LoyaltyList from "./pages/Consumer/Reward/loyalty-list/LoyaltyList";
import EditRuleForm from "./pages/Company/Company-Rule/ruleForms/EditRule";

function App() {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Router>
        <Routes>
          {/* ---Auth Routes--- */}
          <Route exact path="/" element={<Login />} />
          <Route
            exact
            path="/signup/:referredByReferralCode?"
            element={<Signup />}
          />
          <Route exact path="/invite_signup" element={<InviteSignup />} />

          {/* Three screen for resetting password flow */}
          <Route exact path="/reset_password" element={<ResetPassword />} />
          <Route exact path="/new_password/:token" element={<NewPassword />} />
          <Route
            exact
            path="/reset_password_success"
            element={<ResetPassSuccess />}
          />

          {/* Logged in user update password [ADMIN, CLIENT, COMPANY] */}
          <Route exact path="/profile_update" element={<ConsumerDetail />} />
          <Route exact path="/update_password" element={<ChangePassword />} />

          {/* ---Admin Routes--- */}
          <Route exact path="/admin_login" element={<AdminSignin />} />
          <Route
            exact
            path="/admin_dashboard"
            element={
              <PrivateRoute role="ROLE_ADMIN">
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            exact
            path="/admin_members"
            element={
              <PrivateRoute role="ROLE_ADMIN">
                <Consumer />
              </PrivateRoute>
            }
          />
          <Route
            exact
            path="/admin_transfers"
            element={
              <PrivateRoute role="ROLE_ADMIN">
                <PointTransferListing />
              </PrivateRoute>
            }
          />
          <Route
            exact
            path="/admin_transfer_point"
            element={
              <PrivateRoute role="ROLE_ADMIN">
                <PointTransferForm />
              </PrivateRoute>
            }
          />
          <Route
            exact
            path="/all_companies"
            element={
              <PrivateRoute role="ROLE_ADMIN">
                <CompanyListing />
              </PrivateRoute>
            }
          />
          <Route
            exact
            path="/add_company"
            element={
              <PrivateRoute role="ROLE_ADMIN">
                <CompanyForm />
              </PrivateRoute>
            }
          />
          <Route
            exact
            path="/edit_company/:id"
            element={
              <PrivateRoute role="ROLE_ADMIN">
                <EditCompany />
              </PrivateRoute>
            }
          />
          <Route
            exact
            path="/transaction_listing"
            element={
              <PrivateRoute role="ROLE_ADMIN">
                <TransactionListing />
              </PrivateRoute>
            }
          />
          <Route
            exact
            path="/admin_ruletypes"
            element={
              <PrivateRoute role="ROLE_ADMIN">
                <RuleTypeListing />
              </PrivateRoute>
            }
          />
          <Route
            exact
            path="/admin_add_ruletype"
            element={
              <PrivateRoute role="ROLE_ADMIN">
                <RuleTypeForm />
              </PrivateRoute>
            }
          />
          <Route
            exact
            path="/default_rules"
            element={
              <PrivateRoute role="ROLE_ADMIN">
                <RuleListing />
              </PrivateRoute>
            }
          />
          {/* <Route exact path="/earningRuleForm" element={<EarningRuleForm />} /> */}
          {/* <Route exact path="/stores" element={<StoreListing />} /> */}
          {/* <Route exact path="/storeDetail/:id" element={<StoreDetail />} /> */}

          {/* ---Company module routes--- */}
          {/* Company Campaign module routes */}
          <Route
            exact
            path="/campaigns"
            element={
              <PrivateRoute role="ROLE_MERCHANT">
                <CampaignListing />
              </PrivateRoute>
            }
          />
          <Route
            exact
            path="/email_templates"
            element={
              <PrivateRoute role="ROLE_MERCHANT">
                <EmailListing />
              </PrivateRoute>
            }
          />
          <Route
            exact
            path="/journeys"
            element={
              <PrivateRoute role="ROLE_MERCHANT">
                <JournyListing />
              </PrivateRoute>
            }
          />
          <Route
            exact
            path="/sms"
            element={
              <PrivateRoute role="ROLE_MERCHANT">
                <SMSListing />
              </PrivateRoute>
            }
          />
          <Route
            exact
            path="/audience"
            element={
              <PrivateRoute role="ROLE_MERCHANT">
                <AudienceListing />
              </PrivateRoute>
            }
          />
          <Route
            exact
            path="/add_email"
            element={
              <PrivateRoute role="ROLE_MERCHANT">
                <AddEmailCreative />
              </PrivateRoute>
            }
          />
          <Route
            exact
            path="/edit_email/:id"
            element={
              <PrivateRoute role="ROLE_MERCHANT">
                <EditEmailCreative />
              </PrivateRoute>
            }
          />
          <Route
            exact
            path="/add_campaign"
            element={
              <PrivateRoute role="ROLE_MERCHANT">
                <AddCampaign />
              </PrivateRoute>
            }
          />
          <Route
            exact
            path="/add_journey"
            element={
              <PrivateRoute role="ROLE_MERCHANT">
                <AddNewJourney />
              </PrivateRoute>
            }
          />
          <Route
            exact
            path="/add_audience"
            element={
              <PrivateRoute role="ROLE_MERCHANT">
                <AddAudienceQueryBuilder />
              </PrivateRoute>
            }
          />
          {/* <Route
            exact
            path="/add_audience_name"
            element={
              <PrivateRoute role="ROLE_MERCHANT">
                <AddAudienceName />
              </PrivateRoute>
            }
          /> */}
          {/* OLD Without SQL Query Builder */}
          {/* <Route
            exact
            path="/add_audience"
            element={
              <PrivateRoute role="ROLE_MERCHANT">
                <AddAudience />
              </PrivateRoute>
            }
          /> */}
          <Route
            exact
            path="/company_dashboard"
            element={
              <PrivateRoute role="ROLE_MERCHANT">
                <Dashboard2 />
              </PrivateRoute>
            }
          />
          <Route
            exact
            path="/company_add_store"
            element={
              <PrivateRoute role="ROLE_MERCHANT">
                <AddStore />
              </PrivateRoute>
            }
          />
          <Route
            exact
            path="/company_store_detail"
            element={
              <PrivateRoute role="ROLE_MERCHANT">
                <CompanyStoreDetail />
              </PrivateRoute>
            }
          />
          <Route
            exact
            path="/company_stores"
            element={
              <PrivateRoute role="ROLE_MERCHANT">
                <CompanyStoreListing />
              </PrivateRoute>
            }
          />
          <Route
            exact
            path="/company_members"
            element={
              <PrivateRoute role="ROLE_MERCHANT">
                <CompanyConsumerListing />
              </PrivateRoute>
            }
          />
          <Route
            exact
            path="/company_invite_member"
            element={
              <PrivateRoute role="ROLE_MERCHANT">
                <CompanyConsumerForm />
              </PrivateRoute>
            }
          />
          <Route
            exact
            path="/company_transfer_points"
            element={
              <PrivateRoute role="ROLE_MERCHANT">
                <AddPointTransfer />
              </PrivateRoute>
            }
          />
          <Route
            exact
            path="/company_transfers"
            element={
              <PrivateRoute role="ROLE_MERCHANT">
                <CompanyPointTransfer />
              </PrivateRoute>
            }
          />
          <Route
            exact
            path="/company_transactions"
            element={
              <PrivateRoute role="ROLE_MERCHANT">
                <CompanyTransaction />
              </PrivateRoute>
            }
          />
          <Route
            exact
            path="/company_rules"
            element={
              <PrivateRoute role="ROLE_MERCHANT">
                <CompanyRuleListing />
              </PrivateRoute>
            }
          />
          <Route
            exact
            path="/edit_earning_rule/:id"
            element={
              <PrivateRoute role="ROLE_MERCHANT">
                <EditRuleForm />
              </PrivateRoute>
            }
          />
          <Route
            exact
            path="/reward_offer"
            element={
              <PrivateRoute role="ROLE_MERCHANT">
                <ListingComp />
              </PrivateRoute>
            }
          />
          <Route
            exact
            path="/add/:name"
            element={
              <PrivateRoute role="ROLE_MERCHANT">
                <RewardForm />
              </PrivateRoute>
            }
          />
          <Route
            exact
            path="/edit/:name/:id"
            element={
              <PrivateRoute role="ROLE_MERCHANT">
                <EditReward />
              </PrivateRoute>
            }
          />
          <Route
            exact
            path="/company_products"
            element={
              <PrivateRoute role="ROLE_MERCHANT">
                <ProductListing />
              </PrivateRoute>
            }
          />

          <Route
            exact
            path="/integrations"
            element={
              <PrivateRoute role="ROLE_MERCHANT">
                <IntegrationListing />
              </PrivateRoute>
            }
          />

          {/* ---Consumer/Member module ROUTES--- */}
          <Route
            exact
            path="/consumer_dashboard"
            element={<ConsumerDashboard />}
          />
          <Route exact path="/sale_listing" element={<OfferSaleListing />} />
          <Route
            exact
            path="/consumer_transactions"
            element={<ConsumerTransactionListing />}
          />
          <Route exact path="/consumer_profile" element={<ConsumerProfile />} />
          <Route exact path="/add_earning_rules" element={<AddRuleForm />} />
          {/* <Route
            exact
            path="/consumer_profile_update"
            element={<ConsumerProfileUpdate />}
          /> */}
          <Route exact path="/faq" element={<ConsumerFAQ />} />
          <Route exact path="/friends" element={<FreindListing />} />
          <Route exact path="/my_points" element={<ConsumerPoints />} />
          {/* ---OLD/NOT BEING USED Consumer/Member module ROUTES--- */}
          <Route exact path="/loyalty_reward" element={<LoyaltyReward />} />
          <Route exact path="/stepper" element={<Stepper />} />
          <Route exact path="/levels" element={<Level />} />
          <Route exact path="/available_reward" element={<AvailableReward />} />
          <Route exact path="/earn_more_points" element={<EarnPoint />} />
          <Route exact path="/point" element={<EarnCard />} />
          <Route exact path="/active_history" element={<ActiveHistory />} />
          <Route exact path="/loyalty_reward_list" element={<LoyaltyList />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
