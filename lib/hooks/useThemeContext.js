import { useContext } from "react";
import { ThemeContext } from "../../app/pages/_layout";

const useThemeContext = () => {
  return useContext(ThemeContext);
};

export default useThemeContext;