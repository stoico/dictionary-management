import { uuid } from 'vue-uuid';

export const state = () => ({
  dictionaries: [
    {
      name: 'Colors',
      content: [
        {
          domain: 'Stonegrey',
          range: 'Dark Grey',
          validity: { status: true, reason: '' },
          key: uuid.v4(),
        },
        {
          domain: 'Midnight Black',
          range: 'Black',
          validity: { status: true, reason: '' },
          key: uuid.v4(),
        },
        {
          domain: 'Mystic Silver',
          range: 'Silver',
          validity: { status: true, reason: '' },
          key: uuid.v4(),
        },
        {
          domain: 'Mystic Silver',
          range: 'Silver',
          validity: { status: true, reason: '' },
          key: uuid.v4(),
        },
      ],
    },
    {
      name: 'Materials',
      content: [
        {
          domain: 'Stonegrey',
          range: 'Dark Grey',
          validity: { status: true, reason: '' },
          key: uuid.v4(),
        },
        {
          domain: 'Stonegrey',
          range: 'Anthracite',
          validity: { status: true, reason: '' },
          key: uuid.v4(),
        },
        {
          domain: 'Dark Grey',
          range: 'Stonegrey',
          validity: { status: true, reason: '' },
          key: uuid.v4(),
        },
      ],
    },
    {
      name: 'Texture',
      content: [
        {
          domain: 'Stonegrey',
          range: 'Dark Grey',
          validity: { status: true, reason: '' },
          key: 0,
        },
        {
          domain: 'Dark Grey',
          range: 'Black',
          validity: { status: true, reason: '' },
          key: 1,
        },
        {
          domain: 'Mystic Silver',
          range: 'Silver',
          validity: { status: true, reason: '' },
          key: 2,
        },
        {
          domain: 'Acquamarine',
          range: 'Blue',
          validity: { status: true, reason: '' },
          key: 3,
        },
      ],
    },
    {
      name: 'More materials',
      content: [
        {
          domain: 'Stonegrey',
          range: 'Dark Grey',
          validity: { status: true, reason: '' },
          key: 0,
        },
        {
          domain: 'Midnight Black',
          range: 'Black',
          validity: { status: true, reason: '' },
          key: 1,
        },
        {
          domain: 'Mystic Silver',
          range: 'Silver',
          validity: { status: true, reason: '' },
          key: 2,
        },
        {
          domain: 'Stonegrey',
          range: 'Dark Grey',
          validity: { status: true, reason: '' },
          key: 3,
        },
        {
          domain: 'Stonegrey',
          range: 'Anthracite',
          validity: { status: true, reason: '' },
          key: 4,
        },
        {
          domain: 'Dark Grey',
          range: 'Stonegrey',
          validity: { status: true, reason: '' },
          key: 5,
        },
      ],
    },
    {
      name: 'Letters',
      content: [
        {
          domain: 'A',
          range: 'B',
          validity: { status: true, reason: '' },
          key: uuid.v4(),
        },
        {
          domain: 'A',
          range: 'B',
          validity: { status: true, reason: '' },
          key: uuid.v4(),
        },
        {
          domain: 'C',
          range: 'D',
          validity: { status: true, reason: '' },
          key: uuid.v4(),
        },
        {
          domain: 'E',
          range: 'F',
          validity: { status: true, reason: '' },
          key: uuid.v4(),
        },
        {
          domain: 'F',
          range: 'E',
          validity: { status: true, reason: '' },
          key: uuid.v4(),
        },
        {
          domain: 'F',
          range: 'E',
          validity: { status: true, reason: '' },
          key: uuid.v4(),
        },
        {
          domain: 'G',
          range: 'H',
          validity: { status: true, reason: '' },
          key: uuid.v4(),
        },
        {
          domain: 'Y',
          range: 'Z',
          validity: { status: true, reason: '' },
          key: uuid.v4(),
        },
        {
          domain: 'Y',
          range: 'W',
          validity: { status: true, reason: '' },
          key: uuid.v4(),
        },
      ],
    },
  ],
  indexOfSelected: 0,
});