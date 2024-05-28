"use client" // creates client component - needed for interactability 
import Link from 'next/link'
import { useState } from 'react'
import { Navlink } from './Navlink'
import { Dropdown } from './Dropdown'
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid"

const navLinks = [
  {
    title:"Home",
    path:"/"
  },
  {
    title:"Compare",
    path:"/compare"
  }
]

export const Navbar = () => {

  const [navbarOpen, setNavbarOpen] = useState(false);

  return(
    <nav className="fixed top-0 left-0 right-0 z-10 bg-[#121212] bg-opacity-90">
      <div className="flex flex-wrap items-center justify-between px-8 py-4">
        
        <Link href={"/"} className="text-2xl md:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 via-blue-200 to-cyan-100 font-semibold">
          HYDROLOGIC
        </Link>

        <div className="mobile-menu block md:hidden">
          {navbarOpen ? (
              <button onClick={() => setNavbarOpen(false)} className="flex items-center px-3 py-2 border border-slate-300 rounded text-slate-300 hover:text-white hover:border:white">
              <XMarkIcon className="w-5 h-5"/>
            </button>
            ) : (
              <button onClick={() => setNavbarOpen(true)} className="flex items-center px-3 py-2 border border-slate-300 rounded text-slate-300 hover:text-white hover:border:white">
                <Bars3Icon className="w-5 h-5"/>
              </button>
          )}
        </div>

        <div className="desktop-menu hidden md:block md:w-auto" id="navbar">
          <ul className="flex flex-row space-x-2">
            {navLinks.map((field, index) => (
              <li key={index}>
                <Navlink href={field.path} title={field.title}/>
              </li>
            ))}
          </ul>
        </div>
        
      </div>

      <div className="md:hidden">
        {navbarOpen ? (
            <Dropdown navLinks={navLinks}/>
        ) : null}
      </div>
        
    </nav>
  )
}