---
layout: page
displayTitle: Percentage Based SVG Stroke-DashArray
description: An explanation for some of the unexpected behaviors around using percentages for the <code class="highlighter-rouge">stroke-dasharray</code> in SVGs.
---

<style>
.center {
    display: flex;
    justify-content: center;
}

.svg + .svg {
    margin-left: 24px;
}

.svg {
  border: 1px solid #ccc;
  overflow: visible;
  box-sizing: content-box;
}
</style>

# The Goal

For this little tutorial, let's try to use a single `stroke-dasharray` property to create a half-circle that works for any size of circle:

<div class="center">
    <svg class="svg" width="50" height="50">
      <circle cx="50%" cy="50%" r="25" fill="none" stroke="black" stroke-width="4" stroke-dasharray="78.5, 235.5" />
    </svg>

    <svg class="svg" width="100" height="100">
      <circle cx="50%" cy="50%" r="50" fill="none" stroke="black" stroke-width="4" stroke-dasharray="157%, 157%" />
    </svg>
</div>

# The Problem

The `stroke-dasharray` CSS property for SVGs works really well for paths of a known length, but things a bit weird with dynamic length paths.

Here's a little example (I'm going to omit some of the styling attributes like fill, stroke, etc.):

```html
<svg class="svg" width="50" height="50">
  <circle cx="50%" cy="50%" r="25" stroke-dasharray="78.5, 78.5" />
</svg>

<svg class="svg" width="100" height="100">
  <circle cx="50%" cy="50%" r="50" stroke-dasharray="78.5, 78.5" />
</svg>
```

<div class="center">
    <svg class="svg" width="50" height="50">
      <circle cx="50%" cy="50%" r="25" fill="none" stroke="black" stroke-width="4" stroke-dasharray="78.5, 78.5" />
    </svg>

    <svg class="svg" width="100" height="100">
      <circle cx="50%" cy="50%" r="50" fill="none" stroke="black" stroke-width="4" stroke-dasharray="78.5, 78.5" />
    </svg>
</div>

Notice how the same value for `stroke-dasharray` displays differently on different sized circles. This is expected though, as the values for the `stroke-dasharray` propery represent pixels in the length of the path and the path of the larger circle is longer.


# The First Attempt

So if I always want the bottom half of the circle to have a stroke, let's just use a percentage!

```html
<svg class="svg" width="50" height="50">
  <circle cx="50%" cy="50%" r="25" stroke-dasharray="50%, 50%" />
</svg>

<svg class="svg" width="100" height="100">
  <circle cx="50%" cy="50%" r="50" stroke-dasharray="50%, 50%" />
</svg>
```

<div class="center">
    <svg class="svg" width="50" height="50">
      <circle cx="50%" cy="50%" r="25" fill="none" stroke="black" stroke-width="4" stroke-dasharray="50%, 50%" />
    </svg>

    <svg class="svg" width="100" height="100">
      <circle cx="50%" cy="50%" r="50" fill="none" stroke="black" stroke-width="4" stroke-dasharray="50%, 50%" />
    </svg>
</div>

Ok, so that's a step in the wrong direction..

# The Actual Solution

After some digging around, I learned that percentages in an SVG isn't based on the length of the path you're applying the stroke to, but rather the width and/or height of the SVG viewport.

From [the SVG docs](https://www.w3.org/TR/SVG11/coords.html#Units):

>For percentage values that are defined to be relative to the size of viewport:
>
> - For any x-coordinate value or width value expressed as a percentage of the viewport, the value to use is the specified percentage of the actual-width in user units for the nearest containing viewport, where actual-width is the width dimension of the viewport element within the user coordinate system for the viewport element.
> - For any y-coordinate value or height value expressed as a percentage of the viewport, the value to use is the specified percentage of the actual-height in user units for the nearest containing viewport, where actual-height is the height dimension of the viewport element within the user coordinate system for the viewport element.
> - For any other length value expressed as a percentage of the viewport, the percentage is calculated as the specified percentage of `sqrt((actual-width)^2 + (actual-height)^2))/sqrt(2)`.

So the circumference of the circle will have `width: 314%` (`π * viewport-width`). With this knowledge, we can update our example to use the correct percentages.

```html
<svg class="svg" width="50" height="50">
  <circle cx="50%" cy="50%" r="25" stroke-dasharray="157%, 157%" />
</svg>

<svg class="svg" width="100" height="100">
  <circle cx="50%" cy="50%" r="50" stroke-dasharray="157%, 157%" />
</svg>
```

<div class="center">
    <svg class="svg" width="50" height="50">
      <circle cx="50%" cy="50%" r="25" fill="none" stroke="black" stroke-width="4" stroke-dasharray="78.5, 235.5" />
    </svg>

    <svg class="svg" width="100" height="100">
      <circle cx="50%" cy="50%" r="50" fill="none" stroke="black" stroke-width="4" stroke-dasharray="157%, 157%" />
    </svg>
</div>

### A Quick Note:

1. This assumes that the SVG viewport is the same size as the circle you're drawing.
    - Make sure your viewport is set to `box-sizing: content-box`, otherwise the stroke's overflow will increase the size of the viewport.

# Conclusion

In order to use percentages for the `stroke-dasharray`, `stroke-offset`, or any other SVG properties that accept percentages, you need to base them off of the size of the viewport, not the element you're applying the percentage to. Unfortunately, this will only work if there's a formula for determining the perimeter of a shape given only one side (circles, squares, and other regular shapes).
