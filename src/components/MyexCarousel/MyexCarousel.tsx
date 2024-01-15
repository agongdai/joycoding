import React from 'react';
import ReactPlayer from 'react-player';
import SwipeableViews from 'react-swipeable-views';

import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { Button, MobileStepper } from '@mui/material';
import MyexImage from '@myex/components/MyexImage';
import { Feature } from '@myex/types/profile';

interface Props {
  features: Feature[];
}

export default function MyexCarousel({ features }: Props) {
  const [activeIndex, setActiveIndex] = React.useState(0);

  const featuresCount = features.length || 0;
  const goBack = () => setActiveIndex((prev) => (prev + featuresCount - 1) % featuresCount);
  const goForward = () => setActiveIndex((prev) => (prev + 1) % featuresCount);

  return (
    <div className={`bg-[url('/icons/bg-lines.svg')] bg-[center_bottom_8rem] bg-no-repeat`}>
      <SwipeableViews enableMouseEvents index={activeIndex} onChangeIndex={setActiveIndex}>
        {features.map((feature) => (
          <div key={feature.name} className='m-1 p-4 pr-3'>
            {feature.url.endsWith('.mp4') ? (
              <ReactPlayer url={feature.url} controls width='100%' height={432} />
            ) : (
              <MyexImage
                src={feature.url}
                alt={feature.name}
                width={768}
                height={432}
                className='shadow'
              />
            )}
            <h5 className='mt-4 mb-2'>Feature: {feature.name}</h5>
            <p>{feature.description}</p>
          </div>
        ))}
      </SwipeableViews>

      <MobileStepper
        variant='text'
        steps={featuresCount}
        position='static'
        activeStep={activeIndex}
        classes={{ root: 'mx-2 px-2' }}
        nextButton={
          <Button
            size='small'
            onClick={goForward}
            variant='contained'
            disabled={activeIndex === featuresCount - 1}
          >
            Next
            <KeyboardArrowRightIcon />
          </Button>
        }
        backButton={
          <Button variant='contained' size='small' onClick={goBack} disabled={activeIndex === 0}>
            <KeyboardArrowLeftIcon />
            Back
          </Button>
        }
      />
    </div>
  );
}
