import React from "react";
import { COPY, Copy, Locale, formatNumber } from "../copy";

type LocaleValue = {
  locale: Locale;
  copy: Copy;
  /** Locale-aware thousands separator: 11,333 in en, 11.333 in pt and id. */
  n: (value: number) => string;
};

const LocaleContext = React.createContext<LocaleValue>({
  locale: "en",
  copy: COPY.en,
  n: (v) => formatNumber(v, "en"),
});

/** Wraps the promo tree so every scene reads its strings from the active locale. */
export const CopyProvider: React.FC<{ locale: Locale; children: React.ReactNode }> = ({ locale, children }) => {
  const value = React.useMemo<LocaleValue>(
    () => ({ locale, copy: COPY[locale], n: (v: number) => formatNumber(v, locale) }),
    [locale],
  );
  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
};

export const useCopy = () => React.useContext(LocaleContext);
