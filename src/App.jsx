import { useMemo, useState } from "react";

export default function DrikeStreamingApp() {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [search, setSearch] = useState("");

  const featured = {
    title: "Night of the Living Dead",
    year: 1968,
    genre: "Terror / Clássico",
    description:
      "Em uma noite tomada pelo caos, um grupo de desconhecidos tenta sobreviver cercado por mortos-vivos. Um clássico sombrio, tenso e marcante do cinema de domínio público.",
    image:
      "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=1600&q=80",
    video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
  };

  const categories = [
    {
      name: "Em Alta",
      movies: [
        {
          id: 1,
          title: "Night of the Living Dead",
          year: 1968,
          genre: "Terror",
          description:
            "Uma noite de puro desespero enquanto os vivos tentam resistir ao avanço dos mortos. Atmosfera pesada, sensação de isolamento e tensão crescente do início ao fim.",
          image: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=900&q=80",
          video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
          type: "Filme",
        },
        {
          id: 2,
          title: "His Girl Friday",
          year: 1940,
          genre: "Romance / Comédia",
          description:
            "Diálogos rápidos, química forte e uma disputa divertida entre amor, trabalho e orgulho em um dos romances clássicos mais carismáticos do cinema.",
          image: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=900&q=80",
          video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
          type: "Filme",
        },
        {
          id: 3,
          title: "Sherlock Jr.",
          year: 1924,
          genre: "Aventura / Comédia",
          description:
            "Um projecionista sonhador imagina a si mesmo como grande detetive em uma aventura criativa, leve e cheia de cenas engenhosas.",
          image: "https://images.unsplash.com/photo-1518929458119-e5bf444c30f4?auto=format&fit=crop&w=900&q=80",
          video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
          type: "Filme",
        },
        {
          id: 4,
          title: "The General",
          year: 1926,
          genre: "Ação / Aventura",
          description:
            "Perseguições, coragem e humor em uma jornada clássica sobre lealdade, amor e persistência em meio ao caos.",
          image: "https://images.unsplash.com/photo-1514306191717-452ec28c7814?auto=format&fit=crop&w=900&q=80",
          video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
          type: "Filme",
        },
        {
          id: 5,
          title: "Plan 9 from Outer Space",
          year: 1959,
          genre: "Ficção Científica",
          description:
            "Extraterrestres, mistério e um clima cult retrô fazem deste clássico uma experiência curiosa e divertida para fãs de sci-fi antiga.",
          image: "https://images.unsplash.com/photo-1502134249126-9f3755a50d78?auto=format&fit=crop&w=900&q=80",
          video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
          type: "Filme",
        },
      ],
    },
    {
      name: "Terror Pesado",
      movies: [
        {
          id: 6,
          title: "Night of the Living Dead",
          year: 1968,
          genre: "Terror / Sobrevivência",
          description:
            "Medo constante, personagens encurralados e a sensação de que não existe saída. Um terror seco, cruel e realmente desconfortável.",
          image: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&w=900&q=80",
          video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
          type: "Filme",
        },
        {
          id: 7,
          title: "Carnival of Souls",
          year: 1962,
          genre: "Terror / Mistério",
          description:
            "Silêncio estranho, aparições perturbadoras e uma atmosfera de pesadelo fazem desse filme uma experiência inquietante e diferente.",
          image: "https://images.unsplash.com/photo-1505685296765-3a2736de412f?auto=format&fit=crop&w=900&q=80",
          video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
          type: "Filme",
        },
        {
          id: 8,
          title: "House on Haunted Hill",
          year: 1959,
          genre: "Terror / Casa Assombrada",
          description:
            "Portas fechadas, corredores escuros e paranoia crescente. Um terror clássico com clima de casa maldita e tensão constante.",
          image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80",
          video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/VolkswagenGTIReview.mp4",
          type: "Filme",
        },
        {
          id: 9,
          title: "Nosferatu",
          year: 1922,
          genre: "Terror / Expressionismo",
          description:
            "Um vampiro sombrio e visual perturbador em um dos filmes mais influentes e assustadores da história do gênero.",
          image: "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?auto=format&fit=crop&w=900&q=80",
          video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4",
          type: "Filme",
        },
        {
          id: 10,
          title: "The Brain That Wouldn't Die",
          year: 1962,
          genre: "Terror / Ficção",
          description:
            "Ciência fora de controle, obsessão e horror corporal em uma trama estranha, intensa e memorável.",
          image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=900&q=80",
          video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4",
          type: "Filme",
        },
      ],
    },
    {
      name: "Ação e Aventura",
      movies: [
        {
          id: 11,
          title: "The General",
          year: 1926,
          genre: "Ação / Aventura",
          description:
            "Um homem comum atravessa desafios enormes para provar seu valor, recuperar o que ama e vencer o impossível.",
          image: "https://images.unsplash.com/photo-1514306191717-452ec28c7814?auto=format&fit=crop&w=900&q=80",
          video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
          type: "Filme",
        },
        {
          id: 12,
          title: "The Last Man on Earth",
          year: 1964,
          genre: "Ação / Ficção",
          description:
            "Em um mundo quase vazio, um sobrevivente enfrenta criaturas sombrias e a solidão absoluta em uma batalha desesperada.",
          image: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?auto=format&fit=crop&w=900&q=80",
          video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
          type: "Filme",
        },
        {
          id: 13,
          title: "Road to Bali",
          year: 1952,
          genre: "Aventura",
          description:
            "Uma viagem cheia de confusões, humor e descobertas em uma aventura clássica leve e carismática.",
          image: "https://images.unsplash.com/photo-1497032205916-ac775f0649ae?auto=format&fit=crop&w=900&q=80",
          video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
          type: "Filme",
        },
        {
          id: 14,
          title: "D.O.A.",
          year: 1950,
          genre: "Suspense / Crime",
          description:
            "Após descobrir que foi envenenado, um homem corre contra o tempo para descobrir quem quer sua morte.",
          image: "https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?auto=format&fit=crop&w=900&q=80",
          video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
          type: "Filme",
        },
        {
          id: 15,
          title: "The Phantom of the Opera",
          year: 1925,
          genre: "Drama / Suspense",
          description:
            "Nos bastidores de um teatro sombrio, obsessão, medo e paixão se misturam em uma história intensa e visualmente marcante.",
          image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=900&q=80",
          video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
          type: "Filme",
        },
      ],
    },
    {
      name: "Romance e Drama",
      movies: [
        {
          id: 16,
          title: "Charade",
          year: 1963,
          genre: "Romance / Suspense",
          description:
            "Mistério, charme e romance se cruzam em uma trama elegante, leve e cheia de reviravoltas.",
          image: "https://images.unsplash.com/photo-1542204625-de293a2f8ff2?auto=format&fit=crop&w=900&q=80",
          video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
          type: "Filme",
        },
        {
          id: 17,
          title: "His Girl Friday",
          year: 1940,
          genre: "Romance / Comédia",
          description:
            "Entre notícias urgentes e sentimentos mal resolvidos, o casal revive uma conexão irresistível.",
          image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=900&q=80",
          video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
          type: "Filme",
        },
        {
          id: 18,
          title: "Penny Serenade",
          year: 1941,
          genre: "Romance / Drama",
          description:
            "Uma história delicada sobre memórias, perdas, amor e esperança contada com emoção sincera.",
          image: "https://images.unsplash.com/photo-1518131678677-a25a18114956?auto=format&fit=crop&w=900&q=80",
          video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
          type: "Filme",
        },
        {
          id: 19,
          title: "Scarlet Street",
          year: 1945,
          genre: "Drama / Noir",
          description:
            "Um homem se deixa consumir pelo desejo e acaba preso em uma espiral de manipulação, culpa e tragédia.",
          image: "https://images.unsplash.com/photo-1518998053901-5348d3961a04?auto=format&fit=crop&w=900&q=80",
          video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
          type: "Filme",
        },
        {
          id: 20,
          title: "The Stranger",
          year: 1946,
          genre: "Drama / Suspense",
          description:
            "Segredos do passado e tensão psicológica se encontram em um suspense elegante e intenso.",
          image: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=900&q=80",
          video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
          type: "Filme",
        },
      ],
    },
    {
      name: "Sci‑Fi, Séries e Desenhos",
      movies: [
        {
          id: 21,
          title: "Plan 9 from Outer Space",
          year: 1959,
          genre: "Ficção Científica",
          description:
            "Naves, fenômenos inexplicáveis e um clima retrô formam um clássico cult divertido e curioso.",
          image: "https://images.unsplash.com/photo-1502134249126-9f3755a50d78?auto=format&fit=crop&w=900&q=80",
          video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
          type: "Filme",
        },
        {
          id: 22,
          title: "Teenagers from Outer Space",
          year: 1959,
          genre: "Ficção Científica",
          description:
            "Jovens vindos do espaço e um planeta em risco em um sci-fi antigo cheio de personalidade.",
          image: "https://images.unsplash.com/photo-1499364615650-ec38552f4f34?auto=format&fit=crop&w=900&q=80",
          video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
          type: "Filme",
        },
        {
          id: 23,
          title: "Voyage to the Prehistoric Planet",
          year: 1965,
          genre: "Ficção / Aventura",
          description:
            "Uma missão espacial encontra cenários misteriosos e perigos desconhecidos em uma aventura clássica.",
          image: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=900&q=80",
          video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4",
          type: "Filme",
        },
        {
          id: 24,
          title: "Classic Cartoon Showcase",
          year: 1930,
          genre: "Desenho / Clássico",
          description:
            "Uma área do catálogo dedicada a animações clássicas com clima retrô e leveza visual.",
          image: "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=900&q=80",
          video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
          type: "Desenho",
        },
        {
          id: 25,
          title: "Midnight Files",
          year: 2026,
          genre: "Série / Suspense",
          description:
            "Uma série fictícia dentro do catálogo Drike sobre investigações sombrias, arquivos secretos e desaparecimentos perturbadores.",
          image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80",
          video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
          type: "Série",
        },
      ],
    },
  ];

  const allMovies = useMemo(() => categories.flatMap((category) => category.movies), []);

  const filteredCategories = categories
    .map((category) => ({
      ...category,
      movies: category.movies.filter((movie) => {
        const term = search.toLowerCase();
        return (
          movie.title.toLowerCase().includes(term) ||
          movie.genre.toLowerCase().includes(term) ||
          movie.description.toLowerCase().includes(term) ||
          movie.type.toLowerCase().includes(term)
        );
      }),
    }))
    .filter((category) => category.movies.length > 0);

  const openMovie = (movie) => setSelectedMovie(movie);
  const closeMovie = () => setSelectedMovie(null);

  return (
    <>
      <style>{`
        * { box-sizing: border-box; }
        body { margin: 0; background: #0b0b0f; color: white; font-family: Arial, sans-serif; }
        a { color: inherit; text-decoration: none; }
        button, input { font-family: inherit; }
        .app { min-height: 100vh; background: #0b0b0f; }
        .header {
          position: fixed; top: 0; left: 0; right: 0; z-index: 60;
          background: linear-gradient(to bottom, rgba(0,0,0,0.96), rgba(0,0,0,0.68));
          border-bottom: 1px solid rgba(255,255,255,0.08);
          backdrop-filter: blur(8px);
        }
        .header-inner {
          max-width: 1280px; margin: 0 auto; padding: 16px 24px;
          display: flex; align-items: center; justify-content: space-between;
          gap: 16px;
        }
        .left, .right { display: flex; align-items: center; gap: 20px; }
        .logo { font-size: 34px; font-weight: 900; color: #e50914; letter-spacing: -1px; }
        .nav { display: flex; gap: 18px; color: #ddd; font-size: 14px; }
        .nav a:hover { color: #fff; }
        .search {
          background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.12);
          color: white; border-radius: 999px; padding: 10px 14px; outline: none; min-width: 210px;
        }
        .avatar {
          width: 40px; height: 40px; border-radius: 999px; background: #b20710;
          display: flex; align-items: center; justify-content: center; font-weight: 700;
        }
        .hero {
          position: relative; min-height: 78vh; overflow: hidden; display: flex; align-items: flex-end;
        }
        .hero-bg {
          position: absolute; inset: 0; background-size: cover; background-position: center;
        }
        .overlay-a { position: absolute; inset: 0; background: linear-gradient(to right, rgba(0,0,0,1), rgba(0,0,0,.72), rgba(0,0,0,.18)); }
        .overlay-b { position: absolute; inset: 0; background: linear-gradient(to top, #0b0b0f, transparent 45%); }
        .hero-content {
          position: relative; z-index: 2; max-width: 1280px; width: 100%; margin: 0 auto;
          padding: 130px 24px 80px;
        }
        .badge {
          display: inline-block; margin-bottom: 14px; padding: 7px 12px; border-radius: 999px;
          background: rgba(229,9,20,.12); border: 1px solid rgba(229,9,20,.28);
          color: #ffb3b8; font-size: 11px; letter-spacing: .22em; text-transform: uppercase; font-weight: 700;
        }
        .hero h1 { margin: 0 0 14px; font-size: 64px; line-height: 1; max-width: 760px; }
        .meta { color: #d4d4d8; margin-bottom: 14px; font-size: 18px; }
        .desc { color: #e4e4e7; max-width: 720px; font-size: 18px; line-height: 1.7; margin-bottom: 28px; }
        .buttons { display: flex; gap: 14px; flex-wrap: wrap; }
        .btn {
          border: 0; border-radius: 8px; padding: 14px 22px; font-size: 16px; font-weight: 700;
          cursor: pointer; transition: transform .2s ease, opacity .2s ease, background .2s ease;
        }
        .btn:hover { transform: translateY(-1px); }
        .btn-primary { background: white; color: black; }
        .btn-secondary { background: rgba(82,82,91,.85); color: white; }
        .btn-danger { background: #e50914; color: white; }
        .stats {
          max-width: 1280px; margin: 0 auto; padding: 0 24px; position: relative; z-index: 4; margin-top: -44px;
        }
        .stats-box {
          background: linear-gradient(135deg, rgba(24,24,27,.96), rgba(10,10,12,.96));
          border: 1px solid rgba(255,255,255,.08); border-radius: 22px; padding: 18px 20px;
          display: grid; grid-template-columns: repeat(4, minmax(0,1fr)); gap: 14px;
          box-shadow: 0 16px 40px rgba(0,0,0,.34);
        }
        .stat-item { background: rgba(255,255,255,.03); border-radius: 16px; padding: 14px; }
        .stat-label { color: #a1a1aa; font-size: 12px; text-transform: uppercase; letter-spacing: .15em; margin-bottom: 8px; }
        .stat-value { font-size: 26px; font-weight: 800; }
        .main { position: relative; z-index: 3; padding-top: 30px; padding-bottom: 50px; }
        .section { max-width: 1280px; margin: 0 auto 34px; padding: 0 24px; }
        .section h2 { margin: 0 0 16px; font-size: 30px; }
        .grid { display: grid; grid-template-columns: repeat(5, minmax(0,1fr)); gap: 16px; }
        .card {
          background: rgba(24,24,27,.95); border: 1px solid rgba(255,255,255,.08); border-radius: 18px;
          overflow: hidden; transition: transform .25s ease, border-color .25s ease, box-shadow .25s ease;
          box-shadow: 0 10px 30px rgba(0,0,0,.28);
        }
        .card:hover { transform: translateY(-4px) scale(1.02); border-color: rgba(229,9,20,.45); }
        .poster { position: relative; height: 240px; overflow: hidden; background: #18181b; }
        .poster img { width: 100%; height: 100%; object-fit: cover; display: block; transition: transform .4s ease; }
        .card:hover .poster img { transform: scale(1.08); }
        .poster-overlay { position: absolute; inset: 0; background: linear-gradient(to top, rgba(0,0,0,.86), transparent); }
        .genre-tag {
          position: absolute; left: 12px; right: 12px; bottom: 12px;
          color: #fda4af; font-size: 11px; text-transform: uppercase; letter-spacing: .15em; font-weight: 700;
        }
        .play-badge {
          position: absolute; top: 12px; right: 12px; background: rgba(229,9,20,.9); color: white;
          border-radius: 999px; padding: 8px 12px; font-size: 12px; font-weight: 800;
          box-shadow: 0 10px 25px rgba(229,9,20,.3);
        }
        .card-body { padding: 14px; }
        .type-badge {
          display: inline-block; margin-bottom: 10px; border-radius: 999px; padding: 6px 10px;
          background: rgba(255,255,255,.07); color: #e4e4e7; font-size: 11px; letter-spacing: .12em; text-transform: uppercase;
        }
        .title-row { display: flex; align-items: flex-start; justify-content: space-between; gap: 10px; margin-bottom: 8px; }
        .movie-title { font-size: 17px; font-weight: 700; line-height: 1.3; }
        .year {
          flex-shrink: 0; background: rgba(255,255,255,.08); color: #d4d4d8;
          border-radius: 6px; padding: 6px 8px; font-size: 12px;
        }
        .movie-desc { color: #a1a1aa; font-size: 14px; line-height: 1.6; min-height: 90px; }
        .card-actions { display: flex; gap: 10px; margin-top: 14px; }
        .card-btn {
          flex: 1; border: 0; border-radius: 10px; padding: 10px 12px; font-weight: 700; cursor: pointer;
          transition: transform .18s ease, opacity .18s ease;
        }
        .card-btn:hover { transform: translateY(-1px); }
        .card-play { background: #fff; color: #000; }
        .card-info { background: rgba(255,255,255,.08); color: white; }
        .empty {
          max-width: 1280px; margin: 30px auto; padding: 0 24px; color: #a1a1aa; font-size: 18px;
        }
        .modal {
          position: fixed; inset: 0; z-index: 100; background: rgba(0,0,0,.82); display: flex;
          align-items: center; justify-content: center; padding: 22px;
        }
        .modal-box {
          width: min(1100px, 100%); max-height: 92vh; overflow: auto;
          background: #0f0f14; border: 1px solid rgba(255,255,255,.08); border-radius: 22px;
          box-shadow: 0 30px 80px rgba(0,0,0,.5);
        }
        .modal-top {
          display: flex; align-items: center; justify-content: space-between; padding: 18px 18px 0 18px;
        }
        .close-btn {
          border: 0; background: rgba(255,255,255,.08); color: white; width: 40px; height: 40px;
          border-radius: 999px; cursor: pointer; font-size: 20px;
        }
        .video-wrap { padding: 18px; }
        .video-player {
          width: 100%; max-height: 62vh; background: black; border-radius: 18px; overflow: hidden;
        }
        .video-player video { width: 100%; height: 100%; display: block; }
        .modal-content { padding: 0 18px 22px 18px; }
        .modal-title { font-size: 34px; font-weight: 900; margin: 4px 0 10px; }
        .modal-meta { color: #d4d4d8; margin-bottom: 16px; }
        .modal-desc { color: #d4d4d8; line-height: 1.8; font-size: 16px; }
        .footer {
          border-top: 1px solid rgba(255,255,255,.08); color: #71717a; text-align: center;
          padding: 26px 24px 34px; font-size: 14px;
        }
        @media (max-width: 1100px) {
          .grid { grid-template-columns: repeat(4, minmax(0,1fr)); }
          .stats-box { grid-template-columns: repeat(2, minmax(0,1fr)); }
        }
        @media (max-width: 860px) {
          .nav { display: none; }
          .hero h1 { font-size: 44px; }
          .desc, .meta { font-size: 16px; }
          .grid { grid-template-columns: repeat(3, minmax(0,1fr)); }
          .search { min-width: 140px; }
        }
        @media (max-width: 560px) {
          .header-inner, .hero-content, .section, .stats, .empty { padding-left: 14px; padding-right: 14px; }
          .logo { font-size: 28px; }
          .hero { min-height: 72vh; }
          .hero h1 { font-size: 34px; }
          .grid { grid-template-columns: repeat(2, minmax(0,1fr)); gap: 12px; }
          .poster { height: 190px; }
          .section h2 { font-size: 24px; }
          .movie-desc { min-height: auto; }
          .stats-box { grid-template-columns: 1fr; }
          .search { display: none; }
          .modal-title { font-size: 26px; }
        }
      `}</style>

      <div className="app">
        <header className="header">
          <div className="header-inner">
            <div className="left">
              <div className="logo">Drike</div>
              <nav className="nav">
                <a href="#">Início</a>
                <a href="#">Filmes</a>
                <a href="#">Séries</a>
                <a href="#">Desenhos</a>
              </nav>
            </div>

            <div className="right">
              <input
                className="search"
                type="text"
                placeholder="Buscar filme, série, desenho..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <div className="avatar">D</div>
            </div>
          </div>
        </header>

        <section className="hero">
          <div className="hero-bg" style={{ backgroundImage: `url(${featured.image})` }} />
          <div className="overlay-a" />
          <div className="overlay-b" />
          <div className="hero-content">
            <div className="badge">Destaque Drike</div>
            <h1>{featured.title}</h1>
            <div className="meta">{featured.year} • {featured.genre}</div>
            <div className="desc">{featured.description}</div>
            <div className="buttons">
              <button className="btn btn-primary" onClick={() => openMovie(featured)}>
                ▶ Assistir agora
              </button>
              <button className="btn btn-secondary" onClick={() => openMovie(featured)}>
                Mais informações
              </button>
            </div>
          </div>
        </section>

        <section className="stats">
          <div className="stats-box">
            <div className="stat-item">
              <div className="stat-label">Títulos no catálogo</div>
              <div className="stat-value">{allMovies.length}</div>
            </div>
            <div className="stat-item">
              <div className="stat-label">Filmes</div>
              <div className="stat-value">{allMovies.filter((item) => item.type === "Filme").length}</div>
            </div>
            <div className="stat-item">
              <div className="stat-label">Séries</div>
              <div className="stat-value">{allMovies.filter((item) => item.type === "Série").length}</div>
            </div>
            <div className="stat-item">
              <div className="stat-label">Desenhos</div>
              <div className="stat-value">{allMovies.filter((item) => item.type === "Desenho").length}</div>
            </div>
          </div>
        </section>

        <main className="main">
          {filteredCategories.length === 0 ? (
            <div className="empty">Nenhum resultado encontrado para sua busca.</div>
          ) : (
            filteredCategories.map((category) => (
              <section className="section" key={category.name}>
                <h2>{category.name}</h2>
                <div className="grid">
                  {category.movies.map((movie) => (
                    <article className="card" key={movie.id}>
                      <div className="poster">
                        <img src={movie.image} alt={movie.title} />
                        <div className="poster-overlay" />
                        <div className="play-badge">▶ Play</div>
                        <div className="genre-tag">{movie.genre}</div>
                      </div>
                      <div className="card-body">
                        <div className="type-badge">{movie.type}</div>
                        <div className="title-row">
                          <div className="movie-title">{movie.title}</div>
                          <div className="year">{movie.year}</div>
                        </div>
                        <div className="movie-desc">{movie.description}</div>
                        <div className="card-actions">
                          <button className="card-btn card-play" onClick={() => openMovie(movie)}>
                            ▶ Assistir
                          </button>
                          <button className="card-btn card-info" onClick={() => openMovie(movie)}>
                            Detalhes
                          </button>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            ))
          )}
        </main>

        <footer className="footer">
          © 2026 Drike — catálogo visual com player, descrições completas e clima premium de streaming.
        </footer>

        {selectedMovie && (
          <div className="modal" onClick={closeMovie}>
            <div className="modal-box" onClick={(e) => e.stopPropagation()}>
              <div className="modal-top">
                <div />
                <button className="close-btn" onClick={closeMovie}>×</button>
              </div>
              <div className="video-wrap">
                <div className="video-player">
                  <video controls autoPlay poster={selectedMovie.image}>
                    <source src={selectedMovie.video} type="video/mp4" />
                    Seu navegador não suporta vídeo.
                  </video>
                </div>
              </div>
              <div className="modal-content">
                <div className="type-badge">{selectedMovie.type}</div>
                <div className="modal-title">{selectedMovie.title}</div>
                <div className="modal-meta">
                  {selectedMovie.year} • {selectedMovie.genre}
                </div>
                <div className="modal-desc">{selectedMovie.description}</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
