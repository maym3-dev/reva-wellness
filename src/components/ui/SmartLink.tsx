import Link from "next/link";

type Props = Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & { href: string };

/**
 * Internal paths use next/link (client-side navigation keeps Lenis/GSAP alive);
 * external URLs (booking engine, socials) open in a new tab.
 */
export default function SmartLink({ href, children, ...rest }: Props) {
  if (/^(https?:)?\/\//.test(href)) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" {...rest}>
        {children}
      </a>
    );
  }
  if (href.startsWith("/")) {
    return (
      <Link href={href} {...rest}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href} {...rest}>
      {children}
    </a>
  );
}
