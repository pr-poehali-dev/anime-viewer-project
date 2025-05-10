import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";

interface AnimeCardProps {
  id: string;
  title: string;
  image: string;
  rating: number;
  year: number;
  episodes?: number;
  genres: string[];
}

const AnimeCard: React.FC<AnimeCardProps> = ({
  id,
  title,
  image,
  rating,
  year,
  episodes,
  genres,
}) => {
  return (
    <Card className="overflow-hidden transition-all duration-300 hover-scale group relative w-full">
      <div className="relative overflow-hidden aspect-[2/3]">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <Button
              asChild
              size="sm"
              variant="secondary"
              className="w-full gap-2 mb-2"
            >
              <Link to={`/watch/${id}`}>
                <Icon name="Play" className="h-4 w-4" />
                <span>Смотреть</span>
              </Link>
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="w-full gap-2 bg-black/40 text-white border-white/30"
            >
              <Icon name="Plus" className="h-4 w-4" />
              <span>В избранное</span>
            </Button>
          </div>
        </div>

        <Badge className="absolute top-2 right-2 font-medium bg-primary text-white">
          {rating.toFixed(1)}
        </Badge>
      </div>

      <CardContent className="p-3">
        <h3 className="font-semibold text-sm truncate">{title}</h3>
        <div className="flex justify-between items-center mt-1">
          <span className="text-xs text-muted-foreground">
            {year}, {episodes ? `${episodes} серий` : "онгоинг"}
          </span>
          <div className="flex gap-1">
            {genres.slice(0, 2).map((genre) => (
              <Badge
                key={genre}
                variant="secondary"
                className="text-xs px-1.5 py-0 font-normal"
              >
                {genre}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AnimeCard;
