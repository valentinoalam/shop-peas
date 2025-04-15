"use client";

import { Place } from "@/types/business";
import { create } from "zustand";

interface SearchStore {
  places: Place[];
  selectedPlace: Place | null;
  searchQuery: string;
  selectedCategory: string;
  addPlace: (place: Place) => void;
  setSelectedPlace: (place: Place | null) => void;
  setSearchQuery: (query: string) => void;
  setSelectedCategory: (category: string) => void;
  filteredPlaces: Place[];
}

export const useSearchStore = create<SearchStore>((set, get) => ({
  places: [
    {
      id: "1",
      name: "Big Ben",
      description: "Famous clock tower in London",
      category: "attraction",
      latitude: 51.500729,
      longitude: -0.124625,
    },
    {
      id: "2",
      name: "Tower Bridge",
      description: "Iconic bridge over the River Thames",
      category: "attraction",
      latitude: 51.505456,
      longitude: -0.075356,
    },
    {
      id: "3",
      name: "The Ritz London",
      description: "Luxury hotel in Piccadilly",
      category: "hotel",
      latitude: 51.507074,
      longitude: -0.144596,
    },
  ],
  selectedPlace: null,
  searchQuery: "",
  selectedCategory: "all",
  addPlace: (place) => set((state) => ({ places: [...state.places, place] })),
  setSelectedPlace: (place) => set({ selectedPlace: place }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  setSelectedCategory: (category) => set({ selectedCategory: category }),
  get filteredPlaces() {
    const state = get();
    return state.places.filter((place) => {
      const matchesSearch = place.name
        .toLowerCase()
        .includes(state.searchQuery.toLowerCase());
      const matchesCategory =
        state.selectedCategory === "all" ||
        place.category === state.selectedCategory;
      return matchesSearch && matchesCategory;
    });
  },
}));
