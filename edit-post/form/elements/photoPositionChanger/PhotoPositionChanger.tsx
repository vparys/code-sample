import {
  type Dispatch,
  type DragEvent,
  type FC,
  type SetStateAction,
  useRef,
  useState,
} from "react";

import Button from "@/src/components/general/button/Button";
import { Icon } from "@/src/components/general/icons/icon/Icon";
import { ResponsiveImage } from "@/src/components/general/responsiveImage/ResponsiveImage";
import useClickOutsideElement from "@/src/hooks/useClickOutsideElement";
import useScrollLock from "@/src/hooks/useScrollLock";
import { type FormFile } from "@/src/types/interfaces";

import styles from "./PhotoPositionChanger.module.scss";

type Props = {
  pictures: FormFile[];
  setIsVisible: Dispatch<SetStateAction<boolean>>;
  setState: (pictures: FormFile[]) => void;
};

export const PhotoPositionChanger: FC<Props> = ({
  pictures,
  setState,
  setIsVisible,
}) => {
  const [orderedPictures, setOrderedPictures] = useState<FormFile[]>(pictures);

  useScrollLock(true);
  const [draggedPhotoIndex, setDraggedPhotoIndex] = useState<number>(-1);
  const [target, setTarget] = useState<number>(-1);

  const contentRef = useRef<HTMLDivElement>(null);

  useClickOutsideElement(contentRef, () => setIsVisible(false));

  const movePhoto = (fromIndex: number, toIndex: number): void => {
    const newPhotos = [...orderedPictures];

    const isMovingBackwards = toIndex < fromIndex;

    const newInsertIndex = isMovingBackwards ? toIndex : toIndex + 1;
    newPhotos.splice(newInsertIndex, 0, orderedPictures[fromIndex]);

    const removeOriginalIndex = isMovingBackwards ? fromIndex + 1 : fromIndex;
    newPhotos.splice(removeOriginalIndex, 1);

    setOrderedPictures(newPhotos);
  };

  const onDrop = (): void => {
    movePhoto(draggedPhotoIndex, target);

    setDraggedPhotoIndex(-1);
    setTarget(-1);
  };

  const onDragStart = (e: DragEvent<HTMLDivElement>): void => {
    setDraggedPhotoIndex(Number(e.currentTarget.id));
  };

  const onDrag = (e: DragEvent<HTMLDivElement>): void => {
    setTarget(Number(e.currentTarget.id));
  };

  return (
    <div className={styles.photoPositionChanger}>
      <div className={styles.overlay} />
      <div ref={contentRef} className={styles.content}>
        <div className={styles.photos}>
          {orderedPictures.map((photo, index) => (
            <div
              // Key has to be tied to index since rerender has to be triggered each time index of individual photo is changed
              // eslint-disable-next-line react/no-array-index-key
              key={`${photo.url}-${index}`}
              className={`md:p-2 ${styles.photo}`}
              data-istarget={target == index}
              id={index.toString()}
              onDragOver={(e): void => {
                e.preventDefault();
                onDrag(e);
              }}
              onDragStart={onDragStart}
              onDrop={onDrop}
            >
              <div className={styles.arrowOverlay}>
                {index !== 0 && (
                  <Button
                    className={styles.arrow}
                    noStyles
                    onClick={(): void => movePhoto(index, index - 1)}
                  >
                    <Icon id="arrow-up" size={24} variant="white" />
                  </Button>
                )}
                {index !== pictures.length - 1 && (
                  <Button
                    className={styles.arrow}
                    noStyles
                    onClick={(): void => movePhoto(index, index + 1)}
                  >
                    <Icon id="arrow-down" size={24} variant="white" />
                  </Button>
                )}
              </div>
              <ResponsiveImage
                alt={photo.local ? photo.file.name : `Obrázek ${index + 1}`}
                className={styles.img}
                height={250}
                src={photo.url}
                width={250}
              />
            </div>
          ))}
        </div>
        <div className={`mt-6 flex justify-center ${styles.footer}`}>
          <Button
            className={styles.submitButton}
            type="button"
            onClick={(): void => {
              setIsVisible(false);
              setState(orderedPictures);
            }}
          >
            Uložit
          </Button>
        </div>
      </div>
    </div>
  );
};
