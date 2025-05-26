"use client";

import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useSwipeable } from "react-swipeable";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface StoredImage {
  url: string;
  key?: string;
}

interface ProductImagesProps {
  images: StoredImage[];
  productName: string;
}

export default function ProductImages({
  images,
  productName,
}: ProductImagesProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const goToPreviousImage = useCallback(() => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1,
    );
  }, [images.length]);

  const goToNextImage = useCallback(() => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1,
    );
  }, [images.length]);

  useEffect(() => {
    if (!isFullscreen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        goToNextImage();
      } else if (e.key === "ArrowLeft") {
        goToPreviousImage();
      } else if (e.key === "Escape") {
        setIsFullscreen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isFullscreen, goToNextImage, goToPreviousImage]);

  const handlers = useSwipeable({
    onSwipedLeft: goToNextImage,
    onSwipedRight: goToPreviousImage,
    preventScrollOnSwipe: true,
    trackMouse: true,
  });

  const toggleFullscreen = () => {
    setIsFullscreen((v) => !v);
  };

  const currentImageUrl = images[currentImageIndex]?.url;
  if (!images || images.length === 0 || !currentImageUrl) {
    return (
      <div className="bg-muted text-muted-foreground flex aspect-square items-center justify-center border">
        <span>Няма налични изображения</span>
      </div>
    );
  }

  // Main image and thumbnails
  const mainImage = (
    <div
      {...handlers}
      className={cn(
        "relative aspect-square h-[600px] w-full max-w-[600px] cursor-pointer overflow-hidden bg-[#e5dac6]",
        isFullscreen && "cursor-default",
      )}
      onClick={!isFullscreen ? toggleFullscreen : undefined}
      style={{ userSelect: "none" }}
    >
      <Image
        src={currentImageUrl}
        alt={`${productName} - изображение ${currentImageIndex + 1}`}
        fill
        sizes="(max-width: 768px) 90vw, (max-width: 1200px) 45vw, 600px"
        className="object-cover"
        priority={currentImageIndex === 0}
        draggable={false}
      />
      {/* Navigation Arrows (only if more than one image) */}
      {images.length > 1 && !isFullscreen && (
        <>
          <button
            className="absolute top-1/2 left-2 z-10 -translate-y-1/2 cursor-pointer bg-black/10 p-2 text-2xl text-white transition select-none hover:bg-black/20"
            onClick={(e) => {
              e.stopPropagation();
              goToPreviousImage();
            }}
            aria-label="Предишно изображение"
            tabIndex={0}
            type="button"
          >
            <ChevronLeft className="h-8 w-8" />
          </button>
          <button
            className="absolute top-1/2 right-2 z-10 -translate-y-1/2 cursor-pointer bg-black/10 p-2 text-2xl text-white transition select-none hover:bg-black/20"
            onClick={(e) => {
              e.stopPropagation();
              goToNextImage();
            }}
            aria-label="Следващо изображение"
            tabIndex={0}
            type="button"
          >
            <ChevronRight className="h-8 w-8" />
          </button>
        </>
      )}
    </div>
  );

  const thumbnails = images.length > 1 && (
    <div className="mt-6 w-full" style={{ maxWidth: 600 }}>
      <div className="flex w-full justify-between gap-6">
        {images.map((image, index) => (
          <button
            key={image.key ?? index}
            className={cn(
              "relative aspect-square h-28 w-0 flex-1 cursor-pointer overflow-hidden border-2 transition-all",
              index === currentImageIndex
                ? "border-[#bfa77a]"
                : "border-transparent opacity-70 hover:opacity-100",
            )}
            onClick={() => setCurrentImageIndex(index)}
            aria-label={`Покажи изображение ${index + 1}`}
            type="button"
          >
            <Image
              src={image.url}
              alt={productName}
              fill
              sizes="112px"
              className="cursor-pointer object-cover"
              draggable={false}
            />
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="flex w-full flex-col items-center">
      {/* Main image (clickable for fullscreen) */}
      {mainImage}
      {/* Thumbnails */}
      {thumbnails}
      {/* Fullscreen overlay */}
      {isFullscreen && (
        <div className="fixed inset-0 z-50 flex h-screen w-screen flex-col items-center justify-center bg-black/90">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentImageIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative flex h-screen w-screen items-center justify-center"
            >
              <div
                {...handlers}
                className="relative flex h-screen w-screen items-center justify-center"
              >
                <Image
                  src={currentImageUrl}
                  alt={`${productName} - изображение ${currentImageIndex + 1}`}
                  fill
                  sizes="100vw"
                  className="object-contain select-none"
                  draggable={false}
                  priority={true}
                  style={{ background: "#222" }}
                />
              </div>
              {/* Navigation Controls */}
              {images.length > 1 && (
                <>
                  <button
                    className="absolute top-1/2 left-4 z-10 -translate-y-1/2 cursor-pointer bg-[#222]/80 p-2 text-3xl text-white select-none"
                    onClick={goToPreviousImage}
                    aria-label="Предишно изображение"
                    tabIndex={0}
                  >
                    <ChevronLeft className="h-10 w-10" />
                  </button>
                  <button
                    className="absolute top-1/2 right-4 z-10 -translate-y-1/2 cursor-pointer bg-[#222]/80 p-2 text-3xl text-white select-none"
                    onClick={goToNextImage}
                    aria-label="Следващо изображение"
                    tabIndex={0}
                  >
                    <ChevronRight className="h-10 w-10" />
                  </button>
                </>
              )}
              {/* Close Button */}
              <button
                className="absolute top-4 right-4 cursor-pointer rounded-none bg-[#222]/80 p-2 text-3xl text-white select-none"
                onClick={() => setIsFullscreen(false)}
                aria-label="Затвори"
                tabIndex={0}
              >
                <X className="h-8 w-8" />
              </button>
            </motion.div>
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
