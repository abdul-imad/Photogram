import React from "react";
import { useState } from "react";
import ProgressBar from "./ProgressBar";
export default function UploadImage() {
	const [file, setFile] = useState();
	const types = ["image/png", "image/jpeg"];

	const uploadImg = (e) => {
		const isFile = e?.target?.files[0];
		if (isFile && types.includes(isFile.type)) {
			setFile(isFile);
		}
	};

	return (
		<form>
			<label className="uploadBtn">
				<input type="file" accept="image/*" onChange={uploadImg} />
				<span>+</span>
			</label>
			<div className="outout">
				{file && <div>Uploading...</div>}
				{file && <ProgressBar file={file} setFile={setFile} />}
			</div>
		</form>
	);
}
