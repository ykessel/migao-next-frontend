import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';

const FloatingToTopButton = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.innerHeight + window.scrollY;
      const threshold = document.body.offsetHeight - 100;
      setShow(scrollPosition >= threshold);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!show) return null;

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-8 right-8 z-50 bg-teal-600 hover:bg-teal-700 text-white p-4 rounded-full shadow-lg transition-all"
      aria-label="Ir arriba"
    >
      <ArrowUp className="w-6 h-6" />
    </button>
  );
};

export default FloatingToTopButton; 