(function () {
  "use strict";

  var windowSize = new THREE.Vector2(window.innerWidth, window.innerHeight);

  var renderer = new THREE.WebGLRenderer();
  renderer.autoClear = false;
  renderer.sortObjects = false;
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(windowSize.x, windowSize.y);
  renderer.setClearColor(0x1d1f1e);
  renderer.domElement.id = "backgroundSmoke";
  document.body.appendChild(renderer.domElement);

  var grid = {
    size: new THREE.Vector2(512, 256),
    scale: 1,
    applyBoundaries: true,
  };
  var time = {
    step: 1,
  };
  var displayScalar, displayVector;

  var solver;
  var mouse = new F2D.Mouse(grid);

  function init(shaders) {
    solver = F2D.Solver.make(grid, time, windowSize, shaders);

    displayScalar = new F2D.Display(shaders.basic, shaders.displayscalar);
    displayVector = new F2D.Display(shaders.basic, shaders.displayvector);

    requestAnimationFrame(update);
  }

  function update() {
    solver.step(renderer, mouse);
    render();

    requestAnimationFrame(update);
  }

  function render() {
    var display, read;

    display = displayVector;
    display.scaleNegative();
    read = solver.velocity.read;

    display.render(renderer, read);
  }

  function resize() {
    windowSize.set(window.innerWidth, window.innerHeight);
    renderer.setSize(windowSize.x, windowSize.y);
  }
  window.onresize = resize;

  var loader = new F2D.FileLoader("/fluids-2d-master/shaders", [
    "advect.fs",
    "basic.vs",
    "gradient.fs",
    "jacobiscalar.fs",
    "jacobivector.fs",
    "displayscalar.fs",
    "displayvector.fs",
    "divergence.fs",
    "splat.fs",
    "vorticity.fs",
    "vorticityforce.fs",
    "boundary.fs",
  ]);
  loader.run(function (files) {
    // remove file extension before passing shaders to init
    var shaders = {};
    for (var name in files) {
      shaders[name.split(".")[0]] = files[name];
    }
    init(shaders);
  });
})();
