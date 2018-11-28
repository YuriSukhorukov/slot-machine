export default class ResourceLoader {
	load (patch) {
		let resources = [1,2,3];
		return new Promise((resolve, reject) => {
			if(resources.length > 0){
				console.log(`loaded successful from: ${patch}`)
				resolve(resources);
			}
			else{
				console.log(`loaded unsuccessful from: ${patch}`)
				reject();
			}
		})
	}
}