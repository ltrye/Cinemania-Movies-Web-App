import { BACKEND } from "@/constant/AppConstant";

export interface Film {
  _id: string;
  actors: string[];
  uploadDate: string;
  genres: string[];
  ratingsAverage: number;
  ratingsQuantity: number;
  hot: boolean;
  views: number;
  name: string;
  length: string;
  year: string;
  link: string;
  description: string;
  filmType: string;
  director: string;
  poster: string;
  filmImage: string;
  slug: string;
  __v: number;
}

export async function getFilmList(params = null) {
  const movieList = await fetch(
    `${BACKEND}/film${params !== null ? "?" + params : " "}`,
    { next: { revalidate: 5 } }
  );
  return movieList.json();
}

export async function getFilmListByPage(page: number, limit: number) {
  const res = await fetch(`${BACKEND}/film?page=${page}&limit=${limit}`, {
    next: { revalidate: 10 },
  });
  if (!res.ok) {
    throw new Error("Fail to fetch data");
  }
  return await res.json();
}

export async function getFilmById(id) {
  const res = await fetch(`${BACKEND}/film/${id}`, {
    next: { revalidate: 10 },
  });
  if (!res.ok) {
    throw new Error("Fail to fetch data");
  }
  return await res.json();
}

export async function getSpotlightFilm() {
  const res = await fetch(`${BACKEND}/film?page=${1}&limit=${5}`, {
    next: { revalidate: 10 },
  });
  if (!res.ok) {
    throw new Error("Fail to fetch data");
  }
  return await res.json();
}

export async function getTrendingFilm() {
  const res = await fetch(`${BACKEND}/film?page=${1}&limit=${10}`, {
    next: { revalidate: 10 },
  });
  if (!res.ok) {
    throw new Error("Fail to fetch data");
  }
  return await res.json();
}

export async function addFilm() {
  const res = await fetch(`${BACKEND}/film`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: "New Film",
      year: 2021,
      genres: ["Action", "Adventure"],
      description: "This is a new film",
      rating: 5,
      poster: "https://picsum.photos/200",
      trailer: "https://www.youtube.com/watch?v=6ZfuNTqbHE8",
    }),
  });
  if (!res.ok) {
    throw new Error("Fail to fetch data");
  }
  return await res.json();
}
