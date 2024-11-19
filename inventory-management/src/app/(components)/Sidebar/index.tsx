"use client"

import { useAppSelector } from '@/app/redux'
import { setIsSidebarCollapsed } from '@/state'
import { Archive, CircleDollarSign, Clipboard, Icon, Layout, LucideIcon, Menu, SlidersHorizontal, User } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { useDispatch } from 'react-redux'


interface SideBarLinkProps {
  href:string;
  label:string;
  iscollapsed: boolean;
  icon : LucideIcon;
}

const SidebarLink = ({
  href,
  label,
  icon:Icon,
  iscollapsed
}: SideBarLinkProps) => {
  const pathname = usePathname()
  const isActive = pathname === href || (pathname === "/" && href==="/dashboard");
  return(
    <Link href={href}>
      <div className={`cursor-pointer flex items-center ${iscollapsed ? "justify-center py-4":"justify-start py-4 px-8"}
      hover:text-blue-500 hover:bg-blue-100 gap-3 transition-colors ${isActive? "bg-blue-200 text-white":""}`}>

        <Icon className="h-6 w-6 !text-gray-700"/>
        <span className={`${iscollapsed? "hidden": "block"} font-medium text-gray-700`}>
          {label}
        </span>

      </div>
    </Link>
  )

}


const Sidebar = () => {

  
const dispatch = useDispatch()
  const isSidebarCollapsed = useAppSelector((state) => state.global.isSidebarCollapsed);

  const toggleSidebar = () =>{
    dispatch(setIsSidebarCollapsed(!isSidebarCollapsed))
  }

  const sidebarClassNames = `fixed flex flex-col ${
    isSidebarCollapsed ? "w-0 md:w-16" : "w-72 md:w-64"
  } bg-white transition-all duration-300 overflow-hidden h-full shadow-md z-40`;

  return (
    <div className={sidebarClassNames}>
    {/* TOP LOGO */}
    <div className={`flex gap-3 justify-between md:justify-normal items-center pt-8 ${isSidebarCollapsed ? "px-5":"px-8"}`}>
    <Image
          src="https://pm-s4-images.s3.us-east-1.amazonaws.com/logo.png"
          alt="Mukhut-logo"
          width={27}
          height={27}
          className="rounded-full w-8"
          />
       <h1 className={`${isSidebarCollapsed ? "hidden":"block"} font-extrabold text-2xl`}>MUKHUT</h1>
     
       <button className="md:hidden px-3 py-3 bg-gray-100 rounded-full hover:bg-blue-100"
       onClick={toggleSidebar}>
        <Menu className="h-4 w-4" />
       </button>
    </div>

    {/* LINK*/}

    <div className="flex-grow mt-8">
        {/* links here */}
        <SidebarLink href="/dashboard"
        label="Dashboard"
        icon={Layout}
        iscollapsed = {isSidebarCollapsed}
        />
        <SidebarLink href="/inventory"
        label="Inventory"
        icon={Archive}
        iscollapsed = {isSidebarCollapsed}
        />
        <SidebarLink href="/products"
        label="Products"
        icon={Clipboard}
        iscollapsed = {isSidebarCollapsed}
        />
        <SidebarLink href="/users"
        label="Users"
        icon={User}
        iscollapsed = {isSidebarCollapsed}
        />

        <SidebarLink href="/settings"
        label="Settings"
        icon={SlidersHorizontal}
        iscollapsed = {isSidebarCollapsed}
        />

       <SidebarLink href="/expenses"
        label="expenses"
        icon={CircleDollarSign}
        iscollapsed = {isSidebarCollapsed}
        />
    </div>

    {/* FOOTER */}

    <div className={`${isSidebarCollapsed ? "hidden":"block"} mb-10`}>
        <p className="text-xs text-gray-500 text-center">&copy; 2024 Mukhut</p>
    </div>

    </div>
  );
}

export default Sidebar