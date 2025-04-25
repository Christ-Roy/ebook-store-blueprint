import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative py-20 bg-gradient-to-br from-brand-700 to-brand-900 text-white">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.05] [mask-image:linear-gradient(to_bottom,transparent,white)]"></div>
      </div>
      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              Des eBooks qui <br />
              <span className="text-brand-200">transforment votre vie</span>
            </h1>
            <p className="mt-6 text-lg md:text-xl text-gray-200 max-w-xl mx-auto md:mx-0">
              Découvrez notre collection de livres numériques premium pour
              développer vos compétences, améliorer votre bien-être et atteindre
              vos objectifs.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Button
                asChild
                size="lg"
                className="bg-white text-primary hover:bg-gray-100 font-medium"
              >
                <Link to="/catalog">Parcourir le catalogue</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white/10 font-medium"
              >
                <Link to="#featured">Découvrir les nouveautés</Link>
              </Button>
            </div>
          </div>
          <div className="flex justify-center md:justify-end">
            <div className="relative w-full max-w-md">
              <div className="absolute -top-6 -left-6 w-72 h-72 bg-brand-400 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-blob"></div>
              <div className="absolute -bottom-8 -right-8 w-72 h-72 bg-brand-600 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-blob animation-delay-2000"></div>
              <div className="relative">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-lg shadow-lg transform rotate-3 hover:scale-105 transition-transform">
                    <img src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b" alt="Guide d'investissement" className="rounded" />
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-lg transform -rotate-2 hover:scale-105 transition-transform mt-8">
                    <img src="https://images.unsplash.com/photo-1470813740244-df37b8c1edcb" alt="Livre de méditation" className="rounded" />
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-lg transform -rotate-1 hover:scale-105 transition-transform">
                    <img src="https://images.unsplash.com/photo-1618160702438-9b02ab6515c9" alt="Guide de nutrition" className="rounded" />
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-lg transform rotate-2 hover:scale-105 transition-transform mt-4">
                    <img src="https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7" alt="Guide Python" className="rounded" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
