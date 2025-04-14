'use client'

import Link from 'next/link'
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from '@/components/ui/navigation-menu'

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-black/5 bg-[#151414]/80 backdrop-blur supports-[backdrop-filter]:bg-[#151414]/60">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center space-x-2">
          <span className="font-black text-5xl">Anime<span className='text-[#D72483]'>Hub</span></span>
        </Link>

        <NavigationMenu>
          <NavigationMenuList className="hidden md:flex gap-4">
            <NavigationMenuItem>
              <Link href="/" passHref>
                Home
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/features"  passHref>
                  Features
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/pricing"  passHref>
                  Pricing
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/contact"  passHref>
                  Contact
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </header>
  )
}
