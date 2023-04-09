import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Slide from '@material-ui/core/Slide';
import Header from './Header';
import AppBar from '@material-ui/core/AppBar';


function HideOnScroll(props) {
  const { children } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

function HeaderOnscroll(props) {
  return (
    <>
      <CssBaseline />
      <HideOnScroll {...props}>
        <AppBar>
          <Header pages={props.pages} />
        </AppBar>
      </HideOnScroll>
    </>
  )
}

export default HeaderOnscroll