
import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

type ProfileLayoutProps = {
  children: React.ReactNode;
  title: string;
};

const ProfileLayout: React.FC<ProfileLayoutProps> = ({ children, title }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 container my-8">
        <h1 className="text-3xl font-bold mb-6">{title}</h1>
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default ProfileLayout;
