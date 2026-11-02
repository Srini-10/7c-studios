import Image from "next/image";
import Link from "next/link";
import { TbBrandWhatsapp } from "react-icons/tb";
import { FiFacebook, FiInstagram, FiYoutube } from "react-icons/fi";
import { ArrowUp, ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import contact from "@/data/contact.json";
import footer from "@/data/footer.json";
import homepage from "@/data/homepage.json";
import CurrentYear from "@/Components/CurrentYear";
import styles from "./Footer.module.css";

const socialIcons = [
  { platform: "instagram", label: "Instagram", handle: "@7c_studio_photography", Icon: FiInstagram },
  { platform: "youtube", label: "YouTube", handle: "7C Studio Films", Icon: FiYoutube },
  { platform: "facebook", label: "Facebook", handle: "7C Photography", Icon: FiFacebook },
];

export default function Footer() {
  const [copyrightPrefix, copyrightSuffix] = footer.copyright.split(/\b20\d\d\b/);
  const taglineAccent = "moments worth remembering.";
  const taglineAccentStart = footer.tagline.lastIndexOf(taglineAccent);

  return (
    <footer className={styles.footer}>
      {/* Decorative top ambient glow line */}
      <div className={styles.topRule} aria-hidden="true" />

      <div className={styles.container}>
        {/* Main Grid */}
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
                  const icon = <social.Icon aria-hidden="true" className={styles.socialIcon} size={18} strokeWidth={1.75} />;

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

          {/* Quick Links Column */}
          <nav aria-label="Footer navigation" className={styles.navCol}>
            <h2 className={styles.colHeading}>
              <span className={styles.headingDot} />
              Navigation
            </h2>
            <ul className={styles.linksList}>
              {footer.links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={styles.navLink}>
                    <span className={styles.linkText}>{link.label}</span>
                    <ArrowUpRight aria-hidden="true" size={14} className={styles.linkArrow} />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact Details Column */}
          <div className={styles.contactCol}>
            <h2 className={styles.colHeading}>
              <span className={styles.headingDot} />
              Get in Touch
            </h2>
            <address className={styles.contactList}>
              <div className={styles.contactCard}>
                <div className={styles.contactIconWrap}>
                  <MapPin aria-hidden="true" size={16} strokeWidth={1.75} />
                </div>
                <div className={styles.contactContent}>
                  <p className={styles.contactLabel}>{contact.studioHeading}</p>
                  <p className={styles.contactValue}>{contact.address}</p>
                </div>
              </div>

              <div className={styles.contactCard}>
                <div className={styles.contactIconWrap}>
                  <Mail aria-hidden="true" size={16} strokeWidth={1.75} />
                </div>
                <div className={styles.contactContent}>
                  <p className={styles.contactLabel}>Email Us</p>
                  <a href={`mailto:${footer.contact.email}`} className={styles.contactLink}>
                    {footer.contact.email}
                  </a>
                </div>
              </div>

              <div className={styles.contactCard}>
                <div className={styles.contactIconWrap}>
                  <Phone aria-hidden="true" size={16} strokeWidth={1.75} />
                </div>
                <div className={styles.contactContent}>
                  <p className={styles.contactLabel}>Call Us</p>
                  <a href={footer.contact.phoneHref} className={styles.contactLink}>
                    {footer.contact.phone}
                  </a>
                </div>
              </div>
            </address>
          </div>
        </div>

        {/* Bottom Sub-Footer Bar */}
        <div className={styles.bottomBar}>
          <p className={styles.copyright}>
            {copyrightPrefix}
            <CurrentYear fallback={2026} />
            {copyrightSuffix}
          </p>

          <div className={styles.bottomTaglineBadge}>
            <span className={styles.badgePulse} />
            <span className={styles.bottomHighlight}>{homepage.approach.highlight}</span>
          </div>
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
          <TbBrandWhatsapp aria-hidden="true" size={28} strokeWidth={1.6} />
          <span className={styles.actionTooltip}>WhatsApp</span>
        </a>
        <a href="#top" aria-label="Back to top" className={styles.backToTopBtn}>
          <ArrowUp aria-hidden="true" size={20} strokeWidth={2} />
          <span className={styles.actionTooltip}>Top</span>
        </a>
      </div>
    </footer>
  );
}
