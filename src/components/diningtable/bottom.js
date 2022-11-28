import React, { Suspense,useRef, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF, useTexture } from "@react-three/drei";
import * as constants from '../../constants'
const base_url = constants.base_url

export default function Topku({file, colorfile, bx, by, bz, setIsLoading, fileT, texturefile, position, roughness, metalness, envMapIntensity}) {
  const group = useRef();
  //const { scene } = useGLTF(base_url + "/assets/img/3D/bottom/"+file);
  if(file == 0) {
    file =  file.toString() + '.gltf';
    bx = 0;
    by = 0;
    bz = 0;
    setIsLoading(true)
  }
  if(colorfile == 0) colorfile = colorfile.toString() + '.png';

  if(fileT == 0){
    fileT =  fileT.toString() + '.gltf';
    bx = 0;
    by = 0;
    bz = 0;
    setIsLoading(true)
  }

  if(texturefile == 0) {
    texturefile =  texturefile.toString() + '.png';
    setIsLoading(true)
  }

  if( file != 0 && colorfile != 0 && fileT != 0 && texturefile != 0  ){
    setIsLoading(false)
  }

  const { scene } = useGLTF("/assets/img/3D/bottom/"+file);
  const color = useTexture('/assets/img/2D/color/'+colorfile);
  //const color = useTexture(base_url + '/assets/img/2D/color/'+colorfile);
  // const geometriku = scene.children[0].geometry;
  // const materialku = scene.children[0].material;

  //scene.children[0].castShadow = true;
  scene.children[0].receiveShadow = true;
  //scene.castShadow = true;
  scene.receiveShadow = true;
  if(scene.children[0].material) {
    //scene.children[0].castShadow = true;
    scene.children[0].receiveShadow = true;
    scene.children[0].material.attach = 'Material';
    scene.children[0].material.map = color;
    //scene.children[0].material.envMapIntensity = 0;
    scene.children[0].material.envMapIntensity = 0;
    scene.children[0].material.color = '';
    scene.children[0].material.metalness = 0.575;
    scene.children[0].material.roughness = 0.4;
    // scene.children[0].material.metalness = metalness;
    // scene.children[0].material.roughness = roughness;
    //scene.children[0].scale.set(bx, by, bz);
    scene.children[0].scale.set(bx, by, bz);
    //scene.children[0].scale.set(0, 0, 0);
    //scene.children[0].position.set(position[0], position[1], position[2]);
    //console.log("Bottom pos ", scene.children[0].position)
    //console.log("Bottom Scale", scene.children[0].scale);
    //console.log("Bottom Scene", scene);
  }
  else{
        scene.children[0].children.map((value) => {
        value.material.attach = 'Material';
        value.material.map = color;
        value.material.envMapIntensity = 0;
        value.material.metalness = 0.8;
        value.material.color = '';
        value.material.roughness = 0;
        value.scale.set(bx, by, bz);
        //value.position.set(position[0], position[1], position[2]);
    })
  }

  return (
      <>
        {
          file == '0.gtlf' | colorfile == '0.png' ? (
            <></>
          ) : (
            <primitive object={scene} receiveShadow={true} >
              <meshBasicMaterial map={color} toneMapped={true} transparent={false} receiveShadow={true}  />
            </primitive>
          )
        }
      </>
  );
}