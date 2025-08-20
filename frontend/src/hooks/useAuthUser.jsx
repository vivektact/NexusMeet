import {
  useQuery,
  useMutation,
} from '@tanstack/react-query'

const query = useQuery({ queryKey: ['todos'], queryFn: getTodos })



const useAuthUser = () => {
  const authUser = useQuery({
    queryKey: ["authUser"],
    queryFn: getAuthUser,
    retry: false, // auth check
  });

  return { isLoading: authUser.isLoading, authUser: authUser.data?.user };
};
export default useAuthUser;