
import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/home/Hero";
import FeaturedBooks from "@/components/home/FeaturedBooks";
import Testimonials from "@/components/home/Testimonials";
import Newsletter from "@/components/home/Newsletter";
import SupabaseTest from "@/components/SupabaseTest";
import { books, testimonials } from "@/lib/data";

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <div className="container mx-auto my-10">
          <h2 className="text-2xl font-bold text-center mb-6">Supabase Configuration Test</h2>
          <SupabaseTest />
        </div>
        <FeaturedBooks books={books} />
        <Testimonials testimonials={testimonials} />
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
