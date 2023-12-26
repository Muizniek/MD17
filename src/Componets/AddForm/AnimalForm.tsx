import { useDispatch, useSelector } from "react-redux";
import {
  addAnimal,
  setAnimalImage,
  setAnimalName,
  sortAnimals,
} from "../../AppRedux/AnimalSlice";
import { RootState } from "../../AppRedux/Store";
import css from "./AddForm.module.css";

const AnimalForm = () => {
  const dispatch = useDispatch();
  const { animals, newAnimal } = useSelector(
    (state: RootState) => state.animals
  );
  console.log(animals);

  const asc = (e: React.MouseEvent) => {
    e.preventDefault();
    dispatch(sortAnimals("asc"));
  };

  const dsc = (e: React.MouseEvent) => {
    e.preventDefault();
    dispatch(sortAnimals("dsc"));
  };

  return (
    <div>
      <form className={css.form}>
        <div className={css.form_wrapper}>
          <label htmlFor="name">
            Name:
            <input
              placeholder="Animal name..."
              onChange={(e) => {
                dispatch(setAnimalName(e.target.value));
              }}
              type="text"
              name="name"
              value={newAnimal.name}
            />
          </label>
          <label htmlFor="image">
            Image for:
            <input
              placeholder="Generate photo by animal name"
              onChange={(e) => {
                dispatch(setAnimalImage(e.target.value));
              }}
              type="text"
              name="image"
              value={newAnimal.image}
            />
          </label>
        </div>
        <div className={css.buttons_wraper}>
          <button
            className={css.addAnimal}
            onClick={(e) => {
              e.preventDefault();
              if (!newAnimal.image || !newAnimal.name) return;
              dispatch(addAnimal());
            }}
          >
            Add animal
          </button>

          <button className={css.order} onClick={asc}>
            ⬆️
          </button>
          <button className={css.order} onClick={dsc}>
            ⬇️
          </button>
        </div>
      </form>
    </div>
  );
};

export default AnimalForm;
