import { Scene, Euler, Object3D, Vector3 } from "three";
import { GLTF } from "three/examples/jsm/loaders/GLTFLoader";
import ZapparSharing from '@zappar/sharing';

export class UIController {

    private scene: Scene;
    private canvas: HTMLCanvasElement;
    
    private modelObject3D: Object3D | undefined = undefined; 
    private rotationEulerStart: Euler | undefined = undefined;
    private rotationCoordsXStart: number = 0;
    private initialScale: Vector3 | undefined = undefined;

    private tapToPlaceButton: HTMLElement | null = document.getElementById('tap-to-place');
    private scaleSlider: HTMLElement | null = document.getElementById('scale-slider');
    private shareButton: HTMLElement | null = document.getElementById('share-button');
    private placeButton: HTMLElement | null = document.getElementById('tap-to-place');

    private hasPlaced: boolean = false;
    
    constructor(scene: Scene, canvas: HTMLCanvasElement, ) {
        this.scene = scene;
        this.canvas = canvas;        
    }

    gltfLoaded(gltf: GLTF): void {        
        this.initialScale = gltf.scene.getObjectByName('Cube001')?.scale.clone();

        this.showUI();
        this.setupRotation();
        this.setupScaling();
        this.setupShare();
        this.setupPlacing();
    }

    private showUI(): void {
        this.tapToPlaceButton!.style.display = '';
        this.scaleSlider!.style.display = '';
        this.shareButton!.style.display = '';
    }
   
    private setupRotation(): void {
        this.canvas.addEventListener('touchstart', this.handleStart.bind(this));
        this.canvas.addEventListener('touchmove', this.handleMove.bind(this));
    }

    private handleStart(event: TouchEvent): void {
        this.modelObject3D = this.scene.getObjectByName('Cube001');
        this.rotationEulerStart = this.modelObject3D?.rotation.clone();
        this.rotationCoordsXStart = event.touches[0].clientX;
    }

    private handleMove(event: TouchEvent): void {  
        var deltaX: number = (event.touches[0].clientX - this.rotationCoordsXStart) / 30;
        const newRotation = new Euler(
            this.rotationEulerStart?.x,
            this.rotationEulerStart?.y ? this.rotationEulerStart?.y + deltaX : deltaX,
            this.rotationEulerStart?.z,
            'XYZ');
        this.modelObject3D?.setRotationFromEuler(newRotation);    

        event.stopPropagation();
    }

    private setupScaling(): void {
        this.scaleSlider?.addEventListener('input', () => {
            this.modelObject3D = this.scene.getObjectByName('Cube001');    
            const scaleValue: number = (this.scaleSlider as HTMLInputElement).valueAsNumber;
            
            this.modelObject3D?.scale.set(
                (this.initialScale?.x ?? 1) * scaleValue / 50,
                (this.initialScale?.y ?? 1) * scaleValue / 50,
                (this.initialScale?.z ?? 1) * scaleValue / 50)
        });
    }

    private setupShare(): void {
        this.shareButton?.addEventListener('click', () => {
            const url = this.canvas!.toDataURL('image/png', 0.8);
            ZapparSharing({
                data: url,
            });
        });
    }

    private setupPlacing(): void {
        this.placeButton?.addEventListener('click', () => {
            this.hasPlaced = !this.hasPlaced;
            if(this.hasPlaced) {
                this.placeButton!.textContent = 'Tap to Pick up';
            } else {
                this.placeButton!.textContent = 'Tap to Place';
            }
        })
    }

    isPlaced() : boolean {
        return this.hasPlaced;
    }
}