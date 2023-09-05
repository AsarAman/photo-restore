import classes from "../homepage/home.module.css";
import restoreclasses from "./restore.module.css";
import Image from "next/image";
import axios from "axios";
import { useSession, signIn } from "next-auth/react";
import useSWR from "swr";
import { useEffect, useState } from "react";
import Loading from "../loading/loading";
import appendNewToName from "../../utils/appendToNewName";
import downloadPhoto from "../../utils/download";
function Restore() {
  const { data: session, status } = useSession();
  const [imageFile, setImageFile] = useState();
  const [restoredImage, setRestoredImage] = useState();
  const [loading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState();
  const [photoName, setPhotoName] = useState();

  //fetching the remaining no of requests left per day
  const fetcher = (url) => fetch(url).then((res) => res.json());

  const {
    data: loadedData,
    isLoading,
    
  } = useSWR("/api/restore", fetcher);

  //image-upload-handler
  const imageUploadHandler = (e) => {
    setRestoredImage();

    const file = e.target.files[0];

    const reader = new FileReader();
    if (file) {
      setPhotoName(file.name);
      reader.readAsDataURL(file);
    }
    reader.onload = () => {
      setImageFile(reader.result);
    };
    reader.onerror = () => {
      console.log(reader.error);
    };
  };

  //submitting the image file for restoration
  const submitHandler = async () => {
    if (!imageFile) {
      return;
    }
    try {
      setIsLoading(true);
      const responseData = await axios.post("/api/restore", {
        data: imageFile,
      });

      setIsLoading(false);
      setRestoredImage(responseData.data.data);
    } catch (error) {
      setErrorMsg(error.response.data.message);
      setIsLoading(false);
    }
  };

  //setting timer for error message
  useEffect(() => {
    const timer = setTimeout(() => {
      setErrorMsg(null);
    }, 5000);
    return () => clearTimeout(timer);
  }, [errorMsg]);

  return (
    <main className="section-center">
      <div className={restoreclasses.restoreMarkup}>
        <h1 className={classes.title}>Restore your Photo</h1>
        {!session && status === "unauthenticated" && (
          <div className={restoreclasses.signIn}>
            <p className={classes.description}>
              Sign in below with Google to create a free account and restore
              your photos today. You will be able to restore 5 photos per day
              for free.
            </p>
            <button
              className={`${classes.button} ${classes.buttonBlack}`}
              onClick={() => signIn("google")}
            >
              Sign With Google
            </button>
          </div>
        )}

        {session && loadedData && !isLoading ? (
          <div>
            <p className={classes.description}>
              You have {loadedData.remainingGenerations} requests left for
              today. Your requests will renew after 24 hours.
            </p>
            <input
              onChange={imageUploadHandler}
              required
              type="file"
              accept="image/*"
            />
            {errorMsg && <p className={restoreclasses.error}>{errorMsg}</p>}
          </div>
        ) : (
          session && !loadedData && <Loading />
        )}

        {imageFile && (
          <div className={classes.examplePhotoPreviewContainer}>
            <div className={classes.photoContainer}>
              <p>Original Photo</p>
              <Image
                height={475}
                width={475}
                src={imageFile}
                alt="user image "
              />
            </div>
            {restoredImage ? (
              <div className={classes.photoContainer}>
                <p>Restored Photo</p>
                <Image
                  width={475}
                  height={475}
                  src={restoredImage}
                  alt="user enhanced image"
                />
              </div>
            ) : (
              loading && <Loading />
            )}
          </div>
        )}

        <div className={`${classes.buttonContainer} ${restoreclasses.buttons}`}>
          {session && !isLoading && !restoredImage && (
            <button
              disabled={loading}
              className={`${classes.button} ${classes.buttonBlack}`}
              onClick={submitHandler}
            >
              {" "}
              Submit
            </button>
          )}
          {restoredImage && (
            <button
              className={`${classes.button} ${classes.buttonBlack}`}
              onClick={() => {
                downloadPhoto(restoredImage, appendNewToName(photoName));
              }}
            >
              {" "}
              Download Photo
            </button>
          )}
        </div>
      </div>
    </main>
  );
}

export default Restore;
