import css from "./Contact.module.css";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { FaUserAstronaut } from "react-icons/fa6";
import { IoIosPhonePortrait } from "react-icons/io";
import { useDispatch } from "react-redux";
import { deleteContact } from "../../redux/contacts/operations";

const Contact = ({ contact }) => {
  const dispatch = useDispatch();

  const handleDelete = () => dispatch(deleteContact(contact.id));

  return (
    <li>
      <div className={css.contactCard}>
        <div className={css.userInfo}>
          <p className={css.userAbout}>
            <FaUserAstronaut className={css.userIcon} />
            {contact.name}
          </p>
          <p className={css.userAbout}>
            <IoIosPhonePortrait className={css.userIcon} />
            {contact.number}
          </p>
        </div>
        <IconButton aria-label="delete" onClick={handleDelete}>
          <DeleteIcon />
        </IconButton>
      </div>
    </li>
  );
};

export default Contact;
