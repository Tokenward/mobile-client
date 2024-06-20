import { useRouter } from "expo-router";

const useGoBack = () => {
  const router = useRouter();

  const goBack = () => {
    router.back();
  };

  return goBack;
};

export default useGoBack;