import Header from '@/components/Header/HeaderMain';
import styles from './index.module.scss';

import LandingImage from '@/assets/landing/landing-trans-svg.svg';
import HeroImage from '@/assets/landing/hero-image.svg';
import Button from '@/components/Button';

import LogoText from '@/assets/logos/LogoTextBlack.svg';
import ManageText from '@/assets/logos/manage.svg';
// import Logo from '@/assets/logos/LogoSchedoEffect.svg';
import LogoMini from '@/assets/logos/LogoYellow.svg';
import Logo from '@/assets/logos/LogoYellowBorder.svg';
import LoginButton from '@/containers/main/LoginButton';
import Image from 'next/image';
import LandingImage01 from '@/assets/landing/landing1.png';
import LandingImage02 from '@/assets/landing/landing2.png';
import LandingImage03 from '@/assets/landing/landing3.png';
import LandingImage04 from '@/assets/landing/landing4.png';
import LandingImage05 from '@/assets/landing/landing5.png';
import SettingList from './SettingList';
import Footer from './Footer';

const Landing03 = () => {
  return (
    <Image src={LandingImage03} alt='setting-image' width={300} height={124} />
  );
};
const Landing04 = () => {
  return (
    <Image src={LandingImage04} alt='setting-image' width={300} height={231} />
  );
};
const Landing05 = () => {
  return (
    <Image
      src={LandingImage05}
      alt='setting-image'
      width={300}
      height={195.5}
    />
  );
};

const SettingListValues = [
  {
    image: Landing03,
    title: '대시보드 설정',
    description: '대시보드 사진과 이름을 변경할 수 있어요.',
  },
  {
    image: Landing04,
    title: '초대',
    description: '새로운 팀원을 초대할 수 있어요.',
  },
  {
    image: Landing05,
    title: '구성원',
    description: '구성원을 초대하고 내보낼 수 있어요.',
  },
];

function MainPage() {
  return (
    <>
      <Header />
      <main className={styles['main']}>
        <section className={styles['hero-section']}>
          <HeroImage width={722} height={423} />

          <p className={styles['hero-title']}>
            <ManageText />

            <Logo className={styles['logo']} />
          </p>

          <LoginButton />
        </section>

        <div className={styles['section-list']}>
          <section
            className={`${styles['section-background']} ${styles['section-01']}`}
          >
            <div className={styles['section-title']}>
              <p>Point 1</p>

              <h2>
                일의 <span className={styles['strong']}>우선순위</span>를
                <br />
                관리하세요
              </h2>
            </div>

            <Image
              className={styles['landing-img-01']}
              src={LandingImage01}
              alt='랜딩이미지'
            />
          </section>

          <section
            className={`${styles['section-background']} ${styles['section-02']}`}
          >
            <Image
              className={styles['landing-img-02']}
              src={LandingImage02}
              alt='랜딩이미지'
            />
            <div className={styles['section-title']}>
              <p>Point 2</p>

              <h2>
                해야 <span className={styles['strong']}>할 일</span>을
                <br />
                <span className={styles['strong']}>등록</span>하세요
              </h2>
            </div>
          </section>

          <section>
            <h2 className={styles['section-setting-title']}>
              생산성을 높이는 다양한 설정 ⚡️
            </h2>

            <div className={styles['list']}>
              {SettingListValues.map((list) => (
                <SettingList list={list} />
              ))}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default MainPage;
