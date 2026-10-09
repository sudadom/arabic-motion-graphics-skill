import React from 'react';
import {interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {fonts} from '../theme';

type Props = {
	text: string;
	/** Frame (relative to the parent Sequence) when the first word starts. */
	startFrame?: number;
	/** Frames between words. 3–4 frames at 30fps ≈ 100–130ms. */
	stagger?: number;
	fontSize?: number;
	color?: string;
	/** Words (exact match) to color with the highlight color. */
	highlight?: string[];
	highlightColor?: string;
	fontFamily?: string;
	align?: 'center' | 'right' | 'left';
	lineHeight?: number;
};

/**
 * RTL word-by-word reveal. Animates whole words only, so Arabic shaping never breaks.
 * Each word rises 30px, fades in and settles with a spring. Order follows reading order (right → left).
 */
export const WordByWord: React.FC<Props> = ({
	text,
	startFrame = 0,
	stagger = 4,
	fontSize = 84,
	color = '#111',
	highlight = [],
	highlightColor = '#E8A33D',
	fontFamily = fonts.display,
	align = 'center',
	lineHeight = 1.35,
}) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	const words = text.split(/\s+/).filter(Boolean);

	return (
		<div
			dir="rtl"
			lang="ar"
			style={{
				fontFamily,
				fontSize,
				lineHeight,
				color,
				textAlign: align,
				display: 'flex',
				flexWrap: 'wrap',
				justifyContent: align === 'center' ? 'center' : align === 'right' ? 'flex-start' : 'flex-end',
				columnGap: fontSize * 0.28,
			}}
		>
			{words.map((word, i) => {
				const local = frame - startFrame - i * stagger;
				const p = spring({frame: local, fps, config: {damping: 14, stiffness: 160, mass: 0.6}});
				const opacity = interpolate(local, [0, 5], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
				return (
					<span
						key={i}
						style={{
							display: 'inline-block',
							opacity,
							transform: `translateY(${(1 - p) * 30}px)`,
							color: highlight.includes(word) ? highlightColor : undefined,
						}}
					>
						{word}
					</span>
				);
			})}
		</div>
	);
};
