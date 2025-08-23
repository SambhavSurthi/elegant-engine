// SIMPLE IMAGE LOADER - Bulletproof approach that definitely works
const PROJECT_IMAGES = [
  '/personal/MyPic1.jpg',
  '/personal/MyPic2.jpg',
  '/personal/MyPic3.jpg',
  '/personal/MyPic4.jpg'
];

class SimpleImageLoader {
  private loadedImages = new Set<string>();
  private totalImages = PROJECT_IMAGES.length;

  constructor() {
    this.startLoading();
  }

  private startLoading() {
    if (typeof window === 'undefined') return;

    console.log('🚀 SIMPLE LOADER: Starting image loading...');

    // Create hidden images in DOM - this is the most reliable method
    PROJECT_IMAGES.forEach(src => {
      this.createHiddenImage(src);
    });

    // Also use Image constructor as backup
    PROJECT_IMAGES.forEach(src => {
      this.createImageInstance(src);
    });
  }

  private createHiddenImage(src: string) {
    try {
      const img = document.createElement('img');
      img.style.cssText = 'position:absolute;left:-9999px;top:-9999px;width:1px;height:1px;opacity:0;pointer-events:none;z-index:-9999;';
      img.src = src;
      img.fetchPriority = 'high';
      
      img.onload = () => {
        console.log(`✅ SIMPLE LOADER: Image loaded: ${src}`);
        this.loadedImages.add(src);
      };
      
      img.onerror = () => {
        console.warn(`❌ SIMPLE LOADER: Failed to load: ${src}`);
      };

      // Add to DOM immediately
      document.body.appendChild(img);
      
      // Remove after a delay to clean up
      setTimeout(() => {
        if (document.body.contains(img)) {
          document.body.removeChild(img);
        }
      }, 5000);
      
    } catch (error) {
      console.warn('Error creating hidden image:', error);
    }
  }

  private createImageInstance(src: string) {
    try {
      const img = new Image();
      img.onload = () => {
        console.log(`✅ SIMPLE LOADER: Image instance loaded: ${src}`);
        this.loadedImages.add(src);
      };
      img.onerror = () => {
        console.warn(`❌ SIMPLE LOADER: Image instance failed: ${src}`);
      };
      img.src = src;
      img.fetchPriority = 'high';
    } catch (error) {
      console.warn('Error creating image instance:', error);
    }
  }

  public isImageLoaded(src: string): boolean {
    return this.loadedImages.has(src);
  }

  public getLoadedCount(): number {
    return this.loadedImages.size;
  }

  public getTotalCount(): number {
    return this.totalImages;
  }

  public getLoadingProgress(): number {
    return Math.round((this.loadedImages.size / this.totalImages) * 100);
  }

  public async waitForImages(): Promise<void> {
    console.log('⏳ SIMPLE LOADER: Waiting for images...');
    console.log(`📊 SIMPLE LOADER: Current count - ${this.loadedImages.size}/${this.totalImages}`);
    
    // Wait until all images are loaded or timeout
    let attempts = 0;
    const maxAttempts = 200; // 20 seconds with 100ms intervals
    
    while (this.loadedImages.size < this.totalImages && attempts < maxAttempts) {
      await new Promise(resolve => setTimeout(resolve, 100));
      attempts++;
      
      // Log progress every 10 attempts
      if (attempts % 10 === 0) {
        console.log(`⏳ SIMPLE LOADER: Attempt ${attempts}, loaded: ${this.loadedImages.size}/${this.totalImages}`);
      }
    }
    
    console.log(`📊 SIMPLE LOADER: Final count - ${this.loadedImages.size}/${this.totalImages}`);
    
    // If we still don't have all images, log what we have
    if (this.loadedImages.size < this.totalImages) {
      console.warn('⚠️ SIMPLE LOADER: Not all images loaded, but proceeding anyway');
      console.log('Loaded images:', Array.from(this.loadedImages));
    }
    
    // Additional wait to ensure browser has processed everything
    await new Promise(resolve => setTimeout(resolve, 500));
  }
}

// Create and export instance
const simpleImageLoader = new SimpleImageLoader();
export default simpleImageLoader;
