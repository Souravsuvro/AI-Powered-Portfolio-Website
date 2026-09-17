interface PerformanceMetric {
  name: string;
  duration: number;
  startTime: number;
}

export const performanceMonitor = {
  logWebVitals: () => {
    if ('performance' in window) {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          const metric: PerformanceMetric = {
            name: entry.name,
            duration: entry.duration,
            startTime: entry.startTime
          };
          console.log(`Performance Metric: ${metric.name}`, {
            duration: metric.duration,
            startTime: metric.startTime
          });
        }
      });
      observer.observe({ type: 'measure', buffered: true });
      observer.observe({ type: 'navigation', buffered: true });
    }
  },

  measurePageLoad: () => {
    if ('performance' in window) {
      const navigationEntries = performance.getEntriesByType('navigation');
      if (navigationEntries.length > 0) {
        const navigationEntry = navigationEntries[0] as PerformanceNavigationTiming;
        console.log('Page Load Metrics:', {
          loadTime: navigationEntry.loadEventEnd - navigationEntry.startTime,
          domInteractive: navigationEntry.domInteractive - navigationEntry.startTime,
          firstByte: navigationEntry.responseStart - navigationEntry.startTime
        });
      }
    }
  },

  trackUserInteractions: () => {
    document.addEventListener('click', (event) => {
      const target = event.target as HTMLElement;
      performance.mark(`interaction-${target.tagName}`);
      console.log('User Interaction:', {
        element: target.tagName,
        className: target.className,
        timestamp: performance.now()
      });
    });
  }
};

export const initPerformanceMonitoring = () => {
  performanceMonitor.logWebVitals();
  performanceMonitor.measurePageLoad();
  performanceMonitor.trackUserInteractions();
};
