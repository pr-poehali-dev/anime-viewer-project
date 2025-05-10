
import React from 'react';
import AnimeCard from './AnimeCard';
import { Button } from "@/components/ui/button";
import Icon from '@/components/ui/icon';

// Моковые данные для демонстрации
const popularAnime = [
  {
    id: '1',
    title: 'Ван Пис',
    image: 'https://images.unsplash.com/photo-1541562232579-512a21360020?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
    rating: 9.7,
    year: 1999,
    episodes: 1000,
    genres: ['Приключения', 'Фэнтези', 'Экшн']
  },
  {
    id: '2',
    title: 'Наруто: Ураганные хроники',
    image: 'https://images.unsplash.com/photo-1578632292335-df3abbb0d586?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
    rating: 9.2,
    year: 2007,
    episodes: 500,
    genres: ['Экшн', 'Боевые искусства']
  },
  {
    id: '3',
    title: 'Атака титанов',
    image: 'https://images.unsplash.com/photo-1601850494422-3cf14624b0b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
    rating: 9.5,
    year: 2013,
    episodes: 75,
    genres: ['Драма', 'Фэнтези', 'Экшн']
  },
  {
    id: '4',
    title: 'Моя геройская академия',
    image: 'https://images.unsplash.com/photo-1560096950-bbe9a5683483?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
    rating: 8.9,
    year: 2016,
    episodes: 113,
    genres: ['Супергерои', 'Экшн', 'Комедия']
  },
  {
    id: '5',
    title: 'Клинок, рассекающий демонов',
    image: 'https://images.unsplash.com/photo-1563089145-599997674d42?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
    rating: 9.1,
    year: 2019,
    episodes: 44,
    genres: ['Фэнтези', 'Боевые искусства', 'Сверхъестественное']
  }
];

interface SectionProps {
  title: string;
  subtitle?: string;
  link?: string;
  animeList?: typeof popularAnime;
}

const PopularSection: React.FC<SectionProps> = ({
  title,
  subtitle,
  link,
  animeList = popularAnime
}) => {
  return (
    <section className="py-10">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold font-playfair">{title}</h2>
            {subtitle && <p className="text-muted-foreground">{subtitle}</p>}
          </div>
          {link && (
            <Button variant="ghost" className="gap-1">
              <span>Смотреть все</span>
              <Icon name="ChevronRight" className="h-4 w-4" />
            </Button>
          )}
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
          {animeList.map((anime) => (
            <AnimeCard key={anime.id} {...anime} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularSection;
