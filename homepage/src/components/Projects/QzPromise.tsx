import React from 'react';

import { Circle } from '@mui/icons-material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { Grid, List, ListItem, ListItemText } from '@mui/material';

import styled from 'styled-components';

import { GithubSVG } from '../SVG/GithubSVG';

const BulletedList = styled(List)`
  & li {
    display: list-item;
    list-style-type: disc;
  }
`;
export const QzPromise = () => {
  return (
    <>
      <h2>qz-promise</h2>
      <div style={{ marginBottom: '8px' }}>
        <GithubSVG size={24} />{' '}
        <a
          href="https://github.com/fendy3002/qz-promise"
          target={'_blank'}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}
        >
          https://github.com/fendy3002/qz-promise&nbsp;
          <OpenInNewIcon fontSize="small" />
        </a>
      </div>
      <div style={{ marginBottom: '16px' }}>
        A collection of utilities to handle javascript promise. As for now it
        consist of utilities to:
        <Grid container display={'flex'} justifyContent={'center'}>
          <BulletedList>
            <ListItem disablePadding>
              <ListItemText
                primary={
                  <>make a class instance awaitable / promise resolved</>
                }
              ></ListItemText>
            </ListItem>
            <ListItem disablePadding>
              <ListItemText
                primary={'make a promise retryable when throwing error'}
              ></ListItemText>
            </ListItem>
            <ListItem disablePadding>
              <ListItemText
                primary={
                  'make a bunch of promises to be processed simultaneously in batches'
                }
              ></ListItemText>
            </ListItem>
            <ListItem disablePadding>
              <ListItemText
                primary={'delay a process by milliseconds'}
              ></ListItemText>
            </ListItem>
          </BulletedList>
        </Grid>
      </div>
    </>
  );
};
