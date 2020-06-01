import React, { useEffect, useState } from "react";
import SingleCard from "./subComponents/SingleCard";

export default function Preview({ setCurCardIndex, handleDeleteData }) {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    var start = SingleCard();
    setFiles([...files, start]);
  }, []);
  useEffect(() => {
    console.log(files);
  }, [files]);
  useEffect(() => {
    var controls = document.querySelectorAll("#Card__controls");
    var cards = document.querySelectorAll(".MuiCard-root");

    cards.forEach((card, index) => {
      card.addEventListener("mouseenter", () => {
        console.log("Mouse over");
        controls[index].style.display = "flex";
      });

      // click to set curCard
      card.addEventListener("click", () => {
        setCurCardIndex(index);
      });

      // add
      controls[index].children[0].addEventListener("click", () => {
        console.log("CurIndex is :" + index);
        createNewCard(index);
      });

      //delete
      controls[index].children[1].addEventListener("click", () => {
        console.log(index);
        deleteCard(index);
        handleDeleteData(index);
      });
    });

    controls.forEach((control) => {
      control.addEventListener("mouseleave", () => {
        console.log("Mouse leave");
        control.style.display = "none";
      });
    });
  }, [files]);

  const createNewCard = (index) => {
    var temp = [];
    temp.push(...files);
    console.log(temp);
    var New = SingleCard();
    temp.splice(index + 1, 0, New);
    console.log(index);
    setFiles(temp);
  };

  const deleteCard = (index) => {
    var temp = [];
    temp.push(...files);
    temp.splice(index, 1);
    setFiles(temp);
  };

  return (
    <>
      {/* <SingleCard /> */}
      {files}
    </>
  );
}
