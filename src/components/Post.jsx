import React from "react";
import { firestore, storage } from "../firebase/firebaseConfig";
import DeleteIcon from '@material-ui/icons/Delete';

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
			<div className="post-info">
				<div className="post-desc">
					{/* caption */}
					<p className="caption" >{eachDoc.caption}</p>
					{/* post date */}
					<small className="postDate">{eachDoc.date}</small>
				</div>
				<div className="deleteBtn">
					{/* delete btn */}
					<DeleteIcon titleAccess="Delete post"
						onClick={() => deleteImg(eachDoc.id, eachDoc.url)}
						name={eachDoc.id}
						className="deleteBtn"
					>
						Delete
					</DeleteIcon>
				</div>
			</div>
		</div>
	);
}
