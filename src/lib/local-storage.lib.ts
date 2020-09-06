function getLocalStorageData(key: string){
	if(localStorage[key])
		return JSON.parse(localStorage[key]);
	return null;
}

function setLocalStorageData(key: string, data: any){
	localStorage[key] = JSON.stringify(data);
}

export {
	getLocalStorageData,
	setLocalStorageData
}