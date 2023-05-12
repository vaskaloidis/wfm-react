import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
// import ProTip from './ProTip';
import {ReactComponent as SauceWhite} from '../images/sauce-white.svg'

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const ImageStyle = styled.div`
    backgroundColor: "white";
    // background-image:url(images/slider/berries.jpg);
    background-image: url(${SauceWhite});
`;

const FixedNavCyan = styled.div`
    backgroundColor: "white";
    // background-image:url(images/slider/berries.jpg);
    background-image: url(${SauceWhite});
`;


export default function App() {

  return (
    <>
        <Container maxWidth="sm">
        <div className="valign-wrapper">
                <Content style={ImageStyle} className="valign" />
                <div id="choose">
                    <Link to="#first-demo" id="choose-demo" className="white-text">Choose your demo</Link>
                    <Link to="#first-demo" className="btn-floating btn-large waves-effect waves-dark white black-text" id="explore">
                        <i className="mdi-navigation-arrow-forward black-text"></i>
                    </Link>
                </div>
            </div>

            <div id="first-demo" className="row" style="">
                <Link to="index.fixed-nav.cyan.html" activeClassName="demo col s12 valign-wrapper" activeStyle="background:rgba(0, 188, 212, 0.75)">
                    <div className="demo-content">
                        <h4>Cyan <small>fixed navigation bar</small></h4>
                    </div>
                </Link>
            </div>
            <div className="row" style="background-image:url(images/slider/veggies.jpg)">
            <Link to="index.fixed-nav.green.html" activeClassName="demo col s12 valign-wrapper" activeStyle="background:rgba(139, 195, 74, 0.75)">
                    <div className="demo-content">
                        <h4>Green <small>fixed navigation bar</small></h4>
                    </div>
                </Link>
            </div>
            <div className="row" style="background-image:url(images/slider/scallops.jpg)">
                <Link to="index.fixed-nav.yellow.html" className="demo col s12 valign-wrapper" style="background:rgba(255, 235, 59, 0.85)">
                    <div className="demo-content">
                        <h4 className="darker-shadow">Yellow <small>fixed navigation bar</small></h4>
                    </div>
                </Link>
            </div>

            <div className="row" style="background-image:url(images/slider/ribs.jpg)">
                <Link to="index.overlay-nav.deep-orange.html" className="demo col s12 valign-wrapper" style="background:rgba(255, 87, 34, 0.75)">
                    <div className="demo-content">
                        <h4>Orange <small>fullscreen overlay navigation</small></h4>
                    </div>
                </Link>
            </div>
            <div className="row" style="background-image:url(images/slider/grilled.jpg)">
                <Link to="index.overlay-nav.red.html" className="demo col s12 valign-wrapper" style="background:rgba(244, 67, 54, 0.75)">
                    <div className="demo-content">
                        <h4>Red <small>fullscreen overlay navigation</small></h4>
                    </div>
                </Link>
            </div>
            <div className="row" style="background-image:url(images/slider/cakes.jpg)">
                <Link to="index.overlay-nav.pink.html" className="demo col s12 valign-wrapper" style="background:rgba(233, 30, 99, 0.75)">
                    <div className="demo-content">
                        <h4>Pink <small>fullscreen overlay navigation</small></h4>
                    </div>
                </Link>
            </div>
        </Container>
    </>
  );
}


