import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from '../components/Layout';
import Loader from '../components/Loader';

const Home = lazy(() => import('../pages/Home'));
const Blog = lazy(() => import('../pages/Blog'));
const BlogDetails = lazy(() => import('../pages/BlogDetails'));
const NotFound = lazy(() => import('../pages/NotFound'));
const BrainGames = lazy(() => import('../pages/BrainGames'));
const TemplateDesigns = lazy(() => import('../pages/TemplateDesigns'));

const AppRouter: React.FC = () => {
  return (
    <Layout>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogDetails />} />
          <Route path="/games" element={<BrainGames />} />
          <Route path="/templates" element={<TemplateDesigns />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </Layout>
  );
};

export default AppRouter;
