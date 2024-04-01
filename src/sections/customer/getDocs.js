import { db } from "../../../firebase"; 
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";


export const useGetDocuments = () => {

  const getDoc = async (path) => {

    const collectionRef = collection(db, "students")
    const querySnapshot = await getDocs(collectionRef)
    const data = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    return data;
  }

  return { getDoc }
}