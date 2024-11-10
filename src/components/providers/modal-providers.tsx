"use client";

import React from "react";

import { SettingsModal } from "@/components/modals/SettingsModal";
import { CoverImageModal } from "@/components/modals/CoverImageModal";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <SettingsModal />
      <CoverImageModal />
    </>
  ); 
};