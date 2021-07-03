import { useContext } from "react";
import { useState, useEffect } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { storage, firestore, timestamp } from "../firebase/firebaseConfig";

const useStorage = (file) => {
	const [progress, setProgress] = useState(0);
	const [error, setError] = useState(null);
	const [url, setUrl] = useState(null);
	const { currDate } = useContext(AuthContext);
	const [date, setDate] = useState(currDate);

	useEffect(() => {
		// references
		const storageRef = storage.ref(file.name);
		const collectionRef = firestore.collection("images");

		storageRef.put(file).on(
			"state_changed",
			(snap) => {
				let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
				setProgress(percentage);
			},
			(err) => {
				setError(err);
			},
			async () => {
				const url = await storageRef.getDownloadURL();
				const createdAt = timestamp();
				setDate(currDate);
                console.log(currDate);
				await collectionRef.add({ url, createdAt, date });
				setUrl(url);
			}
		);
	}, [file]);

	return { progress, url, error, date };
};

export default useStorage;
