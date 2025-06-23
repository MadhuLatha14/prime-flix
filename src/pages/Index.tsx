
import React, { useState } from 'react';
import { ThemeProvider } from '../contexts/ThemeContext';
import Navbar from '../components/Navbar';
import HeroCarousel from '../components/HeroCarousel';
import CategoryTabs from '../components/CategoryTabs';
import VideoSection from '../components/VideoSection';
import Footer from '../components/Footer';
import EnhancedPreviewModal from '../components/EnhancedPreviewModal';

const Index = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen transition-all duration-500">
        <Navbar />
        <HeroCarousel />
        <CategoryTabs 
          activeCategory={activeCategory} 
          onCategoryChange={handleCategoryChange} 
        />
        <VideoSection activeCategory={activeCategory} />
        <Footer />
        <EnhancedPreviewModal />
      </div>
    </ThemeProvider>
  );
};

export default Index;
