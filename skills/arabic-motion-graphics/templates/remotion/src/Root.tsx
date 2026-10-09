import React from 'react';
import {Composition} from 'remotion';
import {ExplainerDemo} from './demos/ExplainerDemo';
import {HookDemo} from './demos/HookDemo';
import {LogoRevealDemo} from './demos/LogoRevealDemo';

export const RemotionRoot: React.FC = () => (
	<>
		<Composition id="ExplainerDemo" component={ExplainerDemo} durationInFrames={570} fps={30} width={1080} height={1920} />
		<Composition id="HookDemo" component={HookDemo} durationInFrames={270} fps={30} width={1080} height={1920} />
		<Composition id="LogoRevealDemo" component={LogoRevealDemo} durationInFrames={120} fps={30} width={1080} height={1920} />
	</>
);
