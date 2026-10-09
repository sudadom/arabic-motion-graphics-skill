import React from 'react';
import {AbsoluteFill, Easing, interpolate, useCurrentFrame} from 'remotion';

type TransitionProps = {
	/** Scene shown before the transition. */
	from: React.ReactNode;
	/** Scene shown after the transition. */
	to: React.ReactNode;
	/** Frame (relative to the parent) when the transition starts. */
	at: number;
	/** Length in frames. */
	duration?: number;
};

/**
 * Iris: the incoming scene is revealed by a circle growing from (cx, cy).
 * 15–21 frames at 30fps (500–700ms).
 */
export const IrisTransition: React.FC<TransitionProps & {cx?: string; cy?: string}> = ({
	from,
	to,
	at,
	duration = 18,
	cx = '50%',
	cy = '50%',
}) => {
	const frame = useCurrentFrame();
	const r = interpolate(frame, [at, at + duration], [0, 150], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
		easing: Easing.bezier(0.65, 0, 0.35, 1),
	});
	return (
		<AbsoluteFill>
			{frame < at + duration && <AbsoluteFill>{from}</AbsoluteFill>}
			{frame >= at && <AbsoluteFill style={{clipPath: `circle(${r}% at ${cx} ${cy})`}}>{to}</AbsoluteFill>}
		</AbsoluteFill>
	);
};

/**
 * Push: the incoming scene pushes the old one out, with motion blur peaking mid-move.
 * direction 'down' = new scene enters from the top; 'left' = enters from the right (RTL flow).
 * 8–12 frames at 30fps (250–400ms).
 */
export const PushTransition: React.FC<TransitionProps & {direction?: 'down' | 'up' | 'left' | 'right'}> = ({
	from,
	to,
	at,
	duration = 10,
	direction = 'down',
}) => {
	const frame = useCurrentFrame();
	const p = interpolate(frame, [at, at + duration], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
		easing: Easing.out(Easing.exp),
	});
	const blur = Math.sin(p * Math.PI) * 14;
	const vertical = direction === 'down' || direction === 'up';
	const sign = direction === 'down' || direction === 'left' ? 1 : -1;
	const axis = (v: number) => (vertical ? `translateY(${v}%)` : `translateX(${-v}%)`);
	return (
		<AbsoluteFill style={{overflow: 'hidden'}}>
			{frame < at + duration && (
				<AbsoluteFill style={{transform: axis(sign * p * 100), filter: `blur(${blur}px)`}}>{from}</AbsoluteFill>
			)}
			{frame >= at && (
				<AbsoluteFill style={{transform: axis(sign * (p - 1) * 100), filter: `blur(${blur}px)`}}>{to}</AbsoluteFill>
			)}
		</AbsoluteFill>
	);
};

/**
 * Diagonal wipe: a slanted edge sweeps right → left revealing the next scene.
 * 12–18 frames at 30fps (400–600ms).
 */
export const DiagonalWipe: React.FC<TransitionProps & {slant?: number}> = ({from, to, at, duration = 15, slant = 18}) => {
	const frame = useCurrentFrame();
	const p = interpolate(frame, [at, at + duration], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
		easing: Easing.bezier(0.45, 0, 0.55, 1),
	});
	// Edge x positions (in %) at top and bottom; travels from right (100+slant) to left (-slant).
	const xTop = 100 + slant - p * (100 + 2 * slant);
	const xBottom = xTop + slant;
	return (
		<AbsoluteFill>
			<AbsoluteFill>{from}</AbsoluteFill>
			{frame >= at && (
				<AbsoluteFill style={{clipPath: `polygon(${xTop}% 0, 100% 0, 100% 100%, ${xBottom}% 100%)`}}>{to}</AbsoluteFill>
			)}
		</AbsoluteFill>
	);
};

/** Cross-fade with a subtle scale: out 1 → 1.06, in 1.05 → 1. 12–15 frames. */
export const FadeScale: React.FC<TransitionProps> = ({from, to, at, duration = 14}) => {
	const frame = useCurrentFrame();
	const p = interpolate(frame, [at, at + duration], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
		easing: Easing.inOut(Easing.cubic),
	});
	return (
		<AbsoluteFill>
			{p < 1 && <AbsoluteFill style={{opacity: 1 - p, transform: `scale(${1 + p * 0.06})`}}>{from}</AbsoluteFill>}
			{p > 0 && <AbsoluteFill style={{opacity: p, transform: `scale(${1.05 - p * 0.05})`}}>{to}</AbsoluteFill>}
		</AbsoluteFill>
	);
};
