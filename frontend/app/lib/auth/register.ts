import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase";

export const register = async (name: string, email: string, password: string) => {

    const { user } = await createUserWithEmailAndPassword(auth, email, password);
    await sendEmailVerification(user);
    await updateProfile(user, { displayName: name });
    await setDoc(doc(db, "users", user.uid), {
        name,
        email,
        createdAt: new Date(),
    });

    return user;

}