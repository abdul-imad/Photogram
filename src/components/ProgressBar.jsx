import React, { useEffect } from "react";
import useStorage from "../hooks/useStorage";

export default function ProgressBar({ file, setFile, caption ,setCaption}) {
	const { progress, url } = useStorage(file, caption);
	useEffect(() => {
		if (url) {
			setFile(null);
            setCaption("")
		}
	}, [url, setFile]);
	return <div className="progress-bar" style={{ width: progress + "%" }}></div>;
}
