export type Persona = "nibley" | "snuffer" | "neutral";
export type Mode = "closed_corpus" | "live_update";
export type SourceScope = "local_only" | "local_plus_primary";
export type CitationStyle = "book_chapter_talk" | "url_date";

export type PromptConfig = {
  persona: Persona;
  mode: Mode;
  sourceScope: SourceScope;
  citationStyle: CitationStyle;
  includeConfidence: boolean;
  includeUncertaintyFallback: boolean;
};

export type FeedCheckStatus = "idle" | "checking" | "ok" | "error";

export type FeedCheckResult = {
  sourceName: string;
  url: string;
  status: FeedCheckStatus;
  fetchedAt?: string;
  latestItemTitle?: string;
  latestItemDate?: string;
  error?: string;
  detail?: string;
  cached?: boolean;
};

export const FEED_TARGETS = [
  {
    sourceName: "Denver Snuffer Blog Feed",
    url: "https://denversnuffer.com/feed/"
  },
  {
    sourceName: "Denver Snuffer Podcast Feed",
    url: "https://denversnuffer.com/feed/podcasts/"
  }
] as const;