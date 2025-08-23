// AGGRESSIVE image preloader that runs immediately when this file is imported
const PROJECT_IMAGES = [
  '/personal/MyPic1.jpg',
  '/personal/MyPic2.jpg',
  '/personal/MyPic3.jpg',
  '/personal/MyPic4.jpg'
];

// Run immediately when this file is imported
if (typeof window !== 'undefined') {
  // Method 1: Add to head immediately with multiple strategies
  PROJECT_IMAGES.forEach(src => {
    // Preload link
    const preloadLink = document.createElement('link');
    preloadLink.rel = 'preload';
    preloadLink.as = 'image';
    preloadLink.href = src;
    preloadLink.fetchPriority = 'high';
    document.head.appendChild(preloadLink);
    
    // DNS prefetch
    const dnsLink = document.createElement('link');
    dnsLink.rel = 'dns-prefetch';
    dnsLink.href = new URL(src, window.location.origin).origin;
    document.head.appendChild(dnsLink);
    
    // Preconnect for faster connection
    const preconnectLink = document.createElement('link');
    preconnectLink.rel = 'preconnect';
    preconnectLink.href = new URL(src, window.location.origin).origin;
    document.head.appendChild(preconnectLink);
  });
  
  // Method 2: Force load images immediately with multiple instances
  PROJECT_IMAGES.forEach(src => {
    // Create 10 instances to ensure loading
    for (let i = 0; i < 10; i++) {
      const img = new Image();
      img.src = src;
      img.fetchPriority = 'high';
      img.crossOrigin = 'anonymous';
    }
    
    // Also try with different query parameters to ensure loading
    ['', '?v=1', '?t=' + Date.now(), '?cache=' + Math.random()].forEach(query => {
      const forceImg = new Image();
      forceImg.src = src + query;
      forceImg.fetchPriority = 'high';
    });
  });
  
  // Method 3: Add to browser cache aggressively
  setTimeout(() => {
    PROJECT_IMAGES.forEach(src => {
      // Create multiple instances to ensure caching
      for (let i = 0; i < 10; i++) {
        const cacheImg = new Image();
        cacheImg.src = src;
        cacheImg.fetchPriority = 'high';
      }
    });
  }, 50);
  
  // Method 4: Use fetch API to preload
  PROJECT_IMAGES.forEach(src => {
    fetch(src, { 
      method: 'HEAD',
      mode: 'no-cors'
    }).catch(() => {
      // Ignore errors, just trying to warm up the connection
    });
    
    // Also try GET request
    fetch(src, { 
      method: 'GET',
      mode: 'no-cors'
    }).catch(() => {
      // Ignore errors, just trying to warm up the connection
    });
  });
  
  // Method 5: Use XMLHttpRequest as additional method
  PROJECT_IMAGES.forEach(src => {
    const xhr = new XMLHttpRequest();
    xhr.open('HEAD', src, true);
    xhr.send();
  });
}

export const preloadProjectImages = () => {
  // This function can be called by components as a backup
  if (typeof window !== 'undefined') {
    PROJECT_IMAGES.forEach(src => {
      const img = new Image();
      img.src = src;
      img.fetchPriority = 'high';
    });
  }
};

export default preloadProjectImages;
