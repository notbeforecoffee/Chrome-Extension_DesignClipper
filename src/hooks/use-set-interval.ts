import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";


let activeInputId: string | undefined;

// let clippedProductDetails: any = {
//   clipped: true,
// };

let lifeStyleImageURLs: string[] = [];
let imageURLs: string[] = [];

const useSetInterval = () => {
  useEffect(() => {
    setInterval(async () => {
      const fetchedItem = await chrome.storage.local.get();

      if (
        activeInputId &&
        (fetchedItem.getInnerText || fetchedItem.getImageUrl)
      ) {
       //clears storage upon productForm open
        await chrome.storage.local.clear();

        if (fetchedItem.getInnerText) {

          const inputValue = fetchedItem.getInnerText;
          const activeInput = document.getElementById(
            activeInputId ?? ""
          ) as HTMLInputElement;

          if (activeInput) activeInput.value = inputValue;
          console.log('activeInput:', activeInput)

          // clippedProductDetails[activeInputId] = inputValue;
          // console.log("clippedProductDetails:", clippedProductDetails);
        }

        if (fetchedItem.getImageUrl) {

          const inputValue = fetchedItem.getImageUrl;
          // clippedProductDetails[activeInputId] = JSON.stringify(inputValue);
          console.log("activeInputId:", activeInputId);
          const imageContainer = document.getElementById(
            activeInputId ?? ""
          ) as HTMLInputElement;

          if (imageContainer) {
            const imageElement = document.createElement("img");
            imageElement.src = inputValue;
            imageElement.classList.add("image-element");
            imageElement.alt = "vendor product image";

            const imageId = uuidv4();
            const imageWrapperElement = document.createElement("div");
            imageWrapperElement.setAttribute("id", imageId);
            imageWrapperElement.classList.add("relative");

            const cancelIconElement = document.createElement("button");
            cancelIconElement.setAttribute("name", imageId);
            cancelIconElement.classList.add("image-cancel-icon");
            cancelIconElement.innerText = "X";
            cancelIconElement.onclick = handleRemoveImage;

            imageWrapperElement.appendChild(imageElement);
            imageWrapperElement.appendChild(cancelIconElement);
            imageContainer.appendChild(imageWrapperElement);

            if (activeInputId === "lifeStyleImageURLs")
              lifeStyleImageURLs.push(inputValue);
            if (activeInputId === "imageURLs") imageURLs.push(inputValue);
          }
        }
      }
    }, 250);
  }, []);

  const handleRemoveImage = (e: MouseEvent) => {
    const event = e as any;
    event.preventDefault();
    event.stopPropagation();

    const selectedImageId = event.target?.name;
    const selectedImage = document.getElementById(selectedImageId);

    selectedImage?.remove();
  };

  const updateActiveInputId = (inputId: string) => (activeInputId = inputId);

  //return variables that are needed separately outside of this hook
  return [
    activeInputId,
    updateActiveInputId,
    imageURLs,
    lifeStyleImageURLs,
  ] as const;

};

export default useSetInterval;