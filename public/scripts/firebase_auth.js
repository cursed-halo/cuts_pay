import {app} from "./firestore_connect.js";


const provider = new GoogleAuthProvider(app);
import { getAuth, signInWithPopup, GoogleAuthProvider,signOut } from "https://www.gstatic.com/firebasejs/9.8.4/firebase-auth.js";

const auth = getAuth(app);

export{auth};

