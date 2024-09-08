export interface CanvasDrawOptions {
  fillStyle?: string;
  strokeStyle?: string;
  globalAlpha?: number;

  lineWidth?: number;
  lineCap?: ["butt", "round", "square"];
  lineJoin?: ["miter", "round", "bevel"];
  miterLimit?: number;
  lineDashOffset?: number;

  font?: string;
  textAlign?: ["start", "end", "left", "right", "center"];
  textBaseline?: [
    "alphabetic",
    "top",
    "hanging",
    "middle",
    "ideographic",
    "bottom"
  ];
  direction?: ["inherit", "ltr", "rtl"];

  shadowColor?: string;
  shadowBlur?: number;
  shadowOffsetX?: number;
  shadowOffsetY?: number;

  globalCompositeOperation?: [
    "source-over", // Default draws new shapes over existing content
    "source-in", // Draws only where both the new shape and existing content overlap
    "source-out", // Draws where the new shape doesn't overlap with existing content
    "source-atop", // Draws new shape only where it overlaps with existing content
    "destination-over", // Draws new shape behind existing content
    "destination-in", // Keeps only where the new shape overlaps with existing content
    "destination-out", // Keeps only the parts of the existing content that do not overlap with the new shape
    "destination-atop", // Draws existing content only where it overlaps with the new shape
    "lighter", // Combines the colors of the new shape and existing content, resulting in a lighter color
    "copy", // Replaces all existing content with the new shape
    "xor", // Draws the new shape where it doesn't overlap with the existing content
    "multiply", // Multiplies the new shape's color values with existing content, resulting in a darker color
    "screen", // Inverts, multiplies, and inverts the colors again, resulting in a brighter image
    "overlay", // Combines multiply and screen blending modes
    "darken", // Keeps the darkest parts of both new shape and existing content
    "lighten", // Keeps the lightest parts of both new shape and existing content
    "color-dodge", // Brightens the existing content to reflect the new shape
    "color-burn", // Darkens the existing content to reflect the new shape
    "hard-light", // Combines multiply and screen depending on the new shape's color
    "soft-light", // Gently lightens or darkens the existing content based on the new shape
    "difference", // Subtracts the darker color from the lighter color
    "exclusion", // Similar to difference, but lower contrast
    "hue", // Applies the hue of the new shape to the existing content
    "saturation", // Applies the saturation of the new shape to the existing content
    "color", // Applies the color (hue and saturation) of the new shape to the existing content
    "luminosity" // Applies the luminosity (brightness) of the new shape to the existing content
  ];

  // Image smoothing
  imageSmoothingEnabled?: boolean;
  imageSmoothingQuality?: ["low", "medium", "high"];

  setLineDash?: Array<Number>;
}
