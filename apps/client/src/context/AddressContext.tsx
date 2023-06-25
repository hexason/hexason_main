import { getAllAdressGQL } from "@/lib/Services";
import { UserAddress } from "@/lib/types";
import { useQuery } from "@apollo/client";
import { PropsWithChildren, createContext, useContext, useEffect, useState } from "react";

// Context
export const AddressContext = createContext<{
  address: UserAddress | null,
  allAddress: UserAddress[],
  actions: {
    setAddress: (data: UserAddress) => void,
    refetch: () => void
  }
}>({ address: null, allAddress: [], actions: { setAddress: () => { }, refetch: () => { } } });

// Provider
export function AddressProvider({ children }: PropsWithChildren) {
  const [address, setAddress] = useState<UserAddress | null>(null);
  const { data, refetch } = useQuery(getAllAdressGQL)

  useEffect(() => {
    refetch();
  }, [address])

  return (
    <AddressContext.Provider value={{
      address,
      allAddress: data?.getAllAddress || [],
      actions: {
        setAddress,
        refetch
      }
    }}>
      {children}
    </AddressContext.Provider>
  );
}

// Hook
export function useAddress() {
  const context = useContext(AddressContext);
  if (!context) throw new Error('useContext must be used within a AddressProvider');

  return context;
}