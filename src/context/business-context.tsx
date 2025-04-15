'use client'
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Business, NewBusiness } from '@/types/business';
import { v4 as uuidv4 } from 'uuid';
import { toast } from "sonner";

interface BusinessContextType {
  businesses: Business[];
  selectedBusiness: Business | null;
  setSelectedBusiness: (business: Business | null) => void;
  addBusiness: (business: NewBusiness) => void;
  removeBusiness: (id: string) => void;
  updateBusiness: (id: string, business: Partial<Business>) => void;
}

const BusinessContext = createContext<BusinessContextType | undefined>(undefined);

export const useBusiness = () => {
  const context = useContext(BusinessContext);
  if (context === undefined) {
    throw new Error('useBusiness must be used within a BusinessProvider');
  }
  return context;
};

export const BusinessProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [selectedBusiness, setSelectedBusiness] = useState<Business | null>(null);
  useEffect(() => {
    // Load businesses from localStorage on initial render
    const saved = localStorage.getItem('businesses');
    setBusinesses(saved ? JSON.parse(saved) : [])
  }, []);
  // Save businesses to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('businesses', JSON.stringify(businesses));
  }, [businesses]);

  const addBusiness = (business: NewBusiness) => {
    const newBusiness: Business = {
      ...business,
      id: uuidv4(),
      createdAt: new Date(),
    };
    
    setBusinesses((prev) => [...prev, newBusiness]);
    toast.success(`${business.name} has been added!`);
  };

  const removeBusiness = (id: string) => {
    setBusinesses((prev) => prev.filter((business) => business.id !== id));
    if (selectedBusiness?.id === id) {
      setSelectedBusiness(null);
    }
    toast.info("Business has been removed");
  };

  const updateBusiness = (id: string, updates: Partial<Business>) => {
    setBusinesses((prev) =>
      prev.map((business) =>
        business.id === id ? { ...business, ...updates } : business
      )
    );
    
    if (selectedBusiness?.id === id) {
      setSelectedBusiness((prev) => prev ? { ...prev, ...updates } : null);
    }
    
    toast.success("Business has been updated");
  };

  return (
    <BusinessContext.Provider
      value={{
        businesses,
        selectedBusiness,
        setSelectedBusiness,
        addBusiness,
        removeBusiness,
        updateBusiness,
      }}
    >
      {children}
    </BusinessContext.Provider>
  );
};
