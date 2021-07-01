import React, { useEffect, useState } from "react";
import { firestore, storage } from "../firebase/firebaseConfig";

export default function PhotoGrid() {
	const [docs, setDocs] = useState([]);
	const storageRef = storage.ref();
	// const dbRef = firestore.ref().child("Z1wmWiOsBXYClRaMUmIJ").remove();
	// console.log(dbRef   )

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

	const deleteImg = async (id, url) => {
		let imgURL = url.split("?")[0];
		let imgName = imgURL.split("/")[7].trim();
		//delete from db
		firestore
			.collection("images")
			.doc(id)
			.delete()
			.then(() => {
				alert("post successfully deleted!");
			})
			.catch((error) => {
				console.error("Error removing document: ", error);
                alert("An error occured!")
			});
		//delete from storage
		storageRef.child(imgName).delete();
	};

	return (
		<div className="img-grid">
			{docs &&
				docs.map((eachDoc) => {
					return (
						<div className="post-card">
							<img
								src={eachDoc.url}
								alt=""
								key={eachDoc.id}
								className="grid-img"
							/>
							{/* <h4>{eachDoc.id}</h4> */}
							<button
								onClick={() => deleteImg(eachDoc.id, eachDoc.url)}
								name={eachDoc.id} className="deleteBtn"
							>
								Delete
							</button>
						</div>
					);
				})}
		</div>
	);
}
