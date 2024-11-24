// ====== HORIZONTAL LINES ======
// // Get the position attribute from the torus geometry
// const positionAttribute = torusGeometry.getAttribute("position");

// // Extract the array of positions
// const positions = positionAttribute.array;

// // Calculate the number of vertices based on the position array length
// const totalVertices = positions.length / 3;

// // Create a new array of positions excluding the last two vertices
// const wireframePositions = positions.slice(0, positions.length - 6);

// // Create a new buffer attribute with the modified positions
// const wireframeAttribute = new THREE.BufferAttribute(
//   new Float32Array(wireframePositions),
//   3
// );

// // Create a new buffer geometry using the modified attribute
// const wireframeGeometry = new THREE.BufferGeometry();
// wireframeGeometry.setAttribute("position", wireframeAttribute);

// // Create the wireframe object
// const wireframeTorus = new THREE.LineSegments(wireframeGeometry);
// wireframeTorus.material.depthTest = false;
// wireframeTorus.material.opacity = 0.25;
// wireframeTorus.material.transparent = true;

// ====== VERTICAL LINES ======
// const torusGeometry = new THREE.TorusGeometry(10, 9.5, 30, 100);
// const wireframeGeometry = new THREE.WireframeGeometry(torusGeometry);

// // Remove the connecting lines
// const vertices = wireframeGeometry.attributes.position.array;
// const newVertices = [];

// for (let i = 0; i < vertices.length; i += 6) {
//   newVertices.push(vertices[i], vertices[i + 1], vertices[i + 2]);
// }

// const modifiedWireframeGeometry = new THREE.BufferGeometry();
// modifiedWireframeGeometry.setAttribute(
//   'position',
//   new THREE.Float32BufferAttribute(newVertices, 3)
// );

// const wireframeMaterial = new THREE.LineBasicMaterial({
//   color: 0xffffff,
//   depthTest: false,
//   opacity: 0.25,
//   transparent: true,
// });

// const wireframeTorus = new THREE.LineSegments(modifiedWireframeGeometry, wireframeMaterial);

export {};
