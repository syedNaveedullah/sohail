import { useQuery } from "@tanstack/react-query";
import { getProfile } from "../api/fetching-apis";
import Cookies from "js-cookie";

const useProfile = () => {
  const accessToken = Cookies.get("accessToken"); // Get token from cookies

  return useQuery({
    queryFn: getProfile,
    queryKey: ["profile"],
    enabled: !!accessToken, // Only fetch if token exists
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
  });
};

export default useProfile;
