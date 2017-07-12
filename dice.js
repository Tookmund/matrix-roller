var client = matrixcs.createClient("http://matrix.org");
client.on("event",function(event) {
	document.body.innerHTML = document.body.innerHTML+event.getType()+"\n";
});
