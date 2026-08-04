import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { WidgetScreen } from "@/types/widget";
import { Doc, Id } from "@workspace/backend/_generated/dataModel";
import { RootState } from "../store";
import { CONTACT_SESSION_KEY } from "@/constants/widget";

export interface WidgetState {
  screen: WidgetScreen;
  organizationId: string | null;

  contactSessionIds: Record<string, Id<"contactSessions"> | null>; // difference contactsessionIdAtomFamily

  errorMessage: string | null;
  loadingMessage: string | null;

  conversationId: Id<"conversations"> | null;

  widgetSettings: Doc<"widgetSettings"> | null;

  vapiSecrets: {
    publicApiKey: string;
  } | null;
}

const initialState: WidgetState = {
  screen: "loading",
  organizationId: null,

  contactSessionIds: {},

  errorMessage: null,
  loadingMessage: null,

  conversationId: null,

  widgetSettings: null,

  vapiSecrets: null,
};

const widgetSlice = createSlice({
  name: "widget",

  initialState,

  reducers: {
    hydrateContactSessions: (state) => {
      if (typeof window !== "undefined") {
        try {
          const sessions: Record<string, Id<"contactSessions"> | null> = {};

          // LocalStorage me jitni bhi Keys hain unko check karenge
          for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);

            // Agar key tutorial wale pattern `${CONTACT_SESSION_KEY}_${orgId}` se start hoti hai
            if (key && key.startsWith(`${CONTACT_SESSION_KEY}_`)) {
              const organizationId = key.replace(`${CONTACT_SESSION_KEY}_`, "");
              const value = localStorage.getItem(key);

              if (value) {
                // atomWithStorage JSON stringified format me save karta hai
                sessions[organizationId] = JSON.parse(value);
              }
            }
          }

          state.contactSessionIds = sessions;
        } catch (error) {
          console.error(
            "Failed to load contact sessions from localStorage",
            error
          );
        }
      }
    },
    setScreen: (state, action: PayloadAction<WidgetScreen>) => {
      state.screen = action.payload;
    },

    setOrganizationId: (state, action: PayloadAction<string | null>) => {
      state.organizationId = action.payload;
    },

    setContactSessionId: (
      state,
      action: PayloadAction<{
        organizationId: string;
        contactSessionId: Id<"contactSessions"> | null;
      }>
    ) => {
      const { organizationId, contactSessionId } = action.payload;

      // 1. Redux State Update
      state.contactSessionIds[organizationId] = contactSessionId;

      // 2. LocalStorage Sync (Dynamic key like tutorial: widget_contact_session_${organizationId})
      if (typeof window !== "undefined") {
        try {
          const storageKey = `${CONTACT_SESSION_KEY}_${organizationId}`;
          if (contactSessionId === null) {
            localStorage.removeItem(storageKey);
          } else {
            localStorage.setItem(storageKey, JSON.stringify(contactSessionId));
          }
        } catch (error) {
          console.error(
            "Failed to save contactSessionId to localStorage",
            error
          );
        }
      }
    },

    setErrorMessage: (state, action: PayloadAction<string | null>) => {
      state.errorMessage = action.payload;
    },

    setLoadingMessage: (state, action: PayloadAction<string | null>) => {
      state.loadingMessage = action.payload;
    },

    setConversationId: (
      state,
      action: PayloadAction<Id<"conversations"> | null>
    ) => {
      state.conversationId = action.payload;
    },

    setWidgetSettings: (
      state,
      action: PayloadAction<Doc<"widgetSettings"> | null>
    ) => {
      state.widgetSettings = action.payload;
    },

    setVapiSecrets: (
      state,
      action: PayloadAction<{
        publicApiKey: string;
      } | null>
    ) => {
      state.vapiSecrets = action.payload;
    },
  },
});

export const {
  setScreen,
  setOrganizationId,
  setContactSessionId,
  setErrorMessage,
  setLoadingMessage,
  setConversationId,
  setWidgetSettings,
  setVapiSecrets,
  hydrateContactSessions,
} = widgetSlice.actions;

export default widgetSlice.reducer;

export const hasVapiSecretsSelector = (state: RootState) =>
  state.widget.vapiSecrets !== null;

export const selectContactSessionIdByOrg =
  (organizationId: string | null) => (state: RootState) => {
    if (!organizationId) return null;
    return state.widget.contactSessionIds[organizationId] || null;
  };
