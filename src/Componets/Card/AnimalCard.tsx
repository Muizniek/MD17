import css from "./AnimalCard.module.css"


type AnimalCardData = {
  name: string;
  image: string;
  deleteAnimal: () => void;
  editAnimal: () => void;
};

const AnimalCard = ({
  name,
  image,
  deleteAnimal,
  editAnimal,
}: AnimalCardData) => {
  
  
  
  return (
    <div className={css.card_wrapper}>
      <h1>{name}</h1>
      <img
        src={`https://www.randomlists.com/img/animals/${image.toLowerCase()}.webp`}
        alt={image}
      />
      <div className={css.delete_edit_card}>
      <button className={css.delete} onClick={deleteAnimal}>Delete</button>
      {editAnimal && <button className={css.edit} onClick={editAnimal}>Edit</button>}
      </div>
    </div>
  );
};

export default AnimalCard;
