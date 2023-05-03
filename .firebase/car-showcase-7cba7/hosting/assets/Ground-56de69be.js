import{r as t,u as ee,j as V,s as te}from"./index-91b8ad13.js";import{S as re,U as h,V as j,N as ae,W as L,L as k,a as ne,C as oe,B as se,b as O,M as ie,c as le,e as ue,u as G,P as me,d as B,f as $,g as q,h as he,H as fe,D as ce,i as ve,j as de,k as pe,_ as xe,m as ge,l as _e,T as Se,R as X,n as De}from"./AnimationCanvas-31b91850.js";class Te extends re{constructor(e=new j){super({uniforms:{inputBuffer:new h(null),depthBuffer:new h(null),resolution:new h(new j),texelSize:new h(new j),halfTexelSize:new h(new j),kernel:new h(0),scale:new h(1),cameraNear:new h(0),cameraFar:new h(1),minDepthThreshold:new h(0),maxDepthThreshold:new h(1),depthScale:new h(0),depthToBlurRatioBias:new h(.25)},fragmentShader:`#include <common>
        #include <dithering_pars_fragment>      
        uniform sampler2D inputBuffer;
        uniform sampler2D depthBuffer;
        uniform float cameraNear;
        uniform float cameraFar;
        uniform float minDepthThreshold;
        uniform float maxDepthThreshold;
        uniform float depthScale;
        uniform float depthToBlurRatioBias;
        varying vec2 vUv;
        varying vec2 vUv0;
        varying vec2 vUv1;
        varying vec2 vUv2;
        varying vec2 vUv3;

        void main() {
          float depthFactor = 0.0;
          
          #ifdef USE_DEPTH
            vec4 depth = texture2D(depthBuffer, vUv);
            depthFactor = smoothstep(minDepthThreshold, maxDepthThreshold, 1.0-(depth.r * depth.a));
            depthFactor *= depthScale;
            depthFactor = max(0.0, min(1.0, depthFactor + 0.25));
          #endif
          
          vec4 sum = texture2D(inputBuffer, mix(vUv0, vUv, depthFactor));
          sum += texture2D(inputBuffer, mix(vUv1, vUv, depthFactor));
          sum += texture2D(inputBuffer, mix(vUv2, vUv, depthFactor));
          sum += texture2D(inputBuffer, mix(vUv3, vUv, depthFactor));
          gl_FragColor = sum * 0.25 ;

          #include <dithering_fragment>
          #include <tonemapping_fragment>
          #include <encodings_fragment>
        }`,vertexShader:`uniform vec2 texelSize;
        uniform vec2 halfTexelSize;
        uniform float kernel;
        uniform float scale;
        varying vec2 vUv;
        varying vec2 vUv0;
        varying vec2 vUv1;
        varying vec2 vUv2;
        varying vec2 vUv3;

        void main() {
          vec2 uv = position.xy * 0.5 + 0.5;
          vUv = uv;

          vec2 dUv = (texelSize * vec2(kernel) + halfTexelSize) * scale;
          vUv0 = vec2(uv.x - dUv.x, uv.y + dUv.y);
          vUv1 = vec2(uv.x + dUv.x, uv.y + dUv.y);
          vUv2 = vec2(uv.x + dUv.x, uv.y - dUv.y);
          vUv3 = vec2(uv.x - dUv.x, uv.y - dUv.y);

          gl_Position = vec4(position.xy, 1.0, 1.0);
        }`,blending:ae,depthWrite:!1,depthTest:!1}),this.toneMapped=!1,this.setTexelSize(e.x,e.y),this.kernel=new Float32Array([0,1,2,2,3])}setTexelSize(e,r){this.uniforms.texelSize.value.set(e,r),this.uniforms.halfTexelSize.value.set(e,r).multiplyScalar(.5)}setResolution(e){this.uniforms.resolution.value.copy(e)}}class Me{constructor({gl:e,resolution:r,width:a=500,height:c=500,minDepthThreshold:v=0,maxDepthThreshold:d=1,depthScale:u=0,depthToBlurRatioBias:x=.25}){this.renderToScreen=!1,this.renderTargetA=new L(r,r,{minFilter:k,magFilter:k,stencilBuffer:!1,depthBuffer:!1,encoding:e.outputEncoding}),this.renderTargetB=this.renderTargetA.clone(),this.convolutionMaterial=new Te,this.convolutionMaterial.setTexelSize(1/a,1/c),this.convolutionMaterial.setResolution(new j(a,c)),this.scene=new ne,this.camera=new oe,this.convolutionMaterial.uniforms.minDepthThreshold.value=v,this.convolutionMaterial.uniforms.maxDepthThreshold.value=d,this.convolutionMaterial.uniforms.depthScale.value=u,this.convolutionMaterial.uniforms.depthToBlurRatioBias.value=x,this.convolutionMaterial.defines.USE_DEPTH=u>0;const s=new Float32Array([-1,-1,0,3,-1,0,-1,3,0]),_=new Float32Array([0,0,2,0,0,2]),p=new se;p.setAttribute("position",new O(s,3)),p.setAttribute("uv",new O(_,2)),this.screen=new ie(p,this.convolutionMaterial),this.screen.frustumCulled=!1,this.scene.add(this.screen)}render(e,r,a){const c=this.scene,v=this.camera,d=this.renderTargetA,u=this.renderTargetB;let x=this.convolutionMaterial,s=x.uniforms;s.depthBuffer.value=r.depthTexture;const _=x.kernel;let p=r,M,S,C;for(S=0,C=_.length-1;S<C;++S)M=S&1?u:d,s.kernel.value=_[S],s.inputBuffer.value=p.texture,e.setRenderTarget(M),e.render(c,v),p=M;s.kernel.value=_[S],s.inputBuffer.value=p.texture,e.setRenderTarget(this.renderToScreen?null:a),e.render(c,v)}}let Ue=class extends le{constructor(e={}){super(e),this._tDepth={value:null},this._distortionMap={value:null},this._tDiffuse={value:null},this._tDiffuseBlur={value:null},this._textureMatrix={value:null},this._hasBlur={value:!1},this._mirror={value:0},this._mixBlur={value:0},this._blurStrength={value:.5},this._minDepthThreshold={value:.9},this._maxDepthThreshold={value:1},this._depthScale={value:0},this._depthToBlurRatioBias={value:.25},this._distortion={value:1},this._mixContrast={value:1},this.setValues(e)}onBeforeCompile(e){var r;(r=e.defines)!=null&&r.USE_UV||(e.defines.USE_UV=""),e.uniforms.hasBlur=this._hasBlur,e.uniforms.tDiffuse=this._tDiffuse,e.uniforms.tDepth=this._tDepth,e.uniforms.distortionMap=this._distortionMap,e.uniforms.tDiffuseBlur=this._tDiffuseBlur,e.uniforms.textureMatrix=this._textureMatrix,e.uniforms.mirror=this._mirror,e.uniforms.mixBlur=this._mixBlur,e.uniforms.mixStrength=this._blurStrength,e.uniforms.minDepthThreshold=this._minDepthThreshold,e.uniforms.maxDepthThreshold=this._maxDepthThreshold,e.uniforms.depthScale=this._depthScale,e.uniforms.depthToBlurRatioBias=this._depthToBlurRatioBias,e.uniforms.distortion=this._distortion,e.uniforms.mixContrast=this._mixContrast,e.vertexShader=`
        uniform mat4 textureMatrix;
        varying vec4 my_vUv;
      ${e.vertexShader}`,e.vertexShader=e.vertexShader.replace("#include <project_vertex>",`#include <project_vertex>
        my_vUv = textureMatrix * vec4( position, 1.0 );
        gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );`),e.fragmentShader=`
        uniform sampler2D tDiffuse;
        uniform sampler2D tDiffuseBlur;
        uniform sampler2D tDepth;
        uniform sampler2D distortionMap;
        uniform float distortion;
        uniform float cameraNear;
			  uniform float cameraFar;
        uniform bool hasBlur;
        uniform float mixBlur;
        uniform float mirror;
        uniform float mixStrength;
        uniform float minDepthThreshold;
        uniform float maxDepthThreshold;
        uniform float mixContrast;
        uniform float depthScale;
        uniform float depthToBlurRatioBias;
        varying vec4 my_vUv;
        ${e.fragmentShader}`,e.fragmentShader=e.fragmentShader.replace("#include <emissivemap_fragment>",`#include <emissivemap_fragment>

      float distortionFactor = 0.0;
      #ifdef USE_DISTORTION
        distortionFactor = texture2D(distortionMap, vUv).r * distortion;
      #endif

      vec4 new_vUv = my_vUv;
      new_vUv.x += distortionFactor;
      new_vUv.y += distortionFactor;

      vec4 base = texture2DProj(tDiffuse, new_vUv);
      vec4 blur = texture2DProj(tDiffuseBlur, new_vUv);

      vec4 merge = base;

      #ifdef USE_NORMALMAP
        vec2 normal_uv = vec2(0.0);
        vec4 normalColor = texture2D(normalMap, vUv * normalScale);
        vec3 my_normal = normalize( vec3( normalColor.r * 2.0 - 1.0, normalColor.b,  normalColor.g * 2.0 - 1.0 ) );
        vec3 coord = new_vUv.xyz / new_vUv.w;
        normal_uv = coord.xy + coord.z * my_normal.xz * 0.05;
        vec4 base_normal = texture2D(tDiffuse, normal_uv);
        vec4 blur_normal = texture2D(tDiffuseBlur, normal_uv);
        merge = base_normal;
        blur = blur_normal;
      #endif

      float depthFactor = 0.0001;
      float blurFactor = 0.0;

      #ifdef USE_DEPTH
        vec4 depth = texture2DProj(tDepth, new_vUv);
        depthFactor = smoothstep(minDepthThreshold, maxDepthThreshold, 1.0-(depth.r * depth.a));
        depthFactor *= depthScale;
        depthFactor = max(0.0001, min(1.0, depthFactor));

        #ifdef USE_BLUR
          blur = blur * min(1.0, depthFactor + depthToBlurRatioBias);
          merge = merge * min(1.0, depthFactor + 0.5);
        #else
          merge = merge * depthFactor;
        #endif

      #endif

      float reflectorRoughnessFactor = roughness;
      #ifdef USE_ROUGHNESSMAP
        vec4 reflectorTexelRoughness = texture2D( roughnessMap, vUv );
        reflectorRoughnessFactor *= reflectorTexelRoughness.g;
      #endif

      #ifdef USE_BLUR
        blurFactor = min(1.0, mixBlur * reflectorRoughnessFactor);
        merge = mix(merge, blur, blurFactor);
      #endif

      vec4 newMerge = vec4(0.0, 0.0, 0.0, 1.0);
      newMerge.r = (merge.r - 0.5) * mixContrast + 0.5;
      newMerge.g = (merge.g - 0.5) * mixContrast + 0.5;
      newMerge.b = (merge.b - 0.5) * mixContrast + 0.5;

      diffuseColor.rgb = diffuseColor.rgb * ((1.0 - min(1.0, mirror)) + newMerge.rgb * mixStrength);
      `)}get tDiffuse(){return this._tDiffuse.value}set tDiffuse(e){this._tDiffuse.value=e}get tDepth(){return this._tDepth.value}set tDepth(e){this._tDepth.value=e}get distortionMap(){return this._distortionMap.value}set distortionMap(e){this._distortionMap.value=e}get tDiffuseBlur(){return this._tDiffuseBlur.value}set tDiffuseBlur(e){this._tDiffuseBlur.value=e}get textureMatrix(){return this._textureMatrix.value}set textureMatrix(e){this._textureMatrix.value=e}get hasBlur(){return this._hasBlur.value}set hasBlur(e){this._hasBlur.value=e}get mirror(){return this._mirror.value}set mirror(e){this._mirror.value=e}get mixBlur(){return this._mixBlur.value}set mixBlur(e){this._mixBlur.value=e}get mixStrength(){return this._blurStrength.value}set mixStrength(e){this._blurStrength.value=e}get minDepthThreshold(){return this._minDepthThreshold.value}set minDepthThreshold(e){this._minDepthThreshold.value=e}get maxDepthThreshold(){return this._maxDepthThreshold.value}set maxDepthThreshold(e){this._maxDepthThreshold.value=e}get depthScale(){return this._depthScale.value}set depthScale(e){this._depthScale.value=e}get depthToBlurRatioBias(){return this._depthToBlurRatioBias.value}set depthToBlurRatioBias(e){this._depthToBlurRatioBias.value=e}get distortion(){return this._distortion.value}set distortion(e){this._distortion.value=e}get mixContrast(){return this._mixContrast.value}set mixContrast(e){this._mixContrast.value=e}};ue({MeshReflectorMaterialImpl:Ue});const we=t.forwardRef(({mixBlur:f=0,mixStrength:e=1,resolution:r=256,blur:a=[0,0],minDepthThreshold:c=.9,maxDepthThreshold:v=1,depthScale:d=0,depthToBlurRatioBias:u=.25,mirror:x=0,distortion:s=1,mixContrast:_=1,distortionMap:p,reflectorOffset:M=0,...S},C)=>{const n=G(({gl:l})=>l),y=G(({camera:l})=>l),J=G(({scene:l})=>l);a=Array.isArray(a)?a:[a,a];const P=a[0]+a[1]>0,R=t.useRef(null),[U]=t.useState(()=>new me),[D]=t.useState(()=>new B),[T]=t.useState(()=>new B),[W]=t.useState(()=>new B),[b]=t.useState(()=>new $),[N]=t.useState(()=>new B(0,0,-1)),[g]=t.useState(()=>new q),[F]=t.useState(()=>new B),[A]=t.useState(()=>new B),[E]=t.useState(()=>new q),[w]=t.useState(()=>new $),[m]=t.useState(()=>new he),K=t.useCallback(()=>{var l;const o=R.current.parent||((l=R.current)==null?void 0:l.__r3f.parent);if(!o||(T.setFromMatrixPosition(o.matrixWorld),W.setFromMatrixPosition(y.matrixWorld),b.extractRotation(o.matrixWorld),D.set(0,0,1),D.applyMatrix4(b),T.addScaledVector(D,M),F.subVectors(T,W),F.dot(D)>0))return;F.reflect(D).negate(),F.add(T),b.extractRotation(y.matrixWorld),N.set(0,0,-1),N.applyMatrix4(b),N.add(W),A.subVectors(T,N),A.reflect(D).negate(),A.add(T),m.position.copy(F),m.up.set(0,1,0),m.up.applyMatrix4(b),m.up.reflect(D),m.lookAt(A),m.far=y.far,m.updateMatrixWorld(),m.projectionMatrix.copy(y.projectionMatrix),w.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),w.multiply(m.projectionMatrix),w.multiply(m.matrixWorldInverse),w.multiply(o.matrixWorld),U.setFromNormalAndCoplanarPoint(D,T),U.applyMatrix4(m.matrixWorldInverse),g.set(U.normal.x,U.normal.y,U.normal.z,U.constant);const i=m.projectionMatrix;E.x=(Math.sign(g.x)+i.elements[8])/i.elements[0],E.y=(Math.sign(g.y)+i.elements[9])/i.elements[5],E.z=-1,E.w=(1+i.elements[10])/i.elements[14],g.multiplyScalar(2/g.dot(E)),i.elements[2]=g.x,i.elements[6]=g.y,i.elements[10]=g.z+1,i.elements[14]=g.w},[y,M]),[H,Q,Y,z]=t.useMemo(()=>{const l={minFilter:k,magFilter:k,encoding:n.outputEncoding,type:fe},o=new L(r,r,l);o.depthBuffer=!0,o.depthTexture=new ce(r,r),o.depthTexture.format=ve,o.depthTexture.type=de;const i=new L(r,r,l),I=new Me({gl:n,resolution:r,width:a[0],height:a[1],minDepthThreshold:c,maxDepthThreshold:v,depthScale:d,depthToBlurRatioBias:u}),Z={mirror:x,textureMatrix:w,mixBlur:f,tDiffuse:o.texture,tDepth:o.depthTexture,tDiffuseBlur:i.texture,hasBlur:P,mixStrength:e,minDepthThreshold:c,maxDepthThreshold:v,depthScale:d,depthToBlurRatioBias:u,distortion:s,distortionMap:p,mixContrast:_,"defines-USE_BLUR":P?"":void 0,"defines-USE_DEPTH":d>0?"":void 0,"defines-USE_DISTORTION":p?"":void 0};return[o,i,I,Z]},[n,a,w,r,x,P,f,e,c,v,d,u,s,p,_]);return pe(()=>{var l;const o=R.current.parent||((l=R.current)==null?void 0:l.__r3f.parent);if(!o)return;o.visible=!1;const i=n.xr.enabled,I=n.shadowMap.autoUpdate;K(),n.xr.enabled=!1,n.shadowMap.autoUpdate=!1,n.setRenderTarget(H),n.state.buffers.depth.setMask(!0),n.autoClear||n.clear(),n.render(J,m),P&&Y.render(n,H,Q),n.xr.enabled=i,n.shadowMap.autoUpdate=I,o.visible=!0,n.setRenderTarget(null)}),t.createElement("meshReflectorMaterialImpl",xe({attach:"material",key:"key"+z["defines-USE_BLUR"]+z["defines-USE_DEPTH"]+z["defines-USE_DISTORTION"],ref:ge([R,C])},z,S))});function be(){const f=ee(te),e=t.useMemo(()=>f.currentEnvironment==="daytime"?[.15,.15,.15]:f.currentEnvironment==="nighttime"?[.05,.05,.05]:[.015,.015,.015],[f.currentEnvironment]),[r,a]=t.useState(.15),[c,v]=t.useState({roughness:"/textures/terrain-roughness.jpg",normal:"/textures/terrain-normal.jpg"}),[d,u]=_e(Se,[c.roughness,c.normal]),x=t.useCallback(()=>{[u,d].forEach(s=>{s.wrapS=X,s.wrapT=X,s.repeat.set(5,5),s.offset.set(0,0)}),u.encoding=De},[u,d]);return t.useEffect(()=>{x()},[x]),t.useMemo(()=>{f.currentEnvironment==="daytime"?(a(.01),v({roughness:"/textures/asphalt/asphalt-roughness.jpg",normal:"/textures/asphalt/asphalt-normal.jpg"})):f.currentEnvironment==="nighttime"?(a(0),v({roughness:"/textures/terrain-roughness.jpg",normal:"/textures/terrain-normal.jpg"})):(a(.15),v({roughness:"/textures/terrain-roughness.jpg",normal:"/textures/terrain-normal.jpg"}))},[f.currentEnvironment]),V("mesh",{"rotation-x":-Math.PI*.5,castShadow:!0,receiveShadow:!0,children:[V("planeGeometry",{args:[30,30]},void 0,!1,{fileName:"C:/Users/josej/webProjects/car-showcase/src/components/Ground/Ground.jsx",lineNumber:84,columnNumber:7},this),V(we,{envMapIntensity:0,normalMap:u,normalScale:[.3,.3],roughnessMap:d,dithering:!0,color:e,roughness:.7,mixStrength:10,mixContrast:1,resolution:1024,mirror:0,depthScale:.01,minDepthThreshold:.9,maxDepthThreshold:1,depthToBlurRatioBias:r,debug:0,reflectorOffset:.2},void 0,!1,{fileName:"C:/Users/josej/webProjects/car-showcase/src/components/Ground/Ground.jsx",lineNumber:85,columnNumber:7},this)]},void 0,!0,{fileName:"C:/Users/josej/webProjects/car-showcase/src/components/Ground/Ground.jsx",lineNumber:83,columnNumber:5},this)}export{be as default};
