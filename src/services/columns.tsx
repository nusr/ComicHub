import { getLanguageData } from '../locales';
import { Avatar } from 'antd';
import { renderDate } from '../utils';
import React from 'react';

export const searchColumns = [
  {
    dataIndex: 'id',
    title: 'ID',
  },
  {
    dataIndex: 'title',
    title: getLanguageData('page.Chapter.table.title'),
  },
  {
    dataIndex: 'author',
    title: getLanguageData('page.Chapter.table.author'),
  },
  {
    dataIndex: 'url',
    title: getLanguageData('page.Chapter.table.url'),
    render: (text: string) => (
      <a title={text} target="_blank" href={text} rel="noopener noreferrer">
        {text}
      </a>
    ),
  },

  {
    dataIndex: 'area',
    title: getLanguageData('page.Chapter.table.area'),
  },
  {
    dataIndex: 'category',
    title: getLanguageData('page.Chapter.table.category'),
  },
  {
    dataIndex: 'cover',
    title: getLanguageData('page.Chapter.table.cover'),
    render: (text: string) =>
      text ? (
        <a target="_blank" href={text} rel="noopener noreferrer">
          <Avatar src={text}/>
        </a>
      ) : (
        ''
      ),
  },
  {
    dataIndex: 'create_time',
    title: getLanguageData('page.Chapter.table.create_time'),
    render: renderDate,
  },
];
export const chapterColumns = [
  {
    dataIndex: 'id',
    title: 'ID',
  },
  {
    dataIndex: 'title',
    title: getLanguageData('page.Chapter.table.title'),
  },
  {
    dataIndex: 'url',
    title: getLanguageData('page.Chapter.table.url'),
    render: (text: string) => (
      <a title={text} target="_blank" href={text} rel="noopener noreferrer">
        {text}
      </a>
    ),
  },
  {
    dataIndex: 'page_size',
    title: getLanguageData('page.Images.table.page_size'),
  },
  {
    dataIndex: 'create_time',
    title: getLanguageData('page.Chapter.table.create_time'),
    render: renderDate,
  },
];
