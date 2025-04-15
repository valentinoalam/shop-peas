import { useEffect, useState  } from "react";
import type { Dispatch, SetStateAction } from "react";

export type SocialScripts = {
  x: boolean;
  fb: boolean;
  linkedIn: boolean;
  trustPilot: boolean;
};

type Setters = {
  [K in keyof SocialScripts as `set${Capitalize<K>}`]: (value: boolean) => void;
};

type UseSocialScriptsReturn = {
  scripts: SocialScripts;
  setScripts: Dispatch<SetStateAction<SocialScripts>>;
} & Setters;

const initialState: SocialScripts = {
  x: false,
  fb: false,
  linkedIn: false,
  trustPilot: false,
};

const socialKeys = ["x", "fb", "linkedIn", "trustPilot"] as const;

// Global state management
let globalState = initialState;
const subscribers = new Set<() => void>();

const notifySubscribers = () => subscribers.forEach((sub) => sub());

const createGlobalSetter =
  (key: keyof SocialScripts) => (value: boolean) => {
    globalState = { ...globalState, [key]: value };
    notifySubscribers();
  };

const globalSetters = socialKeys.reduce((acc, key) => {
  const setterName = `set${key[0].toUpperCase()}${key.slice(1)}` as keyof Setters;
  acc[setterName] = createGlobalSetter(key);
  return acc;
}, {} as Setters);

const globalStore = {
  getState: () => globalState,
  setState: (newState: SetStateAction<SocialScripts>) => {
    globalState =
      typeof newState === "function" ? newState(globalState) : newState;
    notifySubscribers();
  },
  subscribe: (callback: () => void) => {
    subscribers.add(callback);
    return () => subscribers.delete(callback);
  },
  ...globalSetters,
};

export const useSocialScripts = (): UseSocialScriptsReturn => {
  const [state, setLocalState] = useState(globalStore.getState());
  
  useEffect(() => {
    // Check if component is mounted
    let isMounted = true;
    
    // Subscribe to store updates
    const unsubscribe = globalStore.subscribe(() => {
      if (isMounted) {
        setLocalState(globalStore.getState());
      }
    });

    // Initial state update
    if (isMounted) {
      setLocalState(globalStore.getState());
    }

    // Cleanup function
    return () => {
      isMounted = false;
      unsubscribe();
    };
  }, []);

  return {
    scripts: state,
    setScripts: globalStore.setState,
    ...globalSetters,
  };
};