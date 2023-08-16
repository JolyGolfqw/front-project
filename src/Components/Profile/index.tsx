import React, { useEffect, useState } from "react";
import styles from "./Profile.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getUser, updateUser, updateUserName } from "../../features/userSlice";
import Resizer from "react-image-file-resizer";

function Profile() {
  const [photo, setPhoto] = useState(null);
  const user = useSelector((state) => state.user.user);
  if(!user) {
    return ''
  }
  const [preview, setPreview] = useState(
    `http://localhost:4000/${user?.avatar}`
  );
  const [showOverlay, setShowOverlay] = useState(false); // Добавили состояние для показа overlay
  const [showModal, setShowModal] = useState(false); // Состояние для модального окна
  const [showCamera, setShowCamera] = useState(false); // Состояние для отображения камеры
  const [videoStream, setVideoStream] = useState(null);
  const [showPhoto, setShowPhoto] = useState(false);

  const [editingName, setEditingName] = useState(false);
  const [newName, setNewName] = useState(user?.name);

  const [editingStatus, setEditingStatus] = useState(false);
  const [newStatus, setNewStatus] = useState(user?.status);

  const dispatch = useDispatch();

  useEffect(() => {
    setPreview( `http://localhost:4000/${user?.avatar}`)
    setNewName(user.name)
    setNewStatus(user.status)

  }, [user])


  console.log(user);
  console.log("photo", preview);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    // const image = await resizeFile(file);
    // setPhoto(image)
    // console.log(image);
    // const file = e.target.files[0];
    if (file && file.type.substring(0, 5) === "image") {
        setPhoto(file)
        dispatch(updateUser(file))
      const reader = new FileReader();
      reader.onload = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPhoto(null);
    }
  };

  const takePhoto = async () => {
    const videoElement = document.getElementById("camera");
    const canvas = document.createElement("canvas");
    canvas.width = videoElement.videoWidth;
    canvas.height = videoElement.videoHeight;
    const context = canvas.getContext("2d");
    context.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
  
    // Создайте Blob с именем, основанным на текущей дате и времени
    const options = { type: "image/png", endings: "transparent" };
    const currentDate = new Date();
    const filename =
      "photo-" +
      currentDate.toISOString().replace(/:/g, "-") +
      ".png"; // Пример: "photo-2023-08-15T12-30-45.123Z.png"
  
    canvas.toBlob(
      (blob) => {
        if (blob) {
          blob.name = filename;
          setPhoto(blob);
          const photoURL = URL.createObjectURL(blob);
          setPreview(photoURL);
        }
        closeCamera();
      },
      "image/png",
      1,
      options
    );
  };
  
  
  useEffect(() => {
    if (showCamera) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
          setVideoStream(stream);
          const videoElement = document.getElementById("camera");
          videoElement.srcObject = stream;
        })
        .catch((error) => {
          console.error("Error accessing camera:", error);
          setShowCamera(false);
        });
    }
  }, [showCamera]);

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  const openCamera = () => {
    setShowCamera(true);
    // setShowModal(false); // Закрыть модальное окно после открытия камеры
  };

  const closeCamera = () => {
    if (videoStream) {
      videoStream.getTracks().forEach((track) => track.stop());
    }
    setShowCamera(false);
  };

  const handleModalOpen = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    closeCamera(); // Закрыть камеру при закрытии модального окна
  };


  const handleEditName = () => {
    setEditingName(true);
  };

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };

  const handleEditStatus = () => {
    setEditingStatus(true);
  };

  const handleStatusChange = (e) => {
    setNewStatus(e.target.value);
  };

  const handleSaveName = (data, type) => {
    // Update the name in the Redux store or send to the backend
    // dispatch(updateUser({ name: newName }));
    dispatch(updateUserName({data, type}))
    type === 'name' && setEditingName(false)
    type === 'status' && setEditingStatus(false)

  };

  //   useEffect(() => {
  //     dispatch(updateUser(photo))
  //   }, [photo])

  return (
    <div className={styles.profile}>
      <div className={styles.imageWrapper}>
        <input
          type="file"
          id="upload"
          hidden
          accept="image/*"
          onChange={handleImageUpload}
        />
        {preview ? (
          <>
            <img className={styles.imageIcon} src={preview} alt="" />
            <label
              className={styles.overlay}
              onMouseEnter={() => setShowOverlay(true)}
              onMouseLeave={() => setShowOverlay(false)}
              onClick={handleModalOpen}
            >
              <div className={styles.overlayText}>Изменить фото профиля</div>
            </label>
          </>
        ) : (
          <label
            htmlFor="upload"
            className={styles.overlay}
            onMouseEnter={() => setShowOverlay(true)}
            onMouseLeave={() => setShowOverlay(false)}
          >
            <img
              className={styles.imageIcon}
              src={`http://localhost:4000/${user?.avatar}`}
              alt="img"
            />
            {showOverlay && (
              <div className={styles.overlayText}>Загрузить картинку</div>
            )}
          </label>
        )}
      </div>
      <div className={styles.info}>
        <div>
          <div className={styles.info_title}>Ваше имя</div>
          <div>
          {editingName ? (
            <div className={styles.info_block_edit}>
              <input
                type="text"
                value={newName}
                onChange={handleNameChange}
                className={styles.nameInput}

              />
              <span  onClick={() => handleSaveName(newName, 'name')} data-testid="checkmark" data-icon="checkmark" class="_2MviD"><svg viewBox="0 0 24 24" height="24" width="24" preserveAspectRatio="xMidYMid meet" class="" version="1.1" x="0px" y="0px" enable-background="new 0 0 24 24" xml:space="preserve"><path fill="currentColor" d="M9,17.2l-4-4l-1.4,1.3L9,19.9L20.4,8.5L19,7.1L9,17.2z"></path></svg></span>
            </div>
          ) : (
            <div className={styles.info_block}>
              {user.name}{" "}
              <span
                data-testid="pencil"
                data-icon="pencil"
                className={`_2MviD ${styles.editIcon}`}
                onClick={handleEditName}
              >
                <svg
                   viewBox="0 0 24 24"
                  height="24"
                  width="24"
                  preserveAspectRatio="xMidYMid meet"
                  className=""
                  version="1.1"
                  x="0px"
                  y="0px"
                  enable-background="new 0 0 24 24"
                  xml:space="preserve"
                >
                  <path
                    fill="currentColor"
                    d="M3.95,16.7v3.4h3.4l9.8-9.9l-3.4-3.4L3.95,16.7z M19.75,7.6c0.4-0.4,0.4-0.9,0-1.3 l-2.1-2.1c-0.4-0.4-0.9-0.4-1.3,0l-1.6,1.6l3.4,3.4L19.75,7.6z"
                  ></path>
                </svg>
              </span>
            </div>
          )}
        </div>
          <div>
            Это не имя пользователя или пароль. Данное имя будут видеть ваши
            контакты в WhatsApp.
          </div>
        </div>

        <div>
          <div className={styles.info_title}>Сведения</div>

          <div>
          {editingStatus ? (
            <div className={styles.info_block_edit}>
              <input
                type="text"
                value={newStatus}
                onChange={handleStatusChange}
                className={styles.nameInput}

              />
              <span  onClick={() => handleSaveName(newStatus, 'status')} data-testid="checkmark" data-icon="checkmark" class="_2MviD"><svg viewBox="0 0 24 24" height="24" width="24" preserveAspectRatio="xMidYMid meet" class="" version="1.1" x="0px" y="0px" enable-background="new 0 0 24 24" xml:space="preserve"><path fill="currentColor" d="M9,17.2l-4-4l-1.4,1.3L9,19.9L20.4,8.5L19,7.1L9,17.2z"></path></svg></span>
            </div>
          ) : (
            <div className={styles.info_block}>
              {user.status}{" "}
              <span
                data-testid="pencil"
                data-icon="pencil"
                className={`_2MviD ${styles.editIcon}`}
                onClick={handleEditStatus}
              >
                <svg
                   viewBox="0 0 24 24"
                  height="24"
                  width="24"
                  preserveAspectRatio="xMidYMid meet"
                  className=""
                  version="1.1"
                  x="0px"
                  y="0px"
                  enable-background="new 0 0 24 24"
                  xml:space="preserve"
                >
                  <path
                    fill="currentColor"
                    d="M3.95,16.7v3.4h3.4l9.8-9.9l-3.4-3.4L3.95,16.7z M19.75,7.6c0.4-0.4,0.4-0.9,0-1.3 l-2.1-2.1c-0.4-0.4-0.9-0.4-1.3,0l-1.6,1.6l3.4,3.4L19.75,7.6z"
                  ></path>
                </svg>
              </span>
            </div>
          )}
        </div>

        </div>
      </div>

      {showModal && (
        <div className={styles.modalBackdrop} onClick={handleModalClose}>
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Контент модального окна */}
            <div onClick={() => setShowPhoto(true)}>Просмотреть фото</div>
            <div>
              <button onClick={openCamera}>Сделать фото</button>
            </div>
            <div>
              <label htmlFor="upload">Загрузить фото</label>
            </div>
            <div>Удалить фото</div>
            <button onClick={handleModalClose}>Закрыть</button>
          </div>
        </div>
      )}

      {showCamera && (
        <>
          <div className={styles.modalBackdrop} onClick={handleModalClose}>
            <video id="camera" autoPlay></video>
            <button
              onClick={(e) => {
                e.stopPropagation();
                takePhoto();
              }}
            >
              Сделать фото
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                closeCamera();
              }}
            >
              Закрыть камеру
            </button>
          </div>
        </>
      )}

      {showPhoto && (
        <>
          <div className={styles.modalBackdrop} onClick={handleModalClose}>
            <img src={preview} alt="" />
            <div onClick={() => setShowPhoto(false)}>
              xxxxxxxxxxxxxxxxxxxxxxxxxxxx
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Profile;
