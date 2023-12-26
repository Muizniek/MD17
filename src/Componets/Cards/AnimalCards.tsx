import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../AppRedux/Store";
import AnimalCard from "../Card/AnimalCard";
import AnimalEditForm from "../AnimalEditForm/AnimalEditForm";
import {
  deleteAnimal,
  editAnimal,
  setUpdateAnimalImage,
  setUpdateAnimalName,
} from "../../AppRedux/AnimalSlice";
import css from "./AnimalCards.module.css";

const AnimalCards = () => {
  const dispatch = useDispatch();
  const { animals } = useSelector((state: RootState) => state.animals);

  const [editIndex, setEditIndex] = useState<number | null>(null);

  const handleDelete = (index: number) => {
    dispatch(deleteAnimal(index));
  };

  const handleEdit = (index: number) => {
    setEditIndex(index);
    dispatch(setUpdateAnimalName(animals[index].name));
    dispatch(setUpdateAnimalImage(animals[index].image));
  };

  const handleCancelEdit = () => {
    setEditIndex(null);
  };

  const handleSaveEdit = (updatedAnimal: { name: string; image: string }) => {
    if (editIndex !== null) {
      dispatch(editAnimal({ id: editIndex, updatedAnimal }));
      setEditIndex(null);
    }
  };

  return (
    <div className={css.cards_wrapper}>
      {animals.map((animal, index) => (
        <div key={index}>
          <AnimalCard
            name={animal.name}
            image={animal.image}
            deleteAnimal={() => handleDelete(index)}
            editAnimal={() => handleEdit(index)}
          />
          {editIndex === index && (
            <AnimalEditForm
              index={index}
              isEditing={true}
              animal={animals[editIndex as number]}
              onCancel={handleCancelEdit}
              onSave={handleSaveEdit}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default AnimalCards;
