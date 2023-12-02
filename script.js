var network = new WebSocket("wss://wss.adthoughtsglobal.repl.co");
var app = document.getElementById("app");
var cgrp = "", overl = gid("overlay");
var whom;
var incmessage;
var who;
var grpsin;
var message = "";
var chat = gid("chatts")
var csgrp, isadmin = false, adminchecks = false, jgrp = false, dev = false, htswm = true, rgs = localStorage.getItem("rgs");
var usersml = [];
var usd = {};
var anr = false;
var lmu;
var gl1 = gid("rjgrps"), rjgl = [];

if (!rgs) {
	localStorage.setItem("rgs", [])
}

overl.showModal();

function showmems() {
	saydt();
	gid("gmdv").showModal();
	gid("memdisp").innerHTML = "";
	for (var i = 0; i < usersml.length; i++) {
		gid("memdisp").innerHTML += `<div class='memdisone' onclick="sprfs(this.innerHTML)">` + usersml[i] + `</div>`
	}
}

function gid(e) {
	return document.getElementById(e);
}

function saydt() {
	let y = messon = {};
	messon.ty = "d";
	messon.de = gid("ud").value;
	messon.un = gid("un").value;
	messon.ch = cgrp;
	network.send(JSON.stringify(messon)); // DGIVE broadcast
	adminchecks = true;
	setTimeout(isadminhuh, 2000);
}

function ggo() {
	if (!rjgl.includes(cgrp)) {
		rjgl.push(cgrp);
	}
	usersml = [];
	saydt();
	who = "";
	let y = messon = {};
	messon.ty = "go";
	messon.un = gid("un").value;
	messon.ad = isadmin;
	messon.ch = cgrp;
	network.send(JSON.stringify(messon)); // DEXIT broadcast to newer
}

function desnak(d) {
	let msef = `<div class="desnak">` + d + `</div>`;
	setTimeout(function() {
		chat.lastElementChild.insertAdjacentHTML("afterend", msef);
		app.scrollTop = app.scrollHeight + 250;
	}, 100);

}

function rgspush(xd) {
	try {
		let rgs = JSON.parse(localStorage.getItem("rgs")) || [];

		if (!Array.isArray(rgs)) {
			throw new Error("Invalid 'rgs' data in local storage. Expected an array.");
		}

		rgs.push(cgrp); // Assuming cgrp is the current group
		localStorage.setItem("rgs", JSON.stringify(rgs));
		prjg();
	} catch (error) {
		console.error("Error parsing or updating 'rgs' array:", error);
		// Handle the error appropriately, e.g., by initializing the array
		// and storing the first element if no valid JSON is present.
		let rgs = [cgrp];
		localStorage.setItem("rgs", JSON.stringify(rgs));
		prjg();
	}
}



function gotoch(e) {
	jgrp = true;
	// Store the previous value of cgrp
	var prevCgrp = cgrp;

	if (cgrp !== "" && cgrp !== e.innerHTML) {
		rgspush(cgrp)
		if (confirm("Leave " + cgrp + "?\n\n Your messages will be lost.")) {
			chat.innerHTML = "<g></g>";
			desnak("You just joined")
			ggo()
			htswm = true;
			
		} else {
			// Restore the previous value of cgrp
			cgrp = prevCgrp;
			return;
		}
	}
	app.showModal();
	gid("gname").innerHTML = e.innerHTML;
	cgrp = e.innerHTML;
	if (usersml.length < 1) {
		saydt()
	}
}

function adminprevs() {
	msnack(`Admin Enabled`)
}

function waitUntil(conditionFunction, pollInterval = 100) {
	return new Promise((resolve) => {
		function checkCondition() {
			if (conditionFunction()) {
				resolve();
			} else {
				setTimeout(checkCondition, pollInterval);
			}
		}

		checkCondition();
	});
}

async function adminp() {
	gid("grpin").showModal();
	gid("gname2").innerHTML = cgrp;
	if (isadmin) {
		gid("gitxtb").innerHTML = "Admin Panel";
	} else {
		gid("gitxtb").innerHTML = "Group Info";
	}
	gid("ginst").innerHTML = "...";
	if (usersml.length < 1) {
		saydt()
	}
	await waitUntil(() => usersml.length > 0);
	gid("ginst").innerHTML = usersml.length + " users";
	if (isadmin) {
		gid("ginstmd").innerHTML = `
			<div id="ginstmd">
        <br><div class="admpart"><b>You're An Admin!</b>
		<span>Welcome message: </span><input id="gdein" placeholder="Say, a greeting..."></div>
			</div>`;
	}
}

function isadminhuh() {
	adminchecks = false;
	if (usersml.length === 1 && usersml[0] === gid("un").value) {
		isadmin = true;
		setTimeout(adminprevs, 1000);
	}
}

function ngrpms() {
	gid("ngrpm").showModal();
}

function sgrpl() {
  grpsin = Array.from(new Set(grpsin));

  setdb("trojenCat", "grp", grpsin);
}



getdb("trojenCat", "grp").then((value) => {
	if (value) {
		grpsin = value;
		drawgrps();
	} else {
		grpsin = ["Main"];
		drawgrps();
	}
});

network.onopen = (event) => {
	console.log("status: 1");
	saydt();
	overl.style.opacity = "0%";
	setTimeout(() => {
		overl.close();
	}, 700);
}

network.onerror = (event) => {
	console.log("status: 0: Desc.: " + event.data);
	network.close();
}

function sprfs(unh) {
	gid("prfmd").showModal();
	gid("tbun").innerHTML = unh;
	gid("tbud").innerHTML = usd[unh];
}

network.onmessage = (event) => {
	if (dev) {
		console.log(event.data);
	}
	if (jgrp) {
		incmessage = event.data;
		const parsedMessage = JSON.parse(incmessage); // Parse the incoming message
		let chin = parsedMessage.ch;
		if (chin == cgrp) {
			let xy = parsedMessage.ty;
			let zn = parsedMessage.un;

			if (adminchecks && xy == "td") {
				if (parsedMessage.to == gid("un").value) {
					if (parsedMessage.gd) {
						if (htswm) {
						gid('welmesv').innerHTML = ""
						gid('welmesv').innerHTML = `Welcome To <h1>`+parsedMessage.ch+`</h1><p>`+parsedMessage.gd+`</p><button onclick="gid('welmesd').close()">Close</button>`;
						gid('welmesd').showModal();
							htswm = false;
						}
					}
					if (!usersml.includes(zn)) {
						usersml.push(zn); // Add the username to the usersml array
						usd[zn] = parsedMessage.de;
					} else {
						if (!usd[zn] == parsedMessage.de) {
							usd[zn] = parsedMessage.de;
						}
					}
				}
				if (parsedMessage.ad) {
					swm(parsedMessage.gd);
				}
			}

			if (xy == "d") {
				msnack(zn + ` is here`);
				let y = messon = {};
				messon.ty = "td";
				messon.de = gid("ud").value;
				messon.ad = isadmin;
				messon.to = zn;
				messon.un = gid("un").value;
				messon.ch = cgrp;
				if (isadmin) {
					messon.gd = gid("gdein").value;
				}
				network.send(JSON.stringify(messon)); // DGIVE broadcast to newer
			} else {
				who = parsedMessage.un;
				if (xy == "m") {
					if (zn == gid("un").value) {
						whom = true;
					} else {
						whom = false;
					}
					addmessage(bold(removeTags(parsedMessage.mes)));
				}
				if (xy == "go") {
					msnack(zn + "left the chat")
					if (parsedMessage.ad) {

					}
				} else if (xy == "yte") {
					if (zn == gid("un").value) {
						whom = true;
					} else {
						whom = false;
					}
					who = parsedMessage.un;
					if (dev) { console.log("yte found") }
					parsedMessage.li = extractVideoId(parsedMessage.li)
					addmessage(`<a href="`+parsedMessage.li+`">Watch On YouTube</a><iframe class="yteme" width="560" height="315" src="https://www.youtube.com/embed/` + parsedMessage.li + `" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`)
				} 
			}
		}
	}
}

function extractVideoId(youtubeLink) {
	const regex = /(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
	const match = youtubeLink.match(regex);
	return match ? match[1] : null;
}

function addmessage(ms) {
	var ww2, tad, sylt;
	if (whom) {
		ww2 = "ums";
	} else {
		ww2 = "";
	}
	if (who == lmu) {
		tad = ``;
		sylt = `style="margin-bottom: 0px;margin-top: 0px;"`
	} else {
		tad = `<span class="unu" onclick="sprfs(this.innerHTML)">${who}</span><br>`;
		sylt = ``;
	}
	let mse = `<div class="message-container" ${sylt}><div class="message ${ww2}">${tad}` + ms + `</div></div>`;
	chat.lastElementChild.insertAdjacentHTML("afterend", mse);
	app.scrollTop = app.scrollHeight + 250;
	lmu = who;
}


function msnack(e) {
	gid("nbsd").innerHTML = e;
	setTimeout(function() {
		replayAnimation("nbsd")
		gid("nbsd").innerHTML = "connected";
	}, 5000);
	replayAnimation("nbsd")
}

function replayAnimation(elementId) {
	const element = document.getElementById(elementId);

	// Clone the element to reset the animation
	const clone = element.cloneNode(true);
	element.parentNode.replaceChild(clone, element);

	// Add a class to trigger the animation again
	clone.classList.add('play-animation');
}

function seyem() {
	if (cgrp != "" && network && gid("ytlein").value != "") {
		let y = messon = {};
		messon.ty = "yte";
		messon.un = gid("un").value;
		messon.ch = cgrp;
		messon.did = gdid();
		messon.li = gid("ytlein").value;
		network.send(JSON.stringify(messon));
	}
}

function sendm() {
	let y = messon = {};
	messon.mes = gid("message").value;
	if (gid("message").value.length > 0 && gid("message").value != " ") {
		messon.ty = "m";
		messon.un = gid("un").value;
		messon.ch = cgrp;
		messon.did = gdid();
		console.log(JSON.stringify(messon));
		network.send(JSON.stringify(messon)); // NSEND broadcast
		gid("message").value = "";
	}
}

function gdid() {
	const inputElement = document.getElementById("un");
	const inputValue = inputElement.value;
	let generatedId = "";

	if (inputValue.length >= 5) {
		// Use the first 5 characters of the Base64-encoded input name
		generatedId = btoa(inputValue).substring(0, 5);
	} else {
		// If the name is shorter than 5 characters, use the entire Base64-encoded name
		generatedId = btoa(inputValue);
	}

	// Generate 5 random digits and append them to the generated ID
	while (generatedId.length < 10) {
		generatedId += Math.floor(Math.random() * 10); // Generate random digits
	}

	return generatedId;
}

function removeTags(str) {
	if (str === null || str === undefined || str === '') {
		return ''; // Return an empty string if str is undefined, null, or empty
	} else {
		str = str.toString();
		str = str.replace(/(<([^>]+)>)/ig, '');
		str = str.replace(/\n/g, '<br>');
		return str;
	}
}

function ner() {
	if (anr) {
		alert("ANR Is desabled in your regionm please reload manually.")
	} else {
		location.reload();
	}

}

network.onclose = ner;

function bold(text) {
	var bold = /\*\*(.*?)\*\*/gm;
	var html = text.replace(bold, '<strong>$1</strong>');
	return html;
}

function kent(event) {
	if (event.key === "Enter") {
		event.preventDefault();
		sendm();
	}

	if (event.key === "/") {
		gid("quickact").showModal();
		gid("message").value = "";
	}

}

function profile() {
	gid("prfs").showModal();
}

function cngrp() {
	let x = gid("ngrpinp").value;
	if (x !== "" && !grpsin.includes(x)) {
		grpsin.push(x);
		gid("ngrpm").close();
		gid("ngrpinp").value = "";
		drawgrps()
	}
}

function drawgrps() {

	  grpsin = Array.from(new Set(grpsin));

	
	// Get a reference to the element with the ID "groups"
	var groupsElement = document.getElementById("groups");

	// Check if the element exists
	if (groupsElement) {
		// Clear any existing content inside the "groups" element
		groupsElement.innerHTML = "";

		// Iterate through the "grpsin" list
		for (var i = 0; i < grpsin.length; i++) {
			// Create a <div> element with the "card" class
			var cardDiv = document.createElement("div");
			cardDiv.className = "card";

			// Create a <b> element with an onclick attribute
			var groupNameB = document.createElement("b");
			groupNameB.id = "ggname"
			groupNameB.textContent = grpsin[i]; // Set the group name

			// Add an onclick attribute to the <b> element
			groupNameB.setAttribute("onclick", "gotoch(this)");

			// Create a <span> element with the "material-symbols-outlined goon" class
			var moreVertSpan = document.createElement("span");
			moreVertSpan.className = "material-symbols-outlined goon";
			moreVertSpan.textContent = "more_vert";

			// Add a click event listener to the span element
			moreVertSpan.addEventListener("click", function() {
				// Trigger the smops function with the 'this' keyword as an argument
				smops(this);
			});


			// Append the <b> and <span> elements to the <div> element
			cardDiv.appendChild(groupNameB);
			cardDiv.appendChild(moreVertSpan);

			// Append the <div> element to the "groups" element
			groupsElement.appendChild(cardDiv);
		}
	}
	sgrpl()
}
getdb("trojenCat", "usn").then((value) => {
	if (value) {
		gid("un").value = value;
		snack("Signed in as " + value + "!")
	} else {
		let names = [
			"owl", "crow", "sparrow", "eagle", "lion", "cat", "elephant", "ant",
			"tiger", "giraffe", "zebra", "dolphin", "penguin", "koala", "kangaroo",
			"gorilla", "cheetah", "chimpanzee", "hippopotamus", "rhinoceros", "octopus",
			"seahorse", "platypus", "flamingo", "polarBear", "grizzlyBear", "alligator",
			"crocodile", "panda", "redFox", "raccoon", "ostrich", "camel", "komodoDragon",
			"peacock", "parrot", "blueWhale", "salmon"
		];

		let x = Math.floor(Math.random() * 999) + 100;
		let z = names[Math.floor(Math.random() * names.length) + 0];
		let randomUsername = z + x;

		// Set the generated random username in IndexedDB
		setdb("trojenCat", "usn", randomUsername)
			.then(() => {
				gid("un").value = randomUsername;
			})
			.catch((error) => {
				console.error("Error setting username:", error);
			});
	}
});

getdb("trojenCat", "usd").then((value) => {
	if (value) {
		gid("ud").value = value;
	} else {
		let names = [
			"Hello! i'm a user!", "Hey there! i am a user!", "Howdy? i'm a user!"
		];

		let z = names[Math.floor(Math.random() * names.length) + 0];
		let randomUsername = z;

		// Set the generated random username in IndexedDB
		setdb("trojenCat", "usd", randomUsername)
			.then(() => {
				gid("ud").value = randomUsername;
			})
			.catch((error) => {
				snack("ERROR: " + error)
				console.error("Error setting ud:", error);
			});
	}
});

function smops(e) {
	csgrp = e.parentElement;
	gid("mgm").showModal();
}

function delcgrp() {
	console.log(csgrp.querySelector('#ggname'));
	remc(grpsin, csgrp.querySelector('#ggname').innerHTML);
	csgrp.remove();
	gid("mgm").close();
	drawgrps();
	snack("Group removed")
}

function susm() {
	setdb("trojenCat", "usn", gid("un").value);
	setdb("trojenCat", "usd", gid("ud").value);
	snack("saved.")
}

function remc(arr, itemToRemove) {
	var index = arr.indexOf(itemToRemove);
	if (index !== -1) {
		arr.splice(index, 1);
	}
}

function snack(e) {
	var x = document.getElementById("snackbar");
	x.innerHTML = e;
	x.className = "show";
	setTimeout(function() { x.className = x.className.replace("show", ""); }, 1200);
}

// Function to open or create an IndexedDB database
function openDB(databaseName, version) {
	return new Promise((resolve, reject) => {
		const request = indexedDB.open(databaseName, version);

		request.onupgradeneeded = (event) => {
			const db = event.target.result;
			db.createObjectStore('store', { keyPath: 'key' });
		};

		request.onsuccess = () => {
			resolve(request.result);
		};

		request.onerror = () => {
			reject(request.error);
		};
	});
}

// Function to set a key-value pair in the database
function setdb(databaseName, key, value) {
	return openDB(databaseName, 1).then((db) => {
		return new Promise((resolve, reject) => {
			const transaction = db.transaction(['store'], 'readwrite');
			const store = transaction.objectStore('store');
			const request = store.put({ key, value });

			request.onsuccess = () => {
				resolve();
			};

			request.onerror = () => {
				reject(request.error);
			};
		});
	});
}

// Function to get a value by key from the database
function getdb(databaseName, key) {
	return openDB(databaseName, 1).then((db) => {
		return new Promise((resolve, reject) => {
			const transaction = db.transaction(['store'], 'readonly');
			const store = transaction.objectStore('store');
			const request = store.get(key);

			request.onsuccess = () => {
				const result = request.result;
				if (result) {
					resolve(result.value);
				} else {
					resolve(null); // Key not found
				}
			};

			request.onerror = () => {
				reject(request.error);
			};
		});
	});
}

// select items

function prfpicse() {
	gid("prfics").showModal();
}

function swm(sdt) {
	// gid("gmmd").showModal();
}

prjg()

function prjg() {
	if (rgs > 0) {
		gl1.innerHTML = '...';
	} else {
		gl1.innerHTML = "<br><center>No recent groups</center><br>";
	}
}

function shsets() {
	gid("setsmd").showModal();
}

function chtheme() {
	const buttons = document.querySelectorAll(".ftsb");
	const te = event.target;

	buttons.forEach(button => {
		button.classList.remove("nhe");
	});

	if (!te.classList.contains("nhe")) {
		te.classList.add("nhe");
	}

	if (te.innerHTML == "Dark") {
		swth("dark")
	} else {
		swth("bright")
	}
}

const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {
	swth("dark")
} else {
	swth("bright")
}

function swth(eee) {
	if (eee == "dark") {
		document.body.style.setProperty("--bgc", "#272f35");
		document.body.style.setProperty("--txc", "#a5b3b9");
		document.body.style.setProperty("--sdc", "#1e2325");
		localStorage.setItem("theme", "dark");
	} else {
		document.body.style.setProperty("--bgc", "#ffffff");
		document.body.style.setProperty("--txc", "#1f1f1f");
		document.body.style.setProperty("--sdc", "#f6fbff");
		localStorage.setItem("theme", "light");
	}
}

async function generateKeyPair() {
	try {
		// Generate an RSA key pair
		const keyPair = await window.crypto.subtle.generateKey(
			{
				name: "RSA-OAEP",
				modulusLength: 2048,
				publicExponent: new Uint8Array([1, 0, 1]),
				hash: "SHA-256",
			},
			true,
			["encrypt", "decrypt"]
		);

		// Export the public key in PEM format
		const publicKey = await window.crypto.subtle.exportKey("spki", keyPair.publicKey);

		// Export the private key in PEM format
		const privateKey = await window.crypto.subtle.exportKey("pkcs8", keyPair.privateKey);

		return { privateKey, publicKey };
	} catch (error) {
		console.error("Key pair generation error:", error);
		throw error;
	}
}

swth("bright")



setTimeout(() => {
	if (network.readyState === WebSocket.OPEN) {
		const currentUrl = window.location.href;

		const getParameterValue = (paramName) => {
			const urlSearchParams = new URLSearchParams(window.location.search);
			return urlSearchParams.get(paramName);
		};

		const yourParamValue = getParameterValue('grp');
		if (yourParamValue !== null && yourParamValue !== "") {
			let tjgr = yourParamValue;
			let e = {}
			e.innerHTML = tjgr;
			gotoch(e)
			grpsin.push(tjgr);
			drawgrps()
		}
	}
}, 800);

if(/Android [4-6]/.test(navigator.appVersion)) {
   window.addEventListener("resize", function() {
	  if(document.activeElement.tagName=="INPUT" || document.activeElement.tagName=="TEXTAREA") {
		 window.setTimeout(function() {
			document.activeElement.scrollIntoViewIfNeeded();
		 },0);
	  }
   })
}
