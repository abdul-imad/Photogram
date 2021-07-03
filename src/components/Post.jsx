import React from "react";
import { firestore, storage } from "../firebase/firebaseConfig";

export default function Post({ eachDoc }) {
	const storageRef = storage.ref();

	const deleteImg = (id, url) => {
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
				alert("An error occured!");
			});
		//delete from storage
		storageRef.child(imgName).delete();
	};

	return (
		<div className="post-card">
			{/* img */}
			<img src={eachDoc.url} alt="" className="grid-img" />
            {/* post date */}
			<p className="postDate">{eachDoc.date}</p>

			{/* delete btn */}
			<button
				onClick={() => deleteImg(eachDoc.id, eachDoc.url)}
				name={eachDoc.id}
				className="deleteBtn"
			>
				Delete
			</button>
		</div>
	);
}
