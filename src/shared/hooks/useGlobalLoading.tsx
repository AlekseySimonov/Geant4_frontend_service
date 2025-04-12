import { useGetProfileQuery } from "@/pages/profilePage/api/profileApi";

export const useGlobalLoading = (): boolean => {
    const { isFetching: isProfileLoading } = useGetProfileQuery();

    return isProfileLoading 
};