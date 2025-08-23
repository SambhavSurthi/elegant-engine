// FORCE IMAGE LOADER - Actually loads images immediately when website loads
const PROJECT_IMAGES = [
  '/personal/MyPic1.jpg',
  '/personal/MyPic2.jpg',
  '/personal/MyPic3.jpg',
  '/personal/MyPic4.jpg'
];

class ForceImageLoader {
  private loadedImages = new Map<string, boolean>();
  private loadingPromises: Promise<boolean>[] = [];

  constructor() {
    this.startForceLoading();
  }

  private startForceLoading() {
    if (typeof window === 'undefined') return;

    console.log('🚀 FORCE LOADING images immediately...');

    // Method 1: Create actual hidden img elements in DOM (Most Effective)
    PROJECT_IMAGES.forEach(src => {
      const promise = this.createHiddenImageInDOM(src);
      this.loadingPromises.push(promise);
    });

    // Method 2: Force load with Image constructor multiple times
    PROJECT_IMAGES.forEach(src => {
      const promise = this.forceLoadWithConstructor(src);
      this.loadingPromises.push(promise);
    });

    // Method 3: Use fetch to actually download images
    PROJECT_IMAGES.forEach(src => {
      const promise = this.fetchAndCacheImage(src);
      this.loadingPromises.push(promise);
    });

    // Method 4: Create multiple instances to ensure loading
    PROJECT_IMAGES.forEach(src => {
      const promise = this.createMultipleInstances(src);
      this.loadingPromises.push(promise);
    });
  }

  private createHiddenImageInDOM(src: string): Promise<boolean> {
    return new Promise((resolve) => {
      try {
        // Create a hidden img element and add it to the DOM
        const img = document.createElement('img');
        img.style.cssText = 'position:absolute;left:-9999px;top:-9999px;width:1px;height:1px;opacity:0;pointer-events:none;';
        img.src = src;
        img.fetchPriority = 'high';
        
        img.onload = () => {
          console.log(`✅ Image loaded: ${src}`);
          this.loadedImages.set(src, true);
          resolve(true);
          
          // Remove from DOM after loading
          setTimeout(() => {
            if (document.body.contains(img)) {
              document.body.removeChild(img);
            }
          }, 1000);
        };
        
        img.onerror = () => {
          console.warn(`❌ Failed to load: ${src}`);
          this.loadedImages.set(src, false);
          resolve(false);
          
          if (document.body.contains(img)) {
            document.body.removeChild(img);
          }
        };

        // Add to DOM immediately
        document.body.appendChild(img);
        
        // Fallback: resolve after timeout
        setTimeout(() => resolve(false), 10000);
        
      } catch (error) {
        console.warn('Error creating hidden image:', error);
        resolve(false);
      }
    });
  }

  private forceLoadWithConstructor(src: string): Promise<boolean> {
    return new Promise((resolve) => {
      try {
        let loaded = false;
        
        // Create multiple Image instances
        for (let i = 0; i < 3; i++) {
          const img = new Image();
          img.onload = () => {
            if (!loaded) {
              loaded = true;
              this.loadedImages.set(src, true);
              resolve(true);
            }
          };
          img.onerror = () => {
            if (!loaded) {
              loaded = true;
              this.loadedImages.set(src, false);
              resolve(false);
            }
          };
          img.src = src;
          img.fetchPriority = 'high';
        }
        
        // Fallback timeout
        setTimeout(() => {
          if (!loaded) {
            loaded = true;
            resolve(false);
          }
        }, 8000);
        
      } catch (error) {
        resolve(false);
      }
    });
  }

  private fetchAndCacheImage(src: string): Promise<boolean> {
    return new Promise((resolve) => {
      try {
        // Actually fetch the image data
        fetch(src, { 
          method: 'GET',
          mode: 'no-cors',
          cache: 'force-cache'
        })
        .then(() => {
          this.loadedImages.set(src, true);
          resolve(true);
        })
        .catch(() => {
          this.loadedImages.set(src, false);
          resolve(false);
        });
        
        // Fallback timeout
        setTimeout(() => resolve(false), 5000);
        
      } catch (error) {
        resolve(false);
      }
    });
  }

  private createMultipleInstances(src: string): Promise<boolean> {
    return new Promise((resolve) => {
      try {
        // Create multiple hidden instances
        const instances: HTMLImageElement[] = [];
        
        for (let i = 0; i < 2; i++) {
          const img = document.createElement('img');
          img.style.display = 'none';
          img.src = src;
          img.fetchPriority = 'high';
          
          img.onload = () => {
            this.loadedImages.set(src, true);
            resolve(true);
            
            // Clean up instances
            instances.forEach(instance => {
              if (document.body.contains(instance)) {
                document.body.removeChild(instance);
              }
            });
          };
          
          img.onerror = () => {
            this.loadedImages.set(src, false);
            resolve(false);
            
            // Clean up instances
            instances.forEach(instance => {
              if (document.body.contains(instance)) {
                document.body.removeChild(instance);
              }
            });
          };
          
          instances.push(img);
          document.body.appendChild(img);
        }
        
        // Fallback timeout
        setTimeout(() => {
          resolve(false);
          // Clean up instances
          instances.forEach(instance => {
            if (document.body.contains(instance)) {
              document.body.removeChild(instance);
            }
          });
        }, 6000);
        
      } catch (error) {
        resolve(false);
      }
    });
  }

  public async waitForImages(): Promise<void> {
    console.log('⏳ Waiting for images to load...');
    
    // Wait for all loading methods to complete
    const results = await Promise.allSettled(this.loadingPromises);
    
    // Count successful loads
    const successCount = results.filter(result => 
      result.status === 'fulfilled' && result.value === true
    ).length;
    
    console.log(`📊 Images loaded: ${successCount}/${PROJECT_IMAGES.length}`);
    
    // Additional wait to ensure browser has processed everything
    await new Promise(resolve => setTimeout(resolve, 1000));
  }

  public isImageLoaded(src: string): boolean {
    return this.loadedImages.get(src) || false;
  }

  public getLoadedCount(): number {
    return Array.from(this.loadedImages.values()).filter(Boolean).length;
  }

  public getTotalCount(): number {
    return PROJECT_IMAGES.length;
  }

  public getLoadingProgress(): number {
    const loaded = this.getLoadedCount();
    return Math.round((loaded / this.getTotalCount()) * 100);
  }
}

// Create and export instance
const forceImageLoader = new ForceImageLoader();
export default forceImageLoader;
