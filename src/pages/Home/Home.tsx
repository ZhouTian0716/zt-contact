import { useState, useEffect, useRef } from "react";
import { GrFormAdd } from "react-icons/gr";
import styles from "./Home.module.scss";
import { getAllContacts } from "../../api/contacts";
import { IContact } from "../../api/resTypes";

const Home = () => {
  const firstMount = useRef(true);
  const [contacts, setContacts] = useState<IContact[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [fetchError, setFetchError] = useState(null);

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
    <div className="center p-2">
      <div className={styles.bgPhone}>
        <header className={styles.header}>
          <span>list</span>
          <button className={styles.addBtn}>
            <GrFormAdd />
          </button>
        </header>
        <section className={styles.screenBody}>
          <h1>My Contacts</h1>
          <input type="text" placeholder="Search..." />
          <div>
            <img src="" alt="" />
            <span>My Name</span>
          </div>
          <ul>
            {isLoading && <li>Loading...</li>}
            {fetchError && <li>{fetchError}</li>}
            {contacts && contacts.map((contact) => (
              <li key={contact.id}>{contact.name}</li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
};

export default Home;
