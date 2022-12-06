import * as THREE from 'three';
import React, {
	type ReactNode,
	Fragment,
	useEffect,
	useRef
} from 'react';
import {
	Canvas
} from '@react-three/fiber';

type ModelViewerProps = {
	models?: (() => JSX.Element)[]
	lighting?: JSX.Element
	camera?: JSX.Element,
	style?: React.CSSProperties,
	children?: ReactNode 
};
export function ModelViewer({ models, lighting, camera, style, children } : ModelViewerProps) {

	return (
		<div 
			style={{
				position: 'absolute',
				height: '100%',
				width: '100%',
				backgroundColor: '#cccccc',
				...style
			}}
		>

			<Canvas
				shadows={true}
				dpr={window.devicePixelRatio}
				onCreated={state => state.gl.toneMapping = THREE.ACESFilmicToneMapping}
			>

				<scene >

					{ lighting ? lighting : <DefaultLights /> }
					{ camera ? camera : null }
					{ models && models.map(Model => <Model />) }
					{ children }
					
				</scene>
			</Canvas>
		</div>
	);
}

function DefaultLights(): JSX.Element {

	const spotLightRef1 = useRef<THREE.SpotLight>(null);

	useEffect(() => {
		if (spotLightRef1.current) {

			if (spotLightRef1.current.shadow.map) {
				spotLightRef1.current.shadow.bias = -0.0001;
				spotLightRef1.current.shadow.map.height = 1024*4;
				spotLightRef1.current.shadow.map.width = 1024*4;
			}	
		}
	}, [ spotLightRef1 ]);

	return (
		<Fragment>
			<hemisphereLight
				intensity={0.5}
				key='0hsL0'
			/>
			<spotLight
				position={[ 1, 3, 1 ]}
				intensity={0.165}
				castShadow={true}
				decay={2}
				penumbra={1}
				ref={spotLightRef1}
				key='1sL0'
			/>
			<spotLight
				position={[ -1.2, 3, 0 ]}
				intensity={0.165}
				castShadow={true}
				decay={2}
				penumbra={1}
				key='2sL1'
			/>
			<spotLight
				position={[0.6, 3.0, -1.4]}
				intensity={0.165}
				castShadow={true}
				decay={2}
				penumbra={1}
				key='3sL2'
			/>
		</Fragment>
	);

}
