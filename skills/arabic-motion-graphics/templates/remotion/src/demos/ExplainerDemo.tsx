import React from 'react';
import {AbsoluteFill, Sequence, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {WordByWord} from '../components/WordByWord';
import {StepsList} from '../components/StepsList';
import {IrisTransition, PushTransition} from '../components/Transitions';
import {BadgePop} from '../components/BadgePop';
import {EndCard} from '../components/EndCard';
import {Rings} from '../components/Decor';
import {defaultBrand as b, fonts} from '../theme';

// Style A, structure "Problem → Solution → Features → CTA", cut down to ~16s for the demo.
// Fictional brand "ركن" (a café ordering app). Replace texts, colors and the logo per client.

const Wordmark: React.FC<{size?: number; color?: string}> = ({size = 150, color = '#fff'}) => (
	<div dir="rtl" style={{fontFamily: fonts.display, fontSize: size, color, lineHeight: 1}}>
		ركن<span style={{color: b.accent}}>.</span>
	</div>
);

const Phone: React.FC<{step: number}> = ({step}) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	const rise = spring({frame, fps, config: {damping: 15, stiffness: 90}});
	const screens = ['☕', '🧾', '💳', '✅'];
	return (
		<div
			style={{
				position: 'absolute',
				bottom: 230,
				left: 120,
				width: 380,
				height: 720,
				borderRadius: 56,
				background: '#2B1A12',
				padding: 18,
				transform: `translateY(${(1 - rise) * 500}px) rotate(-6deg)`,
				boxShadow: '0 30px 60px rgba(0,0,0,0.25)',
			}}
		>
			<div
				style={{
					width: '100%',
					height: '100%',
					borderRadius: 42,
					background: b.surface,
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					fontSize: 200,
				}}
			>
				{screens[Math.min(step, screens.length - 1)]}
			</div>
		</div>
	);
};

const Intro: React.FC = () => (
	<AbsoluteFill style={{background: b.bg, alignItems: 'center', justifyContent: 'center'}}>
		<Rings color={b.primary} />
		<Rings color={b.accent} x={720} y={1500} size={420} speed={-0.5} />
		<div style={{padding: '0 90px'}}>
			<WordByWord text="تعبت من الانتظار على الطلب؟" fontSize={110} color={b.text} highlight={['الانتظار']} highlightColor={b.primary} startFrame={6} />
		</div>
	</AbsoluteFill>
);

const Problem: React.FC = () => {
	const frame = useCurrentFrame();
	const q = interpolate(Math.sin(frame / 6), [-1, 1], [-8, 8]);
	return (
		<AbsoluteFill style={{background: b.primary, alignItems: 'center', justifyContent: 'center'}}>
			<div style={{fontFamily: fonts.display, fontSize: 420, color: b.accent, transform: `rotate(${q}deg)`, lineHeight: 1}}>؟</div>
			<div style={{position: 'absolute', top: 1180, padding: '0 90px'}}>
				<WordByWord text="طابور طويل ووقت ضايع" fontSize={92} color="#fff" startFrame={4} />
			</div>
		</AbsoluteFill>
	);
};

const Steps: React.FC = () => {
	const frame = useCurrentFrame();
	const step = Math.floor(Math.max(0, frame - 10) / 27);
	return (
		<AbsoluteFill style={{background: b.bg}}>
			<div style={{position: 'absolute', top: 280, right: 90}}>
				<WordByWord text="مع ركن الطلب بثواني" fontSize={88} color={b.text} align="right" highlight={['ركن']} highlightColor={b.primary} />
			</div>
			<div style={{position: 'absolute', top: 520, right: 90}}>
				<StepsList steps={['اختار طلبك', 'أكّد الطلب', 'ادفع أونلاين', 'استلم جاهز']} startFrame={10} every={27} pillBg={b.accent} badgeBg={b.primary} />
			</div>
			<Phone step={step} />
		</AbsoluteFill>
	);
};

export const ExplainerDemo: React.FC = () => {
	return (
		<AbsoluteFill style={{background: b.bg}}>
			{/* 0–3.5s intro → iris into problem */}
			<Sequence durationInFrames={165}>
				<IrisTransition from={<Intro />} to={<Problem />} at={75} duration={18} cy="45%" />
			</Sequence>
			{/* 5.5–11s problem → push into steps */}
			<Sequence from={165} durationInFrames={165}>
				<PushTransition from={<Problem />} to={<Steps />} at={0} duration={10} direction="down" />
			</Sequence>
			{/* 11–13.5s proof badge over the steps scene */}
			<Sequence from={330} durationInFrames={75}>
				<BadgePop title="الأمور" subtitle="سهلة" bg={b.primary} accent={b.accent}>
					<Sequence from={-165}>
						<Steps />
					</Sequence>
				</BadgePop>
			</Sequence>
			{/* 13.5–19s end card, held */}
			<Sequence from={405} durationInFrames={165}>
				<EndCard
					logo={<Wordmark />}
					tagline="اطلب قبل لا توصل"
					rows={[{text: 'rukn.app'}, {text: '@rukn'}]}
					bg={b.primary}
					pillBg={b.accent}
				/>
			</Sequence>
		</AbsoluteFill>
	);
};
