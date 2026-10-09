import React from 'react';
import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {fonts} from '../theme';

type Props = {
	/** The scene behind the badge; it blurs and dims when the badge appears. */
	children: React.ReactNode;
	title: string;
	subtitle?: string;
	startFrame?: number;
	bg?: string;
	color?: string;
	accent?: string;
};

/** Background blur → badge pop with overshoot, a check mark and sparkles. For proof/payoff beats. */
export const BadgePop: React.FC<Props> = ({
	children,
	title,
	subtitle,
	startFrame = 0,
	bg = '#7A4A30',
	color = '#fff',
	accent = '#E8A33D',
}) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	const local = frame - startFrame;
	const blur = interpolate(local, [0, 10], [0, 18], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
	const dim = interpolate(local, [0, 10], [0, 0.18], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
	const pop = spring({frame: local - 6, fps, config: {damping: 9, stiffness: 170, mass: 0.7}});
	const rot = interpolate(pop, [0, 1], [-10, -4]);
	const check = spring({frame: local - 14, fps, config: {damping: 10, stiffness: 200}});
	const sparkle = interpolate(local, [14, 30], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

	return (
		<AbsoluteFill>
			<AbsoluteFill style={{filter: `blur(${blur}px)`}}>{children}</AbsoluteFill>
			<AbsoluteFill style={{background: `rgba(0,0,0,${dim})`}} />
			<AbsoluteFill style={{alignItems: 'center', justifyContent: 'center'}}>
				<div style={{position: 'relative', transform: `scale(${pop}) rotate(${rot}deg)`}}>
					<div
						dir="rtl"
						lang="ar"
						style={{
							background: bg,
							color,
							borderRadius: 60,
							padding: '40px 70px 46px',
							textAlign: 'center',
							boxShadow: '0 20px 50px rgba(0,0,0,0.25)',
						}}
					>
						<div style={{fontFamily: fonts.display, fontSize: 120, lineHeight: 1.1}}>{title}</div>
						{subtitle && (
							<div
								style={{
									fontFamily: fonts.display,
									fontSize: 96,
									lineHeight: 1.1,
									background: accent,
									color: bg,
									borderRadius: 30,
									padding: '4px 34px 12px',
									marginTop: 8,
								}}
							>
								{subtitle}
							</div>
						)}
					</div>
					<div
						style={{
							position: 'absolute',
							right: -46,
							bottom: -30,
							width: 110,
							height: 110,
							borderRadius: '50%',
							background: accent,
							border: '6px solid #fff',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							transform: `scale(${check})`,
							fontSize: 64,
							color: '#fff',
							fontFamily: fonts.body,
							fontWeight: 800,
						}}
					>
						✓
					</div>
					{[0, 1, 2, 3, 4, 5].map((i) => {
						const a = (i / 6) * Math.PI * 2 + 0.4;
						const d = 220 + sparkle * 90;
						return (
							<div
								key={i}
								style={{
									position: 'absolute',
									left: '50%',
									top: '50%',
									width: 14,
									height: 14,
									borderRadius: 7,
									background: accent,
									opacity: (1 - sparkle) * (sparkle > 0 ? 1 : 0),
									transform: `translate(${Math.cos(a) * d * 1.6 - 7}px, ${Math.sin(a) * d - 7}px)`,
								}}
							/>
						);
					})}
				</div>
			</AbsoluteFill>
		</AbsoluteFill>
	);
};
