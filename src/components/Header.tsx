import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu, Home, Info, Briefcase, ChevronRight } from "lucide-react";

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const menuItems = [
    { label: 'Home', path: '/', icon: Home },
    { label: 'About', path: '/about', icon: Info },
    { label: 'Careers', path: '/careers', icon: Briefcase }
  ];

  const isActivePath = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="bg-[#603CBA] py-4 px-4 sticky top-0 z-50 shadow-md">
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-full border-2 border-white flex items-center justify-center">
              <span className="text-white text-xl">C</span>
            </div>
            <span className="text-xl font-bold text-white">Careeria</span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6">
            {menuItems.map((item) => (
              <Link
                key={item.label}
                to={item.path}
                className={`text-white transition-all duration-200 flex items-center gap-2 px-3 py-2 rounded-lg
                  ${isActivePath(item.path) 
                    ? 'bg-white/10 font-medium' 
                    : 'hover:bg-white/5'}`}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            ))}
          </nav>
          
          {/* Mobile Navigation */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-white hover:bg-white/10 transition-colors"
              >
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent 
              side="right" 
              className="w-[280px] sm:w-[320px] p-0 bg-white"
            >
              <SheetHeader className="p-6 border-b">
                <SheetTitle className="text-[#603CBA] flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-[#603CBA] flex items-center justify-center">
                    <span className="text-white text-xl">C</span>
                  </div>
                  Careeria Menu
                </SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col p-4">
                {menuItems.map((item) => (
                  <Link
                    key={item.label}
                    to={item.path}
                    className={`flex items-center justify-between group px-4 py-3 rounded-lg mb-2 transition-all duration-200
                      ${isActivePath(item.path)
                        ? 'bg-[#603CBA] text-white'
                        : 'text-gray-700 hover:bg-[#603CBA]/10 hover:text-[#603CBA]'}`}
                    onClick={() => setIsOpen(false)}
                  >
                    <div className="flex items-center gap-3">
                      <item.icon className={`h-5 w-5 transition-colors
                        ${isActivePath(item.path)
                          ? 'text-white'
                          : 'text-gray-500 group-hover:text-[#603CBA]'}`}
                      />
                      <span className="font-medium">{item.label}</span>
                    </div>
                    <ChevronRight className={`h-4 w-4 transition-transform duration-200
                      ${isActivePath(item.path)
                        ? 'text-white'
                        : 'text-gray-400 group-hover:text-[#603CBA]'}
                      ${isActivePath(item.path) ? 'translate-x-0' : 'group-hover:translate-x-1'}`}
                    />
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;
