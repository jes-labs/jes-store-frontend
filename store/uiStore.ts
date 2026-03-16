/**
 * UI store - manages sidebar open/close, collapsibility, active modal, and other UI state
 */

import { create } from 'zustand';

interface UIStoreState {
  sidebarOpen: boolean;
  sidebarCollapsed: boolean;
  activeModal: string | null;
  notificationCount: number;

  // Actions
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  toggleSidebarCollapse: () => void;
  setSidebarCollapsed: (collapsed: boolean) => void;
  openModal: (modalId: string) => void;
  closeModal: () => void;
  setNotificationCount: (count: number) => void;
}

export const useUiStore = create<UIStoreState>((set) => ({
  sidebarOpen: true,
  sidebarCollapsed: false,
  activeModal: null,
  notificationCount: 0,

  toggleSidebar: () => {
    set((state) => ({ sidebarOpen: !state.sidebarOpen }));
  },

  setSidebarOpen: (open: boolean) => {
    set({ sidebarOpen: open });
  },

  toggleSidebarCollapse: () => {
    set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed }));
  },

  setSidebarCollapsed: (collapsed: boolean) => {
    set({ sidebarCollapsed: collapsed });
  },

  openModal: (modalId: string) => {
    set({ activeModal: modalId });
  },

  closeModal: () => {
    set({ activeModal: null });
  },

  setNotificationCount: (count: number) => {
    set({ notificationCount: Math.max(0, count) });
  },
}));
