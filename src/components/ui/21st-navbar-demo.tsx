"use client"

import * as React from "react"
import { Header, Button } from "@/components/ui/21st-navbar"
import { User, Sun, Moon } from "lucide-react"

// Sample menu items
const menuItems = [
  {
    text: "Menu 1",
    items: [
      {
        text: "Submenu 1.1",
        description: "Description for submenu 1.1",
        to: "/menu1/submenu1",
      },
      {
        text: "Submenu 1.2",
        description: "Description for submenu 1.2",
        to: "/menu1/submenu2",
      }
    ]
  },
  {
    text: "Menu 2",
    to: "/menu2"
  },
  {
    text: "Menu 3",
    items: [
      {
        text: "Submenu 3.1",
        description: "Description for submenu 3.1",
        to: "/menu3/submenu1",
      },
      {
        text: "Submenu 3.2",
        description: "Description for submenu 3.2",
        to: "/menu3/submenu2",
      }
    ]
  }
]

// Basic light theme demo
const LightDemo = () => {
  return (
    <div className="w-full">
      <Header
        logo={<span className="text-xl font-bold">Logo</span>}
        menuItems={menuItems}
        rightContent={
          <Button variant="default">
            <User className="mr-2 h-4 w-4" />
            Button 1
          </Button>
        }
      />
    </div>
  )
}

// Dark theme demo
const DarkDemo = () => {
  return (
    <div className="w-full bg-[#0B0C0F] min-h-[200px]">
      <Header
        theme="dark"
        logo={<span className="text-xl font-bold text-white">Logo</span>}
        menuItems={menuItems}
        rightContent={
          <Button 
            variant="outline"
            className="text-white"
          >
            <User className="mr-2 h-4 w-4" />
            Button 1
          </Button>
        }
      />
    </div>
  )
}

// Theme switcher demo
const ThemeDemo = () => {
  const [theme, setTheme] = React.useState<'light' | 'dark'>('light')
  
  return (
    <div className={`w-full ${theme === 'dark' ? 'bg-[#0B0C0F]' : 'bg-white'} min-h-[200px]`}>
      <Header
        theme={theme}
        logo={<span className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-black'}`}>Logo</span>}
        menuItems={menuItems}
        onThemeChange={() => setTheme(theme === 'light' ? 'dark' : 'light')}
        rightContent={
          <Button 
            variant={theme === 'dark' ? 'outline' : 'default'}
            className={theme === 'dark' ? 'text-white' : ''}
          >
            {theme === 'dark' ? <Moon className="mr-2 h-4 w-4" /> : <Sun className="mr-2 h-4 w-4" />}
            Button 1
          </Button>
        }
      />
    </div>
  )
}

// Export all variants
export { LightDemo, DarkDemo, ThemeDemo }
