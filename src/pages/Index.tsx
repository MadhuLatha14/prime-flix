
import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import CategoryTabs from '../components/CategoryTabs';
import VideoSection from '../components/VideoSection';
import Footer from '../components/Footer';
import PreviewModal from '../components/PreviewModal';

const Index = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <Hero />
      <CategoryTabs />
      <VideoSection />
      <Footer />
      <PreviewModal />
    </div>
  );
};

export default Index;
