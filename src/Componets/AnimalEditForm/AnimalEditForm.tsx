import {
  setUpdateAnimalName,
  setUpdateAnimalImage,
  saveEditAnimal,
} from "../../AppRedux/AnimalSlice";
import { RootState } from "../../AppRedux/Store";
import css from "./AnimalEditform.module.css";
import { useDispatch, useSelector } from "react-redux";

type AnimalFormProps = {
  isEditing: boolean;
  animal?: { name: string; image: string };
  onCancel: () => void;
  onSave: (updatedAnimal: { name: string; image: string }) => void;
  index: number;
};

const AnimalEditForm: React.FC<AnimalFormProps> = ({
  onCancel,
  onSave,
  index,
}) => {
  const dispatch = useDispatch();
  const { updateAnimal } = useSelector((state: RootState) => state.animals);

  const handleSubmitOnSave = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(saveEditAnimal(index));
    onSave(updateAnimal);
  };

  return (
    <div>
      <form className={css.edit_form} onSubmit={handleSubmitOnSave}>
        <label>
          Name:
          <input
            type="text"
            value={updateAnimal.name}
            onChange={(e) => dispatch(setUpdateAnimalName(e.target.value))}
          />
        </label>
        <label>
          Image:
          <input
            type="text"
            value={updateAnimal.image}
            onChange={(e) => dispatch(setUpdateAnimalImage(e.target.value))}
          />
        </label>
        <div className={css.buttons_wrapper}>
          <button className={css.save} type="submit">
            Save
          </button>
          <button className={css.cancel} type="button" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AnimalEditForm;
