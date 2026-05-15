export default function GlobalStyles() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap');

      *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
      html { scroll-behavior: smooth; }
      body {
        font-family: 'DM Sans', sans-serif;
        background: #fdf8ee;
        color: #0d1b3e;
        overflow-x: hidden;
        cursor: none;
      }
      ::-webkit-scrollbar { width: 0; background: transparent; }
      * { scrollbar-width: none; }

      @media (max-width: 768px) {
        body { cursor: auto; }
        #murano-cursor, #murano-cursor-ring { display: none; }
      }
    `}</style>
  )
}