import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import './components/utils/simpleImageLoader'

// Start SIMPLE LOADING images immediately when the app starts
console.log('🚀 SIMPLE LOADING images immediately...');

// Register service worker for image caching
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((registration) => {
        console.log('✅ Service Worker registered:', registration);
      })
      .catch((error) => {
        console.log('❌ Service Worker registration failed:', error);
      });
  });
}

createRoot(document.getElementById("root")!).render(<App />);
