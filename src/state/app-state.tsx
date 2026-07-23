import { createContext, useContext, useMemo, useState } from "react";
import type { FeedCheckResult, PromptConfig } from "../types";

type ReviewChecklist = {
  citationCompleteness: boolean;
  confidenceLabelPresent: boolean;
  uncertaintyStatementPresentWhenNeeded: boolean;
};

type AppState = {
  config: PromptConfig;
  setConfig: (updater: (prev: PromptConfig) => PromptConfig) => void;
  feedResults: FeedCheckResult[];
  setFeedResults: (next: FeedCheckResult[]) => void;
  checklist: ReviewChecklist;
  setChecklist: (updater: (prev: ReviewChecklist) => ReviewChecklist) => void;
};

const defaultConfig: PromptConfig = {
  persona: "nibley",
  mode: "closed_corpus",
  sourceScope: "local_only",
  citationStyle: "book_chapter_talk",
  includeConfidence: true,
  includeUncertaintyFallback: true
};

const AppStateContext = createContext<AppState | undefined>(undefined);

export function AppStateProvider({ children }: { children: React.ReactNode }) {
  const [config, setConfigState] = useState<PromptConfig>(defaultConfig);
  const [feedResults, setFeedResults] = useState<FeedCheckResult[]>([]);
  const [checklist, setChecklistState] = useState<ReviewChecklist>({
    citationCompleteness: false,
    confidenceLabelPresent: false,
    uncertaintyStatementPresentWhenNeeded: false
  });

  const value = useMemo<AppState>(
    () => ({
      config,
      setConfig: (updater) => setConfigState((prev) => updater(prev)),
      feedResults,
      setFeedResults,
      checklist,
      setChecklist: (updater) => setChecklistState((prev) => updater(prev))
    }),
    [config, feedResults, checklist]
  );

  return <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>;
}

export function useAppState() {
  const ctx = useContext(AppStateContext);
  if (!ctx) {
    throw new Error("useAppState must be used within AppStateProvider");
  }
  return ctx;
}