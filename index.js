// ページの読み込みを待つ
window.addEventListener("DOMContentLoaded", init);

function init() {
  const container = document.querySelector("#myCanvas");

  // レンダラーを作成
  const renderer = new THREE.WebGLRenderer({
    canvas: container,
    antialias: true,
  });
  renderer.physicallyCorrectLights = true;
  renderer.outputEncoding = THREE.sRGBEncoding;
  renderer.toneMapping = THREE.ReinhardToneMapping;
  renderer.toneMappingExposure = 4;
  renderer.setPixelRatio(window.devicePixelRatio);

  // シーンを作成
  const scene = new THREE.Scene();
  scene.background = new THREE.Color("#aef2e0");

  // カメラを作成
  const camera = new THREE.PerspectiveCamera(
    45,
    container.clientWidth / container.clientHeight,
    0.1,
    100
  );
  camera.position.set(1, 1.2, 3.9);
  camera.lookAt(new THREE.Vector3(0, 1, 0));

  // リサイズ
  const onResize = () => {
    const width = window.innerWidth;
    const height = window.innerHeight;

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  };
  onResize();
  window.addEventListener("resize", onResize);

  // ライトを作成
  const directionalLight = new THREE.DirectionalLight("#ffffff", 4);
  directionalLight.position.set(0, 5, 3);
  scene.add(directionalLight);

  const hemisphereLight = new THREE.HemisphereLight("#aaaaff", "#88ff88", 0.5);
  scene.add(hemisphereLight);

  // モデルデータを読み込む
  const loader = new THREE.GLTFLoader();
  loader.load("models/duck.gltf", (object) => {
    // 読み込み後に3D空間に追加
    object.scene.position.set(0, 0, 0);
    scene.add(object.scene);
  });
  tick();

  // 毎フレーム時に実行されるループイベントです
  function tick() {
    renderer.render(scene, camera); // レンダリング
    requestAnimationFrame(tick);
  }
}
