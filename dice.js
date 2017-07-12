function log(str) {
	document.body.innerHTML = document.body.innerHTML+"<br />"+str;
}
var client = matrixcs.createClient({
	baseUrl: "http://matrix.org",
	accessToken: access,
	userId: userId
});
client.on("RoomMember.membership", function(event, member) {
	if (member.membership === "invite" && member.userId === myUserId) {
        	client.joinRoom(member.roomId).done(function() {
               		log("Auto-joined "+member.roomId);
           	});
       }
});
client.on("Room.timeline", function(event, room, toStart, removed, data) {
	if (event.getType() != "m.room.message") return;
	log(event.getContent().body);	
});
client.startClient();
