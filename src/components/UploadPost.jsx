import React, { useState } from "react";
import ProgressBar from "./ProgressBar";
import { TextareaAutosize, Button, makeStyles } from "@material-ui/core";
import CheckIcon from "@material-ui/icons/Check";

export default function UploadPost() {
	const [file, setFile] = useState();
	const [caption, setCaption] = useState("");
	const [uploadFile, setUploadFile] = useState();
	const [imgSelected, setImgSelected] = useState(false);
	const types = ["image/png", "image/jpeg"];

	const useStyles = makeStyles(() => ({
		uploadBtn: {
			margin: "10px 20px 40px 20px",
		},
		alertText: {
			position: "absolute",
			top: "7rem",
			textAlign: "center",
		},
		postBtn: {
			background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
			borderRadius: 3,
			border: 0,
			marginTop: "40px",
			color: "white",
			height: 45,
			padding: "0 30px",
			boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
		},
	}));

	// when image is uploaded
	const handleChange = (e) => {
		const isFile = e?.target?.files[0];
		if (isFile && types.includes(isFile.type)) {
			setUploadFile(isFile);
			setImgSelected(true);
		}
	};
	// when post is uploaded
	function uploadPost(e) {
		e.preventDefault();
		setFile(uploadFile);
		setImgSelected(false);
	}

	const classes = useStyles();
	return (
		<div className="upload-post">
			<div className="uploadModal">
				<h3 className="upload-title">Create your post</h3>
				<div className="post-container">
					<Button
						className={classes.uploadBtn}
						variant="contained"
						color="secondary"
						component="label"
					>
						Upload Image
						<input
							type="file"
							accept="image/*"
							onChange={(e) => handleChange(e)}
							hidden
						/>
					</Button>
					<br />
					{imgSelected && (
						<p className={classes.alertText}>
							<CheckIcon />
							Image Selected
						</p>
					)}

					<TextareaAutosize
						className="caption-input"
						placeholder="Add caption"
						value={caption}
						onChange={(e) => {
							setCaption(e.target.value);
						}}
					/>
				</div>
				<Button className={classes.postBtn} onClick={uploadPost}>
					Post
				</Button>
			</div>
			<div className="outout">
				{file && <div>Uploading...</div>}
				{file && (
					<ProgressBar
						file={file}
						setFile={setFile}
						caption={caption}
						setCaption={setCaption}
					/>
				)}
			</div>
		</div>
	);
}
