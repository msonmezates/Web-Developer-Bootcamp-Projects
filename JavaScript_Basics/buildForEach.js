function myForEach(arr, func) {
	//loop through array
	for (let i = 0; i < arr.length; i++) {
		//call func for each item in array
		func(arr[i]);
	}
}