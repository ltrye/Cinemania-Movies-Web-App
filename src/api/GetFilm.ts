import { BACKEND } from "@/constant/AppConstant";

export async function getFilmList(params = null) {
  const movieList = await fetch(
    `${BACKEND}/film${params !== null ? "?" + params : " "}`,
    { next: { revalidate: 5 } }
  );
  return movieList.json();
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


export async function getTrendingFilm(){
  const res = await fetch(`${BACKEND}/film?page=${1}&limit=${10}`, {
    next: { revalidate: 10 },
  });
  if (!res.ok) {
    throw new Error("Fail to fetch data");
  }
  return await res.json();
}