export default async function checkLoggin() {
  const res = await fetch(
    "https://movieflix-production.up.railway.app/api/v1/user/me",
    {
      method: "GET",
      cache: "no-store",
      // credentials: "include",
    }
  );
  if (!res.ok) console.log("Error checking user! Try again later");
  return res.json();
}
