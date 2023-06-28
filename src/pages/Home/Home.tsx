import { useState, useEffect, useRef } from "react";
import styles from "./Home.module.scss";
import { getAllContacts } from "../../api/contacts";
import { IContact } from "../../api/resTypes";
import SearchInput from "../../components/SearchInput/SearchInput";
import Avatar from "../../assets/avatar.jpg";
import { compareNames } from "../../utils/helpers";
import { Link } from "react-router-dom";

const Home = () => {
  const firstMount = useRef(true);
  const [contacts, setContacts] = useState<IContact[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [fetchError, setFetchError] = useState(null);

  const sortedContacts = contacts.filter((option) => option.name.toLowerCase().includes(searchTerm.toLowerCase())).sort(compareNames);

  const fetchContacts = async () => {
    try {
      setIsLoading(true);
      const data = await getAllContacts();
      if (!data) throw Error("Contacts not found");
      setContacts(data);
      setFetchError(null);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setFetchError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (firstMount.current) {
      fetchContacts();
    }
    return () => {
      firstMount.current = false;
    };
  }, []);

  return (
    <section className={styles.homePage}>
      <h1>My Contacts</h1>
      <SearchInput searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <div className={styles.myCard}>
        <img className={styles.avatar} src={Avatar} alt="meAvatar" />
        <span className="fz-4">Jenny Doe</span>
      </div>
      <ul className={styles.contactList}>
        {isLoading && <li>Loading...</li>}
        {fetchError && <li>{fetchError}</li>}
        {sortedContacts &&
          sortedContacts.map((contact) => (
            <Link to={`/contacts/${contact.id}`} key={contact.id}>
              <li className={styles.nameListItem}>{contact.name}</li>
            </Link>
          ))}
      </ul>
    </section>
  );
};

export default Home;
