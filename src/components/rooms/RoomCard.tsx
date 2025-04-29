// components/rooms/RoomCard.tsx
"use client"; // Required for Framer Motion components

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import type { Locale } from "@/lib/i18n/config"; // Adjust path if needed

// Define animation variants (you can move these to a shared file if used elsewhere)
const cardVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.3, ease: "easeIn" } },
};

// Define the props for the component
interface RoomCardProps {
  locale: Locale;
  title: string;
  image: string;
  type: string; // Used for the link slug
  description?: string; // Optional: Display description text
  viewMoreText?: string; // Optional: Display a "View More" button with this text
  imageHeightClass?: string; // Optional: Control image height (e.g., "h-64", "h-80")
  className?: string; // Optional: Allow passing additional classes to the wrapper
}

export default function RoomCard({
  locale,
  title,
  image,
  type,
  description,
  viewMoreText,
  imageHeightClass = "h-80",
  className = "",
}: RoomCardProps) {
  const linkHref = `/${locale}/rooms/${type}`;

  return (
    // Apply motion properties directly to the card wrapper
    <motion.div
      className={`overflow-hidden rounded-lg bg-white shadow-lg ${className}`} // Use shadow-lg and allow extra classes
      variants={cardVariants} // Use defined variants for entry/exit
      whileHover={{ scale: 1.03, transition: { duration: 0.2 } }} // Hover effect
      // initial, animate, exit are handled by parent's whileInView + stagger if applicable
    >
      <Link href={linkHref} aria-label={`View details for ${title}`}>
        <Image
          src={image}
          alt={title} // Alt text is important for accessibility
          width={800}
          height={600}
          className={`w-full object-cover ${imageHeightClass}`} // Use dynamic height class
        />
      </Link>

      {/* Content Section */}
      <div
        className={`${!description ? "flex justify-between" : ""} p-6 md:p-8`}
      >
        <h3
          className={`${!description ? "mb-0 inline-block" : "mb-4"} text-2xl font-medium`}
        >
          {title}
        </h3>
        {description && <p className="mb-6 text-gray-600">{description}</p>}
        {viewMoreText && (
          <Link
            href={linkHref}
            className="inline-block rounded-md bg-amber-600 px-6 py-2 text-white transition-colors hover:bg-amber-700"
          >
            {viewMoreText}
          </Link>
        )}
      </div>
    </motion.div>
  );
}
