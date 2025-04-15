'use client'
import React, { useState } from 'react';
import { BarChart3, LayoutDashboard, Menu, ChevronLeft, Activity, Zap, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const Sidebar: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const navItems = [
    { name: 'Dashboard', path: '/dash/', icon: LayoutDashboard },
    { name: 'Google Analytics', path: '/dash/google-analytics', icon: BarChart3 },
    { name: 'PostHog', path: '/dash/posthog', icon: Activity },
    { name: 'Real-time', path: '/dash/real-time', icon: Zap },
    { name: 'Settings', path: '/dash/settings', icon: Settings },
  ];

  return (
    <aside
      className={cn(
        "bg-card border-r border-border h-screen transition-all duration-300 flex flex-col",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex items-center justify-between p-4 border-b border-border h-14">
        {!collapsed && (
          <Link href="/" className="text-lg font-semibold">
            Web Pulse
          </Link>
        )}
        <Button variant="ghost" size="icon" onClick={toggleSidebar} className="ml-auto">
          {collapsed ? <Menu size={20} /> : <ChevronLeft size={20} />}
        </Button>
      </div>
      
      <nav className="flex-1 py-4 px-2">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.path}>
                <Tooltip delayDuration={collapsed ? 100 : 999999}>
                  <TooltipTrigger asChild>
                    <Link 
                      href={item.path} 
                      className={cn(
                        "flex items-center py-2 px-3 rounded-md text-foreground hover:bg-accent hover:text-accent-foreground transition-colors",
                        pathname === item.path && "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground"
                      )}
                    >
                      <Icon size={20} className={cn("flex-shrink-0", !collapsed && "mr-2")} />
                      {!collapsed && <span>{item.name}</span>}
                    </Link>
                  </TooltipTrigger>
                  {collapsed && (
                    <TooltipContent side="right">
                      {item.name}
                    </TooltipContent>
                  )}
                </Tooltip>
              </li>
            );
          })}
        </ul>
      </nav>
      
      <div className="p-4 border-t border-border">
        {!collapsed && (
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
              <span className="font-medium text-sm">WP</span>
            </div>
            <div className="flex-1 truncate">
              <p className="text-sm font-medium">Web Pulse</p>
              <p className="text-xs text-muted-foreground">Analytics Dashboard</p>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};
