import React, { useEffect, useMemo, useRef, useState } from "react";
import { auth, provider, db, storage } from "./firebase";
import { signInWithPopup, onAuthStateChanged, signOut } from "firebase/auth";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import {
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";

const ADMIN_EMAIL = "andreyribeiro392@gmail.com";
const MOVIES_COLLECTION = "drick_catalog";

const DEFAULT_POSTER =
  "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=900&q=80";
const DEFAULT_BANNER =
  "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?auto=format&fit=crop&w=1800&q=80";

const CATEGORY_OPTIONS = [
  "Todos",
  "Filmes",
  "Séries",
  "Animes",
  "Ação",
  "Terror",
  "Romance",
  "Comédia",
  "Suspense",
  "Ficção",
];

const TYPE_OPTIONS = ["Todos", "filme", "série", "anime"];

const SORT_OPTIONS = [
  { value: "popularidade", label: "Popularidade" },
  { value: "ano", label: "Ano" },
  { value: "titulo", label: "Título" },
  { value: "recentes", label: "Recentes" },
];

const EMPTY_FORM = {
  title: "",
  description: "",
  synopsis: "",
  category: "Filmes",
  genre: "",
  type: "filme",
  year: "",
  duration: "",
  rating: "",
  cast: "",
  director: "",
  seasons: "",
  episodes: "",
  featured: false,
  popularity: "",
  tags: "",
  language: "",
  subtitle: "",
  status: "publicado",
  recommended: false,
  views: "",
};

const INITIAL_MOVIES = [
  {
    id: "seed-1",
    title: "Godzilla",
    description: "O monstro lendário que marcou o cinema japonês.",
    synopsis:
      "Após testes nucleares no Pacífico, uma criatura colossal surge do oceano e ameaça destruir Tóquio. Um clássico absoluto do cinema de monstros.",
    category: "Filmes",
    genre: "Ficção, Terror",
    type: "filme",
    year: "1954",
    duration: "1h 36min",
    rating: "12 anos",
    cast: "Akira Takarada, Momoko Kōchi, Akihiko Hirata",
    director: "Ishirō Honda",
    seasons: "",
    episodes: "",
    featured: true,
    coverUrl:
      "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=900&q=80",
    bannerUrl:
      "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?auto=format&fit=crop&w=1800&q=80",
    videoUrl: "",
    trailerUrl: "",
    popularity: 88,
    createdAtMs: Date.now() - 100000,
    tags: ["classico", "monstro", "japao", "1950"],
    language: "Japonês",
    subtitle: "Português",
    status: "publicado",
    recommended: true,
    views: 0,
  },
  {
    id: "seed-2",
    title: "Seven Samurai",
    description: "Uma obra-prima épica do cinema mundial.",
    synopsis:
      "Em um vilarejo ameaçado por bandidos, sete samurais são contratados para defender os camponeses. Um dos maiores filmes de todos os tempos.",
    category: "Filmes",
    genre: "Ação, Drama",
    type: "filme",
    year: "1954",
    duration: "3h 27min",
    rating: "14 anos",
    cast: "Toshiro Mifune, Takashi Shimura",
    director: "Akira Kurosawa",
    seasons: "",
    episodes: "",
    featured: false,
    coverUrl:
      "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=900&q=80",
    bannerUrl:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1800&q=80",
    videoUrl: "",
    trailerUrl: "",
    popularity: 95,
    createdAtMs: Date.now() - 90000,
    tags: ["samurai", "classico", "acao", "1950"],
    language: "Japonês",
    subtitle: "Português",
    status: "publicado",
    recommended: true,
    views: 0,
  },
  {
    id: "seed-3",
    title: "Rear Window",
    description: "Suspense clássico e inesquecível.",
    synopsis:
      "Um fotógrafo preso em casa passa a observar os vizinhos pela janela e começa a suspeitar que testemunhou um assassinato.",
    category: "Filmes",
    genre: "Suspense, Mistério",
    type: "filme",
    year: "1954",
    duration: "1h 52min",
    rating: "12 anos",
    cast: "James Stewart, Grace Kelly",
    director: "Alfred Hitchcock",
    seasons: "",
    episodes: "",
    featured: false,
    coverUrl:
      "https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&w=900&q=80",
    bannerUrl:
      "https://images.unsplash.com/photo-1513106580091-1d82408b8cd6?auto=format&fit=crop&w=1800&q=80",
    videoUrl: "",
    trailerUrl: "",
    popularity: 90,
    createdAtMs: Date.now() - 80000,
    tags: ["suspense", "classico", "misterio", "1950"],
    language: "Inglês",
    subtitle: "Português",
    status: "publicado",
    recommended: true,
    views: 0,
  },
  {
    id: "seed-4",
    title: "Ben-Hur",
    description: "Grandioso épico histórico do cinema.",
    synopsis:
      "Judah Ben-Hur enfrenta traição, escravidão e vingança em uma das maiores produções épicas já feitas.",
    category: "Filmes",
    genre: "Ação, Drama, Épico",
    type: "filme",
    year: "1959",
    duration: "3h 32min",
    rating: "12 anos",
    cast: "Charlton Heston, Jack Hawkins",
    director: "William Wyler",
    seasons: "",
    episodes: "",
    featured: false,
    coverUrl:
      "https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=900&q=80",
    bannerUrl:
      "https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?auto=format&fit=crop&w=1800&q=80",
    videoUrl: "",
    trailerUrl: "",
    popularity: 91,
    createdAtMs: Date.now() - 70000,
    tags: ["epico", "classico", "historico", "1950"],
    language: "Inglês",
    subtitle: "Português",
    status: "publicado",
    recommended: false,
    views: 0,
  },
  {
    id: "seed-5",
    title: "12 Angry Men",
    description: "Drama intenso dentro de uma sala de júri.",
    synopsis:
      "Doze jurados decidem o destino de um jovem acusado de assassinato, enquanto um único homem insiste em questionar as evidências.",
    category: "Filmes",
    genre: "Drama",
    type: "filme",
    year: "1957",
    duration: "1h 36min",
    rating: "12 anos",
    cast: "Henry Fonda, Lee J. Cobb",
    director: "Sidney Lumet",
    seasons: "",
    episodes: "",
    featured: false,
    coverUrl:
      "https://images.unsplash.com/photo-1512070679279-8988d32161be?auto=format&fit=crop&w=900&q=80",
    bannerUrl:
      "https://images.unsplash.com/photo-1460881680858-30d872d5b530?auto=format&fit=crop&w=1800&q=80",
    videoUrl: "",
    trailerUrl: "",
    popularity: 93,
    createdAtMs: Date.now() - 60000,
    tags: ["drama", "juri", "classico", "1950"],
    language: "Inglês",
    subtitle: "Português",
    status: "publicado",
    recommended: true,
    views: 0,
  },
  {
    id: "seed-6",
    title: "Demon Slayer",
    description: "Um dos animes mais populares da atualidade.",
    synopsis:
      "Após sua família ser atacada por demônios, Tanjiro Kamado parte em uma jornada para salvar sua irmã e se tornar um caçador de demônios.",
    category: "Animes",
    genre: "Ação, Fantasia",
    type: "anime",
    year: "2019",
    duration: "24min",
    rating: "14 anos",
    cast: "Natsuki Hanae, Akari Kitō",
    director: "Haruo Sotozaki",
    seasons: "4",
    episodes: "60+",
    featured: true,
    coverUrl:
      "https://images.unsplash.com/photo-1542204637-e67bc7d41e48?auto=format&fit=crop&w=900&q=80",
    bannerUrl:
      "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=1800&q=80",
    videoUrl: "",
    trailerUrl: "",
    popularity: 98,
    createdAtMs: Date.now() - 50000,
    tags: ["anime", "acao", "fantasia", "dublado"],
    language: "Japonês",
    subtitle: "Português",
    status: "publicado",
    recommended: true,
    views: 0,
  },
  {
    id: "seed-7",
    title: "Attack on Titan",
    description: "Um anime intenso, épico e sombrio.",
    synopsis:
      "A humanidade vive cercada por muralhas para se proteger de gigantes devoradores de humanos. Eren decide lutar após uma tragédia devastadora.",
    category: "Animes",
    genre: "Ação, Drama, Fantasia",
    type: "anime",
    year: "2013",
    duration: "24min",
    rating: "16 anos",
    cast: "Yuki Kaji, Yui Ishikawa",
    director: "Tetsuro Araki",
    seasons: "4",
    episodes: "80+",
    featured: true,
    coverUrl:
      "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=900&q=80",
    bannerUrl:
      "https://images.unsplash.com/photo-1487180144351-b8472da7d491?auto=format&fit=crop&w=1800&q=80",
    videoUrl: "",
    trailerUrl: "",
    popularity: 99,
    createdAtMs: Date.now() - 40000,
    tags: ["anime", "acao", "drama", "epico"],
    language: "Japonês",
    subtitle: "Português",
    status: "publicado",
    recommended: true,
    views: 0,
  },
  {
    id: "seed-8",
    title: "Jujutsu Kaisen",
    description: "Maldições, batalhas e muita ação.",
    synopsis:
      "Yuji Itadori entra para o mundo dos feiticeiros jujutsu depois de entrar em contato com um objeto amaldiçoado extremamente perigoso.",
    category: "Animes",
    genre: "Ação, Sobrenatural",
    type: "anime",
    year: "2020",
    duration: "24min",
    rating: "16 anos",
    cast: "Junya Enoki, Yuma Uchida",
    director: "Sunghoo Park",
    seasons: "2",
    episodes: "40+",
    featured: false,
    coverUrl:
      "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?auto=format&fit=crop&w=900&q=80",
    bannerUrl:
      "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=1800&q=80",
    videoUrl: "",
    trailerUrl: "",
    popularity: 96,
    createdAtMs: Date.now() - 30000,
    tags: ["anime", "sobrenatural", "acao", "popular"],
    language: "Japonês",
    subtitle: "Português",
    status: "publicado",
    recommended: true,
    views: 0,
  },
  {
    id: "seed-9",
    title: "Naruto",
    description: "O clássico ninja que marcou gerações.",
    synopsis:
      "Naruto Uzumaki sonha em se tornar Hokage e conquistar o respeito de sua vila, enquanto enfrenta desafios, rivais e inimigos poderosos.",
    category: "Animes",
    genre: "Ação, Aventura",
    type: "anime",
    year: "2002",
    duration: "23min",
    rating: "12 anos",
    cast: "Junko Takeuchi, Noriaki Sugiyama",
    director: "Hayato Date",
    seasons: "9",
    episodes: "220",
    featured: false,
    coverUrl:
      "https://images.unsplash.com/photo-1518709268805-4e9042af2176?auto=format&fit=crop&w=900&q=80",
    bannerUrl:
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1800&q=80",
    videoUrl: "",
    trailerUrl: "",
    popularity: 94,
    createdAtMs: Date.now() - 20000,
    tags: ["anime", "ninja", "aventura", "classico"],
    language: "Japonês",
    subtitle: "Português",
    status: "publicado",
    recommended: false,
    views: 0,
  },
  {
    id: "seed-10",
    title: "One Piece",
    description: "A jornada pirata mais famosa dos animes.",
    synopsis:
      "Monkey D. Luffy parte em busca do lendário tesouro One Piece para se tornar o Rei dos Piratas ao lado de sua tripulação.",
    category: "Animes",
    genre: "Aventura, Ação, Fantasia",
    type: "anime",
    year: "1999",
    duration: "24min",
    rating: "12 anos",
    cast: "Mayumi Tanaka, Kazuya Nakai",
    director: "Konosuke Uda",
    seasons: "Saga contínua",
    episodes: "1000+",
    featured: true,
    coverUrl:
      "https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=900&q=80",
    bannerUrl:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1800&q=80",
    videoUrl: "",
    trailerUrl: "",
    popularity: 97,
    createdAtMs: Date.now() - 10000,
    tags: ["anime", "pirata", "aventura", "epico"],
    language: "Japonês",
    subtitle: "Português",
    status: "publicado",
    recommended: true,
    views: 0,
  },
];

function slugify(value = "") {
  return value
    .toString()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

function safeText(value, fallback = "—") {
  if (value === undefined || value === null || value === "") return fallback;
  return value;
}

function parseTags(value = "") {
  return value
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);
}

function formatViews(value) {
  const num = Number(value || 0);
  if (!num) return "0";
  return new Intl.NumberFormat("pt-BR").format(num);
}

function formatYear(value) {
  return value ? String(value) : "—";
}

function pickHeroItem(movies) {
  if (!movies.length) return null;
  const featured = movies
    .filter((movie) => movie.featured)
    .sort((a, b) => {
      const aDate = a.createdAtMs || 0;
      const bDate = b.createdAtMs || 0;
      return bDate - aDate;
    });
  return featured[0] || movies[0];
}

function buildSearchIndex(movie) {
  return slugify(
    [
      movie.title,
      movie.description,
      movie.synopsis,
      movie.category,
      movie.cast,
      movie.type,
      movie.genre,
      movie.director,
      Array.isArray(movie.tags) ? movie.tags.join(" ") : movie.tags,
    ]
      .filter(Boolean)
      .join(" ")
  );
}

function normalizeMovie(raw) {
  const createdAtMs =
    raw?.createdAt?.seconds != null
      ? raw.createdAt.seconds * 1000
      : raw?.createdAtMs || Date.now();

  return {
    id: raw.id,
    title: raw.title || "",
    description: raw.description || "",
    synopsis: raw.synopsis || "",
    category: raw.category || "Filmes",
    genre: raw.genre || "",
    type: raw.type || "filme",
    year: raw.year || "",
    duration: raw.duration || "",
    rating: raw.rating || "",
    cast: raw.cast || "",
    director: raw.director || "",
    seasons: raw.seasons || "",
    episodes: raw.episodes || "",
    featured: !!raw.featured,
    coverUrl: raw.coverUrl || "",
    bannerUrl: raw.bannerUrl || "",
    videoUrl: raw.videoUrl || "",
    trailerUrl: raw.trailerUrl || "",
    popularity: Number(raw.popularity || 0),
    createdAt: raw.createdAt || null,
    createdAtMs,
    tags: Array.isArray(raw.tags) ? raw.tags : parseTags(raw.tags || ""),
    language: raw.language || "",
    subtitle: raw.subtitle || "",
    status: raw.status || "publicado",
    recommended: !!raw.recommended,
    views: Number(raw.views || 0),
    searchIndex: buildSearchIndex(raw),
  };
}

function useLocalStorageState(key, initialValue) {
  const [state, setState] = useState(() => {
    try {
      const stored = localStorage.getItem(key);
      return stored ? JSON.parse(stored) : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(state));
    } catch {
      //
    }
  }, [key, state]);

  return [state, setState];
}

function App() {
  const heroRef = useRef(null);
  const [movies, setMovies] = useState([]);
  const [loadingCatalog, setLoadingCatalog] = useState(true);
  const [catalogError, setCatalogError] = useState("");
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Todos");
  const [typeFilter, setTypeFilter] = useState("Todos");
  const [sortBy, setSortBy] = useState("popularidade");
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [showAdmin, setShowAdmin] = useState(false);
  const [showMyList, setShowMyList] = useState(false);
  const [toast, setToast] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [favorites, setFavorites] = useLocalStorageState("drick_favorites", []);
  const [history, setHistory] = useLocalStorageState("drick_history", []);

  const isAdmin =
    user?.email && String(user.email).trim().toLowerCase() === ADMIN_EMAIL;

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser || null);
      setAuthLoading(false);
    });
    return () => unsub();
  }, []);

  useEffect(() => {
    fetchMovies();
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(null), 3400);
    return () => clearTimeout(timer);
  }, [toast]);

  async function fetchMovies() {
    setLoadingCatalog(true);
    setCatalogError("");

    try {
      const snapshot = await getDocs(collection(db, MOVIES_COLLECTION));
      const firebaseItems = snapshot.docs.map((item) =>
        normalizeMovie({ id: item.id, ...item.data() })
      );

      const seedItems = INITIAL_MOVIES.map((item) => normalizeMovie(item));

      const allItems =
        firebaseItems.length > 0 ? [...firebaseItems] : [...seedItems];

      allItems.sort((a, b) => {
        if ((b.popularity || 0) !== (a.popularity || 0)) {
          return (b.popularity || 0) - (a.popularity || 0);
        }
        return (b.createdAtMs || 0) - (a.createdAtMs || 0);
      });

      setMovies(allItems);
    } catch (error) {
      console.error("ERRO AO CARREGAR CATÁLOGO:", error);

      const seedItems = INITIAL_MOVIES.map((item) => normalizeMovie(item));
      setMovies(seedItems);

      setCatalogError("");
      showToast("Catálogo carregado com filmes locais de exemplo.", "info");
    } finally {
      setLoadingCatalog(false);
    }
  }

  function showToast(message, type = "info") {
    setToast({
      id: Date.now(),
      message,
      type,
    });
  }

  async function handleGoogleLogin() {
    setGoogleLoading(true);
    try {
      await signInWithPopup(auth, provider);
      showToast("Login realizado com sucesso.", "success");
    } catch (error) {
      console.error("ERRO GOOGLE LOGIN:", error);
      console.error("CODE:", error?.code);
      console.error("MESSAGE:", error?.message);

      const code = error?.code || "";
      let message = `Erro ao entrar com Google: ${code || "desconhecido"}`;

      if (code.includes("popup-blocked")) {
        message =
          "O popup foi bloqueado pelo navegador. Libere popups e tente novamente.";
      } else if (code.includes("popup-closed-by-user")) {
        message = "O login foi fechado antes de ser concluído.";
      } else if (code.includes("unauthorized-domain")) {
        message =
          "Este domínio ainda não está autorizado no Firebase Authentication.";
      } else if (code.includes("operation-not-allowed")) {
        message =
          "O login com Google ainda não está ativado no Firebase Authentication.";
      } else if (code.includes("network-request-failed")) {
        message = "Falha de rede ao tentar entrar com Google.";
      }

      showToast(message, "error");
    } finally {
      setGoogleLoading(false);
    }
  }

  async function handleLogout() {
    try {
      await signOut(auth);
      showToast("Você saiu da sua conta.", "info");
    } catch (error) {
      console.error(error);
      showToast("Não foi possível sair agora.", "error");
    }
  }

  function scrollToHero() {
    heroRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function toggleFavorite(movieId) {
    setFavorites((current) => {
      const exists = current.includes(movieId);
      const next = exists
        ? current.filter((id) => id !== movieId)
        : [...current, movieId];

      showToast(
        exists ? "Removido da Minha Lista." : "Adicionado à Minha Lista.",
        exists ? "info" : "success"
      );

      return next;
    });
  }

  function addToHistory(movie) {
    if (!movie?.id) return;

    setHistory((current) => {
      const cleaned = current.filter((item) => item.id !== movie.id);
      const entry = {
        id: movie.id,
        title: movie.title,
        coverUrl: movie.coverUrl || "",
        timestamp: Date.now(),
      };
      return [entry, ...cleaned].slice(0, 20);
    });
  }

  function incrementLocalView(movieId) {
    setMovies((current) =>
      current.map((item) =>
        item.id === movieId
          ? { ...item, views: Number(item.views || 0) + 1 }
          : item
      )
    );
  }

  const heroMovie = useMemo(() => pickHeroItem(movies), [movies]);

  const favoriteMovies = useMemo(
    () => movies.filter((movie) => favorites.includes(movie.id)),
    [movies, favorites]
  );

  const highlightedMovies = useMemo(
    () =>
      movies
        .filter((movie) => movie.featured || movie.recommended)
        .sort((a, b) => (b.popularity || 0) - (a.popularity || 0))
        .slice(0, 12),
    [movies]
  );

  const filteredMovies = useMemo(() => {
    let result = [...movies];

    if (category !== "Todos") {
      const normalizedCategory = slugify(category);

      result = result.filter((movie) => {
        const movieCategory = slugify(movie.category);
        const movieGenre = slugify(movie.genre);
        const movieType = slugify(movie.type);

        if (normalizedCategory === "filmes" && movieType === "filme") {
          return true;
        }

        if (normalizedCategory === "series" && movieType === "serie") {
          return true;
        }

        if (normalizedCategory === "series" && movieType === "série") {
          return true;
        }

        if (normalizedCategory === "animes" && movieType === "anime") {
          return true;
        }

        return (
          movieCategory.includes(normalizedCategory) ||
          movieGenre.includes(normalizedCategory) ||
          movieType.includes(normalizedCategory)
        );
      });
    }

    if (typeFilter !== "Todos") {
      const normalizedType = slugify(typeFilter);
      result = result.filter((movie) => slugify(movie.type) === normalizedType);
    }

    if (search.trim()) {
      const q = slugify(search.trim());
      result = result.filter((movie) => movie.searchIndex.includes(q));
    }

    if (sortBy === "popularidade") {
      result.sort((a, b) => (b.popularity || 0) - (a.popularity || 0));
    } else if (sortBy === "ano") {
      result.sort((a, b) => Number(b.year || 0) - Number(a.year || 0));
    } else if (sortBy === "titulo") {
      result.sort((a, b) => a.title.localeCompare(b.title, "pt-BR"));
    } else if (sortBy === "recentes") {
      result.sort((a, b) => (b.createdAtMs || 0) - (a.createdAtMs || 0));
    }

    return result;
  }, [movies, category, typeFilter, search, sortBy]);

  const relatedMovies = useMemo(() => {
    if (!selectedMovie) return [];

    return movies
      .filter((movie) => movie.id !== selectedMovie.id)
      .map((movie) => {
        let score = 0;

        if (slugify(movie.category) === slugify(selectedMovie.category)) score += 2;
        if (slugify(movie.type) === slugify(selectedMovie.type)) score += 2;

        if (
          movie.genre &&
          selectedMovie.genre &&
          slugify(movie.genre).includes(slugify(selectedMovie.genre))
        ) {
          score += 3;
        }

        const selectedTags = Array.isArray(selectedMovie.tags)
          ? selectedMovie.tags.map((tag) => slugify(tag))
          : [];

        const movieTags = Array.isArray(movie.tags)
          ? movie.tags.map((tag) => slugify(tag))
          : [];

        const commonTags = movieTags.filter((tag) => selectedTags.includes(tag));
        score += commonTags.length;

        return { ...movie, _score: score };
      })
      .sort((a, b) => {
        if (b._score !== a._score) return b._score - a._score;
        return (b.popularity || 0) - (a.popularity || 0);
      })
      .slice(0, 8);
  }, [movies, selectedMovie]);

  async function handleSaveMovie(payload) {
    if (!isAdmin) {
      showToast("Acesso restrito ao administrador.", "error");
      return;
    }

    try {
      if (payload.id) {
        const movieRef = doc(db, MOVIES_COLLECTION, payload.id);
        const { id, ...dataToSave } = payload;

        await updateDoc(movieRef, {
          ...dataToSave,
          updatedAt: serverTimestamp(),
        });

        setMovies((current) =>
          current.map((item) =>
            item.id === id
              ? normalizeMovie({
                  ...item,
                  ...dataToSave,
                  id,
                  updatedAt: { seconds: Math.floor(Date.now() / 1000) },
                })
              : item
          )
        );

        if (selectedMovie?.id === id) {
          setSelectedMovie((current) =>
            current
              ? normalizeMovie({
                  ...current,
                  ...dataToSave,
                  id,
                  updatedAt: { seconds: Math.floor(Date.now() / 1000) },
                })
              : current
          );
        }

        showToast("Conteúdo atualizado com sucesso.", "success");
      } else {
        const dataToSave = {
          ...payload,
          createdAt: serverTimestamp(),
          createdAtMs: Date.now(),
          updatedAt: serverTimestamp(),
        };

        const docRef = await addDoc(collection(db, MOVIES_COLLECTION), dataToSave);

        const newMovie = normalizeMovie({
          id: docRef.id,
          ...payload,
          createdAtMs: Date.now(),
        });

        setMovies((current) => [newMovie, ...current]);
        showToast("Conteúdo adicionado com sucesso.", "success");
      }
    } catch (error) {
      console.error("ERRO AO SALVAR CONTEÚDO:", error);
      showToast(
        error?.message
          ? `Falha ao salvar: ${error.message}`
          : "Falha ao salvar o conteúdo.",
        "error"
      );
      throw error;
    }
  }

  async function handleDeleteMovie(movieId) {
    if (!isAdmin || !movieId) {
      showToast("Acesso restrito ao administrador.", "error");
      return;
    }

    try {
      await deleteDoc(doc(db, MOVIES_COLLECTION, movieId));
      setMovies((current) => current.filter((item) => item.id !== movieId));

      if (selectedMovie?.id === movieId) {
        setSelectedMovie(null);
      }

      showToast("Conteúdo excluído com sucesso.", "success");
    } catch (error) {
      console.error("ERRO AO EXCLUIR:", error);
      showToast("Falha ao excluir o conteúdo.", "error");
    }
  }

  function openMovie(movie) {
    setSelectedMovie(movie);
  }

  function handlePlay(movie) {
    if (!movie?.videoUrl) {
      showToast("Este conteúdo ainda não possui vídeo disponível.", "info");
      return;
    }

    addToHistory(movie);
    incrementLocalView(movie.id);
    setSelectedMovie(movie);
  }

  return (
    <>
      <style>{`
        :root{
          --bg:#070b14;
          --bg-soft:#0d1320;
          --bg-soft-2:#0f1627;
          --panel:rgba(255,255,255,.06);
          --panel-2:rgba(255,255,255,.08);
          --panel-3:rgba(255,255,255,.12);
          --border:rgba(255,255,255,.1);
          --text:#f6f8ff;
          --muted:#b3bdd4;
          --muted-2:#8c97b3;
          --primary:#ff2f43;
          --primary-2:#ff6b6b;
          --accent:#6c7dff;
          --success:#1fc98b;
          --warning:#ffb649;
          --danger:#ff5b76;
          --shadow:0 24px 70px rgba(0,0,0,.45);
          --radius:24px;
          --radius-lg:32px;
          --container:1280px;
        }

        *{box-sizing:border-box}
        html{scroll-behavior:smooth}
        body{
          margin:0;
          font-family:Inter,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;
          background:
            radial-gradient(circle at top left, rgba(108,125,255,.18), transparent 26%),
            radial-gradient(circle at top right, rgba(255,47,67,.12), transparent 20%),
            linear-gradient(180deg,#050811 0%,#070b14 28%,#0a1020 100%);
          color:var(--text);
        }
        button,input,select,textarea{
          font:inherit;
        }
        a{
          color:inherit;
          text-decoration:none;
        }
        img{
          display:block;
          max-width:100%;
        }

        .app-shell{
          min-height:100vh;
          color:var(--text);
        }

        .container{
          width:min(calc(100% - 32px), var(--container));
          margin:0 auto;
        }

        .topbar{
          position:fixed;
          top:0;
          left:0;
          right:0;
          z-index:80;
          transition:.25s ease;
          border-bottom:1px solid transparent;
          backdrop-filter:saturate(140%) blur(8px);
        }

        .topbar.top{
          background:linear-gradient(180deg,rgba(4,7,14,.72),rgba(4,7,14,.18));
        }

        .topbar.scrolled{
          background:rgba(6,10,19,.82);
          border-bottom-color:rgba(255,255,255,.08);
          box-shadow:0 12px 40px rgba(0,0,0,.22);
        }

        .topbar-inner{
          display:flex;
          align-items:center;
          justify-content:space-between;
          gap:20px;
          min-height:76px;
        }

        .brand{
          display:inline-flex;
          align-items:center;
          gap:4px;
          font-weight:900;
          font-size:1.6rem;
          letter-spacing:.12em;
          cursor:pointer;
          user-select:none;
        }

        .brand .brand-d{
          display:inline-grid;
          place-items:center;
          width:42px;
          height:42px;
          border-radius:14px;
          background:
            linear-gradient(135deg, rgba(255,47,67,1), rgba(255,120,120,1));
          box-shadow:
            0 16px 30px rgba(255,47,67,.35),
            inset 0 1px 0 rgba(255,255,255,.25);
          color:white;
          font-size:1.3rem;
          margin-right:2px;
        }

        .brand span:last-child{
          color:#f7f9ff;
        }

        .nav-right{
          display:flex;
          align-items:center;
          gap:12px;
          flex-wrap:wrap;
          justify-content:flex-end;
        }

        .ghost-btn,
        .primary-btn,
        .soft-btn,
        .danger-btn{
          border:none;
          outline:none;
          cursor:pointer;
          transition:.2s ease;
          border-radius:999px;
          padding:12px 18px;
          font-weight:700;
          letter-spacing:.01em;
        }

        .primary-btn{
          background:linear-gradient(135deg,var(--primary),var(--primary-2));
          color:white;
          box-shadow:0 18px 30px rgba(255,47,67,.28);
        }

        .primary-btn:hover{
          transform:translateY(-1px);
          filter:brightness(1.05);
        }

        .soft-btn{
          background:rgba(255,255,255,.08);
          color:var(--text);
          border:1px solid rgba(255,255,255,.08);
        }

        .soft-btn:hover,
        .ghost-btn:hover{
          background:rgba(255,255,255,.13);
        }

        .ghost-btn{
          background:transparent;
          color:var(--text);
          border:1px solid rgba(255,255,255,.12);
        }

        .danger-btn{
          background:rgba(255,91,118,.14);
          color:#ffd3dc;
          border:1px solid rgba(255,91,118,.24);
        }

        .user-badge{
          display:flex;
          align-items:center;
          gap:10px;
          padding:8px 10px 8px 8px;
          border-radius:999px;
          background:rgba(255,255,255,.08);
          border:1px solid rgba(255,255,255,.08);
          max-width:280px;
        }

        .user-avatar{
          width:38px;
          height:38px;
          border-radius:50%;
          object-fit:cover;
          background:rgba(255,255,255,.1);
        }

        .user-meta{
          min-width:0;
          display:flex;
          flex-direction:column;
        }

        .user-name{
          font-size:.92rem;
          font-weight:700;
          white-space:nowrap;
          overflow:hidden;
          text-overflow:ellipsis;
        }

        .user-email{
          font-size:.75rem;
          color:var(--muted);
          white-space:nowrap;
          overflow:hidden;
          text-overflow:ellipsis;
        }

        .hero{
          position:relative;
          min-height:84vh;
          padding-top:110px;
          display:flex;
          align-items:flex-end;
          overflow:hidden;
          background:
            linear-gradient(180deg, rgba(5,8,15,.08), rgba(5,8,15,.72) 70%, rgba(5,8,15,.96) 100%),
            linear-gradient(90deg, rgba(5,8,15,.92), rgba(5,8,15,.55) 42%, rgba(5,8,15,.3) 72%, rgba(5,8,15,.72) 100%);
          border-bottom:1px solid rgba(255,255,255,.08);
        }

        .hero::before{
          content:"";
          position:absolute;
          inset:0;
          background-image:var(--hero-bg);
          background-size:cover;
          background-position:center;
          transform:scale(1.03);
          filter:saturate(1.05);
          z-index:-2;
        }

        .hero::after{
          content:"";
          position:absolute;
          inset:0;
          background:
            radial-gradient(circle at 18% 28%, rgba(255,47,67,.18), transparent 26%),
            radial-gradient(circle at 84% 20%, rgba(108,125,255,.16), transparent 22%);
          z-index:-1;
        }

        .hero-inner{
          position:relative;
          width:min(calc(100% - 32px), var(--container));
          margin:0 auto;
          padding:58px 0 70px;
          display:grid;
          grid-template-columns:minmax(0, 1.2fr) minmax(280px, .8fr);
          gap:28px;
          align-items:end;
        }

        .hero-copy{
          max-width:760px;
        }

        .eyebrow{
          display:inline-flex;
          align-items:center;
          gap:8px;
          padding:8px 12px;
          border-radius:999px;
          background:rgba(255,255,255,.08);
          border:1px solid rgba(255,255,255,.1);
          color:#edf1ff;
          font-size:.84rem;
          margin-bottom:18px;
        }

        .hero-title{
          margin:0;
          font-size:clamp(2.4rem, 5.5vw, 5rem);
          line-height:.95;
          letter-spacing:-.04em;
          font-weight:900;
          text-wrap:balance;
          max-width:900px;
        }

        .hero-subtitle{
          margin:18px 0 0;
          font-size:clamp(1rem, 2vw, 1.12rem);
          line-height:1.8;
          color:var(--muted);
          max-width:760px;
        }

        .hero-stats{
          display:flex;
          flex-wrap:wrap;
          gap:12px;
          margin-top:22px;
        }

        .stat-pill{
          padding:10px 14px;
          border-radius:999px;
          background:rgba(255,255,255,.08);
          border:1px solid rgba(255,255,255,.08);
          color:#eef2ff;
          font-size:.92rem;
          font-weight:600;
        }

        .hero-actions{
          display:flex;
          flex-wrap:wrap;
          gap:12px;
          margin-top:28px;
        }

        .hero-side-card{
          align-self:end;
          justify-self:end;
          width:min(100%, 360px);
          padding:18px;
          border-radius:28px;
          background:linear-gradient(180deg, rgba(255,255,255,.1), rgba(255,255,255,.05));
          border:1px solid rgba(255,255,255,.1);
          box-shadow:var(--shadow);
          backdrop-filter:blur(18px);
        }

        .hero-side-banner{
          position:relative;
          aspect-ratio:16/10;
          border-radius:22px;
          overflow:hidden;
          background:rgba(255,255,255,.07);
          border:1px solid rgba(255,255,255,.08);
        }

        .hero-side-banner img{
          width:100%;
          height:100%;
          object-fit:cover;
        }

        .hero-side-meta{
          margin-top:16px;
        }

        .hero-side-title{
          margin:0;
          font-size:1.2rem;
          font-weight:800;
        }

        .hero-side-desc{
          margin:10px 0 0;
          color:var(--muted);
          line-height:1.6;
          font-size:.95rem;
        }

        .section{
          padding:30px 0;
        }

        .section-head{
          display:flex;
          align-items:flex-end;
          justify-content:space-between;
          gap:18px;
          margin-bottom:18px;
        }

        .section-title{
          margin:0;
          font-size:1.5rem;
          font-weight:800;
          letter-spacing:-.03em;
        }

        .section-subtitle{
          margin:6px 0 0;
          color:var(--muted);
          font-size:.96rem;
        }

        .toolbar{
          display:grid;
          grid-template-columns:1.5fr repeat(3, minmax(160px, .55fr));
          gap:12px;
          padding:18px;
          border-radius:28px;
          background:linear-gradient(180deg, rgba(255,255,255,.07), rgba(255,255,255,.04));
          border:1px solid rgba(255,255,255,.08);
          box-shadow:var(--shadow);
        }

        .field{
          display:flex;
          flex-direction:column;
          gap:8px;
        }

        .field label{
          font-size:.82rem;
          color:var(--muted);
          font-weight:700;
          padding-left:2px;
        }

        .input,
        .select,
        .textarea{
          width:100%;
          border:none;
          outline:none;
          color:var(--text);
          background:rgba(255,255,255,.08);
          border:1px solid rgba(255,255,255,.08);
          border-radius:18px;
          padding:14px 16px;
          transition:.2s ease;
        }

        .textarea{
          resize:vertical;
          min-height:110px;
        }

        .input:focus,
        .select:focus,
        .textarea:focus{
          border-color:rgba(108,125,255,.55);
          box-shadow:0 0 0 4px rgba(108,125,255,.14);
          background:rgba(255,255,255,.1);
        }

        .chips{
          display:flex;
          flex-wrap:wrap;
          gap:10px;
        }

        .chip{
          border:none;
          cursor:pointer;
          padding:10px 14px;
          border-radius:999px;
          background:rgba(255,255,255,.08);
          border:1px solid rgba(255,255,255,.08);
          color:var(--text);
          font-weight:700;
          transition:.2s ease;
        }

        .chip.active{
          background:linear-gradient(135deg, rgba(255,47,67,.2), rgba(255,107,107,.2));
          border-color:rgba(255,107,107,.28);
          color:white;
        }

        .feature-strip{
          display:grid;
          grid-template-columns:repeat(12, minmax(0,1fr));
          gap:16px;
        }

        .featured-card{
          grid-column:span 4;
          position:relative;
          overflow:hidden;
          border-radius:26px;
          min-height:220px;
          background:rgba(255,255,255,.06);
          border:1px solid rgba(255,255,255,.08);
          box-shadow:var(--shadow);
          cursor:pointer;
          transition:.25s ease;
        }

        .featured-card:hover{
          transform:translateY(-4px);
          border-color:rgba(255,255,255,.16);
        }

        .featured-card::before{
          content:"";
          position:absolute;
          inset:0;
          background:
            linear-gradient(180deg, rgba(6,10,19,.08), rgba(6,10,19,.92) 100%),
            var(--bg-image);
          background-size:cover;
          background-position:center;
        }

        .featured-content{
          position:relative;
          z-index:1;
          height:100%;
          padding:20px;
          display:flex;
          flex-direction:column;
          justify-content:flex-end;
        }

        .featured-badge{
          position:absolute;
          top:18px;
          left:18px;
          z-index:2;
          display:inline-flex;
          align-items:center;
          gap:6px;
          font-size:.75rem;
          font-weight:800;
          padding:8px 10px;
          border-radius:999px;
          background:rgba(255,255,255,.12);
          border:1px solid rgba(255,255,255,.1);
        }

        .featured-title{
          margin:0;
          font-size:1.18rem;
          font-weight:800;
        }

        .featured-meta{
          margin-top:10px;
          display:flex;
          gap:8px;
          flex-wrap:wrap;
          color:#edf1ff;
          font-size:.86rem;
        }

        .grid{
          display:grid;
          grid-template-columns:repeat(5, minmax(0,1fr));
          gap:18px;
        }

        .movie-card{
          position:relative;
          overflow:hidden;
          border-radius:24px;
          background:linear-gradient(180deg, rgba(255,255,255,.08), rgba(255,255,255,.04));
          border:1px solid rgba(255,255,255,.08);
          box-shadow:0 16px 45px rgba(0,0,0,.28);
          cursor:pointer;
          transition:.25s ease;
        }

        .movie-card:hover{
          transform:translateY(-5px) scale(1.01);
          border-color:rgba(255,255,255,.16);
          box-shadow:0 24px 55px rgba(0,0,0,.34);
        }

        .movie-thumb{
          position:relative;
          aspect-ratio:2/3;
          background:rgba(255,255,255,.08);
          overflow:hidden;
        }

        .movie-thumb img{
          width:100%;
          height:100%;
          object-fit:cover;
        }

        .movie-overlay{
          position:absolute;
          inset:0;
          background:linear-gradient(180deg, rgba(0,0,0,.04), rgba(0,0,0,.78));
          opacity:.96;
        }

        .movie-top-actions{
          position:absolute;
          top:12px;
          right:12px;
          z-index:2;
          display:flex;
          gap:8px;
        }

        .icon-btn{
          width:38px;
          height:38px;
          display:grid;
          place-items:center;
          border-radius:50%;
          border:1px solid rgba(255,255,255,.14);
          background:rgba(7,11,20,.55);
          color:white;
          cursor:pointer;
          transition:.2s ease;
          backdrop-filter:blur(10px);
        }

        .icon-btn:hover{
          background:rgba(255,255,255,.16);
        }

        .movie-bottom{
          position:absolute;
          left:0;
          right:0;
          bottom:0;
          z-index:2;
          padding:14px;
        }

        .movie-category{
          display:inline-flex;
          padding:6px 10px;
          border-radius:999px;
          background:rgba(255,255,255,.1);
          border:1px solid rgba(255,255,255,.08);
          font-size:.74rem;
          font-weight:800;
          margin-bottom:10px;
        }

        .movie-title{
          margin:0;
          font-size:1.02rem;
          line-height:1.25;
          font-weight:800;
          color:white;
          display:-webkit-box;
          -webkit-line-clamp:2;
          -webkit-box-orient:vertical;
          overflow:hidden;
        }

        .movie-meta{
          display:flex;
          flex-wrap:wrap;
          gap:8px;
          margin-top:10px;
          color:#d8def0;
          font-size:.82rem;
        }

        .meta-dot{
          display:inline-flex;
          align-items:center;
          gap:6px;
          padding:6px 10px;
          border-radius:999px;
          background:rgba(255,255,255,.08);
          border:1px solid rgba(255,255,255,.06);
        }

        .empty-state,
        .error-state{
          padding:46px 24px;
          border-radius:32px;
          text-align:center;
          background:linear-gradient(180deg, rgba(255,255,255,.07), rgba(255,255,255,.03));
          border:1px solid rgba(255,255,255,.08);
          box-shadow:var(--shadow);
        }

        .empty-state h3,
        .error-state h3{
          margin:0 0 10px;
          font-size:1.5rem;
        }

        .empty-state p,
        .error-state p{
          margin:0;
          color:var(--muted);
          max-width:620px;
          margin-inline:auto;
          line-height:1.75;
        }

        .skeleton-grid{
          display:grid;
          grid-template-columns:repeat(5, minmax(0,1fr));
          gap:18px;
        }

        .skeleton-card{
          border-radius:24px;
          overflow:hidden;
          background:rgba(255,255,255,.06);
          border:1px solid rgba(255,255,255,.08);
          min-height:340px;
          position:relative;
        }

        .shimmer{
          position:absolute;
          inset:0;
          background:
            linear-gradient(90deg, transparent, rgba(255,255,255,.08), transparent);
          transform:translateX(-100%);
          animation:drickShimmer 1.6s infinite;
        }

        @keyframes drickShimmer{
          to{ transform:translateX(100%); }
        }

        .modal-backdrop{
          position:fixed;
          inset:0;
          z-index:120;
          background:rgba(3,5,10,.72);
          backdrop-filter:blur(10px);
          display:flex;
          align-items:center;
          justify-content:center;
          padding:20px;
        }

        .details-modal{
          position:relative;
          width:min(1180px, 100%);
          max-height:min(92vh, 980px);
          overflow:auto;
          border-radius:32px;
          background:linear-gradient(180deg, #0a0f1d, #070b14 55%, #060912 100%);
          border:1px solid rgba(255,255,255,.08);
          box-shadow:0 35px 90px rgba(0,0,0,.55);
        }

        .modal-close{
          position:absolute;
          top:18px;
          right:18px;
          z-index:6;
        }

        .details-hero{
          position:relative;
          min-height:420px;
          padding:28px;
          display:flex;
          align-items:flex-end;
          border-bottom:1px solid rgba(255,255,255,.08);
          overflow:hidden;
        }

        .details-hero::before{
          content:"";
          position:absolute;
          inset:0;
          background:
            linear-gradient(180deg, rgba(6,10,19,.14), rgba(6,10,19,.88) 78%),
            linear-gradient(90deg, rgba(6,10,19,.92), rgba(6,10,19,.52) 42%, rgba(6,10,19,.88)),
            var(--details-bg);
          background-size:cover;
          background-position:center;
        }

        .details-content{
          position:relative;
          z-index:1;
          display:grid;
          grid-template-columns:260px minmax(0, 1fr);
          gap:28px;
          width:100%;
          align-items:end;
        }

        .details-poster{
          border-radius:24px;
          overflow:hidden;
          border:1px solid rgba(255,255,255,.1);
          box-shadow:0 24px 50px rgba(0,0,0,.45);
          background:rgba(255,255,255,.08);
          aspect-ratio:2/3;
        }

        .details-poster img{
          width:100%;
          height:100%;
          object-fit:cover;
        }

        .details-copy h2{
          margin:0;
          font-size:clamp(1.8rem, 4vw, 3rem);
          line-height:1;
          font-weight:900;
          letter-spacing:-.04em;
        }

        .details-desc{
          margin:16px 0 0;
          color:var(--muted);
          line-height:1.75;
          font-size:1rem;
        }

        .details-meta-grid{
          display:grid;
          grid-template-columns:repeat(3, minmax(0,1fr));
          gap:14px;
          margin-top:24px;
        }

        .details-meta-card{
          padding:14px 16px;
          border-radius:20px;
          background:rgba(255,255,255,.07);
          border:1px solid rgba(255,255,255,.08);
        }

        .details-meta-label{
          display:block;
          font-size:.76rem;
          color:var(--muted);
          margin-bottom:8px;
          font-weight:800;
          text-transform:uppercase;
          letter-spacing:.08em;
        }

        .details-meta-value{
          font-size:.96rem;
          line-height:1.55;
          color:white;
          font-weight:600;
        }

        .details-actions{
          display:flex;
          flex-wrap:wrap;
          gap:12px;
          margin-top:24px;
        }

        .details-body{
          padding:28px;
        }

        .video-player-card{
          border-radius:28px;
          overflow:hidden;
          background:rgba(255,255,255,.05);
          border:1px solid rgba(255,255,255,.08);
          box-shadow:var(--shadow);
        }

        .video-frame{
          width:100%;
          aspect-ratio:16/9;
          border:none;
          background:#000;
          display:block;
        }

        .player-empty{
          display:grid;
          place-items:center;
          aspect-ratio:16/9;
          padding:26px;
          text-align:center;
          color:var(--muted);
          background:
            radial-gradient(circle at top left, rgba(255,47,67,.1), transparent 25%),
            rgba(255,255,255,.04);
        }

        .info-section{
          margin-top:22px;
        }

        .info-title{
          margin:0 0 14px;
          font-size:1.2rem;
          font-weight:800;
        }

        .related-row{
          display:grid;
          grid-template-columns:repeat(4, minmax(0,1fr));
          gap:16px;
        }

        .admin-trigger{
          position:fixed;
          right:20px;
          bottom:20px;
          z-index:70;
        }

        .admin-panel{
          width:min(1180px, 100%);
          max-height:92vh;
          overflow:auto;
          border-radius:32px;
          background:linear-gradient(180deg, #0d1221, #09101a);
          border:1px solid rgba(255,255,255,.1);
          box-shadow:0 35px 90px rgba(0,0,0,.55);
          padding:22px;
        }

        .admin-head{
          display:flex;
          align-items:center;
          justify-content:space-between;
          gap:18px;
          margin-bottom:18px;
        }

        .admin-title{
          margin:0;
          font-size:1.4rem;
          font-weight:900;
        }

        .admin-sub{
          margin:6px 0 0;
          color:var(--muted);
        }

        .admin-grid{
          display:grid;
          grid-template-columns:minmax(0, 1.15fr) minmax(320px, .85fr);
          gap:20px;
        }

        .panel-card{
          padding:18px;
          border-radius:26px;
          background:rgba(255,255,255,.05);
          border:1px solid rgba(255,255,255,.08);
        }

        .form-grid{
          display:grid;
          grid-template-columns:repeat(2, minmax(0,1fr));
          gap:14px;
        }

        .form-grid.full{
          grid-template-columns:1fr;
        }

        .toggle-row{
          display:flex;
          flex-wrap:wrap;
          gap:14px;
          margin-top:8px;
        }

        .toggle-check{
          display:flex;
          align-items:center;
          gap:10px;
          padding:12px 14px;
          border-radius:18px;
          background:rgba(255,255,255,.06);
          border:1px solid rgba(255,255,255,.08);
          color:white;
          cursor:pointer;
          user-select:none;
        }

        .toggle-check input{
          accent-color:var(--primary);
          width:18px;
          height:18px;
        }

        .upload-box{
          padding:16px;
          border-radius:22px;
          background:rgba(255,255,255,.05);
          border:1px dashed rgba(255,255,255,.16);
        }

        .upload-box + .upload-box{
          margin-top:14px;
        }

        .upload-top{
          display:flex;
          align-items:center;
          justify-content:space-between;
          gap:12px;
          margin-bottom:12px;
        }

        .upload-title{
          margin:0;
          font-weight:800;
        }

        .upload-hint{
          margin:4px 0 0;
          color:var(--muted);
          font-size:.86rem;
        }

        .upload-preview{
          border-radius:20px;
          overflow:hidden;
          border:1px solid rgba(255,255,255,.08);
          background:rgba(255,255,255,.04);
          aspect-ratio:16/9;
          display:grid;
          place-items:center;
          color:var(--muted);
          margin-top:12px;
        }

        .upload-preview.poster{
          aspect-ratio:2/3;
        }

        .upload-preview img{
          width:100%;
          height:100%;
          object-fit:cover;
        }

        .file-chip{
          display:inline-flex;
          align-items:center;
          gap:8px;
          padding:10px 12px;
          border-radius:14px;
          background:rgba(255,255,255,.08);
          border:1px solid rgba(255,255,255,.08);
          font-size:.86rem;
          margin-top:10px;
          color:#eff3ff;
          word-break:break-all;
        }

        .progress-wrap{
          height:10px;
          border-radius:999px;
          background:rgba(255,255,255,.08);
          overflow:hidden;
          margin-top:12px;
        }

        .progress-bar{
          height:100%;
          width:0%;
          border-radius:999px;
          background:linear-gradient(135deg, var(--primary), var(--primary-2));
          transition:width .2s ease;
        }

        .admin-list{
          display:flex;
          flex-direction:column;
          gap:12px;
          max-height:680px;
          overflow:auto;
          padding-right:4px;
        }

        .admin-item{
          display:grid;
          grid-template-columns:86px minmax(0, 1fr);
          gap:12px;
          padding:12px;
          border-radius:20px;
          background:rgba(255,255,255,.05);
          border:1px solid rgba(255,255,255,.08);
        }

        .admin-item-thumb{
          width:86px;
          aspect-ratio:2/3;
          border-radius:16px;
          overflow:hidden;
          background:rgba(255,255,255,.06);
        }

        .admin-item-thumb img{
          width:100%;
          height:100%;
          object-fit:cover;
        }

        .admin-item-title{
          margin:0;
          font-size:1rem;
          font-weight:800;
        }

        .admin-item-meta{
          color:var(--muted);
          font-size:.86rem;
          margin-top:6px;
          line-height:1.55;
        }

        .admin-item-actions{
          display:flex;
          flex-wrap:wrap;
          gap:8px;
          margin-top:12px;
        }

        .footer{
          padding:38px 0 56px;
          color:var(--muted);
        }

        .footer-card{
          display:flex;
          align-items:center;
          justify-content:space-between;
          gap:18px;
          padding:20px 22px;
          border-radius:24px;
          background:rgba(255,255,255,.04);
          border:1px solid rgba(255,255,255,.08);
        }

        .toast-wrap{
          position:fixed;
          left:50%;
          bottom:22px;
          transform:translateX(-50%);
          z-index:200;
          width:min(calc(100% - 24px), 560px);
        }

        .toast{
          display:flex;
          align-items:center;
          gap:12px;
          padding:14px 16px;
          border-radius:20px;
          border:1px solid rgba(255,255,255,.08);
          box-shadow:0 20px 40px rgba(0,0,0,.28);
          backdrop-filter:blur(14px);
          background:rgba(9,15,25,.92);
        }

        .toast.success{ border-color:rgba(31,201,139,.24); }
        .toast.error{ border-color:rgba(255,91,118,.28); }
        .toast.info{ border-color:rgba(108,125,255,.28); }

        .toast-dot{
          width:12px;
          height:12px;
          border-radius:50%;
          flex:0 0 12px;
        }

        .toast.success .toast-dot{ background:var(--success); }
        .toast.error .toast-dot{ background:var(--danger); }
        .toast.info .toast-dot{ background:var(--accent); }

        .history-strip{
          display:flex;
          gap:12px;
          overflow:auto;
          padding-bottom:4px;
        }

        .history-item{
          min-width:210px;
          display:grid;
          grid-template-columns:60px 1fr;
          gap:12px;
          padding:12px;
          border-radius:18px;
          background:rgba(255,255,255,.05);
          border:1px solid rgba(255,255,255,.08);
          cursor:pointer;
        }

        .history-item-thumb{
          width:60px;
          aspect-ratio:2/3;
          border-radius:12px;
          overflow:hidden;
          background:rgba(255,255,255,.06);
        }

        .history-item-thumb img{
          width:100%;
          height:100%;
          object-fit:cover;
        }

        .history-item-title{
          margin:0;
          font-size:.96rem;
          font-weight:800;
          line-height:1.35;
        }

        .history-item-time{
          margin-top:8px;
          color:var(--muted);
          font-size:.8rem;
        }

        @media (max-width: 1180px){
          .grid{ grid-template-columns:repeat(4, minmax(0,1fr)); }
          .skeleton-grid{ grid-template-columns:repeat(4, minmax(0,1fr)); }
          .feature-strip .featured-card{ grid-column:span 6; }
          .related-row{ grid-template-columns:repeat(3, minmax(0,1fr)); }
          .toolbar{ grid-template-columns:1fr 1fr; }
          .admin-grid{ grid-template-columns:1fr; }
        }

        @media (max-width: 920px){
          .hero-inner{
            grid-template-columns:1fr;
            align-items:end;
          }
          .hero-side-card{
            justify-self:start;
            width:100%;
            max-width:520px;
          }
          .grid{ grid-template-columns:repeat(3, minmax(0,1fr)); }
          .skeleton-grid{ grid-template-columns:repeat(3, minmax(0,1fr)); }
          .details-content{
            grid-template-columns:1fr;
          }
          .details-poster{
            width:min(280px, 58vw);
          }
          .details-meta-grid{
            grid-template-columns:1fr 1fr;
          }
          .related-row{ grid-template-columns:repeat(2, minmax(0,1fr)); }
        }

        @media (max-width: 720px){
          .topbar-inner{
            min-height:72px;
          }
          .brand{
            font-size:1.35rem;
          }
          .brand .brand-d{
            width:38px;
            height:38px;
            border-radius:12px;
          }
          .toolbar{
            grid-template-columns:1fr;
            padding:14px;
          }
          .grid{ grid-template-columns:repeat(2, minmax(0,1fr)); gap:14px; }
          .skeleton-grid{ grid-template-columns:repeat(2, minmax(0,1fr)); gap:14px; }
          .feature-strip .featured-card{ grid-column:span 12; }
          .details-hero{ padding:18px; min-height:360px; }
          .details-body{ padding:18px; }
          .details-meta-grid{ grid-template-columns:1fr; }
          .related-row{ grid-template-columns:1fr 1fr; gap:12px; }
          .form-grid{ grid-template-columns:1fr; }
          .footer-card{
            flex-direction:column;
            align-items:flex-start;
          }
        }

        @media (max-width: 520px){
          .container{ width:min(calc(100% - 20px), var(--container)); }
          .hero{
            min-height:78vh;
            padding-top:96px;
          }
          .hero-inner{
            width:min(calc(100% - 20px), var(--container));
            padding-bottom:54px;
          }
          .hero-title{
            font-size:clamp(2rem, 10vw, 3rem);
          }
          .nav-right{
            gap:8px;
          }
          .user-badge{
            max-width:100%;
          }
          .grid{ grid-template-columns:1fr 1fr; }
          .related-row{ grid-template-columns:1fr; }
          .admin-trigger{
            right:14px;
            bottom:14px;
          }
          .details-modal,
          .admin-panel{
            border-radius:26px;
          }
        }
      `}</style>

      <div className="app-shell">
        <Header
          scrolled={scrolled}
          user={user}
          authLoading={authLoading}
          googleLoading={googleLoading}
          onLogin={handleGoogleLogin}
          onLogout={handleLogout}
          onBrandClick={scrollToHero}
          isAdmin={isAdmin}
          onOpenAdmin={() => setShowAdmin(true)}
          onToggleMyList={() => setShowMyList((v) => !v)}
          showMyList={showMyList}
        />

        <Hero
          refProp={heroRef}
          movie={heroMovie}
          onBrandClick={scrollToHero}
          onOpenMovie={openMovie}
          onPlay={handlePlay}
        />

        <main className="container">
          <section className="section">
            <div className="section-head">
              <div>
                <h2 className="section-title">Explorar catálogo</h2>
                <p className="section-subtitle">
                  Busca em tempo real, filtros inteligentes e experiência elegante.
                </p>
              </div>
            </div>

            <SearchAndFilters
              search={search}
              setSearch={setSearch}
              category={category}
              setCategory={setCategory}
              typeFilter={typeFilter}
              setTypeFilter={setTypeFilter}
              sortBy={sortBy}
              setSortBy={setSortBy}
            />
          </section>

          {!!history.length && (
            <section className="section">
              <div className="section-head">
                <div>
                  <h2 className="section-title">Continue assistindo</h2>
                  <p className="section-subtitle">
                    Seu histórico local de visualização recente.
                  </p>
                </div>
              </div>

              <div className="history-strip">
                {history.map((item) => {
                  const movie = movies.find((m) => m.id === item.id);
                  if (!movie) return null;

                  return (
                    <button
                      key={item.id}
                      type="button"
                      className="history-item"
                      onClick={() => openMovie(movie)}
                      style={{ textAlign: "left", border: "none" }}
                    >
                      <div className="history-item-thumb">
                        <img
                          src={movie.coverUrl || DEFAULT_POSTER}
                          alt={movie.title}
                          loading="lazy"
                        />
                      </div>
                      <div>
                        <h4 className="history-item-title">{movie.title}</h4>
                        <div className="history-item-time">
                          {new Date(item.timestamp).toLocaleString("pt-BR")}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </section>
          )}

          {showMyList && (
            <section className="section">
              <div className="section-head">
                <div>
                  <h2 className="section-title">Minha Lista</h2>
                  <p className="section-subtitle">
                    Seus favoritos salvos localmente neste dispositivo.
                  </p>
                </div>
              </div>

              <MovieGrid
                movies={favoriteMovies}
                loading={false}
                error=""
                favorites={favorites}
                onOpenMovie={openMovie}
                onToggleFavorite={toggleFavorite}
                emptyTitle="Sua lista está vazia"
                emptyText="Adicione filmes, séries e animes aos favoritos para vê-los aqui com acesso rápido."
              />
            </section>
          )}

          {!!highlightedMovies.length && (
            <section className="section">
              <div className="section-head">
                <div>
                  <h2 className="section-title">Destaques</h2>
                  <p className="section-subtitle">
                    Conteúdos em destaque, recomendados ou com maior força visual.
                  </p>
                </div>
              </div>

              <FeaturedStrip movies={highlightedMovies} onOpenMovie={openMovie} />
            </section>
          )}

          <section className="section">
            <div className="section-head">
              <div>
                <h2 className="section-title">Catálogo DRICK</h2>
                <p className="section-subtitle">
                  {filteredMovies.length} item(ns) encontrado(s) com sua busca atual.
                </p>
              </div>
            </div>

            <MovieGrid
              movies={filteredMovies}
              loading={loadingCatalog}
              error={catalogError}
              favorites={favorites}
              onOpenMovie={openMovie}
              onToggleFavorite={toggleFavorite}
              emptyTitle="Seja bem-vindo ao meu site"
              emptyText="Ainda não existe conteúdo disponível no catálogo com os filtros atuais. Quando você adicionar novos títulos, eles aparecerão aqui automaticamente."
            />
          </section>
        </main>

        <Footer />

        {selectedMovie && (
          <DetailsModal
            movie={selectedMovie}
            related={relatedMovies}
            favorites={favorites}
            onClose={() => setSelectedMovie(null)}
            onToggleFavorite={toggleFavorite}
            onOpenMovie={openMovie}
            onPlay={(movie) => {
              addToHistory(movie);
              incrementLocalView(movie.id);
            }}
          />
        )}

        {isAdmin && (
          <>
            <div className="admin-trigger">
              <button
                className="primary-btn"
                type="button"
                onClick={() => setShowAdmin(true)}
              >
                Painel Admin
              </button>
            </div>

            {showAdmin && (
              <AdminPanel
                movies={movies}
                onClose={() => setShowAdmin(false)}
                onSave={handleSaveMovie}
                onDelete={handleDeleteMovie}
                onToast={showToast}
              />
            )}
          </>
        )}

        {toast && (
          <div className="toast-wrap">
            <div className={`toast ${toast.type || "info"}`}>
              <span className="toast-dot" />
              <div>{toast.message}</div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

function Header({
  scrolled,
  user,
  authLoading,
  googleLoading,
  onLogin,
  onLogout,
  onBrandClick,
  isAdmin,
  onOpenAdmin,
  onToggleMyList,
  showMyList,
}) {
  return (
    <header className={`topbar ${scrolled ? "scrolled" : "top"}`}>
      <div className="container topbar-inner">
        <div className="brand" onClick={onBrandClick} role="button" tabIndex={0}>
          <span className="brand-d">D</span>
          <span>RICK</span>
        </div>

        <div className="nav-right">
          <button className="soft-btn" type="button" onClick={onToggleMyList}>
            {showMyList ? "Fechar Minha Lista" : "Minha Lista"}
          </button>

          {isAdmin && (
            <button className="soft-btn" type="button" onClick={onOpenAdmin}>
              Admin
            </button>
          )}

          {authLoading ? (
            <button className="ghost-btn" type="button" disabled>
              Carregando...
            </button>
          ) : user ? (
            <>
              <div className="user-badge">
                <img
                  className="user-avatar"
                  src={user.photoURL || DEFAULT_POSTER}
                  alt={user.displayName || "Usuário"}
                />
                <div className="user-meta">
                  <div className="user-name">{user.displayName || "Usuário"}</div>
                  <div className="user-email">{user.email || ""}</div>
                </div>
              </div>
              <button className="ghost-btn" type="button" onClick={onLogout}>
                Sair
              </button>
            </>
          ) : (
            <button
              className="primary-btn"
              type="button"
              disabled={googleLoading}
              onClick={onLogin}
            >
              {googleLoading ? "Entrando..." : "Entrar com Google"}
            </button>
          )}
        </div>
      </div>
    </header>
  );
}

function Hero({ refProp, movie, onBrandClick, onOpenMovie, onPlay }) {
  const bg = movie?.bannerUrl || movie?.coverUrl || DEFAULT_BANNER;

  return (
    <section
      ref={refProp}
      className="hero"
      style={{ "--hero-bg": `url(${bg})` }}
      id="hero"
    >
      <div className="hero-inner">
        <div className="hero-copy">
          <div className="eyebrow">
            <span>DRICK</span>
            <span>•</span>
            <span>Streaming premium</span>
          </div>

          <h1 className="hero-title">
            {movie?.title || "Seja bem-vindo ao meu site"}
          </h1>

          <p className="hero-subtitle">
            {movie?.description ||
              "Um catálogo elegante para filmes, séries e animes, com experiência imersiva, visual cinematográfico e navegação pensada para funcionar muito bem no celular e no desktop."}
          </p>

          <div className="hero-stats">
            <div className="stat-pill">{movie?.category || "Catálogo premium"}</div>
            <div className="stat-pill">
              {movie?.type ? String(movie.type).toUpperCase() : "Experiência moderna"}
            </div>
            <div className="stat-pill">{movie?.year || "Visual sofisticado"}</div>
          </div>

          <div className="hero-actions">
            {movie ? (
              <>
                <button
                  className="primary-btn"
                  type="button"
                  onClick={() => onOpenMovie(movie)}
                >
                  Ver detalhes
                </button>
                <button
                  className="soft-btn"
                  type="button"
                  onClick={() => onPlay(movie)}
                >
                  Assistir
                </button>
              </>
            ) : (
              <button className="primary-btn" type="button" onClick={onBrandClick}>
                Explorar
              </button>
            )}
          </div>
        </div>

        <div className="hero-side-card">
          <div className="hero-side-banner">
            <img
              src={movie?.coverUrl || movie?.bannerUrl || DEFAULT_POSTER}
              alt={movie?.title || "DRICK"}
            />
          </div>
          <div className="hero-side-meta">
            <h3 className="hero-side-title">{movie?.title || "DRICK"}</h3>
            <p className="hero-side-desc">
              {movie?.synopsis ||
                "Um espaço visual forte e elegante para exibir seu catálogo com uploads diretos de capa, banner, trailer e vídeo principal."}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function SearchAndFilters({
  search,
  setSearch,
  category,
  setCategory,
  typeFilter,
  setTypeFilter,
  sortBy,
  setSortBy,
}) {
  return (
    <>
      <div className="toolbar">
        <div className="field">
          <label htmlFor="drick-search">Busca</label>
          <input
            id="drick-search"
            className="input"
            type="text"
            placeholder="Buscar por título, descrição, elenco, gênero, tipo..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="field">
          <label htmlFor="drick-category">Categoria</label>
          <select
            id="drick-category"
            className="select"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {CATEGORY_OPTIONS.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        <div className="field">
          <label htmlFor="drick-type">Tipo</label>
          <select
            id="drick-type"
            className="select"
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
          >
            {TYPE_OPTIONS.map((item) => (
              <option key={item} value={item}>
                {item === "Todos"
                  ? "Todos"
                  : item.charAt(0).toUpperCase() + item.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div className="field">
          <label htmlFor="drick-sort">Ordenar</label>
          <select
            id="drick-sort"
            className="select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            {SORT_OPTIONS.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="chips" style={{ marginTop: 16 }}>
        {CATEGORY_OPTIONS.map((item) => (
          <button
            key={item}
            type="button"
            className={`chip ${category === item ? "active" : ""}`}
            onClick={() => setCategory(item)}
          >
            {item}
          </button>
        ))}
      </div>
    </>
  );
}

function FeaturedStrip({ movies, onOpenMovie }) {
  return (
    <div className="feature-strip">
      {movies.slice(0, 6).map((movie) => (
        <button
          key={movie.id}
          type="button"
          className="featured-card"
          onClick={() => onOpenMovie(movie)}
          style={{
            textAlign: "left",
            border: "none",
            "--bg-image": `url(${movie.bannerUrl || movie.coverUrl || DEFAULT_BANNER})`,
          }}
        >
          <div className="featured-badge">
            {movie.featured ? "Destaque" : "Recomendado"}
          </div>
          <div className="featured-content">
            <h3 className="featured-title">{movie.title}</h3>
            <div className="featured-meta">
              <span>{safeText(movie.category)}</span>
              <span>•</span>
              <span>{safeText(movie.year)}</span>
              <span>•</span>
              <span>{safeText(movie.genre)}</span>
            </div>
          </div>
        </button>
      ))}
    </div>
  );
}

function MovieGrid({
  movies,
  loading,
  error,
  favorites,
  onOpenMovie,
  onToggleFavorite,
  emptyTitle,
  emptyText,
}) {
  if (loading) {
    return (
      <div className="skeleton-grid">
        {Array.from({ length: 10 }).map((_, index) => (
          <div className="skeleton-card" key={index}>
            <div className="shimmer" />
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-state">
        <h3>Não foi possível exibir o catálogo</h3>
        <p>{error}</p>
      </div>
    );
  }

  if (!movies.length) {
    return (
      <div className="empty-state">
        <h3>{emptyTitle}</h3>
        <p>{emptyText}</p>
      </div>
    );
  }

  return (
    <div className="grid">
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onOpen={() => onOpenMovie(movie)}
          onToggleFavorite={() => onToggleFavorite(movie.id)}
          isFavorite={favorites.includes(movie.id)}
        />
      ))}
    </div>
  );
}

function MovieCard({ movie, onOpen, onToggleFavorite, isFavorite }) {
  return (
    <div className="movie-card" onClick={onOpen}>
      <div className="movie-thumb">
        <img
          src={movie.coverUrl || movie.bannerUrl || DEFAULT_POSTER}
          alt={movie.title}
          loading="lazy"
        />
        <div className="movie-overlay" />
        <div className="movie-top-actions" onClick={(e) => e.stopPropagation()}>
          <button className="icon-btn" type="button" onClick={onToggleFavorite}>
            {isFavorite ? "♥" : "♡"}
          </button>
        </div>
        <div className="movie-bottom">
          <div className="movie-category">{movie.category || "Catálogo"}</div>
          <h3 className="movie-title">{movie.title}</h3>
          <div className="movie-meta">
            <span className="meta-dot">{safeText(movie.year)}</span>
            <span className="meta-dot">{safeText(movie.type)}</span>
            <span className="meta-dot">★ {movie.popularity || 0}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function DetailsModal({
  movie,
  related,
  favorites,
  onClose,
  onToggleFavorite,
  onOpenMovie,
  onPlay,
}) {
  const [showTrailer, setShowTrailer] = useState(false);
  const isFavorite = favorites.includes(movie.id);

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  useEffect(() => {
    setShowTrailer(false);
  }, [movie?.id]);

  const canPlayMain = !!movie.videoUrl;
  const canPlayTrailer = !!movie.trailerUrl;
  const activeVideoUrl = showTrailer ? movie.trailerUrl : movie.videoUrl;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="details-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-close">
          <button className="icon-btn" type="button" onClick={onClose}>
            ✕
          </button>
        </div>

        <div
          className="details-hero"
          style={{
            "--details-bg": `url(${movie.bannerUrl || movie.coverUrl || DEFAULT_BANNER})`,
          }}
        >
          <div className="details-content">
            <div className="details-poster">
              <img
                src={movie.coverUrl || movie.bannerUrl || DEFAULT_POSTER}
                alt={movie.title}
              />
            </div>

            <div className="details-copy">
              <h2>{movie.title}</h2>
              <p className="details-desc">
                {movie.synopsis || movie.description || "Sem descrição disponível."}
              </p>

              <div className="details-actions">
                <button
                  className="primary-btn"
                  type="button"
                  onClick={() => {
                    if (canPlayMain) {
                      setShowTrailer(false);
                      onPlay(movie);
                      const videoEl = document.getElementById("drick-video-player");
                      if (videoEl) {
                        setTimeout(() => {
                          videoEl.scrollIntoView({ behavior: "smooth", block: "center" });
                          videoEl.play?.().catch(() => {});
                        }, 120);
                      }
                    }
                  }}
                >
                  Assistir
                </button>

                <button
                  className="soft-btn"
                  type="button"
                  onClick={() => onToggleFavorite(movie.id)}
                >
                  {isFavorite ? "Remover da Minha Lista" : "Favoritar"}
                </button>

                {canPlayTrailer && (
                  <button
                    className="ghost-btn"
                    type="button"
                    onClick={() => {
                      setShowTrailer(true);
                      const videoEl = document.getElementById("drick-video-player");
                      if (videoEl) {
                        setTimeout(() => {
                          videoEl.scrollIntoView({ behavior: "smooth", block: "center" });
                          videoEl.play?.().catch(() => {});
                        }, 120);
                      }
                    }}
                  >
                    Ver trailer
                  </button>
                )}
              </div>

              <div className="details-meta-grid">
                <div className="details-meta-card">
                  <span className="details-meta-label">Categoria</span>
                  <div className="details-meta-value">{safeText(movie.category)}</div>
                </div>
                <div className="details-meta-card">
                  <span className="details-meta-label">Gênero</span>
                  <div className="details-meta-value">{safeText(movie.genre)}</div>
                </div>
                <div className="details-meta-card">
                  <span className="details-meta-label">Tipo</span>
                  <div className="details-meta-value">{safeText(movie.type)}</div>
                </div>
                <div className="details-meta-card">
                  <span className="details-meta-label">Ano</span>
                  <div className="details-meta-value">{safeText(movie.year)}</div>
                </div>
                <div className="details-meta-card">
                  <span className="details-meta-label">Duração</span>
                  <div className="details-meta-value">{safeText(movie.duration)}</div>
                </div>
                <div className="details-meta-card">
                  <span className="details-meta-label">Classificação</span>
                  <div className="details-meta-value">{safeText(movie.rating)}</div>
                </div>
                <div className="details-meta-card">
                  <span className="details-meta-label">Elenco</span>
                  <div className="details-meta-value">{safeText(movie.cast)}</div>
                </div>
                <div className="details-meta-card">
                  <span className="details-meta-label">Diretor</span>
                  <div className="details-meta-value">{safeText(movie.director)}</div>
                </div>
                <div className="details-meta-card">
                  <span className="details-meta-label">Visualizações</span>
                  <div className="details-meta-value">{formatViews(movie.views)}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="details-body">
          <div className="video-player-card">
            {activeVideoUrl ? (
              <video
                id="drick-video-player"
                className="video-frame"
                controls
                playsInline
                poster={movie.bannerUrl || movie.coverUrl || DEFAULT_BANNER}
                src={activeVideoUrl}
                onError={() => {}}
              />
            ) : (
              <div className="player-empty">
                <div>
                  <h3 style={{ marginTop: 0 }}>Vídeo indisponível</h3>
                  <p style={{ marginBottom: 0 }}>
                    Este conteúdo ainda não possui arquivo de vídeo enviado pelo administrador.
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="info-section">
            <h3 className="info-title">Mais informações</h3>
            <div className="details-meta-grid">
              <div className="details-meta-card">
                <span className="details-meta-label">Idioma</span>
                <div className="details-meta-value">{safeText(movie.language)}</div>
              </div>
              <div className="details-meta-card">
                <span className="details-meta-label">Legenda</span>
                <div className="details-meta-value">{safeText(movie.subtitle)}</div>
              </div>
              <div className="details-meta-card">
                <span className="details-meta-label">Status</span>
                <div className="details-meta-value">{safeText(movie.status)}</div>
              </div>
              <div className="details-meta-card">
                <span className="details-meta-label">Temporadas</span>
                <div className="details-meta-value">{safeText(movie.seasons)}</div>
              </div>
              <div className="details-meta-card">
                <span className="details-meta-label">Episódios</span>
                <div className="details-meta-value">{safeText(movie.episodes)}</div>
              </div>
              <div className="details-meta-card">
                <span className="details-meta-label">Tags</span>
                <div className="details-meta-value">
                  {Array.isArray(movie.tags) && movie.tags.length
                    ? movie.tags.join(", ")
                    : "—"}
                </div>
              </div>
            </div>
          </div>

          {!!related.length && (
            <div className="info-section">
              <h3 className="info-title">Conteúdos relacionados</h3>
              <div className="related-row">
                {related.map((item) => (
                  <MovieCard
                    key={item.id}
                    movie={item}
                    onOpen={() => onOpenMovie(item)}
                    onToggleFavorite={() => onToggleFavorite(item.id)}
                    isFavorite={favorites.includes(item.id)}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function AdminPanel({ movies, onClose, onSave, onDelete, onToast }) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [editingId, setEditingId] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [uploading, setUploading] = useState({
    cover: false,
    banner: false,
    video: false,
    trailer: false,
  });
  const [progress, setProgress] = useState({
    cover: 0,
    banner: 0,
    video: 0,
    trailer: 0,
  });
  const [files, setFiles] = useState({
    cover: null,
    banner: null,
    video: null,
    trailer: null,
  });
  const [previews, setPreviews] = useState({
    cover: "",
    banner: "",
    videoName: "",
    trailerName: "",
  });

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  useEffect(() => {
    return () => {
      if (previews.cover?.startsWith("blob:")) URL.revokeObjectURL(previews.cover);
      if (previews.banner?.startsWith("blob:")) URL.revokeObjectURL(previews.banner);
    };
  }, [previews.cover, previews.banner]);

  function resetForm() {
    setForm({ ...EMPTY_FORM });
    setEditingId("");
    setFiles({
      cover: null,
      banner: null,
      video: null,
      trailer: null,
    });
    setPreviews({
      cover: "",
      banner: "",
      videoName: "",
      trailerName: "",
    });
    setProgress({
      cover: 0,
      banner: 0,
      video: 0,
      trailer: 0,
    });
    setUploading({
      cover: false,
      banner: false,
      video: false,
      trailer: false,
    });
  }

  function fillFromMovie(movie) {
    setEditingId(movie.id);
    setForm({
      title: movie.title || "",
      description: movie.description || "",
      synopsis: movie.synopsis || "",
      category: movie.category || "Filmes",
      genre: movie.genre || "",
      type: movie.type || "filme",
      year: movie.year || "",
      duration: movie.duration || "",
      rating: movie.rating || "",
      cast: movie.cast || "",
      director: movie.director || "",
      seasons: movie.seasons || "",
      episodes: movie.episodes || "",
      featured: !!movie.featured,
      popularity: String(movie.popularity || ""),
      tags: Array.isArray(movie.tags) ? movie.tags.join(", ") : "",
      language: movie.language || "",
      subtitle: movie.subtitle || "",
      status: movie.status || "publicado",
      recommended: !!movie.recommended,
      views: String(movie.views || ""),
    });

    setFiles({
      cover: null,
      banner: null,
      video: null,
      trailer: null,
    });

    setPreviews({
      cover: movie.coverUrl || "",
      banner: movie.bannerUrl || "",
      videoName: movie.videoUrl ? "Vídeo já cadastrado" : "",
      trailerName: movie.trailerUrl ? "Trailer já cadastrado" : "",
    });

    setProgress({
      cover: 0,
      banner: 0,
      video: 0,
      trailer: 0,
    });

    setUploading({
      cover: false,
      banner: false,
      video: false,
      trailer: false,
    });
  }

  function onInputChange(e) {
    const { name, value, type, checked } = e.target;
    setForm((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  function onFileSelect(kind, file) {
    if (!file) return;

    setFiles((current) => ({ ...current, [kind]: file }));

    if (kind === "cover" || kind === "banner") {
      const objectUrl = URL.createObjectURL(file);
      setPreviews((current) => ({ ...current, [kind]: objectUrl }));
    } else if (kind === "video") {
      setPreviews((current) => ({ ...current, videoName: file.name }));
    } else if (kind === "trailer") {
      setPreviews((current) => ({ ...current, trailerName: file.name }));
    }
  }

  function uploadSingleFile(kind, file) {
    return new Promise((resolve, reject) => {
      if (!file) {
        resolve("");
        return;
      }

      try {
        setUploading((current) => ({ ...current, [kind]: true }));
        setProgress((current) => ({ ...current, [kind]: 0 }));

        const cleanName = file.name.replace(/\s+/g, "-").toLowerCase();
        const filePath = `drick/${kind}/${Date.now()}-${cleanName}`;
        const storageRef = ref(storage, filePath);
        const task = uploadBytesResumable(storageRef, file);

        task.on(
          "state_changed",
          (snapshot) => {
            const pct = Math.round(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
            setProgress((current) => ({ ...current, [kind]: pct }));
          },
          (error) => {
            console.error(`ERRO NO UPLOAD ${kind.toUpperCase()}:`, error);
            setUploading((current) => ({ ...current, [kind]: false }));
            reject(error);
          },
          async () => {
            try {
              const downloadURL = await getDownloadURL(task.snapshot.ref);
              setUploading((current) => ({ ...current, [kind]: false }));
              setProgress((current) => ({ ...current, [kind]: 100 }));
              resolve(downloadURL);
            } catch (error) {
              console.error(`ERRO AO PEGAR URL ${kind.toUpperCase()}:`, error);
              setUploading((current) => ({ ...current, [kind]: false }));
              reject(error);
            }
          }
        );
      } catch (error) {
        console.error(`ERRO GERAL NO UPLOAD ${kind.toUpperCase()}:`, error);
        setUploading((current) => ({ ...current, [kind]: false }));
        reject(error);
      }
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (submitting) return;

    if (!form.title.trim()) {
      onToast("Informe o título do conteúdo.", "error");
      return;
    }

    if (!editingId && !files.cover) {
      onToast("Envie uma capa para o novo conteúdo.", "error");
      return;
    }

    if (!editingId && !files.video) {
      onToast("Envie o arquivo principal de vídeo.", "error");
      return;
    }

    setSubmitting(true);

    try {
      const currentMovie = editingId
        ? movies.find((item) => item.id === editingId)
        : null;

      const [coverUrl, bannerUrl, videoUrl, trailerUrl] = await Promise.all([
        files.cover
          ? uploadSingleFile("cover", files.cover)
          : Promise.resolve(currentMovie?.coverUrl || ""),
        files.banner
          ? uploadSingleFile("banner", files.banner)
          : Promise.resolve(currentMovie?.bannerUrl || ""),
        files.video
          ? uploadSingleFile("video", files.video)
          : Promise.resolve(currentMovie?.videoUrl || ""),
        files.trailer
          ? uploadSingleFile("trailer", files.trailer)
          : Promise.resolve(currentMovie?.trailerUrl || ""),
      ]);

      const payload = {
        id: editingId || undefined,
        title: form.title.trim(),
        description: form.description.trim(),
        synopsis: form.synopsis.trim(),
        category: form.category,
        genre: form.genre.trim(),
        type: form.type,
        year: form.year.trim(),
        duration: form.duration.trim(),
        rating: form.rating.trim(),
        cast: form.cast.trim(),
        director: form.director.trim(),
        seasons: form.seasons.trim(),
        episodes: form.episodes.trim(),
        featured: !!form.featured,
        coverUrl,
        bannerUrl,
        videoUrl,
        trailerUrl,
        popularity: Number(form.popularity || 0),
        tags: parseTags(form.tags),
        language: form.language.trim(),
        subtitle: form.subtitle.trim(),
        status: form.status.trim() || "publicado",
        recommended: !!form.recommended,
        views: Number(form.views || currentMovie?.views || 0),
        searchIndex: buildSearchIndex({
          ...form,
          tags: parseTags(form.tags),
          coverUrl,
          bannerUrl,
          videoUrl,
          trailerUrl,
        }),
      };

      console.log("PAYLOAD ENVIADO:", payload);

      await onSave(payload);
      onToast(
        editingId ? "Conteúdo atualizado com sucesso." : "Conteúdo salvo com sucesso.",
        "success"
      );
      resetForm();
    } catch (error) {
      console.error("ERRO FINAL AO SALVAR:", error);
      onToast(
        error?.message
          ? `Falha ao enviar ou salvar: ${error.message}`
          : "Falha ao enviar os arquivos ou salvar o conteúdo.",
        "error"
      );
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete(id) {
    const confirmed = window.confirm("Deseja realmente excluir este conteúdo?");
    if (!confirmed) return;

    await onDelete(id);

    if (editingId === id) {
      resetForm();
    }
  }

  const isAnyUploading =
    uploading.cover || uploading.banner || uploading.video || uploading.trailer;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="admin-panel" onClick={(e) => e.stopPropagation()}>
        <div className="admin-head">
          <div>
            <h2 className="admin-title">Painel administrativo DRICK</h2>
            <p className="admin-sub">
              Adicione, edite, exclua e envie arquivos diretamente para o catálogo.
            </p>
          </div>
          <button className="icon-btn" type="button" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="admin-grid">
          <div className="panel-card">
            <form onSubmit={handleSubmit}>
              <div className="form-grid">
                <div className="field">
                  <label htmlFor="title">Título</label>
                  <input
                    id="title"
                    className="input"
                    name="title"
                    value={form.title}
                    onChange={onInputChange}
                    placeholder="Nome do conteúdo"
                  />
                </div>

                <div className="field">
                  <label htmlFor="category">Categoria</label>
                  <select
                    id="category"
                    className="select"
                    name="category"
                    value={form.category}
                    onChange={onInputChange}
                  >
                    {CATEGORY_OPTIONS.filter((item) => item !== "Todos").map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="field">
                  <label htmlFor="type">Tipo</label>
                  <select
                    id="type"
                    className="select"
                    name="type"
                    value={form.type}
                    onChange={onInputChange}
                  >
                    <option value="filme">Filme</option>
                    <option value="série">Série</option>
                    <option value="anime">Anime</option>
                  </select>
                </div>

                <div className="field">
                  <label htmlFor="genre">Gênero</label>
                  <input
                    id="genre"
                    className="input"
                    name="genre"
                    value={form.genre}
                    onChange={onInputChange}
                    placeholder="Ação, Terror, Romance..."
                  />
                </div>

                <div className="field">
                  <label htmlFor="year">Ano</label>
                  <input
                    id="year"
                    className="input"
                    name="year"
                    value={form.year}
                    onChange={onInputChange}
                    placeholder="2026"
                  />
                </div>

                <div className="field">
                  <label htmlFor="duration">Duração</label>
                  <input
                    id="duration"
                    className="input"
                    name="duration"
                    value={form.duration}
                    onChange={onInputChange}
                    placeholder="2h 08min"
                  />
                </div>

                <div className="field">
                  <label htmlFor="rating">Classificação</label>
                  <input
                    id="rating"
                    className="input"
                    name="rating"
                    value={form.rating}
                    onChange={onInputChange}
                    placeholder="14 anos"
                  />
                </div>

                <div className="field">
                  <label htmlFor="popularity">Popularidade</label>
                  <input
                    id="popularity"
                    className="input"
                    name="popularity"
                    type="number"
                    value={form.popularity}
                    onChange={onInputChange}
                    placeholder="0"
                  />
                </div>

                <div className="field">
                  <label htmlFor="director">Diretor</label>
                  <input
                    id="director"
                    className="input"
                    name="director"
                    value={form.director}
                    onChange={onInputChange}
                    placeholder="Direção"
                  />
                </div>

                <div className="field">
                  <label htmlFor="cast">Elenco</label>
                  <input
                    id="cast"
                    className="input"
                    name="cast"
                    value={form.cast}
                    onChange={onInputChange}
                    placeholder="Elenco principal"
                  />
                </div>

                <div className="field">
                  <label htmlFor="seasons">Temporadas</label>
                  <input
                    id="seasons"
                    className="input"
                    name="seasons"
                    value={form.seasons}
                    onChange={onInputChange}
                    placeholder="1"
                  />
                </div>

                <div className="field">
                  <label htmlFor="episodes">Episódios</label>
                  <input
                    id="episodes"
                    className="input"
                    name="episodes"
                    value={form.episodes}
                    onChange={onInputChange}
                    placeholder="12"
                  />
                </div>

                <div className="field">
                  <label htmlFor="language">Idioma</label>
                  <input
                    id="language"
                    className="input"
                    name="language"
                    value={form.language}
                    onChange={onInputChange}
                    placeholder="Português"
                  />
                </div>

                <div className="field">
                  <label htmlFor="subtitle">Legenda</label>
                  <input
                    id="subtitle"
                    className="input"
                    name="subtitle"
                    value={form.subtitle}
                    onChange={onInputChange}
                    placeholder="Português / Inglês"
                  />
                </div>

                <div className="field">
                  <label htmlFor="status">Status</label>
                  <input
                    id="status"
                    className="input"
                    name="status"
                    value={form.status}
                    onChange={onInputChange}
                    placeholder="publicado"
                  />
                </div>

                <div className="field">
                  <label htmlFor="views">Visualizações</label>
                  <input
                    id="views"
                    className="input"
                    name="views"
                    type="number"
                    value={form.views}
                    onChange={onInputChange}
                    placeholder="0"
                  />
                </div>
              </div>

              <div className="form-grid full" style={{ marginTop: 14 }}>
                <div className="field">
                  <label htmlFor="description">Descrição</label>
                  <textarea
                    id="description"
                    className="textarea"
                    name="description"
                    value={form.description}
                    onChange={onInputChange}
                    placeholder="Descrição curta e impactante"
                  />
                </div>

                <div className="field">
                  <label htmlFor="synopsis">Sinopse</label>
                  <textarea
                    id="synopsis"
                    className="textarea"
                    name="synopsis"
                    value={form.synopsis}
                    onChange={onInputChange}
                    placeholder="Sinopse completa do conteúdo"
                  />
                </div>

                <div className="field">
                  <label htmlFor="tags">Tags</label>
                  <input
                    id="tags"
                    className="input"
                    name="tags"
                    value={form.tags}
                    onChange={onInputChange}
                    placeholder="ação, estreia, recomendado, dublado"
                  />
                </div>
              </div>

              <div className="toggle-row">
                <label className="toggle-check">
                  <input
                    type="checkbox"
                    name="featured"
                    checked={form.featured}
                    onChange={onInputChange}
                  />
                  <span>Conteúdo em destaque</span>
                </label>

                <label className="toggle-check">
                  <input
                    type="checkbox"
                    name="recommended"
                    checked={form.recommended}
                    onChange={onInputChange}
                  />
                  <span>Recomendado</span>
                </label>
              </div>

              <div style={{ marginTop: 18 }}>
                <div className="upload-box">
                  <div className="upload-top">
                    <div>
                      <h4 className="upload-title">Upload da capa</h4>
                      <p className="upload-hint">Imagem principal exibida nos cards.</p>
                    </div>
                    <label className="soft-btn" style={{ cursor: "pointer" }}>
                      Selecionar
                      <input
                        type="file"
                        accept="image/*"
                        hidden
                        onChange={(e) => onFileSelect("cover", e.target.files?.[0])}
                      />
                    </label>
                  </div>

                  <div className="upload-preview poster">
                    {previews.cover ? (
                      <img src={previews.cover} alt="Preview capa" />
                    ) : (
                      <span>Sem capa selecionada</span>
                    )}
                  </div>

                  {uploading.cover && (
                    <div className="progress-wrap">
                      <div
                        className="progress-bar"
                        style={{ width: `${progress.cover}%` }}
                      />
                    </div>
                  )}
                </div>

                <div className="upload-box">
                  <div className="upload-top">
                    <div>
                      <h4 className="upload-title">Upload do banner</h4>
                      <p className="upload-hint">Imagem ampla para hero e detalhes.</p>
                    </div>
                    <label className="soft-btn" style={{ cursor: "pointer" }}>
                      Selecionar
                      <input
                        type="file"
                        accept="image/*"
                        hidden
                        onChange={(e) => onFileSelect("banner", e.target.files?.[0])}
                      />
                    </label>
                  </div>

                  <div className="upload-preview">
                    {previews.banner ? (
                      <img src={previews.banner} alt="Preview banner" />
                    ) : (
                      <span>Sem banner selecionado</span>
                    )}
                  </div>

                  {uploading.banner && (
                    <div className="progress-wrap">
                      <div
                        className="progress-bar"
                        style={{ width: `${progress.banner}%` }}
                      />
                    </div>
                  )}
                </div>

                <div className="upload-box">
                  <div className="upload-top">
                    <div>
                      <h4 className="upload-title">Upload do vídeo principal</h4>
                      <p className="upload-hint">Arquivo principal de reprodução.</p>
                    </div>
                    <label className="soft-btn" style={{ cursor: "pointer" }}>
                      Selecionar
                      <input
                        type="file"
                        accept="video/*"
                        hidden
                        onChange={(e) => onFileSelect("video", e.target.files?.[0])}
                      />
                    </label>
                  </div>

                  {previews.videoName ? (
                    <div className="file-chip">{previews.videoName}</div>
                  ) : (
                    <div className="file-chip">Nenhum vídeo selecionado</div>
                  )}

                  {uploading.video && (
                    <div className="progress-wrap">
                      <div
                        className="progress-bar"
                        style={{ width: `${progress.video}%` }}
                      />
                    </div>
                  )}
                </div>

                <div className="upload-box">
                  <div className="upload-top">
                    <div>
                      <h4 className="upload-title">Upload do trailer</h4>
                      <p className="upload-hint">Opcional, para exibição separada.</p>
                    </div>
                    <label className="soft-btn" style={{ cursor: "pointer" }}>
                      Selecionar
                      <input
                        type="file"
                        accept="video/*"
                        hidden
                        onChange={(e) => onFileSelect("trailer", e.target.files?.[0])}
                      />
                    </label>
                  </div>

                  {previews.trailerName ? (
                    <div className="file-chip">{previews.trailerName}</div>
                  ) : (
                    <div className="file-chip">Nenhum trailer selecionado</div>
                  )}

                  {uploading.trailer && (
                    <div className="progress-wrap">
                      <div
                        className="progress-bar"
                        style={{ width: `${progress.trailer}%` }}
                      />
                    </div>
                  )}
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  gap: 12,
                  flexWrap: "wrap",
                  marginTop: 18,
                }}
              >
                <button
                  className="primary-btn"
                  type="submit"
                  disabled={submitting || isAnyUploading}
                >
                  {submitting
                    ? "Salvando..."
                    : editingId
                    ? "Atualizar conteúdo"
                    : "Salvar conteúdo"}
                </button>

                <button className="soft-btn" type="button" onClick={resetForm}>
                  Limpar formulário
                </button>

                <button className="ghost-btn" type="button" onClick={onClose}>
                  Cancelar
                </button>
              </div>
            </form>
          </div>

          <div className="panel-card">
            <div className="section-head" style={{ marginBottom: 14 }}>
              <div>
                <h3 className="section-title" style={{ fontSize: "1.18rem" }}>
                  Conteúdos cadastrados
                </h3>
                <p className="section-subtitle">
                  Selecione um item para editar ou excluir.
                </p>
              </div>
            </div>

            <div className="admin-list">
              {movies.length ? (
                movies.map((movie) => (
                  <div className="admin-item" key={movie.id}>
                    <div className="admin-item-thumb">
                      <img
                        src={movie.coverUrl || movie.bannerUrl || DEFAULT_POSTER}
                        alt={movie.title}
                      />
                    </div>

                    <div>
                      <h4 className="admin-item-title">{movie.title}</h4>
                      <div className="admin-item-meta">
                        {movie.category} • {movie.type} • {formatYear(movie.year)}
                        <br />
                        Popularidade: {movie.popularity || 0} • Visualizações:{" "}
                        {movie.views || 0}
                      </div>

                      <div className="admin-item-actions">
                        <button
                          className="soft-btn"
                          type="button"
                          onClick={() => fillFromMovie(movie)}
                        >
                          Editar
                        </button>

                        <button
                          className="danger-btn"
                          type="button"
                          onClick={() => handleDelete(movie.id)}
                        >
                          Excluir
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="empty-state" style={{ padding: 22 }}>
                  <h3 style={{ fontSize: "1.2rem" }}>Seja bem-vindo ao meu site</h3>
                  <p>
                    Ainda não existem conteúdos cadastrados. Use o formulário ao lado
                    para publicar o primeiro item no catálogo.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-card">
          <div className="brand" style={{ cursor: "default" }}>
            <span className="brand-d">D</span>
            <span>RICK</span>
          </div>
          <div>DRICK • plataforma visual premium</div>
        </div>
      </div>
    </footer>
  );
}

export default App;
