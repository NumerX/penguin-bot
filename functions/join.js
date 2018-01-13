function onJoin(member) {
	let memberRole = member.guild.roles.find("name", "Member");
	try {
	member.addRole(member.guild.roles.find("name", "Member"));
	} catch(err) {
		console.log("[ERROR] JOIN: Member role returned null! Probably not in correct server.");
	}
}
module.exports = {
	join: (member) => onJoin(member)
}