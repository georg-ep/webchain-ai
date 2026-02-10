"use client";

import { GoogleAnalytics } from "nextjs-google-analytics";

const GoogleAnalyticsProvider = () => {
  return <GoogleAnalytics trackPageViews />;
};

export default GoogleAnalyticsProvider;