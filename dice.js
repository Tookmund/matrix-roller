function log(str) {
	document.body.innerHTML += str+"<br />";
}
var client = matrixcs.createClient({
	baseUrl: "http://matrix.org",
	accessToken: access,
	userId: userId
});
client.on("RoomMember.membership", function(event, member) {
	if (member.membership === "invite" && member.userId === userId) {
        	client.joinRoom(member.roomId).done(function() {
               		log("Auto-joined "+member.roomId);
           	});
       }
});

client.startClient();
// MDN
function getRandomInt(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}
function dice(num,sides) {
	var total = 0;	
	for (i = 0; i < num; i++) {
		total += getRandomInt(1,sides);	
	}
	return total;
}
// Stack Overflow for the regex https://stackoverflow.com/a/35023056
function roll(text) {
	var loc = text.search("([1-9]\\d*)?d([1-9]\\d*)([/x][1-9]\\d*)?");
	if (loc >= 0) {
		var rl = text.slice(loc);
		var rlar = rl.split("d");
		return dice(parseInt(rlar[0]),parseInt(rlar[1]));
	}
}
client.once("sync",function(state, prev) {
	if (state === "PREPARED") {
		client.on("Room.timeline", function(event, room, toStart, removed, data) {
			if (event.getType() != "m.room.message") return;
			if(event.sender.userId === userId) return;
			var text = event.getContent().body;
			var result = roll(text);
			if (result === undefined) return;
			var msg = event.sender.name+": "+text+" = "+result;
			log(msg);
			var txn = client.makeTxnId();
			client.sendNotice(room.roomId,msg, txn).catch(function(e) {
				log(e);
			});
		});
	}
});
