# Custom Cursor Component

A fluid, jitter-free custom cursor component for React applications with smooth animations and interactive states.

## Features

- **Default State**: Small white dot (8px) with subtle shadow
- **Interactive State**: Doubles size (16px) and shows centered MoveUpRight arrow
- **Smooth Animation**: Uses requestAnimationFrame with linear interpolation
- **Touch Device Safe**: Auto-disables on touch devices
- **Accessibility**: Respects `prefers-reduced-motion` preference
- **High Performance**: GPU-accelerated transforms with `translate3d`
- **Universal**: Works above all content with maximum z-index

## Installation

The component is already integrated into your project. It uses:
- `lucide-react` (already installed)
- React DOM portal for rendering
- CSS modules for styling

## Usage

### Basic Integration

The component is already mounted in your `App.tsx`:

```tsx
import CustomCursor from "@/components/CustomCursor";

// In your App component
<CustomCursor />
```

### Making Elements Interactive

Elements automatically become interactive if they match these selectors:
- `<a>` tags
- `<button>` tags
- `[role="button"]` attributes
- `input[type="submit"]` elements

Or add custom interactive elements:

```tsx
<div data-cursor="interactive">
  Custom Interactive Element
</div>
```

### Ignoring Elements

To prevent cursor changes on specific elements:

```tsx
<div data-cursor="ignore">
  This element won't trigger cursor changes
</div>
```

## Data Attributes

| Attribute | Description |
|-----------|-------------|
| `data-cursor="interactive"` | Makes element trigger interactive cursor state |
| `data-cursor="ignore"` | Prevents cursor changes on this element |

## Styling

The cursor uses these CSS classes:
- `.custom-cursor` - Base cursor styles
- `.custom-cursor.visible` - When cursor is visible
- `.custom-cursor.interactive` - When hovering interactive elements
- `.cursor-icon-container` - Container for the arrow icon

## Performance Features

- **GPU Acceleration**: Uses `translate3d` and `will-change: transform`
- **Smooth Interpolation**: Linear interpolation (lerp) for fluid movement
- **Efficient Rendering**: Single requestAnimationFrame loop
- **Memory Safe**: Proper cleanup of event listeners and animation frames

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Edge (latest)
- Safari (latest)

## Touch Device Behavior

- Automatically detects touch devices using `(pointer: coarse)`
- Disables custom cursor on touch devices
- Preserves native cursor behavior for accessibility

## Accessibility

- Respects `prefers-reduced-motion: reduce`
- Maintains native cursor on touch devices
- No interference with keyboard navigation
- Proper ARIA support maintained

## Troubleshooting

### Cursor Not Visible
- Check if you're on a touch device
- Ensure the component is mounted in your app
- Check browser console for errors

### Performance Issues
- Ensure no conflicting CSS animations
- Check if `will-change: transform` is being overridden
- Verify GPU acceleration is enabled in browser

### Styling Conflicts
- The component uses maximum z-index (2147483647)
- CSS specificity may need adjustment if conflicts occur
- Check for global cursor styles that might interfere

## Customization

To modify the cursor appearance, edit `src/components/CustomCursor.css`:

```css
.custom-cursor {
  /* Change size */
  width: 10px;
  height: 10px;
  
  /* Change color */
  background: #your-color;
  
  /* Modify shadow */
  filter: drop-shadow(0 0 2px rgba(0,0,0,.5));
}
```

## Demo

A demo component is available at `src/components/CustomCursorDemo.tsx` showing all interactive states and usage examples.
