import React, { useEffect, useState } from "react";
import { firestore } from "../firebase/firebaseConfig";
import Post from "./Post";

export default function PhotoGrid() {
	const [docs, setDocs] = useState([]);
	useEffect(() => {
		firestore
			.collection("images")
			.orderBy("createdAt", "desc")
			.onSnapshot((snap) => {
				let documents = [];
				snap.forEach((doc) => {
					documents.push({ ...doc.data(), id: doc.id });
				});
				setDocs(documents);
			});
	}, []);

	return (
		<div className="img-grid">
			{docs &&
				docs.map((eachDoc) => {
					return <Post eachDoc={eachDoc} key={eachDoc.id}></Post>
				})}
		</div>
	);
}
