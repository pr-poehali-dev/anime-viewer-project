
import React from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import PopularSection from '@/components/PopularSection';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      
      <PopularSection 
        title="Популярные аниме" 
        subtitle="Самые рейтинговые тайтлы этого сезона"
        link="/popular"
      />
      
      <Separator className="container mx-auto my-8" />
      
      <PopularSection 
        title="Новые серии" 
        subtitle="Свежие эпизоды любимых аниме"
        link="/latest"
      />
      
      <section className="bg-primary/5 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold font-playfair mb-4">Огромная коллекция аниме в одном месте</h2>
            <p className="text-muted-foreground mb-8">
              Смотрите тысячи аниме-сериалов и фильмов, от классики до новинок. 
              Присоединяйтесь к нашему сообществу фанатов аниме и получите доступ 
              к эксклюзивному контенту.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="gap-2">
                <Icon name="UserPlus" className="h-5 w-5" />
                <span>Создать аккаунт</span>
              </Button>
              <Button size="lg" variant="outline" className="gap-2">
                <Icon name="Info" className="h-5 w-5" />
                <span>Узнать больше</span>
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      <footer className="bg-card py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-4">АнимеЗона</h3>
              <p className="text-muted-foreground">
                Ваш лучший источник для просмотра аниме онлайн с русской озвучкой
              </p>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Категории</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-muted-foreground hover:text-primary">Популярное</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary">Новинки</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary">Жанры</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary">Студии</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Ресурсы</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-muted-foreground hover:text-primary">О нас</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary">Контакты</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary">Помощь</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Связаться</h3>
              <div className="flex gap-4 mb-4">
                <a href="#" className="text-muted-foreground hover:text-primary">
                  <Icon name="Twitter" />
                </a>
                <a href="#" className="text-muted-foreground hover:text-primary">
                  <Icon name="Instagram" />
                </a>
                <a href="#" className="text-muted-foreground hover:text-primary">
                  <Icon name="Youtube" />
                </a>
                <a href="#" className="text-muted-foreground hover:text-primary">
                  <Icon name="Facebook" />
                </a>
              </div>
              <p className="text-muted-foreground">
                Подпишитесь на нас в соцсетях для получения обновлений
              </p>
            </div>
          </div>
          <Separator className="my-6" />
          <div className="text-center text-muted-foreground">
            <p>© 2025 АнимеЗона. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
