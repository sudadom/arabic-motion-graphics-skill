import React from 'react';
import {Pill} from './Pill';

type Props = {
	steps: string[];
	startFrame?: number;
	/** Frames between steps. 24–36 frames at 30fps ≈ 0.8–1.2s. */
	every?: number;
	/** Use Arabic-Indic digits (١٢٣) instead of 1 2 3. */
	arabicDigits?: boolean;
	pillBg?: string;
	badgeBg?: string;
	fontSize?: number;
	gap?: number;
};

const toArabicDigits = (n: number) => String(n).replace(/\d/g, (d) => '٠١٢٣٤٥٦٧٨٩'[Number(d)]);

/** Numbered pills that accumulate one by one; earlier steps stay on screen. Number circle sits on the right (RTL). */
export const StepsList: React.FC<Props> = ({
	steps,
	startFrame = 0,
	every = 30,
	arabicDigits = false,
	pillBg,
	badgeBg,
	fontSize = 44,
	gap = 26,
}) => {
	return (
		<div dir="rtl" style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap}}>
			{steps.map((s, i) => (
				<Pill
					key={i}
					label={s}
					startFrame={startFrame + i * every}
					badge={arabicDigits ? toArabicDigits(i + 1) : i + 1}
					bg={pillBg}
					badgeBg={badgeBg}
					fontSize={fontSize}
				/>
			))}
		</div>
	);
};
