import React from 'react';
import {AbsoluteFill, useCurrentFrame, useVideoConfig} from 'remotion';

/** Rotating concentric dashed rings — secondary motion for holds (corner decoration). */
export const Rings: React.FC<{color?: string; size?: number; x?: number; y?: number; speed?: number}> = ({
	color = '#E8A33D',
	size = 520,
	x = -160,
	y = -160,
	speed = 0.4,
}) => {
	const frame = useCurrentFrame();
	return (
		<svg width={size} height={size} viewBox="0 0 100 100" style={{position: 'absolute', left: x, top: y}}>
			{[46, 38, 30, 22].map((r, i) => (
				<circle
					key={r}
					cx={50}
					cy={50}
					r={r}
					fill="none"
					stroke={color}
					strokeWidth={i % 2 ? 0.8 : 1.6}
					strokeDasharray={i % 2 ? '2 3' : '18 6 4 6'}
					opacity={0.55 - i * 0.08}
					transform={`rotate(${frame * speed * (i % 2 ? -1 : 1) * (1 + i * 0.3)} 50 50)`}
				/>
			))}
		</svg>
	);
};

/** Slow drifting dots — keeps dark backgrounds alive. Deterministic (no Math.random) so renders are stable. */
export const Particles: React.FC<{color?: string; count?: number}> = ({color = '#B6F23A', count = 28}) => {
	const frame = useCurrentFrame();
	const {width, height} = useVideoConfig();
	return (
		<AbsoluteFill>
			{Array.from({length: count}).map((_, i) => {
				const seed = (i * 9301 + 49297) % 233280;
				const bx = (seed / 233280) * width;
				const by = (((seed * 7) % 233280) / 233280) * height;
				const r = 3 + (i % 4) * 2;
				const y = (by - frame * (0.3 + (i % 5) * 0.15) + height) % height;
				return (
					<div
						key={i}
						style={{
							position: 'absolute',
							left: bx,
							top: y,
							width: r,
							height: r,
							borderRadius: r,
							background: color,
							opacity: 0.25 + (i % 3) * 0.2,
						}}
					/>
				);
			})}
		</AbsoluteFill>
	);
};

/** Ken-Burns style slow zoom wrapper (1 → 1+amount over the given frames). */
export const SlowZoom: React.FC<{children: React.ReactNode; amount?: number; frames?: number}> = ({
	children,
	amount = 0.04,
	frames = 150,
}) => {
	const frame = useCurrentFrame();
	const s = 1 + Math.min(frame / frames, 1) * amount;
	return <AbsoluteFill style={{transform: `scale(${s})`}}>{children}</AbsoluteFill>;
};
