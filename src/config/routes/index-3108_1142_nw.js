import { BrowserRouter, Route, Routes, Outlet } from 'react-router-dom'

import USP from '../../pages/usp'
import FAQ from '../../pages/faq'
import Cart from '../../pages/cart'
import Home from '../../pages/home'
import About from '../../pages/about'
import Login from '../../pages/login'
import Terms from '../../pages/terms'
import Invoice from '../../pages/invoice'
import Product from '../../pages/product'
import Checkout from '../../pages/checkout'
import Register from '../../pages/register'
import NotFound from '../../pages/not-found'
import ContactUs from '../../pages/contact-us'
import UserProfile from '../../pages/user-profile'
import ProductDetail from '../../pages/product-detail'
import CustomEnquiry from '../../pages/custom-enquiry'
import CustomEnquiry1 from '../../pages/custom-enquiry/index1'
import PrivacyPolicy from '../../pages/privacy-policy'
import AdminCustomEnquiry from '../../admin/custom-enquiry'
import CatalogSearch from '../../pages/catalog-search'
import KnowledgeBase from '../../pages/knowledge-base'
import TransactionDetail from '../../pages/transaction-detail'

import Dashboard from '../../pages/admin'
import TopAdmin from '../../pages/admin/top'
import UsersAdmin from '../../pages/admin/users'
import Pattern from '../../pages/admin/pattern'
// import PatternCategory from '../../pages/admin/patterncategory'
import LegDesign from '../../pages/admin/legdesign'
import LegMaterial from '../../pages/admin/legmaterial'
import Edge from '../../pages/admin/edge'
import Seaters from '../../pages/admin/seaters'
import AdvancedSettings from '../../pages/admin/advancedsettings'
import LegColor from '../../pages/admin/legcolor'
// import ColorType from '../../pages/admin/colortype'
import DetailEdge from '../../pages/admin/detailedge'
import LoginAdmin from '../../pages/admin/login'
// import table default dan scale
import CustomTableDefault from '../../pages/admin/custom-table-default'
import TableSizing from '../../pages/admin/table-sizing'
import Visitor from '../../pages/test-visitor'

import { HeaderAdmin } from '../../components'
import AdminProvider from '../context/adminContext'
import CustomerProvider from '../context/customerContext'

const RootRoutes = () => {

  const AdminPanel = () => (
    <>
      <AdminProvider>
        <HeaderAdmin />
          <Outlet />
      </AdminProvider>
    </>
  )

  const CustomerPanel = () => {
    <>
      <CustomerProvider>
        <HeaderAdmin />
          <Outlet />
      </CustomerProvider>
    </>
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<CustomEnquiry1 />} />
        <Route path='/?code=' element={<CustomEnquiry1 />} />
        <Route path='/test-visitor' element={<Visitor />} />
        <Route path='/faq' element={<FAQ />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/login' element={<Login />} />
        <Route path='/terms' element={<Terms />} />
        <Route path='/about-us' element={<About />} />
        <Route path='/invoice' element={<Invoice />} />
        <Route path='/products' element={<Product />} />
        <Route path='/checkout' element={<Checkout />} />
        <Route path='/register' element={<Register />} />
        <Route path='/contact-us' element={<ContactUs />} />
        <Route path='/unique-selling-point' element={<USP />} />
        <Route path='/user-profile' element={<UserProfile />} />
        <Route path='/custom-enquiry' element={<CustomEnquiry />} />
        <Route path='/custom-enquiry-test' element={<CustomEnquiry1 />} />
        <Route path='/knowledge-base' element={<KnowledgeBase />} />
        <Route path='/privacy-policy' element={<PrivacyPolicy />} />
        <Route path='/admin-custom-enquiry' element={<AdminCustomEnquiry />} />
        <Route path='/catalog-search/' element={<CatalogSearch />} />
        <Route path='/products/:productName' element={<ProductDetail />} />
        <Route path='/transaction-detail' element={<TransactionDetail />} />
        {/* <Route path='*' element={<NotFound />} /> */}

        <Route path='/login-admin' element={<LoginAdmin />} />
        
        {/* ADMIN TEMPLATE */}
        <Route path='/admin' element={<AdminPanel />}>
          <Route index element={<Dashboard/>} />
          <Route path='top-shape' element={<TopAdmin/>} />
          <Route path='users' element={<UsersAdmin/>} />
          <Route path='custom-table-default' element={<CustomTableDefault form={"setDefault"} />} />
          <Route path='table-sizing' element={<TableSizing form={"setScale"} />} />
          <Route path='pattern' element={<Pattern/>} />
          {/* <Route path='pattern-category' element={<PatternCategory/>} /> */}
          <Route path='leg-design' element={<LegDesign/>} />
          <Route path='leg-material' element={<LegMaterial/>} />
          <Route path='edge' element={<Edge/>} />
          <Route path='seaters' element={<Seaters/>} />
          <Route path='advanced-settings' element={<AdvancedSettings/>} />
          <Route path='leg-color' element={<LegColor/>} />
          {/* <Route path='color-type' element={<ColorType/>} /> */}
          <Route path='detail-edge-for-top' element={<DetailEdge/>} />
        </Route>

      </Routes>
    </BrowserRouter>
  )
}

export default RootRoutes