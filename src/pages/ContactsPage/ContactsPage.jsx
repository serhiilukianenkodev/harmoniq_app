import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import ContactForm from "../../components/ContactForm/ContactForm";
import ContactList from "../../components/ContactList/ContactList";
import SearchBox from "../../components/SearchBox/SearchBox";
import Loader from "../../components/Loader/Loader";
import { selectError } from "../../redux/contacts/selectors";
import { fetchContacts } from "../../redux/contacts/operations";

function ContactsPage() {
  const dispatch = useDispatch();
  const error = useSelector(selectError);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <>
      <h1>Phonebook</h1>
      <ContactForm />
      <SearchBox />
      {error && (
        <p>
          Sorry can`t load data from server. Error: {error}. Try to reload page.
        </p>
      )}
      <ContactList />
      <Loader />
    </>
  );
}

export default ContactsPage;
