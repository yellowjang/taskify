import Link from 'next/link';
import Image from 'next/image';
import BigLogoBlack from '@/public/BigLogoBlack.png';
import BigLogoGray from '@/public/BigLogoLightGray.png';
import { useTheme } from '@/hooks/useThemeContext';
import styles from './TopLogoSection.module.scss';

export default function TopLogoSection({ text }: { text: string }) {
  const { theme } = useTheme();
  const logoSrc = theme === 'dark' ? BigLogoGray : BigLogoBlack;

  return (
    <div className={styles[`box`]}>
      <Link href='/'>
        <div className={styles[`image`]}>
          <Image
            className={styles['Logo-Image']}
            src={logoSrc}
            alt='로고이미지'
          />
          <p className={styles[`text`]}>{text}</p>
        </div>
      </Link>
    </div>
  );
}
