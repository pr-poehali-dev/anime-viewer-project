
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import Navbar from '@/components/Navbar';
import VideoPlayer from '@/components/VideoPlayer';
import EpisodeSelector, { Episode } from '@/components/EpisodeSelector';
import Icon from '@/components/ui/icon';

// Моковые данные для демонстрации
const animeData = {
  "one-piece": {
    id: "one-piece",
    title: "Ван Пис",
    description: "Гол Д. Роджер — король пиратов, добившийся за свою жизнь богатства, славы и власти — перед смертью сообщает, что спрятал своё сокровище One Piece где-то на просторах Гранд Лайн. С этого момента тысячи пиратов отправляются на его поиски.",
    image: "https://images.unsplash.com/photo-1541562232579-512a21360020?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
    rating: 9.7,
    year: 1999,
    status: "Выходит",
    studio: "Toei Animation",
    genres: ["Приключения", "Фэнтези", "Экшн", "Комедия", "Драма"],
    episodes: [
      { id: "ep1", number: 1, title: "Я - Луффи! Человек, который станет Королем Пиратов!", thumbnail: "https://images.unsplash.com/photo-1580477667989-2063e0925a8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80", duration: "23:30" },
      { id: "ep2", number: 2, title: "Появляется великий мечник! Пират-охотник Ророноа Зоро!", thumbnail: "https://images.unsplash.com/photo-1564414872027-40fa6e8c6ead?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80", duration: "23:45" },
      { id: "ep3", number: 3, title: "Морган против Луффи! Таинственная девушка - Нами!", thumbnail: "https://images.unsplash.com/photo-1580477667988-8cefcc4fc36b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80", duration: "24:10" },
      { id: "ep4", number: 4, title: "Прошлое Луффи! Появляется рыжеволосый Шанкс!", thumbnail: "https://images.unsplash.com/photo-1560472355-109703aa3edc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80", duration: "23:55" },
      { id: "ep5", number: 5, title: "Страшная сила! Лейтенант Морской Пехоты и пират-клоун!", thumbnail: "https://images.unsplash.com/photo-1612404819070-77c0da6a7a1b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80", duration: "23:40" }
    ]
  },
  "naruto": {
    id: "naruto",
    title: "Наруто: Ураганные хроники",
    description: "В деревне Коноха живут ниндзя. Однажды демон-лис напал на деревню и уничтожил много людей. Но Четвёртый Хокаге одолел его и запечатал его в новорожденном ребёнке по имени Наруто. Из-за этого Наруто рос в одиночестве, так как люди боялись его, но это не останавливает мальчика в его желании стать Хокаге.",
    image: "https://images.unsplash.com/photo-1578632292335-df3abbb0d586?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
    rating: 9.2,
    year: 2007,
    status: "Завершен",
    studio: "Studio Pierrot",
    genres: ["Экшн", "Боевые искусства", "Комедия", "Приключения", "Сверхъестественное"],
    episodes: [
      { id: "ep1", number: 1, title: "Возвращение", thumbnail: "https://images.unsplash.com/photo-1557683304-673a23048d34?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80", duration: "23:15" },
      { id: "ep2", number: 2, title: "Акацуки начинает действовать", thumbnail: "https://images.unsplash.com/photo-1618336753974-aae8e04506aa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80", duration: "23:40" },
      { id: "ep3", number: 3, title: "Результаты тренировки", thumbnail: "https://images.unsplash.com/photo-1578632767837-77bce663f5c1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80", duration: "23:50" },
      { id: "ep4", number: 4, title: "Джинчурики из песка", thumbnail: "https://images.unsplash.com/photo-1563089145-599997674d42?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80", duration: "23:25" },
      { id: "ep5", number: 5, title: "Казекаге стоит на своём", thumbnail: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80", duration: "23:35" }
    ]
  },
  "attack-on-titan": {
    id: "attack-on-titan",
    title: "Атака титанов",
    description: "Много лет назад человечество было на грани истребления из-за существ, известных как титаны. Люди нашли убежище за стенами, которые не позволяли титанам проникнуть внутрь. Спустя сотни лет появился гигантский титан, пробивший стену, и теперь судьба человечества под угрозой.",
    image: "https://images.unsplash.com/photo-1601850494422-3cf14624b0b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
    rating: 9.5,
    year: 2013,
    status: "Завершен",
    studio: "Wit Studio, MAPPA",
    genres: ["Драма", "Фэнтези", "Экшн", "Триллер", "Ужасы"],
    episodes: [
      { id: "ep1", number: 1, title: "К вам: Падение Шиганшины, часть 1", thumbnail: "https://images.unsplash.com/photo-1534447677768-be436bb09401?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80", duration: "24:12" },
      { id: "ep2", number: 2, title: "В тот день: Падение Шиганшины, часть 2", thumbnail: "https://images.unsplash.com/photo-1513384312027-9fa69a360337?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80", duration: "24:10" },
      { id: "ep3", number: 3, title: "Сияние во тьме отчаяния", thumbnail: "https://images.unsplash.com/photo-1504297050568-910d24c426d3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80", duration: "24:00" },
      { id: "ep4", number: 4, title: "Первая битва: Битва за Трост, часть 1", thumbnail: "https://images.unsplash.com/photo-1583195763986-0231686daba7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80", duration: "24:05" },
      { id: "ep5", number: 5, title: "Первая победа: Битва за Трост, часть 2", thumbnail: "https://images.unsplash.com/photo-1595781572981-d63151b232ed?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80", duration: "24:30" }
    ]
  }
};

const WatchAnime = () => {
  const { animeId = "", episodeId } = useParams();
  const navigate = useNavigate();
  const [currentEpisodeId, setCurrentEpisodeId] = useState<string | undefined>(episodeId);
  const [anime, setAnime] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Симуляция загрузки данных
    setLoading(true);
    
    setTimeout(() => {
      const animeData = window.animeData as any;
      if (animeData && animeData[animeId]) {
        setAnime(animeData[animeId]);
        
        // Если эпизод не указан, установить первый эпизод по умолчанию
        if (!currentEpisodeId && animeData[animeId].episodes.length > 0) {
          setCurrentEpisodeId(animeData[animeId].episodes[0].id);
          // Обновление URL для включения ID эпизода
          navigate(`/watch/${animeId}/${animeData[animeId].episodes[0].id}`, { replace: true });
        }
        
        setLoading(false);
      } else {
        setError("Аниме не найдено");
        setLoading(false);
      }
    }, 800);
  }, [animeId, currentEpisodeId, navigate]);

  // Обрабатываем изменение эпизода
  const handleEpisodeSelect = (episodeId: string) => {
    setCurrentEpisodeId(episodeId);
    navigate(`/watch/${animeId}/${episodeId}`);
  };

  // Получаем текущий эпизод
  const currentEpisode = anime?.episodes.find((ep: Episode) => ep.id === currentEpisodeId);
  
  // Получаем предыдущий и следующий эпизоды для навигации
  const currentIndex = anime?.episodes.findIndex((ep: Episode) => ep.id === currentEpisodeId) || 0;
  const prevEpisode = currentIndex > 0 ? anime?.episodes[currentIndex - 1] : null;
  const nextEpisode = currentIndex < (anime?.episodes.length - 1) ? anime?.episodes[currentIndex + 1] : null;

  // Симулируем URL для видео (в реальном приложении здесь был бы настоящий URL)
  const videoSrc = `https://example.com/videos/${animeId}/${currentEpisodeId}.mp4`;

  // Отображаем загрузку
  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center min-h-[500px]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        </div>
      </div>
    );
  }

  // Отображаем ошибку
  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col items-center justify-center min-h-[500px] text-center">
            <h2 className="text-2xl font-bold text-destructive mb-4">{error}</h2>
            <p className="text-muted-foreground mb-6">
              Не удалось найти запрошенное аниме. Возможно, оно было удалено или указан неверный URL.
            </p>
            <Button asChild>
              <Link to="/">Вернуться на главную</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        {/* Хлебные крошки */}
        <div className="mb-4">
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
              <li className="inline-flex items-center">
                <Link to="/" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground">
                  <Icon name="Home" className="w-4 h-4 mr-2" />
                  Главная
                </Link>
              </li>
              <li>
                <div className="flex items-center">
                  <Icon name="ChevronRight" className="w-4 h-4 text-muted-foreground" />
                  <Link to={`/anime/${animeId}`} className="ml-1 text-sm font-medium text-muted-foreground hover:text-foreground">
                    {anime.title}
                  </Link>
                </div>
              </li>
              <li aria-current="page">
                <div className="flex items-center">
                  <Icon name="ChevronRight" className="w-4 h-4 text-muted-foreground" />
                  <span className="ml-1 text-sm font-medium text-foreground">
                    Серия {currentEpisode?.number}
                  </span>
                </div>
              </li>
            </ol>
          </nav>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Колонка с плеером */}
          <div className="lg:col-span-2 space-y-6">
            {/* Заголовок эпизода */}
            <div>
              <h1 className="text-2xl font-bold font-playfair">{anime.title}</h1>
              <h2 className="text-xl text-muted-foreground">
                Серия {currentEpisode?.number}: {currentEpisode?.title}
              </h2>
            </div>

            {/* Видеоплеер */}
            <VideoPlayer 
              videoSrc={videoSrc}
              title={`${anime.title} - Серия ${currentEpisode?.number}: ${currentEpisode?.title}`}
              poster={anime.image}
            />
            
            {/* Кнопки навигации между эпизодами */}
            <div className="flex justify-between">
              <Button
                variant="outline"
                className="gap-2"
                disabled={!prevEpisode}
                onClick={() => prevEpisode && handleEpisodeSelect(prevEpisode.id)}
              >
                <Icon name="ArrowLeft" className="h-4 w-4" />
                <span>Предыдущая серия</span>
              </Button>
              
              <Button
                className="gap-2"
                disabled={!nextEpisode}
                onClick={() => nextEpisode && handleEpisodeSelect(nextEpisode.id)}
              >
                <span>Следующая серия</span>
                <Icon name="ArrowRight" className="h-4 w-4" />
              </Button>
            </div>
            
            {/* Вкладки с информацией */}
            <Tabs defaultValue="description" className="mt-8">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="description">Описание</TabsTrigger>
                <TabsTrigger value="comments">Комментарии</TabsTrigger>
                <TabsTrigger value="related">Похожие аниме</TabsTrigger>
              </TabsList>
              
              <TabsContent value="description" className="py-4">
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Год выпуска</p>
                      <p>{anime.year}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Статус</p>
                      <p>{anime.status}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Рейтинг</p>
                      <div className="flex items-center">
                        <Icon name="Star" className="h-4 w-4 text-yellow-500 mr-1" />
                        <span>{anime.rating.toFixed(1)}</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Студия</p>
                      <p>{anime.studio}</p>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Жанры</p>
                    <div className="flex flex-wrap gap-2">
                      {anime.genres.map((genre: string) => (
                        <Badge key={genre} variant="secondary">
                          {genre}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Описание</p>
                    <p className="text-base">{anime.description}</p>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="comments" className="py-4">
                <div className="flex flex-col items-center justify-center py-8">
                  <Icon name="MessageSquare" className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium">Комментарии</h3>
                  <p className="text-muted-foreground mb-4">Авторизуйтесь чтобы оставить комментарий</p>
                  <Button>Войти</Button>
                </div>
              </TabsContent>
              
              <TabsContent value="related" className="py-4">
                <div className="flex flex-col items-center justify-center py-8">
                  <Icon name="ListVideo" className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium">Похожие аниме</h3>
                  <p className="text-muted-foreground">Здесь будут отображаться похожие аниме</p>
                </div>
              </TabsContent>
            </Tabs>
          </div>
          
          {/* Боковая колонка со списком эпизодов */}
          <div>
            <EpisodeSelector 
              episodes={anime.episodes}
              currentEpisode={currentEpisodeId || ''}
              onEpisodeSelect={handleEpisodeSelect}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// Делаем данные доступными в глобальной области видимости для удобства демонстрации
// (в реальном приложении это был бы API-запрос, контекст или Redux)
declare global {
  interface Window {
    animeData: typeof animeData;
  }
}
window.animeData = animeData;

export default WatchAnime;
