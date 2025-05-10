
import React from 'react';
import { Button } from "@/components/ui/button";
import Icon from '@/components/ui/icon';

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-black/40 z-10"></div>
      <div 
        className="relative h-[500px] bg-cover bg-center"
        style={{ 
          backgroundImage: 'url("https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1500&q=80")'
        }}
      >
        <div className="container mx-auto px-4 h-full flex items-center relative z-20">
          <div className="max-w-2xl animate-fade-in">
            <span className="inline-block mb-2 px-3 py-1 bg-primary/90 text-white rounded-full">
              Популярное аниме
            </span>
            <h1 className="text-4xl md:text-5xl font-playfair font-bold text-white mb-3 drop-shadow-lg">
              Атака Титанов: Финальный сезон
            </h1>
            <p className="text-white/90 mb-6 text-lg max-w-xl drop-shadow-md">
              История о борьбе человечества за выживание в мире, где гигантские титаны пожирают людей. Следуйте за Эреном Йегером в его миссии защитить человечество и раскрыть тайны титанов.
            </p>
            <div className="flex gap-4">
              <Button size="lg" className="gap-2">
                <Icon name="Play" className="h-5 w-5" />
                <span>Смотреть сейчас</span>
              </Button>
              <Button size="lg" variant="outline" className="gap-2 bg-black/20 text-white border-white/30">
                <Icon name="Plus" className="h-5 w-5" />
                <span>В мой список</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-background to-transparent z-10"></div>
    </section>
  );
};

export default HeroSection;
