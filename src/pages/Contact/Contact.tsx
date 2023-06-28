import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import styles from "./Contact.module.scss";
import defaultUser from "../../assets/defaultUser.png";
import { IContact } from "../../api/resTypes";
import { getContactById } from "../../api/contacts";
import { BiSolidMessageRoundedDetail, BiSolidVideo } from "react-icons/bi";
import { IoCall } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
import ContactLocation from "../../components/Map/ContactLocation";
import { initMapScript } from "../../utils/initGoogleMapScript";

const Contact = () => {
  const firstMount = useRef(true);
  const [contact, setContact] = useState<IContact | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [fetchError, setFetchError] = useState(null);
  const { id } = useParams();
  const { name, username, email, address, phone, website, company } = contact ?? {};

  if (!id) return null;

  const fetchContacts = async () => {
    try {
      setIsLoading(true);
      const data = await getContactById(id);
      if (!data) throw Error("Contacts not found");
      setContact(data);
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
      initMapScript().then(() => {
        fetchContacts();
      });
    }
    return () => {
      firstMount.current = false;
    };
  }, []);

  return (
    <section className={styles.contactPage}>
      {contact && (
        <>
          <div className={styles.header}>
            <img className={styles.avatar} src={defaultUser} alt="default" />
            <div className="flexCol">
              <span className="fz-4">Full name: {name}</span>
              <span className="fz-1">Nick name: {username}</span>
              <span className="fz-1">Phone: {phone}</span>
              <span className="fz-1">Email: {email}</span>
            </div>
          </div>
          <div className={styles.actions}>
            <div className={styles.action}>
              <BiSolidMessageRoundedDetail className={styles.actionIcon} />
              <small>message</small>
            </div>
            <div className={styles.action}>
              <IoCall className={styles.actionIcon} />
              <small>call</small>
            </div>
            <div className={styles.action}>
              <BiSolidVideo className={styles.actionIcon} />
              <small>video</small>
            </div>
            <div className={styles.action}>
              <MdEmail className={styles.actionIcon} />
              <small>mail</small>
            </div>
          </div>
          <div className={styles.business}>
            <p className={styles.businessInfo}>
              <span className={styles.label}>Company:</span>
              <span>{company?.name}</span>
            </p>
            <p className={styles.businessInfo}>
              <span className={styles.label}>Business:</span>
              <span>{company?.bs}</span>
            </p>
            <p className={styles.businessInfo}>
              <span className={styles.label}>Website:</span>
              <span>{website}</span>
            </p>
          </div>
          <div className={styles.business}>
            <p className={styles.businessInfo}>
              <span className={styles.label}>Street:</span>
              <span>{address?.street}</span>
            </p>
            <p className={styles.businessInfo}>
              <span className={styles.label}>Suite:</span>
              <span>{address?.suite}</span>
            </p>
            <p className={styles.businessInfo}>
              <span className={styles.label}>City:</span>
              <span>{address?.city}</span>
            </p>
          </div>
          <p>Location: (Lat) {address?.geo.lat} (Lng) {address?.geo.lng}</p>
          {address?.geo && (
            <ContactLocation
              center={{
                lat: parseFloat(address?.geo.lat),
                lng: parseFloat(address?.geo.lng),
              }}
              customStyles={{ height: "300px", borderRadius: "0.75rem" }}
            />
          )}
        </>
      )}
      {isLoading && <p>Loading...</p>}
      {fetchError && <p>{fetchError}</p>}
    </section>
  );
};

export default Contact;
