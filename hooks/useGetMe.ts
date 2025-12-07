import useSWR from "swr";
import axios from "axios";

export interface User {
  _id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  profilePicture?: string;
  role: "admin" | "hr" | "employee";
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
  
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface GetMeResponse {
  success: boolean;
  message: string;
  data: User;
}

const fetcher = (url: string) =>
  axios.get<GetMeResponse>(url, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  }).then((res) => res.data.data);

export function useGetMe() {
  const { data, error, isLoading, mutate } = useSWR<User>(
    "https://nebs-backend.vercel.app/v1/api/auth/me",
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
      dedupingInterval: 60000, // cache for 1 minute
    }
  );

  return {
    user: data,
    image:data?.profilePicture || '/asif.jpg',
    isLoading,
    isError: error,
    mutate, // to refresh user data
  };
}