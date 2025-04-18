import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import TopUsersPage from './pages/TopUsersPage';
import TrendingPostPage from './pages/TrendingPostPage';
import FeedPage from './pages/FeedPage';

export default function App() {
  return (
    <Router>
      <div className="p-4">
        <nav className="flex gap-4 mb-6">
          <NavLink to="/" className={({ isActive }) => isActive ? 'font-bold' : ''}>Top Users</NavLink>
          <NavLink to="/trending" className={({ isActive }) => isActive ? 'font-bold' : ''}>Trending Post</NavLink>
          <NavLink to="/feed" className={({ isActive }) => isActive ? 'font-bold' : ''}>Feed</NavLink>
        </nav>
        <Routes>
          <Route path="/" element={<TopUsersPage />} />
          <Route path="/trending" element={<TrendingPostPage />} />
          <Route path="/feed" element={<FeedPage />} />
        </Routes>
      </div>
    </Router>
  );
}