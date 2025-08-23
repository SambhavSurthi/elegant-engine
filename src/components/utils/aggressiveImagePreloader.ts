// AGGRESSIVE IMAGE PRELOADER - Uses multiple proven techniques
const PROJECT_IMAGES = [
  '/personal/MyPic1.jpg',
  '/personal/MyPic2.jpg',
  '/personal/MyPic3.jpg',
  '/personal/MyPic4.jpg'
];

class AggressiveImagePreloader {
  private loadedImages = new Set<string>();
  private loadingPromises: Promise<void>[] = [];

  constructor() {
    this.startPreloading();
  }

  private startPreloading() {
    if (typeof window === 'undefined') return;

    console.log('🚀 Starting AGGRESSIVE image preloading...');

    // Method 1: HTML Link Preloading (Most Effective)
    PROJECT_IMAGES.forEach(src => {
      this.addPreloadLink(src);
    });

    // Method 2: Force Load with Image Constructor
    PROJECT_IMAGES.forEach(src => {
      this.forceLoadImage(src);
    });

    // Method 3: Fetch API Preloading
    PROJECT_IMAGES.forEach(src => {
      this.fetchPreload(src);
    });

    // Method 4: XMLHttpRequest Preloading
    PROJECT_IMAGES.forEach(src => {
      this.xhrPreload(src);
    });

    // Method 5: Create hidden img elements
    PROJECT_IMAGES.forEach(src => {
      this.createHiddenImage(src);
    });
  }

  private addPreloadLink(src: string) {
    try {
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

      // Preconnect
      const preconnectLink = document.createElement('link');
      preconnectLink.rel = 'preconnect';
      preconnectLink.href = new URL(src, window.location.origin).origin;
      document.head.appendChild(preconnectLink);
    } catch (error) {
      console.warn('Failed to add preload links:', error);
    }
  }

  private forceLoadImage(src: string): Promise<void> {
    return new Promise((resolve) => {
      try {
        // Create multiple image instances to ensure loading
        for (let i = 0; i < 5; i++) {
          const img = new Image();
          img.onload = () => {
            this.loadedImages.add(src);
            resolve();
          };
          img.onerror = () => resolve();
          img.src = src;
          img.fetchPriority = 'high';
        }
      } catch (error) {
        resolve();
      }
    });
  }

  private fetchPreload(src: string): Promise<void> {
    return new Promise((resolve) => {
      try {
        // Try HEAD request first
        fetch(src, { 
          method: 'HEAD',
          mode: 'no-cors',
          cache: 'force-cache'
        }).then(() => resolve()).catch(() => {
          // If HEAD fails, try GET
          fetch(src, { 
            method: 'GET',
            mode: 'no-cors',
            cache: 'force-cache'
          }).then(() => resolve()).catch(() => resolve());
        });
      } catch (error) {
        resolve();
      }
    });
  }

  private xhrPreload(src: string): Promise<void> {
    return new Promise((resolve) => {
      try {
        const xhr = new XMLHttpRequest();
        xhr.open('HEAD', src, true);
        xhr.onload = () => resolve();
        xhr.onerror = () => resolve();
        xhr.send();
      } catch (error) {
        resolve();
      }
    });
  }

  private createHiddenImage(src: string): Promise<void> {
    return new Promise((resolve) => {
      try {
        const img = document.createElement('img');
        img.style.display = 'none';
        img.onload = () => {
          this.loadedImages.add(src);
          resolve();
        };
        img.onerror = () => resolve();
        img.src = src;
        img.fetchPriority = 'high';
        document.body.appendChild(img);
        
        // Remove after loading
        setTimeout(() => {
          if (document.body.contains(img)) {
            document.body.removeChild(img);
          }
        }, 1000);
      } catch (error) {
        resolve();
      }
    });
  }

  public async waitForImages(): Promise<void> {
    // Wait for all loading promises to complete
    await Promise.allSettled(this.loadingPromises);
    
    // Additional wait to ensure browser has processed everything
    await new Promise(resolve => setTimeout(resolve, 500));
  }

  public isImageLoaded(src: string): boolean {
    return this.loadedImages.has(src);
  }

  public getLoadedCount(): number {
    return this.loadedImages.size;
  }

  public getTotalCount(): number {
    return PROJECT_IMAGES.length;
  }
}

// Create and export instance
const imagePreloader = new AggressiveImagePreloader();
export default imagePreloader;
