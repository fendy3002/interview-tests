import React from 'react';

import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import {
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from '@mui/material';

import { GithubSVG } from '../SVG/GithubSVG';

export const InterviewTests = () => {
  return (
    <>
      <h2>interview-tests</h2>
      <div style={{ marginBottom: '8px' }}>
        <GithubSVG size={24} />{' '}
        <a
          href="https://github.com/fendy3002/interview-tests"
          target={'_blank'}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}
        >
          https://github.com/fendy3002/interview-tests&nbsp;
          <OpenInNewIcon fontSize="small" />
        </a>
      </div>
      <div style={{ marginBottom: '16px' }}>
        A collection of projects related with interviewing and portfolio. So far
        there are 2 projects inside:
        <Grid container display={'flex'} justifyContent={'center'}>
          <List>
            <ListItem disablePadding>
              <ListItemButton
                component="a"
                href="https://github.com/fendy3002/interview-tests/tree/master/homepage"
                target={'_blank'}
              >
                <ListItemText
                  primary={
                    <b>
                      Homepage&nbsp;
                      <OpenInNewIcon fontSize="small" />
                    </b>
                  }
                  secondary={<>Project repository for fendy3002.github.io</>}
                ></ListItemText>
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton
                component="a"
                href="https://github.com/fendy3002/interview-tests/tree/master/mini-wallet"
                target={'_blank'}
              >
                <ListItemText
                  primary={
                    <b>
                      Mini Wallet&nbsp;
                      <OpenInNewIcon fontSize="small" />
                    </b>
                  }
                  secondary={<>A form-data based rest API made with NestJS</>}
                ></ListItemText>
              </ListItemButton>
            </ListItem>
          </List>
        </Grid>
      </div>
    </>
  );
};
