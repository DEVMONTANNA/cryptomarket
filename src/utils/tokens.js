import { toast } from "react-toastify";

export async function fetchCrypto() {
  try {
    const fetchData = await fetch(
      "https://tokeninfo-ai-kpgk.onrender.com/token/1/list"
    );
    if (!fetchData.ok) return toast.error("Failed to fetch crypto.");
    const result = await fetchData.json();

    return result;
  } catch (error) {
    console.log("Fetch crypto error: ", error);
  }
}
