
import React from 'react';
import { Link } from 'react-router-dom';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Icon from '@/components/ui/icon';

const Navbar = () => {
  return (
    <div className="bg-background border-b sticky top-0 z-10">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/" className="text-2xl font-bold text-primary flex items-center gap-2">
            <span className="text-3xl">🎬</span>
            <span className="font-playfair">АнимеЗона</span>
          </Link>
        </div>
        
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Каталог</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="grid gap-3 p-4 w-[400px]">
                  <div className="grid grid-cols-2 gap-3">
                    <Link to="/genre/action" className="group block select-none space-y-1 rounded-md p-3 hover:bg-accent hover:text-accent-foreground">
                      <div className="font-medium">Экшн</div>
                      <div className="text-sm text-muted-foreground">
                        Захватывающие истории с драками и приключениями
                      </div>
                    </Link>
                    <Link to="/genre/romance" className="group block select-none space-y-1 rounded-md p-3 hover:bg-accent hover:text-accent-foreground">
                      <div className="font-medium">Романтика</div>
                      <div className="text-sm text-muted-foreground">
                        История любви и отношений между персонажами
                      </div>
                    </Link>
                    <Link to="/genre/fantasy" className="group block select-none space-y-1 rounded-md p-3 hover:bg-accent hover:text-accent-foreground">
                      <div className="font-medium">Фэнтези</div>
                      <div className="text-sm text-muted-foreground">
                        Волшебные миры и необычные способности
                      </div>
                    </Link>
                    <Link to="/genre/thriller" className="group block select-none space-y-1 rounded-md p-3 hover:bg-accent hover:text-accent-foreground">
                      <div className="font-medium">Триллер</div>
                      <div className="text-sm text-muted-foreground">
                        Напряженные сюжеты с элементами ужасов
                      </div>
                    </Link>
                  </div>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link to="/new" className="px-4 py-2 block select-none hover:text-primary">
                Новинки
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link to="/popular" className="px-4 py-2 block select-none hover:text-primary">
                Популярное
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        
        <div className="flex items-center gap-4">
          <div className="relative w-64 hidden md:block">
            <Input 
              placeholder="Поиск аниме..." 
              className="pr-10"
            />
            <Button size="icon" variant="ghost" className="absolute right-0 top-0">
              <Icon name="Search" className="h-4 w-4" />
            </Button>
          </div>
          
          <Button variant="ghost" size="icon" className="md:hidden">
            <Icon name="Search" />
          </Button>
          
          <Button variant="ghost" size="icon" className="md:hidden">
            <Icon name="Menu" />
          </Button>
          
          <Button className="hidden md:flex gap-2 bg-primary text-white">
            <Icon name="UserCircle" />
            <span>Войти</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
