import { useEffect } from "react";
import { useLocation } from "wouter";

export default function ScrollToHash() {
  const [location] = useLocation();

  useEffect(() => {
    const scrollToElement = () => {
      const hash = window.location.hash;

      if (!hash) return;

      const element = document.querySelector(hash);

      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    };

    const timer = setTimeout(scrollToElement, 300);

    return () => clearTimeout(timer);
  }, [location]);

  return null;
}