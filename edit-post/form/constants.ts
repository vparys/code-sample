import { type Path } from "react-hook-form";

import { type IPostFormPayload } from "@/src/types/interfaces";

export const basicInformationChoices: {
  id: Path<IPostFormPayload>;
  title: string;
}[] = [
  {
    id: "vaccinated",
    title: "Očkování",
  },
  {
    id: "dewormed",
    title: "Odčervení",
  },
  {
    id: "chipped",
    title: "Čipování",
  },
  {
    id: "handicaped",
    title: "Handicap",
  },
  {
    id: "castrated",
    title: "Kastrace",
  },
];

export const additionalInformationChoices: {
  id: Path<IPostFormPayload>;
  title: string;
}[] = [
  {
    id: "suitableForKids",
    title: "Vhodný pro děti",
  },
  {
    id: "suitableForOtherAnimals",
    title: "Vhodný k jiným zvířatům",
  },
  {
    id: "suitableForNewbies",
    title: "Vhodný pro začátečníky",
  },
  {
    id: "suitableForOutside",
    title: "Vhodný na zahradu",
  },
  {
    id: "suitableForIndoors",
    title: "Vhodný do bytu",
  },
];

export const placeholders = {
  name: "Například: Maxík",
  description:
    "Například: Maxík je krásný 4-5 let starý Bígl. Je veselý, hravý a mazlivý. Bobísek potřebuje do klidného a trpělivého domova, dříve se k němu totiž nechovali správně a tak nesnese hlučná prostředí. Po případě napište co musí potenciální rodič splnit aby adopce proběhla úspěšně.",
  price: "Zadejte částku",
  address: "Například: Zubatého 289/3",
  city: "Například: Praha 5",
  filesHint:
    "Tady neco treba dopísať k dokumentom čo sa ma zobrazovat uživateľom.....",
  descriptionHint:
    "Tady popište co nejlépe jakú má zvířatko povahu, po případě jeho historii nebo příběh. Čím lepší popis napíšete, tím lépe dokážete oslovit potenciální zájemce.",
};

export const fileTypes = {
  documents: [
    { extension: "pdf", limitSize: 15 },
    { extension: "jpg", limitSize: 15 },
    { extension: "jpeg", limitSize: 15 },
    { extension: "png", limitSize: 15 },
  ],
  images: [
    { extension: "jpg", limitSize: 12 },
    { extension: "jpeg", limitSize: 12 },
    { extension: "png", limitSize: 12 },
  ],
};
