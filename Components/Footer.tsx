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
  { platform: "instagram", label: "Instagram", Icon: FiInstagram },
  { platform: "youtube", label: "YouTube", Icon: FiYoutube },
  { platform: "facebook", label: "Facebook", Icon: FiFacebook },
];

export default function Footer() {
  const [copyrightPrefix, copyrightSuffix] = footer.copyright.split(/\b20\d\d\b/);
  const taglineAccent = "moments worth remembering.";
  const taglineAccentStart = footer.tagline.lastIndexOf(taglineAccent);

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {/* Main 3-Column Content Grid */}
        <div className={styles.mainGrid}>
          {/* Brand Column */}
          <div className={styles.brandCol}>
            <Link href="/" aria-label="7C Studio home" className={styles.logoLink}>
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
                  <span className={styles.taglineAccent}>{taglineAccent}</span>
                  {footer.tagline.slice(taglineAccentStart + taglineAccent.length)}
                </>
              ) : (
                footer.tagline
              )}
            </p>

            <div className={styles.socialsGroup}>
              <span className={styles.socialsHeading}>Follow our journey</span>
              <div className={styles.socials} aria-label="Social media">
                {socialIcons.map((social) => {
                  const configuredSocial = footer.socials.find(({ platform }) => platform === social.platform);
                  const href = configuredSocial?.href || (social.platform === "instagram" ? homepage.instagram.href : "");
                  const icon = <social.Icon aria-hidden="true" className={styles.socialIcon} size={18} strokeWidth={1.6} />;

                  return href ? (
                    <a
                      key={social.platform}
                      href={href}
                      aria-label={`Follow 7C Studio on ${social.label}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.socialBtn}
                    >
                      {icon}
                    </a>
                  ) : (
                    <span key={social.platform} role="img" aria-label={social.label} className={styles.socialBtn}>
                      {icon}
                    </span>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Group: Explore & Reach Us columns positioned nearby on the right corner */}
          <div className={styles.rightCols}>
            {/* Navigation Links Column */}
            <nav aria-label="Footer navigation" className={styles.navCol}>
              <h2 className={styles.colHeading}>Explore</h2>
              <ul className={styles.linksList}>
                {footer.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className={styles.navLink}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Contact Information Column */}
            <div className={styles.contactCol}>
              <h2 className={styles.colHeading}>Reach Us</h2>
              <address className={styles.contactList}>
                <div className={styles.contactItem}>
                  <div className={styles.contactLabelRow}>
                    <MapPin aria-hidden="true" size={15} strokeWidth={1.8} className={styles.contactIcon} />
                    <span className={styles.contactLabel}>{contact.studioHeading}</span>
                  </div>
                  <p className={styles.contactText}>{contact.address}</p>
                </div>

                <div className={styles.contactItem}>
                  <div className={styles.contactLabelRow}>
                    <Mail aria-hidden="true" size={15} strokeWidth={1.8} className={styles.contactIcon} />
                    <span className={styles.contactLabel}>Email</span>
                  </div>
                  <a href={`mailto:${footer.contact.email}`} className={styles.contactLink}>
                    {footer.contact.email}
                  </a>
                </div>

                <div className={styles.contactItem}>
                  <div className={styles.contactLabelRow}>
                    <Phone aria-hidden="true" size={15} strokeWidth={1.8} className={styles.contactIcon} />
                    <span className={styles.contactLabel}>Phone</span>
                  </div>
                  <a href={footer.contact.phoneHref} className={styles.contactLink}>
                    {footer.contact.phone}
                  </a>
                </div>
              </address>
            </div>
          </div>
        </div>

        {/* Bottom Sub-Bar */}
        <div className={styles.bottomBar}>
          <p className={styles.copyright}>
            {copyrightPrefix}
            <CurrentYear fallback={2026} />
            {copyrightSuffix}
          </p>

          <p className={styles.bottomHighlight}>
            {homepage.approach.highlight}
          </p>
        </div>
      </div>

      {/* Floating Quick Action Buttons */}
      <div className={styles.floatingActions}>
        <a
          href={`https://wa.me/${footer.contact.phoneHref.replace(/\D/g, "")}`}
          aria-label="Chat with 7C Studio on WhatsApp"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.whatsappBtn}
        >
          <TbBrandWhatsapp aria-hidden="true" size={26} strokeWidth={1.6} />
        </a>
        <a href="#top" aria-label="Back to top" className={styles.backToTopBtn}>
          <ArrowUp aria-hidden="true" size={18} strokeWidth={2} />
        </a>
      </div>
    </footer>
  );
}
