"use client";
import { useEffect, useRef } from "react";
import { Provider } from "react-redux";
import { makeStore, AppStore } from "@/redux/store";
import { hydrateContactSessions } from "@/redux/slices/widgetSlice";

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const storeRef = useRef<AppStore | null>(null);
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore();
  }

  useEffect(() => {
    // Client-side mount hone par localStorage me stored sessions Redux state me load hongi
    if (storeRef.current) {
      storeRef.current.dispatch(hydrateContactSessions());
    }
  }, []);

  return <Provider store={storeRef.current}>{children}</Provider>;
}
