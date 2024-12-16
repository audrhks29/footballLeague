import { create } from "zustand";

type Store = {
  theme: string | null;
  setTheme(checked: boolean): void;
};

const useThemeStore = create<Store>()((set) => ({
  theme: localStorage.getItem("football-League-theme")
    ? localStorage.getItem("football-League-theme")
    : window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light",

  setTheme: (checked) => set(() => ({ theme: checked ? "dark" : "light" })),
}));

export default useThemeStore;
