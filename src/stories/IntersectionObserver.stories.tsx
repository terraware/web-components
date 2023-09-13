import React, { useState } from 'react';
import { StoryFn } from '@storybook/react';
import { InView } from 'react-intersection-observer';
import { Snackbar, Typography } from '@mui/material';
import Carousel from 'react-multi-carousel';

export default {
  title: 'IntersectionObserver',
};

type InViewDemoProps = {
  numberOfCarousels: number;
  imagesPerCarousel: number;
};

const Template: StoryFn<InViewDemoProps> = (args): JSX.Element => {
  const { numberOfCarousels, imagesPerCarousel } = args;
  const carousels = [...new Array(numberOfCarousels)];
  const [visibleCarousels, setVisibleCarousels] = useState<number[]>([]);

  const responsive = {
    any: {
      breakpoint: { max: 10000, min: 0 },
      items: 1,
    },
  };

  const setCarouselVisible = (index: number) => {
    if (!visibleCarousels.includes(index)) {
      setVisibleCarousels([...visibleCarousels, index]);
    }
  };

  const setCarouselNotVisible = (index: number) => {
    if (visibleCarousels.includes(index)) {
      setVisibleCarousels(visibleCarousels.filter((value: number) => value !== index));
    }
  };

  return (
    <>
      <Typography variant={'body1'} sx={{ marginBottom: '100px' }}>
        This story aims to show the NPM package `react-intersection-observer` in action, and shows how you might implement it in our React frontend. Use the
        `InView` component to easily show or hide the contents based on whether or not the children are in the browser's viewport. This is especially helpful
        when rendering very tall pages with expensive component hierarchies.
      </Typography>
      <Snackbar open={true}>
        <div>
          <Typography>{`Number of carousels ${numberOfCarousels}.`}</Typography>
          <Typography>{`Number of carousels rendered ${visibleCarousels.length}.`}</Typography>
        </div>
      </Snackbar>

      <div>
        {carousels.map((value, index) => (
          <InView key={index}>
            {({ inView, ref, entry }) => {
              const photos = [...new Array(imagesPerCarousel)].map((_value, _index) => `https://source.unsplash.com/random/800x600/?forest,jungle,${_index}`);

              if (inView) {
                setCarouselVisible(index);
              } else {
                setCarouselNotVisible(index);
              }

              return (
                <div ref={ref}>
                  {inView ? (
                    <div style={{ minHeight: '600px' }}>
                      <Carousel responsive={responsive}>
                        {photos.map((p, i) => {
                          return (
                            <div key={`photo-${i}-container`}>
                              <img src={p} alt={p} />
                            </div>
                          );
                        })}
                      </Carousel>
                    </div>
                  ) : null}
                </div>
              );
            }}
          </InView>
        ))}
      </div>
    </>
  );
};

export const Default = Template.bind({});

Default.args = {
  numberOfCarousels: 10,
  imagesPerCarousel: 3,
};
