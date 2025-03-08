import { useEffect, useState } from "react";
import { WishList } from "../types/wishList";

// DBから取得したデータを格納する
export const useWishList = () => {
  const [wishList, setWishList] = useState<WishList[]>([]);
  const fetchWishList = async () => {
    try {
      const response = await fetch("/api/movies");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setWishList(data);
    } catch (error) {
      console.error(error);
    } finally {
      console.log("fetch movies done");
    }
  };

  useEffect(() => {
    fetchWishList();
  }, []);

  return { wishList, fetchWishList };
};
