
import React, { useEffect, Suspense } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls, useGLTF, useTexture } from "@react-three/drei";
import * as constants from '../../constants'
import { EXRLoader } from "three/examples/jsm/loaders/EXRLoader";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";
import axios from 'axios';
import * as THREE from 'three';

const base_url = constants.base_url
// const geometriku = scene.children[0].geometry;
  // const materialku = scene.children[0].material;
  //console.log("Position", position)
  // let exrCubeRenderTarget, exrBackground;
  // const pmremGenerator = new THREE.PMREMGenerator(gl);
  // pmremGenerator.compileEquirectangularShader();
  // new EXRLoader()
  //     .setDataType(THREE.HalfFloatType)
  //     .load(
  //         "/assets/img/2D/panorama/tes1.exr",
  //         function (texture) {
  //             exrCubeRenderTarget = pmremGenerator.fromEquirectangular(texture);
  //             exrBackground = exrCubeRenderTarget.texture;
  //             scene.children[0].material.envMap = exrCubeRenderTarget ? exrCubeRenderTarget.texture : null;
  //             scene.children[0].material.needsUpdate = true;
  //             texture.dispose();
  //         }
  //     );

  // gl.toneMapping = THREE.ACESFilmicToneMapping;
  // gl.outputEncoding = THREE.sRGBEncoding;

const ambientLight = new THREE.AmbientLight(); // soft white light
const rectAreaLight = new THREE.RectAreaLight(); // soft white 
//const directionalLight = new THREE.DirectionalLight(); // soft white 
const directionalLight1 = new THREE.DirectionalLight(); // soft white 
const directionalLight2 = new THREE.DirectionalLight(); // soft white 
const directionalLight3 = new THREE.DirectionalLight(); // soft white 
const directionalLight4 = new THREE.DirectionalLight(); // soft white 
// const light1 = new THREE.SpotLight(); // soft white 
// const light2 = new THREE.SpotLight(); // soft white 
// const pointLight1 = new THREE.PointLight(); // soft white 
// const pointLight2 = new THREE.PointLight(); // soft white 
//const directionalLightHelper = new THREE.DirectionalLightHelper( directionalLight, 5 );  

export default function Topku({file, texturefile, tx, ty, tz, position, lightPosition1, lightPosition2, lightRotation, lightScale, intensity, rectLightHeight, shapeType, fileB, colorfile, bx, by, bz, positionB, setIsLoading }) {
  if(file == 0) {
    file =  file.toString() + '.gltf';
    tx = 0;
    ty = 0;
    tz = 0;
    setIsLoading(true)
  }
  if(fileB == 0){
    fileB =  fileB.toString() + '.gltf';
    tx = 0;
    ty = 0;
    tz = 0;
    setIsLoading(true)
  }

  if(texturefile == 0) {
    texturefile =  texturefile.toString() + '.png';
    setIsLoading(true)
  }

  if( file != 0 && fileB != 0 && texturefile != 0 ){
    setIsLoading(false)
  }

  const { scene } = useGLTF("/assets/img/3D/top/"+file);
  const texture = useTexture('/assets/img/2D/texture/'+texturefile);
 
  if(tx == '') tx = 0;
  if(ty == '') ty = 0;
  if(tz == '') tz = 0;

  if(position[0] == '') position[0] = 0;
  if(position[1] == '') position[1] = 0;
  if(position[2] == '') position[2] = 0;

  //RECT AREA LIGHT
  if(!scene.children[1]) {
    scene.children.push(rectAreaLight);
    scene.children[1].position.set(1, 6, 3.7);
    scene.children[1].intensity = 3.5
  }
  else{
    scene.children[1].position.set(1, 6, 3.7);
    scene.children[1].intensity = 3.5
    //scene.children[4].color.setHex(0x10c741);
  }
//RECT AREA LIGHT

  //AMBIENT LIGHT
    if(!scene.children[2]) {
      scene.children.push(ambientLight);
      scene.children[2].intensity = intensity * 10
    }
  //AMBIENT LIGHT

  //DIRECTIONAL LIGHT
    if(!scene.children[3]) {
      scene.children.push(directionalLight1);
      scene.children[3].position.set(parseFloat(lightPosition1[0]), parseFloat(lightPosition1[1]), parseFloat(lightPosition1[2]));
      scene.children[3].intensity = intensity
      scene.children[3].distance = 1000
    }
    else{
      scene.children[3].position.set(parseFloat(lightPosition1[0]), parseFloat(lightPosition1[1]), parseFloat(lightPosition1[2]));
      scene.children[3].intensity = intensity
      scene.children[3].distance = 1000
    }

    if(!scene.children[4]) {
      scene.children.push(directionalLight2);
      scene.children[4].position.set(parseFloat(lightPosition2[0]), parseFloat(lightPosition2[1]), parseFloat(lightPosition2[2]));
      scene.children[4].intensity = intensity
      scene.children[4].distance = 1000
    }
    else{
      scene.children[4].position.set(parseFloat(lightPosition2[0]), parseFloat(lightPosition2[1]), parseFloat(lightPosition2[2]));
      scene.children[4].intensity = intensity
      scene.children[4].distance = 1000
    }

    if(!scene.children[5]) {
      scene.children.push(directionalLight3);
      scene.children[5].position.set(parseFloat(lightPosition1[0]), parseFloat(lightPosition1[1]), 2);
      scene.children[5].intensity = intensity - 0.02
      scene.children[5].distance = 1000
    }
    else{
      scene.children[5].position.set(parseFloat(lightPosition1[0]), parseFloat(lightPosition1[1]), 2);
      scene.children[5].intensity = intensity - 0.02
      scene.children[5].distance = 1000
    }

    if(!scene.children[6]) {
      scene.children.push(directionalLight4);
      scene.children[6].position.set(parseFloat(lightPosition2[0]), parseFloat(lightPosition2[1]), -2);
      scene.children[6].intensity = intensity - 0.02
      scene.children[6].distance = 1000
    }
    else{
      scene.children[6].position.set(parseFloat(lightPosition2[0]), parseFloat(lightPosition2[1]), -2);
      scene.children[6].intensity = intensity - 0.02
      scene.children[6].distance = 1000
    }
  //DIRECTIONAL LIGHT

  

  //DIRECTIONAL LIGHT
  // if(!scene.children[4]) {
  //   scene.children.push(spotLight);
  // }
  // else{
  //   scene.children[4].position.set(0, 10, 0);
  //   scene.children[4].rotation.set(parseFloat(lightRotation[0]), parseFloat(lightRotation[1]), parseFloat(lightRotation[2]));
  //   scene.children[4].scale.set( parseFloat(lightScale[0]), parseFloat(lightScale[1]), parseFloat(lightScale[2]) )
  //   scene.children[4].intensity = 0.3
  //   //scene.children[4].color.setHex(0xb55904);
  // }
//DIRECTIONAL LIGHT

  //scene.children[0].castShadow = true;
  scene.children[0].receiveShadow = true;
  //scene.castShadow = true;
  scene.receiveShadow = true;
  // scene.parent.castShadow = true;
  // scene.parent.receiveShadow = true;
  scene.children[0].material.attach = 'Material';
  scene.children[0].material.map = texture;
  scene.children[0].material.envMap = null;
  scene.children[0].material.envMapIntensity = 0;
  scene.children[0].material.color.setHex(0xFFFFFF);
  scene.children[0].material.metalness = 0.575;
  scene.children[0].material.roughness = 0.4;
  // scene.children[0].material.emissiveMap = texture;
  //scene.children[0].material.fog = false;
  scene.children[0].scale.set(tx, ty, tz);
  //scene.children[0].position.set(position[0], position[1], position[2]);
  //scene.children[0].position.set(0, position[1], 0);
  // scene.children[0].material.map.offset.set(0, 0);
  scene.children[0].material.map.repeat.set(1, 1);
  scene.children[0].material.map.center.set(0.5,0.5);
  scene.children[0].material.map.rotation = 1.5707963268;
  scene.children[0].material.map.flipY = true;
  // scene.children[0].material.map.wrapS = 0;
  // scene.children[0].material.map.wrapT = 0;
  //scene.children[0].material.map.wrapT = 100;
  //console.log("Top Position", scene.children[0].position)
  //console.log("bottom", tx, ty, tz)
  // console.log(scene.children)
  
  return (
    <>
      {
        file == '0.gtlf' | texturefile == '0.png' | fileB == '0.gtlf' ? (
          <></>
        ) : (
          <primitive object={scene}>
            <meshBasicMaterial map={texture} transparent={false}  />
          </primitive>
        )
      }
    </>
  );
}
