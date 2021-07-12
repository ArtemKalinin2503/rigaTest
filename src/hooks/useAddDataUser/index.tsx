import 'firebase/firestore';
import firebase from "firebase";
import { TUser } from "../useGetDataUsers/types";

// Добавление записи в БД (коллекция "users")
export const useAddDataUser = () => {
    
    const firestore = firebase.firestore();
    
    const addUser = async (values: TUser) => {
        if (values) {
            await firestore.collection('users').add({
                name: values?.name,
                surname: values?.surname,
                age: values?.age,
                city: values?.city
            })
        }
    }
    
    return {
        addUser,
    }
};
