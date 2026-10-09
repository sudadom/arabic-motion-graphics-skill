import React from 'react';
import {AbsoluteFill, Easing, Sequence, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {WordByWord} from '../components/WordByWord';
import {DiagonalWipe} from '../components/Transitions';
import {Particles} from '../components/Decor';
import {kineticBrand as k, fonts} from '../theme';

// Style B: kinetic collage hook reel. Constant motion: the camera pans over one tall canvas,
// words land along the path, one accent color. Replace the shapes with your own cutout photos.

const Crowd: React.FC<{highlight?: number}> = ({highlight = -1}) => (
	<div style={{display: 'grid', gridTemplateColumns: 'repeat(5, 150px)', gap: 30, justifyContent: 'center'}}>
		{Array.from({length: 15}).map((_, i) => (
			<div key={i} style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8}}>
				<div style={{width: 70, height: 70, borderRadius: 35, background: i === highlight ? k.primary : '#4A4A4A'}} />
				<div style={{width: 120, height: 130, borderRadius: '60px 60px 12px 12px', background: i === highlight ? k.primary : '#3A3A3A'}} />
			</div>
		))}
	</div>
);

const Canvas: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	// Camera path: three stops down a 2.6x-tall canvas, eased between them, never fully stopping.
	const y = interpolate(frame, [0, 60, 75, 120, 135, 210], [0, -120, -1000, -1120, -1960, -2080], {
		extrapolateRight: 'clamp',
		easing: Easing.inOut(Easing.cubic),
	});
	const rot = interpolate(frame, [0, 210], [-2, 2]);
	const glow = spring({frame: frame - 70, fps, config: {damping: 20}});
	return (
		<AbsoluteFill style={{background: k.bg, overflow: 'hidden'}}>
			<Particles color={k.primary} />
			<div style={{position: 'absolute', inset: 0, transform: `translateY(${y}px) rotate(${rot}deg)`}}>
				<div style={{position: 'absolute', top: 520, width: '100%', padding: '0 80px'}}>
					<WordByWord text="زين ليش ناس تنجح" fontSize={130} color={k.text} highlight={['تنجح']} highlightColor={k.primary} startFrame={4} />
				</div>
				<div style={{position: 'absolute', top: 1450, width: '100%'}}>
					<Crowd highlight={glow > 0.5 ? 7 : -1} />
				</div>
				<div style={{position: 'absolute', top: 2400, width: '100%', padding: '0 80px'}}>
					<WordByWord text="وناس تبقى بمكانها؟" fontSize={120} color={k.text} highlight={['بمكانها؟']} highlightColor={k.primary} startFrame={128} />
				</div>
			</div>
		</AbsoluteFill>
	);
};

const Answer: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	const s = spring({frame: frame - 4, fps, config: {damping: 8, stiffness: 160}});
	return (
		<AbsoluteFill style={{background: '#F4F4F4', alignItems: 'center', justifyContent: 'center'}}>
			<div dir="rtl" style={{fontFamily: fonts.display, fontSize: 200, color: '#111', transform: `scale(${s}) rotate(-5deg)`}}>
				السر <span style={{color: '#7FB800'}}>واحد</span>
			</div>
		</AbsoluteFill>
	);
};

export const HookDemo: React.FC = () => (
	<AbsoluteFill>
		<Sequence durationInFrames={270}>
			<DiagonalWipe from={<Canvas />} to={<Answer />} at={210} duration={15} />
		</Sequence>
	</AbsoluteFill>
);
