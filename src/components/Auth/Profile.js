import { useSelector } from "react-redux";
import Card from "../UI/Card";

import styles from "./Profile.module.css";

const Profile = () => {
  const userDetails = useSelector((state) => state.user);
  return (
    <Card>
      <table className={styles.table}>
        <tbody className={styles.tbody}>
          <tr>
            <td>Username</td>
            <td>:</td>
            <td>{userDetails.username}</td>
          </tr>
          <tr>
            <td>Email</td>
            <td>:</td>
            <td>{userDetails.email}</td>
          </tr>
        </tbody>
      </table>
    </Card>
  );
};

export default Profile;
