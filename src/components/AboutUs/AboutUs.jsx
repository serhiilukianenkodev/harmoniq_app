import React from "react";
import styles from "./AboutUs.module.css";

import lotusM from "./images/Lotus M.jpg";
import lotusM2x from "./images/Lotus M@2x.jpg";
import friendsM from "./images/Friends M.jpg";
import friendsM2x from "./images/Friends M@2x.jpg";
import lotusT from "./images/Lotus T.jpg";
import lotusT2x from "./images/Lotus T@2x.jpg";
import friendsT from "./images/Friends T.jpg";
import friendsT2x from "./images/Friends T@2x.jpg";
import lotusD from "./images/Lotus D.jpg";
import lotusD2x from "./images/Lotus D@2x.jpg";
import friendsD from "./images/Friends D.jpg";
import friendsD2x from "./images/Friends D@2x.jpg";
import yogaD from "./images/Yoga D.jpg";
import yogaD2x from "./images/Yoga D@2x.jpg";

function AboutUs() {
  const aboutUsContent = {
    heading: "About Us",
    description: `Harmoniq is a mindful publishing platform dedicated to mental health and well-being. We bring together writers, thinkers, and readers who believe that open, thoughtful stories can heal, inspire, and connect. Whether you're here to share your journey or learn from others — this is your space to  slow down, reflect, and grow.`,
    images: {
      lotus: {
        id: "lotus",
        src: lotusM,
        srcset: `${lotusM} 300w, ${lotusM2x} 600w, ${lotusT} 400w, ${lotusT2x} 800w, ${lotusD} 600w, ${lotusD2x} 1200w`,
        sizes:
          "(max-width: 767px) calc(100vw - 32px), (max-width: 1439px) calc((100vw - 48px - 32px) / 3), 704px",
        alt: "lotus flower",
        className: styles["image-card-lotus"],
      },
      friends: {
        id: "friends",
        src: friendsM,
        srcset: `${friendsM} 300w, ${friendsM2x} 600w, ${friendsT} 400w, ${friendsT2x} 800w, ${friendsD} 600w, ${friendsD2x} 1200w`,
        sizes:
          "(max-width: 767px) calc(100vw - 32px), (max-width: 1439px) calc(100vw - 48px), 808px",
        alt: "Friends gathering",
        className: styles["image-card-friends"],
      },
      yoga: {
        id: "yoga",
        src: yogaD,
        srcset: `${yogaD} 600w, ${yogaD2x} 1200w`,
        sizes: "392px",
        alt: "Yoga practice",
        className: styles["image-card-yoga"],
      },
    },
  };
  const renderImageCard = (image) => (
    <div
      key={image.id}
      className={`${styles["image-card"]} ${image.className}`}
    >
      <img
        src={image.src}
        srcSet={image.srcset}
        sizes={image.sizes}
        alt={image.alt}
        className={styles["image-card-img"]}
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = `https://placehold.co/600x400/CCCCCC/000000?text=Image+Error`;
        }}
      />
    </div>
  );

  return (
    <section id="about-us" className={styles["about-us-section"]}>
      <div className={styles["section-container"]}>
        <div className={styles["row-1-wrapper"]}>
          <div className={styles["text-block-wrapper"]}>
            <h2 className={styles["section-heading"]}>
              {aboutUsContent.heading}
            </h2>
            <p className={styles["section-description"]}>
              {aboutUsContent.description}
            </p>
          </div>
          {renderImageCard(aboutUsContent.images.lotus)}
        </div>
        <div className={styles["row-2-wrapper"]}>
          {renderImageCard(aboutUsContent.images.friends)}
          {renderImageCard(aboutUsContent.images.yoga)}
        </div>
      </div>
    </section>
  );
}
export default AboutUs;
