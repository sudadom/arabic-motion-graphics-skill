import React from 'react';
import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {Pill} from './Pill';
import {fonts} from '../theme';

type Row = {icon?: string; text: string};

type Props = {
	/** Logo element (an <Img/> of the client logo, or a text wordmark). */
	logo: React.ReactNode;
	tagline: string;
	/** Handles, website, phone. Rendered LTR inside RTL layout. */
	rows?: Row[];
	/** Optional QR element (an <Img/> of a pre-generated QR code). */
	qr?: React.ReactNode;
	startFrame?: number;
	/** Frames between items. 8–12 frames at 30fps ≈ 250–400ms. */
	gap?: number;
	bg?: string;
	pillBg?: string;
	rowColor?: string;
	rowBorder?: string;
	/** Type the first row character by character (URLs look good typed). */
	typeFirstRow?: boolean;
};

const Typed: React.FC<{text: string; start: number}> = ({text, start}) => {
	const frame = useCurrentFrame();
	const n = Math.max(0, Math.min(text.length, Math.floor((frame - start) / 1.5)));
	return <>{text.slice(0, n)}</>;
};

/** Logo → tagline pill → contact rows → QR, staggered in, then held. */
export const EndCard: React.FC<Props> = ({
	logo,
	tagline,
	rows = [],
	qr,
	startFrame = 0,
	gap = 10,
	bg = '#A15E3E',
	pillBg = '#E8A33D',
	rowColor = '#fff',
	rowBorder = 'rgba(255,255,255,0.7)',
	typeFirstRow = true,
}) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	const local = frame - startFrame;
	const logoIn = spring({frame: local, fps, config: {damping: 14, stiffness: 120}});
	const fadeAt = (f: number) => interpolate(local, [f, f + 8], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
	const drift = 1 + Math.min(local, 240) * 0.00015; // slow life on the hold

	return (
		<AbsoluteFill style={{background: bg, alignItems: 'center', justifyContent: 'center'}}>
			<div
				style={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					gap: 34,
					transform: `scale(${drift})`,
				}}
			>
				<div style={{opacity: logoIn, transform: `scale(${0.9 + logoIn * 0.1})`}}>{logo}</div>
				<Pill label={tagline} startFrame={startFrame + gap} bg={pillBg} fontSize={44} />
				{rows.map((r, i) => {
					const s = gap * (2 + i);
					return (
						<div
							key={i}
							dir="ltr"
							style={{
								opacity: fadeAt(s),
								transform: `translateY(${(1 - fadeAt(s)) * 16}px)`,
								border: `2px solid ${rowBorder}`,
								borderRadius: 18,
								padding: '8px 26px',
								color: rowColor,
								fontFamily: fonts.body,
								fontWeight: 600,
								fontSize: 36,
								minWidth: 360,
								textAlign: 'center',
							}}
						>
							{r.icon ? `${r.icon}  ` : ''}
							{typeFirstRow && i === 0 ? <Typed text={r.text} start={startFrame + s} /> : r.text}
						</div>
					);
				})}
				{qr && (
					<div style={{opacity: fadeAt(gap * (2 + rows.length)), transform: `scale(${0.85 + fadeAt(gap * (2 + rows.length)) * 0.15})`}}>
						{qr}
					</div>
				)}
			</div>
		</AbsoluteFill>
	);
};
