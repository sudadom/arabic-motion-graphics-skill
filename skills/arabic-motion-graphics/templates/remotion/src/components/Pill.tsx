import React from 'react';
import {interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {fonts} from '../theme';

type Props = {
	label: string;
	startFrame?: number;
	/** Optional content shown in a circle on the right side (number, emoji, icon element). */
	badge?: React.ReactNode;
	bg?: string;
	color?: string;
	border?: string;
	badgeBg?: string;
	badgeColor?: string;
	fontSize?: number;
};

/**
 * Capsule label used for features, steps and taglines.
 * Enters by growing from the right edge (RTL), with the label fading in slightly after.
 */
export const Pill: React.FC<Props> = ({
	label,
	startFrame = 0,
	badge,
	bg = '#E8A33D',
	color = '#fff',
	border = 'rgba(255,255,255,0.85)',
	badgeBg = '#A15E3E',
	badgeColor = '#fff',
	fontSize = 46,
}) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	const local = frame - startFrame;
	const grow = spring({frame: local, fps, config: {damping: 16, stiffness: 140}});
	const textOpacity = interpolate(local, [5, 11], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
	const badgePop = spring({frame: local - 2, fps, config: {damping: 9, stiffness: 180}});
	const h = fontSize * 1.9;

	return (
		<div dir="rtl" style={{display: 'flex', alignItems: 'center', flexDirection: 'row'}}>
			{badge !== undefined && (
				<div
					style={{
						width: h * 1.05,
						height: h * 1.05,
						borderRadius: '50%',
						background: badgeBg,
						color: badgeColor,
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						fontFamily: fonts.body,
						fontWeight: 800,
						fontSize: fontSize * 1.05,
						transform: `scale(${badgePop})`,
						zIndex: 2,
						marginLeft: -h * 0.25,
						boxShadow: '0 6px 18px rgba(0,0,0,0.18)',
					}}
				>
					{badge}
				</div>
			)}
			<div
				style={{
					height: h,
					padding: `0 ${fontSize * 0.9}px`,
					paddingRight: badge !== undefined ? fontSize * 0.9 + h * 0.25 : fontSize * 0.9,
					borderRadius: h / 2,
					background: bg,
					border: `3px solid ${border}`,
					display: 'flex',
					alignItems: 'center',
					transformOrigin: 'right center',
					transform: `scaleX(${grow})`,
					boxShadow: '0 6px 18px rgba(0,0,0,0.12)',
				}}
			>
				<span
					lang="ar"
					style={{fontFamily: fonts.body, fontWeight: 800, fontSize, color, opacity: textOpacity, whiteSpace: 'nowrap'}}
				>
					{label}
				</span>
			</div>
		</div>
	);
};
