import { cn } from '@/lib/utils';
import type { CSSProperties } from 'react';
import styles from './ComicText.module.css';

type ComicTextProps = {
  children: string;
  className?: string;
  style?: CSSProperties;
  fontSize?: number;
};

export function ComicText({
  children,
  className,
  style,
  fontSize = 5,
}: ComicTextProps) {
  const dotColor = '#EF4444';
  const backgroundColor = '#FACC15';

  // Calculate dynamic values
  const textStroke = `${fontSize * 0.35}px #000000`;
  const textFilter = `drop-shadow(5px 5px 0px #000000) drop-shadow(3px 3px 0px ${dotColor})`;
  const backgroundImage = `radial-gradient(circle at 1px 1px, ${dotColor} 1px, transparent 0)`;

  return (
    <div
      className={cn(styles.comicText, className)}
      style={{
        '--font-size': `${fontSize}rem`,
        '--text-stroke': textStroke,
        '--text-filter': textFilter,
        '--background-color': backgroundColor,
        '--background-image': backgroundImage,
        '--background-size': '8px 8px',
        ...style,
      } as CSSProperties & Record<string, string>}
    >
      {children}
    </div>
  );
}
