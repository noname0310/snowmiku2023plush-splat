import "@babylonjs/core/Loading/loadingScreen";
import "@babylonjs/core/Meshes/thinInstanceMesh";
import "@babylonjs/core/Materials/standardMaterial";

import { KeyboardEventTypes } from "@babylonjs/core";
import { ArcRotateCamera } from "@babylonjs/core/Cameras/arcRotateCamera";
import type { Engine } from "@babylonjs/core/Engines/engine";
import { Vector3 } from "@babylonjs/core/Maths/math.vector";
import { GaussianSplattingMesh } from "@babylonjs/core/Meshes/GaussianSplatting/gaussianSplattingMesh";
import { Scene } from "@babylonjs/core/scene";

import type { ISceneBuilder } from "./baseRuntime";

export class SceneBuilder implements ISceneBuilder {
    public async build(_canvas: HTMLCanvasElement, engine: Engine): Promise<Scene> {
        const scene = new Scene(engine);

        const cameraInitialTarget = Vector3.Zero();
        const cameraInitialPosition = new Vector3(0, 1, -5);

        const camera = new ArcRotateCamera("camera1", 0, 0, 45, cameraInitialTarget, scene);
        camera.setPosition(cameraInitialPosition);
        camera.attachControl(undefined, false);
        camera.inertia = 0.8;
        camera.wheelDeltaPercentage = 0.01;
        camera.lowerRadiusLimit = 2;
        camera.upperRadiusLimit = 6;
        camera.panningDistanceLimit = 2;

        const mesh = new GaussianSplattingMesh("snowmiku2023plush", "res/snowmiku2023plush.splat", scene);
        mesh.position.set(0.787, 2.006, -2.216);
        const degToRad = Math.PI / 180;
        mesh.rotation.set(29.3162 * degToRad, -0.2972 * degToRad, -3.1657 * degToRad);

        scene.onKeyboardObservable.add(({ type, event }) => {
            if (type === KeyboardEventTypes.KEYDOWN && event.key === " ") {
                camera.setTarget(cameraInitialTarget);
                camera.setPosition(cameraInitialPosition);
            }
        });

        return scene;
    }
}
