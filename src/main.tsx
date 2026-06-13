import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Intercept DOM node manipulation to prevent Google Translate or extension changes
// from crashing standard React 19 fiber rendering or throwing DOM exceptions
if (typeof window !== "undefined" && typeof Node !== "undefined" && Node.prototype) {
  const originalInsertBefore = Node.prototype.insertBefore;
  Node.prototype.insertBefore = function <T extends Node>(newNode: T, referenceNode: Node | null): T {
    if (referenceNode && referenceNode.parentNode !== this) {
      if (console) {
        console.warn("Cannot insert before referenceNode of different parent", newNode, referenceNode, this);
      }
      return newNode;
    }
    return originalInsertBefore.call(this, newNode, referenceNode) as T;
  };

  const originalRemoveChild = Node.prototype.removeChild;
  Node.prototype.removeChild = function <T extends Node>(child: T): T {
    if (child && child.parentNode !== this) {
      if (console) {
        console.warn("Cannot remove child of different parent", child, this);
      }
      return child;
    }
    return originalRemoveChild.call(this, child) as T;
  };
}

createRoot(document.getElementById('root')!).render(
  <App />
);
