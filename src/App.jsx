import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/layout/Layout'
import ComingSoon from './pages/ComingSoon'
import Home from './pages/Home'
import About from './pages/About'
import GroupBookings from './pages/GroupBookings'
import Careers from './pages/Careers'
import Menu from './pages/Menu'
import Rooms from './pages/Rooms'
import RoomDetail from './pages/RoomDetail'
import Gallery from './pages/Gallery'
import Pricing from './pages/Pricing'
import Faqs from './pages/Faqs'
import Services from './pages/Services'
import Blogs from './pages/Blogs'
import SinglePost from './pages/SinglePost'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Pages WITH shared Navbar + Footer */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Navigate to="/" replace />} />
          <Route path="/about" element={<About />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/group-bookings" element={<GroupBookings />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/rooms" element={<Rooms />} />
          <Route path="/rooms/:id" element={<RoomDetail />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/faqs" element={<Faqs />} />
          <Route path="/services" element={<Services />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blogs/:slug" element={<SinglePost />} />
          <Route path="/contact" element={<Contact />} />
        </Route>

        {/* Standalone pages — NO Navbar/Footer */}
        <Route path="/coming-soon" element={<ComingSoon />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}
