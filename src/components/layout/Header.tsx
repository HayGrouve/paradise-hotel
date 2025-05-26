// components/layout/Header.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { Menu, X } from "lucide-react";
import type { Locale } from "@/lib/i18n/config";
import { dictionary } from "@/lib/i18n/config";
import LanguageSwitcher from "./LanguageSwitcher";

interface HeaderProps {
  locale: Locale;
}

export default function Header({ locale }: HeaderProps) {
  const t = dictionary[locale];
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Refs for the menu and the button to detect clicks outside
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Effect for handling scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Effect for handling clicks outside the menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // If menu is open and the click is not inside the menu or the toggle button
      if (
        isMenuOpen &&
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        closeMenu();
      }
    };

    // Add listener if menu is open
    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    // Cleanup listener
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]); // Re-run effect when isMenuOpen changes

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full text-white backdrop-blur-sm transition-colors duration-300 ${
        isScrolled ? "bg-stone-700/50" : "bg-stone-700"
      }`}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:h-20">
        {/* Logo */}
        <Link
          href={`/${locale}`}
          className="flex items-center"
          onClick={closeMenu}
        >
          <Image
            src="/images/logo.svg"
            alt="Paradise Deluxe Apartments"
            width={80}
            height={80}
            className="h-12 w-auto md:h-20"
            priority
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-6 md:flex md:gap-8">
          <Link
            href={`/${locale}`}
            className="transition-colors hover:text-amber-200"
          >
            {t.home}
          </Link>
          <Link
            href={`/${locale}/rooms`}
            className="transition-colors hover:text-amber-200"
          >
            {t.rooms}
          </Link>
          <Link
            href={`/${locale}/contact`}
            className="transition-colors hover:text-amber-200"
          >
            {t.contactUs}
          </Link>
          <LanguageSwitcher currentLocale={locale} />
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          {/* Add ref to the button */}
          <button
            ref={buttonRef}
            onClick={toggleMenu}
            aria-label="Toggle menu"
            className="rounded p-2 text-white focus:ring-2 focus:ring-amber-300 focus:outline-none"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu - Apply animation classes and ref */}
      <div
        ref={menuRef} // Add ref to the menu container
        className={`absolute left-0 w-full origin-top transform bg-stone-700/95 p-4 backdrop-blur-sm transition-all duration-300 ease-in-out md:hidden ${
          isMenuOpen
            ? "top-16 scale-y-100 opacity-100" // Open state: full scale, full opacity
            : "pointer-events-none top-16 scale-y-95 opacity-0" // Closed state: slightly scaled down, invisible, non-interactive
        }`}
      >
        {/* Render content only when potentially visible to avoid ref issues on initial load */}
        {
          <nav className="flex flex-col items-start gap-4">
            <Link
              href={`/${locale}`}
              className="w-full rounded px-3 py-2 transition-colors hover:bg-stone-600"
              onClick={closeMenu}
            >
              {t.home}
            </Link>
            <Link
              href={`/${locale}/rooms`}
              className="w-full rounded px-3 py-2 transition-colors hover:bg-stone-600"
              onClick={closeMenu}
            >
              {t.rooms}
            </Link>
            <Link
              href={`/${locale}/contact`}
              className="w-full rounded px-3 py-2 transition-colors hover:bg-stone-600"
              onClick={closeMenu}
            >
              {t.contactUs}
            </Link>
            <div className="mt-2 w-full border-t border-stone-600 pt-4">
              <LanguageSwitcher currentLocale={locale} />
            </div>
          </nav>
        }
      </div>
    </header>
  );
}
