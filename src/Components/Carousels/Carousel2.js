import React from 'react';
import CarouselRow from './CarouselRow';
import { generateImage } from '../../Utilities/ImageGenerator';

export default function Carousel2({ DisplayChatID, DisplayChatClass }) {
  return (
    <div className="Carousel2">
      <CarouselRow
        className={'CarouselRow CarouselRow1'}
        images={[
          generateImage(DisplayChatID, DisplayChatClass),
          generateImage(DisplayChatID, DisplayChatClass),
          generateImage(DisplayChatID, DisplayChatClass),
          generateImage(DisplayChatID, DisplayChatClass),
        ]}
      />
      <CarouselRow
        className={'CarouselRow CarouselRow2'}
        images={[
          generateImage(DisplayChatID, DisplayChatClass),
          generateImage(DisplayChatID, DisplayChatClass),
          generateImage(DisplayChatID, DisplayChatClass),
          generateImage(DisplayChatID, DisplayChatClass),
        ]}
      />
      <CarouselRow
        className={'CarouselRow CarouselRow1'}
        images={[
          generateImage(DisplayChatID, DisplayChatClass),
          generateImage(DisplayChatID, DisplayChatClass),
          generateImage(DisplayChatID, DisplayChatClass),
          generateImage(DisplayChatID, DisplayChatClass),
        ]}
      />
      <CarouselRow
        className={'CarouselRow CarouselRow2'}
        images={[
          generateImage(DisplayChatID, DisplayChatClass),
          generateImage(DisplayChatID, DisplayChatClass),
          generateImage(DisplayChatID, DisplayChatClass),
          generateImage(DisplayChatID, DisplayChatClass),
        ]}
      />
    </div>
  );
}
