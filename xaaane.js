// Check for Safari, the new IE

window.onload = function () {
	function isSafari() {
		return (
			/Safari/.test(navigator.userAgent) &&
			!(
				/Chrome/.test(navigator.userAgent) ||
				/Chromium/.test(navigator.userAgent)
			)
		);
	}

	if (isSafari()) {
		let marqueeTag = document.querySelector("#profile marquee");
		let marqueeDiv = document.querySelector("#profile .marquee");

		marqueeTag.style.display = "none";
		marqueeDiv.style.display = "block";
	}
};

// Icosahedron
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, 160 / 160, 0.1, 1000);
camera.position.z = 1.7;

var renderer = new THREE.WebGLRenderer({ alpha: true });
var container = document.getElementById("ico");
renderer.setSize(160, 160);
renderer.domElement.style.position = "absolute";
renderer.domElement.style.top = "0";
renderer.domElement.style.left = "0";
container.appendChild(renderer.domElement);

var icosahedronGeometry = new THREE.IcosahedronGeometry(1);
var wireframeMaterial = new THREE.MeshBasicMaterial({
	color: 0xffffff,
	wireframe: true,
});
var icosahedron = new THREE.Mesh(icosahedronGeometry, wireframeMaterial);
scene.add(icosahedron);

var mouse = new THREE.Vector2();
var target = new THREE.Vector2();
var windowHalf = new THREE.Vector2(
	window.innerWidth / 2,
	window.innerHeight / 2
);

function onMouseOrTouchMove(event) {
	if (event.type == "touchmove") {
		mouse.x = event.touches[0].clientX - windowHalf.x;
		mouse.y = event.touches[0].clientY - windowHalf.y;
	} else {
		mouse.x = event.clientX - windowHalf.x;
		mouse.y = event.clientY - windowHalf.y;
	}
}

window.addEventListener("mousemove", onMouseOrTouchMove, false);
window.addEventListener("touchmove", onMouseOrTouchMove, false);

function animate() {
	requestAnimationFrame(animate);
	target.x = (1 - mouse.x) * 0.003;
	target.y = (1 - mouse.y) * 0.003;

	icosahedron.rotation.x += 0.05 * (target.y - icosahedron.rotation.x);
	icosahedron.rotation.y += 0.05 * (target.x - icosahedron.rotation.y);

	renderer.render(scene, camera);
}

animate();

// Cursor
const myCircle = document.getElementById("circle");
const cursorSize = myCircle.offsetWidth;

let mousePos = { x: 0, y: 0 };

const myMouse = {
	follow: function (event) {
		const width = document.documentElement.clientWidth - cursorSize;
		const height = document.documentElement.scrollHeight - cursorSize;

		let x = event.pageX - cursorSize / 2;
		let y = event.pageY - cursorSize / 2;

		x = x < 0 ? 0 : x > width ? width : x;
		y = y < 0 ? 0 : y > height ? height : y;

		mousePos.x = x;
		mousePos.y = y;
	},
};

function updateCirclePosition() {
	myCircle.style.left = mousePos.x + "px";
	myCircle.style.top = mousePos.y + "px";

	requestAnimationFrame(updateCirclePosition);
}

document.onmousemove = myMouse.follow;
updateCirclePosition();

// Get all <div> elements with the class "scaled"
const scaledDivs = document.getElementsByClassName("scaled");
for (let div of scaledDivs) {
	// Scale myCircle to 200% when mouse is over <div> tag with the class "scaled"
	div.addEventListener("mouseover", function () {
		myCircle.style.transform = "scale(2)";
	});

	// Remove transform when mouse leaves the <div> tag
	div.addEventListener("mouseout", function () {
		myCircle.style.transform = "scale(1)";
	});
}

// Get all <a> elements within the parent class of 'work'
const workLinks = document.querySelectorAll(".work a");
for (let link of workLinks) {
	// Scale myCircle to 200% when mouse is over <a> tag within the parent class of 'work'
	link.addEventListener("mouseover", function () {
		myCircle.style.transform = "scale(2)";
	});

	// Remove transform when mouse leaves the <a> tag
	link.addEventListener("mouseout", function () {
		myCircle.style.transform = "scale(1)";
	});
}

// CSS Styles for mobile
function isElementCentered(el) {
	var rect = el.getBoundingClientRect();
	var viewHeight = Math.max(
		document.documentElement.clientHeight,
		window.innerHeight
	);
	var quarterHeight = viewHeight / 4;
	return rect.top > quarterHeight && rect.bottom < quarterHeight * 3;
}

function adjustStyles() {
	let workItems = document.querySelectorAll(".container .work a .work-item");
	let wireframeSiteItems = document.querySelectorAll(
		".container .work a .work-item > .wireframe-site"
	);
	let colorSiteItems = document.querySelectorAll(
		".container .work a .work-item > .color-site"
	);

	if (window.innerWidth <= 459) {
		for (let i = 0; i < workItems.length; i++) {
			if (isElementCentered(workItems[i])) {
				wireframeSiteItems[i].style.opacity = 0;
				colorSiteItems[i].style.opacity = 1;
				colorSiteItems[i].style.filter = "none";
			} else {
				wireframeSiteItems[i].style.opacity = "";
				colorSiteItems[i].style.opacity = "";
				colorSiteItems[i].style.filter = "";
			}
		}
	} else {
		for (let i = 0; i < workItems.length; i++) {
			wireframeSiteItems[i].style.opacity = "";
			colorSiteItems[i].style.opacity = "";
			colorSiteItems[i].style.filter = "";
		}
	}
}

window.addEventListener("resize", adjustStyles);
window.addEventListener("scroll", adjustStyles);
window.addEventListener("DOMContentLoaded", adjustStyles);
