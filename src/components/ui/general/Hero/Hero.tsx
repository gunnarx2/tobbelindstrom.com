import React from 'react';
import classNames from 'classnames';

import { Wave, Container } from 'components/ui/general';
import { WaveFillAndBackgroundColor } from 'components/ui/general/Wave';
import styles from './Hero.module.scss';

interface Props {
  title: string;
  date?: string;
  timeToRead?: string | number;
  paragraph?: string;
  large?: boolean;
  wave: WaveFillAndBackgroundColor;
}

const Hero = ({
  title,
  date,
  timeToRead,
  paragraph,
  large = false,
  wave
}: Props) => {
  return (
    <header
      className={classNames(styles.root, {
        [styles.large]: large
      })}
    >
      <Wave as="div" {...wave}>
        <div className={styles.inner}>
          <Container>
            <h1 className={styles.title}>{title}</h1>
            {date && timeToRead && (
              <div className={styles.information}>
                <span>{date}</span>
                &nbsp;&nbsp;•&nbsp;&nbsp;
                <span>{timeToRead} min read</span>
              </div>
            )}
            {paragraph && (
              <div className={styles.paragraph}>
                <p>{paragraph}</p>
              </div>
            )}
          </Container>
        </div>
      </Wave>
    </header>
  );
};

export default Hero;
