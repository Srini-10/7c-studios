import Image from "next/image";
import Link from "next/link";
import { TbBrandWhatsapp } from "react-icons/tb";
import { FiFacebook, FiInstagram, FiYoutube } from "react-icons/fi";
import { ArrowUp, Mail, MapPin, Phone } from "lucide-react";
import contact from "@/data/contact.json";
import footer from "@/data/footer.json";
import homepage from "@/data/homepage.json";
import CurrentYear from "@/Components/CurrentYear";
import styles from "./Footer.module.css";

const socialIcons = [
  { platform: "youtube", label: "YouTube", Icon: FiYoutube },
  { platform: "facebook", label: "Facebook", Icon: FiFacebook },
  { platform: "instagram", label: "Instagram", Icon: FiInstagram },
];

export default function Footer() {
  const [copyrightPrefix, copyrightSuffix] = footer.copyright.split(/\b20\d\d\b/);
  const taglineAccent = "moments worth remembering.";
  const taglineAccentStart = footer.tagline.lastIndexOf(taglineAccent);

  return (
    <footer className={styles.footer}>
      <div className={styles.main}>
        <div className={styles.brand}>
          <Link href="/" aria-label="7C Studio home" className={styles.logo}>
            <Image
              src="/brand/7c-red&white.png"
              alt="7C Studio"
              width={228}
              height={280}
              className={styles.logoImage}
            />
          </Link>
          <p className={styles.tagline}>
            {taglineAccentStart >= 0 ? (
              <>
                {footer.tagline.slice(0, taglineAccentStart)}
                <span>{taglineAccent}</span>
                {footer.tagline.slice(taglineAccentStart + taglineAccent.length)}
              </>
            ) : footer.tagline}
          </p>
          <div className={styles.socials} aria-label="Social media">
            {socialIcons.map((social) => {
              const configuredSocial = footer.socials.find(({ platform }) => platform === social.platform);
              const href = configuredSocial?.href || (social.platform === "instagram" ? homepage.instagram.href : "");
              const icon = <social.Icon aria-hidden="true" className={styles.socialIcon} size={20} strokeWidth={1.5} />;

              return href ? (
                <a key={social.platform} href={href} aria-label={social.label} target="_blank" rel="noopener noreferrer" className={styles.social}>
                  {icon}
                </a>
              ) : (
                <span key={social.platform} role="img" aria-label={social.label} className={styles.social}>
                  {icon}
                </span>
              );
            })}
          </div>
        </div>

        <nav aria-label="Footer navigation">
          <h2 className={styles.heading}>Explore</h2>
          <ul className={styles.links}>
            {footer.links.map((link) => (
              <li key={link.href}>
                <Link href={link.href}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.contact}>
          <h2 className={styles.heading}>Reach us</h2>
          <address className={styles.details}>
            <div>
              <p className={styles.label}><MapPin aria-hidden="true" size={17} strokeWidth={1.5} />{contact.studioHeading}</p>
              <p className={styles.address}>{contact.address}</p>
            </div>
            <div>
              <p className={styles.label}><Mail aria-hidden="true" size={17} strokeWidth={1.5} />Email</p>
              <a href={`mailto:${footer.contact.email}`}>{footer.contact.email}</a>
            </div>
            <div>
              <p className={styles.label}><Phone aria-hidden="true" size={17} strokeWidth={1.5} />Phone</p>
              <a href={footer.contact.phoneHref}>{footer.contact.phone}</a>
            </div>
          </address>
        </div>
      </div>

      <div className={styles.bottomBar}>
        <div className={styles.bottomContent}>
          <p>
            {copyrightPrefix}
            <CurrentYear fallback={2026} />
            {copyrightSuffix}
          </p>
          <p className={styles.bottomHighlight}>{homepage.approach.highlight}</p>
        </div>
      </div>

      <div className={styles.actions}>
        <a
          href={`https://wa.me/${footer.contact.phoneHref.replace(/\D/g, "")}`}
          aria-label="Chat with 7C Studio on WhatsApp"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.whatsapp}
        >
          <TbBrandWhatsapp aria-hidden="true" size={32} strokeWidth={1.5} />
        </a>
        <a href="#top" aria-label="Back to top" className={styles.backToTop}>
          <ArrowUp aria-hidden="true" size={22} strokeWidth={1.5} />
        </a>
      </div>
    </footer>
  );
}
