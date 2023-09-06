import classes from "./home.module.css";
import Image from "next/image";
import Link from "next/link";
function Home() {
  return (
    <main className="section-center">
      <div className={classes.headline}>
        <h1 className={classes.title}>
          Restore your old photos using AI for FREE.
        </h1>
        <p className={classes.description}>
          Have old and blurry face photos? Let our AI restore them so those
          memories can live on. 100% free – restore your photos today.
        </p>
        <div className={classes.buttonContainer}>
          <a href="https://github.com/AsarAman/photo-restore" className={classes.button}>Fork This Repo</a>
          <Link
            href="/restore"
            className={`${classes.button} ${classes.buttonBlack}`}
          >
            Restore your Photos
          </Link>
        </div>
      </div>
      <div className={classes.examplePhotoPreviewContainer}>
        <div className={classes.photoContainer}>
          <p>Original Photo</p>
          <Image
            src="/images/photo-1.webp"
            height={400}
            width={400}
            alt="example blurry photo of a man"
          />
        </div>
        <div className={classes.photoContainer}>
          <p>Restored Photo</p>
          <Image
            src="/images/photo-2.webp"
            height={400}
            width={400}
            alt="example restored photo of a man"
          />
        </div>
      </div>
    </main>
  );
}

export default Home;
