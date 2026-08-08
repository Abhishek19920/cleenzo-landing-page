import logoPng from "../assets/image/cleenzo-logo.png";
import logoWebp from "../assets/image/cleenzo-logo.webp";
import logoAvif from "../assets/image/cleenzo-logo.avif";

const DEFAULT_ALT =
  "Cleenzo — laundry and dry cleaning in Raj Nagar, Ghaziabad";

/**
 * Nav/footer logo — AVIF/WebP with PNG fallback, sized for max ~192px display width.
 */
export default function CleenzoLogo({
  alt = DEFAULT_ALT,
  className = "",
  width = 192,
  height = 87,
}) {
  return (
    <picture>
      <source type="image/avif" srcSet={logoAvif} />
      <source type="image/webp" srcSet={logoWebp} />
      <img
        src={logoPng}
        alt={alt}
        className={className}
        width={width}
        height={height}
        decoding="async"
      />
    </picture>
  );
}

export { DEFAULT_ALT as CLEENZO_LOGO_ALT };
