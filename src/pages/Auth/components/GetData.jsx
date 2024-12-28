import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useGetData = (url) => {
  return useQuery({
    queryKey: [url],
    queryFn: async () => {
      const response = await axios.get(url);
      return response.data;
    },
    onError: (error) => {
      console.error("Error fetching data:", error);
    },
  });
};
