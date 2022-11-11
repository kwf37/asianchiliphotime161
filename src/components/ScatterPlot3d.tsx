import { useEffect, useRef } from "react";
import {
  ArrowHelper,
  AxesHelper,
  BoxGeometry,
  BufferGeometry,
  Color,
  Line,
  LineBasicMaterial,
  Mesh,
  MeshBasicMaterial,
  PerspectiveCamera,
  Scene,
  Vector,
  Vector3,
  WebGLRenderer,
} from "three";

export type ScatterPlot3dProps = {
  width: number;
  height: number;
};

function ScatterPlot3d(props: ScatterPlot3dProps): JSX.Element {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    if (canvasRef.current !== null) {
      console.log("hello");
      const scene = new Scene();
      scene.background = new Color(0xffffff);

      const camera = new PerspectiveCamera(
        45,
        props.width / props.height,
        1,
        500
      );
      camera.position.set(100, 100, 100);
      camera.lookAt(0, 0, 0);

      const renderer = new WebGLRenderer({
        canvas: canvasRef.current,
      });
      renderer.setSize(props.width, props.height);

      const arrow = (dir: Vector3) => {
        //normalize the direction vector (convert to vector of length 1)
        dir.normalize();

        const origin = new Vector3(0, 0, 0);
        const length = 50;
        const hex = 0x000000;

        const arrowHelper = new ArrowHelper(dir, origin, length, hex, 3, 2);
        scene.add(arrowHelper);
      };

      arrow(new Vector3(0, 0, 1));
      arrow(new Vector3(0, 1, 0));
      arrow(new Vector3(1, 0, 0));

      arrow(new Vector3(0, 0, -1));
      arrow(new Vector3(0, -1, 0));
      arrow(new Vector3(-1, 0, 0));

      const animate = () => {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
        // cube.rotation.x += 0.01;
        // cube.rotation.y += 0.01;
      };
      animate();
    }
  }, [canvasRef, props.width, props.height]);
  return (
    <canvas
      ref={canvasRef}
      style={{ width: props.width, height: props.height }}
    />
  );
}

export default ScatterPlot3d;
