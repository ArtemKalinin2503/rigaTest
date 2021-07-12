import 'firebase/firestore';
import firebase from "firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";

export const useGetDataUsers = () => {
    
    const firestore = firebase.firestore();
    
    const [users, loading] = useCollectionData(
        firestore.collection('users').orderBy('name')
    )
    
    const data = users;
    
    return {
        data,
        loading
    }
};
