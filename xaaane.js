// Icosahedron
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, 160 / 160, 0.1, 1000);
camera.position.z = 1.7;

var renderer = new THREE.WebGLRenderer({ alpha: true });
var container = document.getElementById("dodo");
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

const myMouse = {
	follow: function (event) {
		const width = document.documentElement.clientWidth - cursorSize;
		const height = document.documentElement.clientHeight - cursorSize;

		let x =
			(event.type == "touchmove" ? event.touches[0].pageX : event.pageX) -
			cursorSize / 2;
		let y =
			(event.type == "touchmove" ? event.touches[0].pageY : event.pageY) -
			cursorSize / 2;

		x = x < 0 ? 0 : x > width ? width : x;
		y = y < 0 ? 0 : y > height ? height : y;

		myCircle.style.left = x + "px";
		myCircle.style.top = y + "px";
	},
};

document.onmousemove = myMouse.follow;
document.ontouchmove = myMouse.follow;

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
