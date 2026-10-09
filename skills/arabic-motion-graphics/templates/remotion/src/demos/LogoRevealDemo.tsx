import React from 'react';
import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {Rings} from '../components/Decor';
import {fonts} from '../theme';

// Logo reveal, 4s: decor draws in → mark pops → wordmark rises with kashida stretch → tagline → hold.
// Shows the tatweel (ـ) technique: the word widens by inserting kashida, never by letter-spacing.

const navy = '#0E2A5A';
const orange = '#F28A1E';

export const LogoRevealDemo: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	const mark = spring({frame: frame - 12, fps, config: {damping: 9, stiffness: 140}});
	const word = spring({frame: frame - 30, fps, config: {damping: 16, stiffness: 120}});
	const stretch = Math.round(interpolate(frame, [48, 70], [0, 3], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}));
	const tag = interpolate(frame, [72, 84], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
	const k = 'ـ'.repeat(stretch);

	return (
		<AbsoluteFill style={{background: '#FFFFFF', alignItems: 'center', justifyContent: 'center'}}>
			<Rings color={orange} x={-200} y={-200} size={620} />
			<Rings color={navy} x={640} y={1460} size={560} speed={-0.35} />
			<div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20}}>
				<div
					style={{
						width: 200,
						height: 200,
						border: `22px solid ${navy}`,
						borderRadius: 40,
						transform: `scale(${mark}) rotate(${45 - mark * 45 + 45}deg)`,
						position: 'relative',
					}}
				>
					<div style={{position: 'absolute', inset: 40, background: orange, borderRadius: 16}} />
				</div>
				<div
					dir="rtl"
					lang="ar"
					style={{
						fontFamily: fonts.display,
						fontSize: 170,
						color: navy,
						opacity: word,
						transform: `translateY(${(1 - word) * 40}px)`,
						marginTop: 30,
					}}
				>
					{`مسـ${k}ـار`}
				</div>
				<div dir="rtl" style={{fontFamily: fonts.body, fontWeight: 600, fontSize: 46, color: orange, opacity: tag}}>
					خطوتك الجاية أوضح
				</div>
			</div>
		</AbsoluteFill>
	);
};
