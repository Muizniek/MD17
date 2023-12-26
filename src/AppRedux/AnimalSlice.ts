import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type Animal = {
  name: string;
  image: string;
};

const checkData = (dataLocation: string) => {
  const data = localStorage.getItem(dataLocation);
  if (!data) return [];
  return JSON.parse(data);
};

type AnimalState = {
  animals: Animal[];
  newAnimal: Animal;
  updateAnimal: Animal;
};

const initialState: AnimalState = {
  animals: checkData("animals"),
  newAnimal: { name: "", image: "" },
  updateAnimal: { name: "", image: "" },
};

export const animalSlice = createSlice({
  name: "animals",
  initialState,
  reducers: {
    addAnimal: (state) => {
      state.animals.push({ ...state.newAnimal });
      state.newAnimal.image = "";
      state.newAnimal.name = "";
      localStorage.setItem("animals", JSON.stringify(state.animals));
    },
    setAnimalName: (state, action: PayloadAction<string>) => {
      state.newAnimal.name = action.payload;
    },
    setAnimalImage: (state, action: PayloadAction<string>) => {
      state.newAnimal.image = action.payload;
    },
    deleteAnimal: (state, action: PayloadAction<number>) => {
      state.animals.splice(action.payload, 1);
      localStorage.setItem("animals", JSON.stringify(state.animals));
    },
    sortAnimals: (state, action: PayloadAction<string>) => {
      const sortOrder = action.payload;
      state.animals.sort((a, b) => {
        if (sortOrder === "asc") {
          return a.name.localeCompare(b.name);
        } else {
          return b.name.localeCompare(a.name);
        }
      });
    },
    editAnimal: (
      state,
      action: PayloadAction<{ id: number; updatedAnimal: Animal }>
    ) => {
      const { id, updatedAnimal } = action.payload;
      const index = state.animals.findIndex((_animal, index) => index === id);
      state.animals[index] = { ...updatedAnimal };
      localStorage.setItem("animals", JSON.stringify(state.animals));
    },
    setUpdateAnimalName: (state, action: PayloadAction<string>) => {
      state.updateAnimal.name = action.payload;
    },
    setUpdateAnimalImage: (state, action: PayloadAction<string>) => {
      state.updateAnimal.image = action.payload;
    },
    saveEditAnimal: (state, action: PayloadAction<number>) => {
      const index = action.payload;
      state.animals[index] = { ...state.updateAnimal };
      localStorage.setItem("animals", JSON.stringify(state.animals));
      state.updateAnimal = { name: "", image: "" };
      localStorage.setItem("updateAnimal", JSON.stringify(state.updateAnimal));
    },
  },
});

export const {
  addAnimal,
  setAnimalName,
  setAnimalImage,
  deleteAnimal,
  sortAnimals,
  editAnimal,
  setUpdateAnimalName,
  setUpdateAnimalImage,
  saveEditAnimal,
} = animalSlice.actions;

export default animalSlice.reducer;
