import 'firebase/firestore';
import firebase from "firebase";
import { TUser } from "../useGetDataUsers/types";
import { useCollectionData } from "react-firebase-hooks/firestore";
import {useEffect, useState} from "react";

// Добавление записи в БД (коллекция "copyDataUsers")
export const useAddCopyDataUsers = () => {
    
    const firestore = firebase.firestore();
    
    const [testData, setTestData] = useState();
    
    useEffect(() => {
        console.log(testData)
    }, [testData]);
    
    const addUsersCopy = async (values: TUser, countCopy: any) => {
        let demo = [];
        let test = {
            usersTable: values,
            idCopy: countCopy
        }
        demo.push(test)
    
        // create a new object instead of mutating the existing one
        const newData = {
            ...test,
        };
        
        
        // @ts-ignore
        let art = [demo]
        console.log(test)
        console.log(art)
        
        if (values && countCopy) {
            // @ts-ignore
            await values?.forEach((item) => {
                 firestore.collection('copyDataUsers').add({
                    idCopy: countCopy,
                    name: item?.name,
                    surname: item?.surname,
                    age: item?.age,
                    city: item?.city
                })
            })
            
        }
    }
    
    const [copyDataUsers, loading] = useCollectionData(
        firestore.collection('copyDataUsers').orderBy('idCopy')
    )
    
    const data = copyDataUsers;
    
    return {
        loading,
        data,
        addUsersCopy,
    }
};
