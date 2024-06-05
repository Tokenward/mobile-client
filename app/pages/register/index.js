import { createUserWithEmailAndPassword } from "firebase/auth";

export default function RegisterScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState(null);

    const handleSignUp = async () => {
        try {
          const userCredential = await createUserWithEmailAndPassword(auth, email, password);
          setUser(userCredential.user);
        } catch (error) {
          console.error(error);
        }
    };
}